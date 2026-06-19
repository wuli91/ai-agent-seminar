/* ===========================================================
   AI Agent 활용 세미나 — 스크롤 덱 보조 스크립트
   - 전체 문서를 위→아래로 스크롤해서 본다 (PPT식 좌우 이동 아님)
   - 우하단 카운터 + 상단 진행 바는 스크롤 위치를 따라간다
   - URL #n 으로 특정 슬라이드 진입/북마크 (Home/End 점프)
   - F: 전체화면 토글
   사용: <body> 끝에 <script src="assets/slides.js"></script>
   =========================================================== */
(function () {
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  if (!slides.length) return;
  var total = slides.length;
  var cur = -1;

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
    hint.textContent = '↑ ↓ 스크롤로 이동 · Home/End 처음·끝 · F 전체화면 · Ctrl+P PDF 저장';
    document.body.appendChild(hint);
  }

  // 뷰포트 중앙에 걸친 슬라이드를 "현재"로 본다
  function currentIndex() {
    var mid = window.pageYOffset + window.innerHeight / 2;
    var idx = 0;
    for (var i = 0; i < total; i++) {
      if (slides[i].offsetTop <= mid) idx = i; else break;
    }
    return idx;
  }

  function render() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    var pct = max > 0 ? (window.pageYOffset / max) * 100 : 100;
    bar.style.width = Math.max(0, Math.min(100, pct)) + '%';

    var n = currentIndex();
    if (n !== cur) {
      cur = n;
      nav.innerHTML = '<b>' + (cur + 1) + '</b> / ' + total;
      var h = '#' + (cur + 1);
      if (location.hash !== h) history.replaceState(null, '', h);
    }
  }

  // 스크롤은 rAF로 스로틀
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(function () { render(); ticking = false; }); }
  }, { passive: true });
  window.addEventListener('resize', render);

  function goto(n) {
    n = Math.max(0, Math.min(total - 1, n));
    slides[n].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  document.addEventListener('keydown', function (e) {
    if (e.target.closest && e.target.closest('input,textarea,select')) return;
    switch (e.key) {
      case 'Home': e.preventDefault(); goto(0); break;
      case 'End':  e.preventDefault(); goto(total - 1); break;
      case 'f': case 'F':
        if (!document.fullscreenElement) { document.documentElement.requestFullscreen && document.documentElement.requestFullscreen(); }
        else { document.exitFullscreen && document.exitFullscreen(); }
        break;
    }
  });

  // 시작 위치: URL 해시(#n)가 있으면 해당 슬라이드로
  // (이미지/캡처가 늦게 로드되며 높이가 바뀌므로 load 시점에 한 번 더 보정)
  var start = parseInt((location.hash || '').replace('#', ''), 10);
  function jumpToHash() {
    if (!isNaN(start) && start >= 1 && start <= total) {
      slides[start - 1].scrollIntoView({ block: 'start' });
    }
    render();
  }
  if (!isNaN(start) && start >= 1 && start <= total) {
    requestAnimationFrame(jumpToHash);
    window.addEventListener('load', jumpToHash);
  } else {
    render();
  }
})();
