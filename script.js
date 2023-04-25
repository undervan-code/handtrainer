document.addEventListener("DOMContentLoaded", function () {
let timer;
let time = 0;

// Elementos del DOM
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");
  const score1Element = document.getElementById("score1");
  const score2Element = document.getElementById("score2");

// Funciones
function changeTimerColor(color) {
    minutesElement.style.color = color;
    secondsElement.style.color = color;
}
function startTimer() {
  let minutes = parseInt(minutesElement.value) || 0;
  let seconds = parseInt(secondsElement.value) || 0;
  time = (minutes * 60) + seconds;

  if (timer) clearInterval(timer);
  timer = setInterval(function () {
    if (time <= 0) {
      stopTimer();
      alert('Tiempo agotado');
    } else {
      time--;
      let min = Math.floor(time / 60);
      let sec = time % 60;
      minutesElement.value = min;
      secondsElement.value = sec.toString().padStart(2, '0'); // Agrega un cero delante si es un solo dígito
    }
  }, 1000);

  minutesElement.classList.add("timer-running");
  secondsElement.classList.add("timer-running");
  minutesElement.classList.remove("blink");
  secondsElement.classList.remove("blink");
  changeTimerColor("red");
}


function stopTimer() {
  if (timer) clearInterval(timer);

  minutesElement.classList.remove("timer-running");
  secondsElement.classList.remove("timer-running");
  minutesElement.classList.add("blink");
  secondsElement.classList.add("blink");
  changeTimerColor("");
}

function resetTimer() {
  if (timer) clearInterval(timer);

  minutesElement.value = '';
  secondsElement.value = '';

  minutesElement.classList.remove("timer-running");
  secondsElement.classList.remove("timer-running");
  minutesElement.classList.add("blink");
  secondsElement.classList.add("blink");
  changeTimerColor("");
}

function updateScore(team, operation) {
  let scoreElement = document.getElementById(`score${team}`);
  let score = parseInt(scoreElement.textContent);

  if (operation === 'add') {
    score++;
  } else if (operation === 'subtract' && score > 0) {
    score--;
  }

  scoreElement.textContent = score;
}

// Event listeners
  document.getElementById("start").addEventListener("click", startTimer);
  document.getElementById("stop").addEventListener("click", stopTimer);
  document.getElementById("reset").addEventListener("click", resetTimer);
  document.getElementById("add1").addEventListener("click", () => updateScore(1, "add"));
  document.getElementById("subtract1").addEventListener("click", () => updateScore(1, "subtract"));
  document.getElementById("add2").addEventListener("click", () => updateScore(2, "add"));
  document.getElementById("subtract2").addEventListener("click", () => updateScore(2, "subtract"));

  minutesElement.addEventListener("input", function () {
    if (this.value > 59) {
      this.value = 59;
    } else if (this.value < 0) {
      this.value = 0;
    }
  });

  secondsElement.addEventListener("input", function () {
    if (this.value > 59) {
      this.value = 59;
    } else if (this.value < 0) {
      this.value = 0;
    }
  });

  // Fullscreen

  function enterFullscreen(element) {
    const fullscreenMethods = [
      "requestFullscreen",
      "mozRequestFullScreen",
      "webkitRequestFullscreen",
      "msRequestFullscreen",
    ];

    for (const method of fullscreenMethods) {
      if (element[method]) {
        element[method]().catch((error) => {
          console.error("Error attempting to enter fullscreen:", error);
        });
        break;
      }
    }
  }

  function exitFullscreen() {
    const exitMethods = [
      "exitFullscreen",
      "mozCancelFullScreen",
      "webkitExitFullscreen",
      "msExitFullscreen",
    ];

    for (const method of exitMethods) {
      if (document[method]) {
        document[method]().catch((error) => {
          console.error("Error attempting to exit fullscreen:", error);
        });
        break;
      }
    }
  }

  function isFullscreen() {
    return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
  }

  document.getElementById("fullscreen").addEventListener("click", function () {
    if (!isFullscreen()) {
      enterFullscreen(document.documentElement);
    } else {
      exitFullscreen();
    }
  });
});
