# Amazon 주간 리포트 자동화 — 실습 샘플 (레벨 1, 심화)

`amazon_na_weekly_report_lab.html` **레벨 1(CSV 기반)** 실습을 실제 데이터 없이 바로 따라 할 수 있는
샘플 데이터 + 완성 리포트 정답 예시입니다. 매출 한 장짜리 단순 실습
(`../amazon_na_sales_sample_level1.csv`)보다 한 단계 깊은, **실제 Seller Central 다운로드 형식에
가까운 3종 리포트** 버전입니다.

> ⚠️ **전부 가짜(샘플) 데이터입니다.** THINKWARE 대시캠 NA 셀러를 가정한 가상의 숫자이며,
> 실제 판매·광고 데이터가 아닙니다. 실습 후 본인의 실제 데이터로 교체할 때는
> **절대 공개 git 저장소에 커밋하지 마세요** (루트 `.gitignore`가 `*.csv`를 기본 차단하며,
> 예외는 `workshop_samples/` 가짜 데이터에만 적용됩니다).

## 폴더 구조
```
amazon_weekly_report/
├─ CLAUDE.md                         ← Claude Code 작업 규칙 (이 폴더를 복사해 쓸 때 함께 복사)
├─ data/
│  ├─ this_week/                     ← 이번 주 (2026-06-08 ~ 06-14)
│  │  ├─ business_report.csv         ← 매출·트래픽 (SKU별)
│  │  ├─ advertising_report.csv      ← 스폰서 광고 (SKU별)
│  │  └─ returns_report.csv          ← FBA 반품 (건별 1행)
│  └─ last_week/                     ← 전주 (2026-06-01 ~ 06-07), 동일 3종
└─ example_output/
   └─ weekly_2026-06-15.html         ← ✅ 완성 리포트 정답 예시 (실습 목표 산출물)
```

> 📌 실습에서는 결과물을 `reports/` 폴더에 만들도록 안내합니다(`CLAUDE.md` 규칙 참고).
> 이 저장소에서는 `reports/`가 git 추적 제외 대상이라, **정답 예시만 `example_output/`에 담아**
> 함께 배포합니다. 직접 실행하면 본인 `reports/weekly_2026-06-15.html`가 생성됩니다.

## 따라 하기 (3단계)
1. 이 `amazon_weekly_report/` 폴더를 본인 작업 폴더로 복사하고, 터미널에서 그 폴더로 이동.
2. Claude Code 실행 후 한 줄 지시:
   > `data 폴더의 이번주/전주 CSV 3종을 읽어서 CLAUDE.md 규칙대로 주간 리포트 HTML을 reports/에 만들어줘. 먼저 어떤 컬럼을 어떻게 매핑했는지 보여주고, 내가 확인하면 생성해.`
3. 생성된 리포트를 `example_output/weekly_2026-06-15.html`(정답 예시)와 비교.

## 이 샘플에 일부러 심어둔 "신호" (완성 리포트의 ④ 주의 신호와 연결)
- **256GB microSD**: 반품률 4.3% → 12.1% 급등(불량 사유 집중) + 바이박스 88% → 70% 하락
- **F70**: ACoS 43% → 51%로 손익분기 위협 + 매출 하락
- **U3000**: 광고비 +41% vs 광고매출 +9% → ACoS 악화
- **Q200 · 하드와이어링 킷**: 견조한 성장(대조군)

## 컬럼 매핑 포인트 (자동 매핑 실습용)
| 개념 | business_report | advertising_report | returns_report |
|------|-----------------|--------------------|----------------|
| SKU  | `SKU`           | `Advertised SKU`   | `sku`          |
| 매출 | `Ordered Product Sales` (`$`·콤마 포함) | — | — |
| 광고비/광고매출 | — | `Spend` / `7 Day Total Sales (USD)` | — |
| 반품 | — | — | 건별 행 → SKU로 **count** |

세 파일의 SKU 컬럼명·금액 표기(`$1,234.56`)·`%` 기호가 제각각이라,
Claude Code가 이를 자동 인식·정제·조인하는 과정을 그대로 보여주는 게 이 실습의 핵심입니다.
