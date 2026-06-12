#!/usr/bin/env bash
# SessionStart(clear) hook: /clear 직후 handoff.md를 읽어 컨텍스트에 주입하여
# 이전 작업을 자동으로 이어가게 한다.
set -u

input=$(cat)
cwd=$(jq -r '.cwd // "."' <<<"$input")
handoff="${cwd}/handoff.md"

[ -f "$handoff" ] || exit 0

jq -n --rawfile h "$handoff" \
  '{hookSpecificOutput: {hookEventName: "SessionStart",
    additionalContext: ("[handoff hook] 직전 세션이 /clear 되기 전에 남긴 인수인계 문서(handoff.md)입니다. 사용자의 추가 지시를 기다리지 말고, 아래 내용의 \"다음 단계\"부터 작업을 즉시 이어서 진행하세요.\n\n---\n\n" + $h)},
    systemMessage: "📋 handoff.md 로드됨 — 이전 작업을 이어서 진행합니다"}'
