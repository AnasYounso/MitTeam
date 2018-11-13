(function() {
  const startButton = document.getElementById('start_button');
  const stopButton = document.getElementById('stop_button');
  const counterInput = document.getElementById('counter_input');
  const descriptionElement = document.getElementById('description');
  const lastRecordElement = document.getElementById('list');
  const restartButton = document.getElementById('restart_button');
  let result;
  let currentValue;
  let counter;

  function hide_stop_btn() {
    stopButton.style.display = 'none';
  }

  startButton.addEventListener('click', start);
  restartButton.addEventListener('click', restart);
  stopButton.addEventListener('click', stop);
  window.addEventListener('load', hide_stop_btn);

  function getInitialValue() {
    const inputValue = result || counterInput.value;
    const arr = inputValue.split(':');
    const hoursInSeconds = parseInt(arr[0]) * 60 * 60;
    const minutesInSeconds = parseInt(arr[1]) * 60;
    const seconds = parseInt(arr[2]);
    return sum(hoursInSeconds, minutesInSeconds, seconds);
  }

  function start() {
    lastRecordElement.innerHTML = result || '';
    startButton.style.display = 'none';
    stopButton.style.display = 'block';
    descriptionElement.innerHTML = 'Counting ...';
    currentValue = getInitialValue();
    showTime();

    counter = setInterval(function() {
      --currentValue;
      showTime();

      if (currentValue <= 0) {
        clearInterval(counter);
      }
    }, 1000);
  }

  function restart() {
    window.location.reload();
  }

  function stop() {
    clearInterval(counter);
    descriptionElement.innerHTML = 'Counting Stopped';
    stopButton.style.display = 'none';
    startButton.style.display = 'block';
  }

  function showTime() {
    if (result === '00:00:00') {
      counterInput.value = '00:00:00';
    } else {
      result = counterInput.value = formatTime(currentValue);
    }
  }

  function twoDigits(number) {
    return number < 10 ? `0${number}` : number;
  }

  function formatTime(seconds) {
    sec = seconds % 60;
    minutes = Math.floor((seconds % 3600) / 60);
    hours = Math.floor(seconds / 3600);
    return [twoDigits(hours), twoDigits(minutes), twoDigits(sec)].join(':');
  }

  function sum() {
    return [...arguments].reduce((previousValue, currentValue) => {
      return previousValue + currentValue;
    }, 0);
  }
})();
