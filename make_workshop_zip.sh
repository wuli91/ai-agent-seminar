#!/usr/bin/env bash
# 세미나 배포용 workshop_samples ZIP 생성 스크립트 (진행자/도입 담당용)
# 사용법:  bash make_workshop_zip.sh
# 결과물:  dist/workshop_samples.zip  →  참석자에게 배포 후 바탕화면에 압축 해제
set -euo pipefail

cd "$(dirname "$0")"
mkdir -p dist

ZIP=dist/workshop_samples.zip
rm -f "$ZIP"

# .md/.csv/.txt/.html 실습 자료만 포함 (숨김 파일·임시 파일 제외)
zip -r "$ZIP" workshop_samples \
  -x "workshop_samples/**/.*" "workshop_samples/.*"

echo
echo "생성 완료: $ZIP"
unzip -l "$ZIP" | tail -3
