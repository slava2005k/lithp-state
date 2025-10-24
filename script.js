(function(){
  const MSK_OFFSET_HOURS = 3; // Moscow = UTC+3 (постоянно)
  const D = document.getElementById('d'), H = document.getElementById('h'), M = document.getElementById('m'), S = document.getElementById('s');
  const BAR = document.getElementById('bar'), DONE = document.getElementById('done'), TIMER = document.getElementById('timer');

  function nowUtcMs(){
    const n = new Date();
    return n.getTime() + n.getTimezoneOffset()*60000;
  }

  function targetUtcMsFor(dateObj){
    return Date.UTC(dateObj.year, dateObj.month, dateObj.day, 17 - MSK_OFFSET_HOURS, 0, 0, 0);
  }

  function getTargetUtc(){
    const now = new Date();
    const y = now.getFullYear(), m = now.getMonth(), d = now.getDate();
    let t = targetUtcMsFor({year:y,month:m,day:d});
    return t;
  }

  function pad(n){ return n<10? '0'+n : ''+n; }

  function update(){
    const nowUtc = nowUtcMs();
    const targetUtc = getTargetUtc();
    let diff = targetUtc - nowUtc;
    if (diff <= 0){
      D.textContent = '0'; H.textContent='00'; M.textContent='00'; S.textContent='00';
      TIMER.style.display='none'; DONE.style.display='block'; BAR.style.width='100%';
      clearInterval(interval);
      return;
    }

    const days = Math.floor(diff / (24*60*60*1000));
    diff -= days * 24*60*60*1000;
    const hours = Math.floor(diff / (60*60*1000));
    diff -= hours * 60*60*1000;
    const minutes = Math.floor(diff / (60*1000));
    diff -= minutes * 60*1000;
    const seconds = Math.floor(diff / 1000);

    D.textContent = days;
    H.textContent = pad(hours);
    M.textContent = pad(minutes);
    S.textContent = pad(seconds);

    const nowLocal = new Date();
    const nowUtcMsLocal = nowUtcMs();
    const nowMsk = new Date(nowUtcMsLocal + MSK_OFFSET_HOURS*3600*1000);
    const mskY = nowMsk.getUTCFullYear(), mskM = nowMsk.getUTCMonth(), mskD = nowMsk.getUTCDate();
    const startMskUtc = Date.UTC(mskY, mskM, mskD, 0 - MSK_OFFSET_HOURS, 0, 0);
    const targetMskUtc = Date.UTC(mskY, mskM, mskD, 17 - MSK_OFFSET_HOURS, 0, 0);
    let progressPct = (nowUtcMsLocal - startMskUtc) / (targetMskUtc - startMskUtc) * 100;
    if (progressPct < 0) progressPct = 0;
    if (progressPct > 100) progressPct = 100;
    BAR.style.width = progressPct.toFixed(2) + '%';

    if (days===0 && hours===0 && minutes===0 && seconds===0){
      TIMER.style.display='none'; DONE.style.display='block'; BAR.style.width='100%';
      clearInterval(interval);
    }
  }

  update();
  let interval = setInterval(update, 250);
})();
