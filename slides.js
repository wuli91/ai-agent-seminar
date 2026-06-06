/* ===========================================================
   AI Agent 활용 세미나 — 슬라이드 내비게이션
   - 화살표/스페이스/PageUp·Down 으로 이동
   - 화면 클릭(오른쪽=다음, 왼쪽=이전)
   - 우하단 카운터 + 상단 진행 바
   - URL #n 으로 특정 슬라이드 진입/북마크
   사용: <body> 끝에 <script src="assets/slides.js"></script>
   =========================================================== */
(function () {
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  if (!slides.length) return;
  var total = slides.length;
  var cur = 0;

  // 내비 UI 주입
  var nav = document.createElement('div');
  nav.className = 'nav';
  document.body.appendChild(nav);

  var bar = document.createElement('div');
  bar.className = 'progress';
  document.body.appendChild(bar);

  var hint = document.querySelector('.hint');
  if (!hint) {
    hint = document.createElement('div');
    hint.className = 'hint';
    hint.textContent = '← → 이동 · F 전체화면 · P(Ctrl+P) PDF 저장';
    document.body.appendChild(hint);
  }

  function clamp(n) { return Math.max(0, Math.min(total - 1, n)); }

  function show(n) {
    cur = clamp(n);
    slides.forEach(function (s, i) { s.classList.toggle('active', i === cur); });
    nav.innerHTML = '<b>' + (cur + 1) + '</b> / ' + total;
    bar.style.width = ((cur + 1) / total * 100) + '%';
    if (location.hash !== '#' + (cur + 1)) {
      history.replaceState(null, '', '#' + (cur + 1));
    }
  }

  function next() { show(cur + 1); }
  function prev() { show(cur - 1); }

  document.addEventListener('keydown', function (e) {
    switch (e.key) {
      case 'ArrowRight': case 'ArrowDown': case 'PageDown': case ' ':
        e.preventDefault(); next(); break;
      case 'ArrowLeft': case 'ArrowUp': case 'PageUp':
        e.preventDefault(); prev(); break;
      case 'Home': e.preventDefault(); show(0); break;
      case 'End': e.preventDefault(); show(total - 1); break;
      case 'f': case 'F':
        if (!document.fullscreenElement) { document.documentElement.requestFullscreen && document.documentElement.requestFullscreen(); }
        else { document.exitFullscreen && document.exitFullscreen(); }
        break;
    }
  });

  // 클릭: 오른쪽 60% 다음, 왼쪽 40% 이전 (링크/버튼 클릭은 제외)
  document.addEventListener('click', function (e) {
    if (e.target.closest('a,button,input,textarea,select,.no-nav')) return;
    if (e.clientX > window.innerWidth * 0.4) next(); else prev();
  });

  // 시작 위치: URL 해시 우선
  var start = parseInt((location.hash || '').replace('#', ''), 10);
  show(isNaN(start) ? 0 : start - 1);
})();
