#!/usr/bin/env bash
# UserPromptSubmit hook: 컨텍스트 사용량이 임계치(기본 30%)를 넘으면
# Claude에게 handoff.md 작성을 지시하고 사용자에게 /clear를 안내한다.
set -u

input=$(cat)
transcript=$(jq -r '.transcript_path // empty' <<<"$input")
session_id=$(jq -r '.session_id // "unknown"' <<<"$input")
cwd=$(jq -r '.cwd // "."' <<<"$input")

[ -n "$transcript" ] && [ -f "$transcript" ] || exit 0

LIMIT="${CLAUDE_HANDOFF_CONTEXT_LIMIT:-200000}"   # 모델 컨텍스트 윈도우 (1M 모델이면 env로 조정)
THRESHOLD="${CLAUDE_HANDOFF_THRESHOLD_PCT:-30}"    # 발동 임계치 %
REFIRE_STEP=10                                     # 재알림 간격 (사용량 +10%p 마다)

# 가장 최근 assistant 메시지의 usage = 현재 컨텍스트 크기
used=$(tac "$transcript" 2>/dev/null \
  | jq -r 'select(.type? == "assistant") | .message.usage? // empty
           | (.input_tokens // 0) + (.cache_read_input_tokens // 0)
             + (.cache_creation_input_tokens // 0) + (.output_tokens // 0)' 2>/dev/null \
  | head -n1)

[ -n "$used" ] && [ "$used" -gt 0 ] 2>/dev/null || exit 0
pct=$(( used * 100 / LIMIT ))

sentinel="/tmp/claude-handoff-fired-${session_id}"

if [ "$pct" -lt "$THRESHOLD" ]; then
  rm -f "$sentinel"
  exit 0
fi

# 같은 세션에서는 임계치 최초 도달 시 1회, 이후 +10%p 증가할 때마다 재알림
if [ -f "$sentinel" ]; then
  last=$(cat "$sentinel" 2>/dev/null || echo 0)
  [ "$pct" -lt $(( last + REFIRE_STEP )) ] && exit 0
fi
printf '%s' "$pct" > "$sentinel"

ctx="[context-monitor hook] 현재 컨텍스트 사용량이 모델 컨텍스트 윈도우의 ${pct}% (약 ${used} / ${LIMIT} 토큰)에 도달했습니다. 지금 진행 중인 사용자 요청을 처리하기 전에 다음을 먼저 수행하세요:
1. ${cwd}/handoff.md 파일을 작성(또는 갱신)하세요. 새 세션의 Claude가 이 파일만 읽고 작업을 이어갈 수 있도록: 현재 작업의 목표, 지금까지 완료한 것, 진행 중인 것, 다음 단계, 관련 파일 경로, 주의사항을 구체적으로 적으세요.
2. 그 후 사용자 요청을 정상 처리하고, 응답 끝에 '컨텍스트가 ${pct}%에 도달하여 handoff.md를 갱신했습니다. /clear 를 입력하면 자동으로 이어서 진행됩니다.'라고 안내하세요."

jq -n --arg ctx "$ctx" --arg msg "⚠️ 컨텍스트 ${pct}% 도달 — handoff.md 갱신 후 /clear 권장" \
  '{hookSpecificOutput: {hookEventName: "UserPromptSubmit", additionalContext: $ctx}, systemMessage: $msg}'
