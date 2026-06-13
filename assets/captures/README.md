# 화면 캡처 — app_feature_guide.html 용

이 폴더에 아래 **파일명 그대로** PNG를 넣으면 `app_feature_guide.html`의 각 모식도 아래에 자동으로 표시됩니다.
(파일이 없으면 그 자리는 자동으로 숨겨지므로, 일부만 넣어도 됩니다.)

## 현재 상태 (2026-06-13 웹에서 확보)

웹 검색·공식 문서에서 받아 **이미 채워둔 것**과, 적절한 공식 이미지를 못 찾아 **사용자 촬영이 필요한 것**을 구분합니다.
받아둔 이미지는 공식 마케팅/도움말 이미지(제품을 그대로 보여주는 용도)이며, 세미나 직전 실제 화면과 다를 수 있으니 가능하면 D-1에 라이브 캡처로 교체하세요.

| 파일명 | 상태 | 출처 / 비고 |
|---|---|---|
| `claude_main.png` | ✅ 확보 | Claude 공식 도움말(support.claude.com) 입력창 크롭. **현재 UI(모델 선택 “Opus 4.5 ▾”·＋·`/` 커맨드)**. 입력창 위주라 **사이드바는 안 보임** → 원하면 전체창 캡처로 교체 |
| `claude_project.png` | ✅ 확보 | Anthropic 공식(anthropic.com/news/projects). 프로젝트 **지침(Set custom instructions) + 지식 파일 패널**이 함께 보임 |
| `claude_artifacts.png` | ✅ 확보 | Anthropic 공식(anthropic.com/news/projects). 왼쪽 대화 + 오른쪽 **Artifact 패널(Preview/Code·Share)** |
| `gemini_main.png` | ✅ 확보 | Wikimedia Commons, **Public Domain**, 2026-05 gemini.google.com. 사이드바(New chat·Search·Library·Notebooks) + 입력창 “Ask Gemini”·모델 “Flash ▾” |
| `claude_settings.png` | ❌ **촬영 필요** | 공식 자료엔 토글 한 줄짜리 띠 이미지만 있어 Memory+커넥터를 한 화면에 담은 설정 캡처가 없음. 데모 계정 **설정 > Capabilities(메모리)** 와 **Customize > Connectors** 를 직접 캡처 |
| `chatgpt_main.png` | ❌ **촬영 필요** | openai.com·help.openai.com이 자동 수집을 차단, Wikimedia엔 2023년 구버전/모바일/세로로 긴 캡처뿐이라 현재 UI 오인 우려로 제외. 데모 계정 **chatgpt.com 메인**(사이드바 GPTs·Projects + 입력창 도구 메뉴) 직접 캡처 |
| `wrksai_main.png` | ❌ **촬영 필요** | wrks.ai는 로그인 포털이고 공식 docs 이미지가 토큰 보호(403)라 직접 받기 불가. 데모 계정 **포털 홈의 업무 도구 그리드 + 모델 선택**(docs.wrks.ai 매뉴얼에 모델 선택·AI Chat 화면 있음) 캡처 |

> 촬영 원칙
> - **개인 계정 말고 데모용 계정**으로, 화면에 실명·메일주소·사내 기밀 대화가 보이지 않게.
> - 브라우저 전체가 아니라 **앱 영역 위주로** 크롭, 가로 1600px 내외 권장.
> - UI는 자주 바뀌므로 **세미나 직전(D-1)에 갱신** — facilitator_guide 체크리스트 항목.

## 슬롯별 “꼭 담을 것” (모식도 번호 대응)

| 파일명 | 대상 화면 | 꼭 담을 것 |
|---|---|---|
| `claude_main.png` | claude.ai 메인 (새 채팅) | 사이드바(새 채팅·Chats·Projects), 입력창의 ＋ 버튼·검색/리서치·모델 선택 ▾ |
| `claude_project.png` | Project 내부 화면 | 프로젝트 지침 영역 + 지식(파일) 패널이 같이 보이게 |
| `claude_artifacts.png` | Artifact가 열린 대화 | 왼쪽 대화 + 오른쪽 Artifact 패널, 복사/게시 버튼 |
| `claude_settings.png` | 설정 화면 | Memory(기억 보기/끄기)와 커넥터(연결된 앱) 메뉴 |
| `chatgpt_main.png` | chatgpt.com 메인 | 사이드바(GPTs·Projects), 입력창 도구 메뉴(검색·Deep Research·이미지) |
| `gemini_main.png` | gemini.google.com 메인 | 사이드바 Gems, 도구 메뉴, (가능하면) Workspace/@멘션 |
| `wrksai_main.png` | 웍스AI 포털 | 업무 도구 그리드(40종)와 모델 선택 — 데모 계정 또는 공식 소개 자료 캡처 |

## 출처·라이선스 메모
- `gemini_main.png` — Wikimedia Commons “Google Gemini Screenshot (2026)”, **Public Domain**.
- `claude_*.png` — Anthropic 공식 페이지(anthropic.com/news/projects, support.claude.com)의 제품 이미지. 제품 자체를 가르치는 교육 목적의 인용.
- 못 채운 3종은 사용자가 라이브 캡처로 채우면 됩니다.

캡처 후 `app_feature_guide.html`을 브라우저로 열어 표시 여부를 확인하세요.
