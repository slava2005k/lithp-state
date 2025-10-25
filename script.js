<script>
(function(){
  const MSK_OFFSET_HOURS = 0; 
  const D = document.getElementById('d'),
        H = document.getElementById('h'),
        M = document.getElementById('m'),
        S = document.getElementById('s');
  const BAR = document.getElementById('bar'),
        DONE = document.getElementById('done'),
        TIMER = document.getElementById('timer');

  function nowUtcMs() {
    const n = new Date();
    return n.getTime() + n.getTimezoneOffset() * 60000;
  }

  // целевая дата — 05.01.2026 00:00 МСК
  const targetUtc = Date.UTC(2026, 0, 4, 21, 0, 0); // т.к. МСК = UTC+3

  function pad(n){ return n < 10 ? '0' + n : n; }

  function update(){
    const now = nowUtcMs();
    let diff = targetUtc - now;

    if (diff <= 0) {
      D.textContent = '0';
      H.textContent = '00';
      M.textContent = '00';
      S.textContent = '00';
      TIMER.style.display = 'none';
      DONE.style.display = 'block';
      BAR.style.width = '100%';
      clearInterval(interval);
      return;
    }

    const days = Math.floor(diff / 86400000); diff -= days * 86400000;
    const hours = Math.floor(diff / 3600000); diff -= hours * 3600000;
    const minutes = Math.floor(diff / 60000); diff -= minutes * 60000;
    const seconds = Math.floor(diff / 1000);

    D.textContent = days;
    H.textContent = pad(hours);
    M.textContent = pad(minutes);
    S.textContent = pad(seconds);

    const totalDuration = targetUtc - (targetUtc - 86400000 * 30); // условно месяц
    const progress = 100 - (diff / totalDuration) * 100;
    BAR.style.width = Math.min(100, Math.max(0, progress)).toFixed(2) + '%';
  }

  update();
  const interval = setInterval(update, 250);
})();
</script>
