function updateProgress(percentage) {
  const water = document.getElementById('water');
  const percentageText = document.getElementById('percentage');

  // Обновляем текст с процентом
  percentageText.textContent = percentage + '%';

  // Изменяем высоту воды в зависимости от процента
  water.style.height = percentage + '%';

  // Определяем цвет в зависимости от процента
  let color;
  if (percentage <= 50) {
    const red = 255;
    const green = Math.floor((percentage / 50) * 255);
    color = `rgba(${red}, ${green}, 0, 0.5)`;
  } else {
    const green = 255;
    const red = Math.floor(255 - ((percentage - 50) / 50) * 255);
    color = `rgba(${red}, ${green}, 0, 0.5)`;
  }
  water.style.backgroundColor = color;
}

// Задаём процент готовности и анимируем от 0 до значения
const staticProgress = 99;
const duration = 900; // ms
let startTime = null;

function animateProgress(timestamp) {
  if (!startTime) startTime = timestamp;
  const elapsed = timestamp - startTime;
  const t = Math.min(elapsed / duration, 1);
  const current = Math.round(t * staticProgress);
  updateProgress(current);
  if (t < 1) {
    requestAnimationFrame(animateProgress);
  }
}

requestAnimationFrame(animateProgress);
