const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  return (seconds) => {
    const interval = setInterval(() => {
      // Проверка на отрицательные и нулевые значения
      if(!seconds && seconds >= 1) {
        return 
      };
      // Приведение к целым числам
      let h = Math.floor(seconds / 3600);
      let m = Math.floor(seconds % 3600 / 60);
      let s = Math.floor(seconds % 3600 % 60);
      // Склонение слов 
      const wordChange = (number , forms) => {
        const lastOne = Number(number.toString().slice(-1));
        if (number > 10 && number < 20 ) {
          return forms[2];
        }
        if (lastOne > 1 && lastOne < 5) {
          return forms[1];
        }
        if (lastOne === 1 && number!==11 ) {
          return forms[0];
        }
        return forms[2];
      }
      // Добавление 0 в начале 
      const addZero = (num)=>{
        if(num > 0 && num < 10){
          num = "0" + num;
          return num;
        }
        return num;
      }
      // финальные значения
      let hDisplay = wordChange(h,[" час "," часа "," часов "]);
      let mDisplay = wordChange(m,[" минута "," минуты "," минут "]);
      let sDisplay = wordChange(s,[" секунда "," секунды "," секунд "]);
      // Вывод на экран по необходимости
      const display = (timer,needDisplay) => {
        return timer === 0 ? "" : addZero(timer) + needDisplay;
      }
      // вывод в ДОМ
      timerEl.textContent = display(h,hDisplay) + display(m,mDisplay) + display(s,sDisplay);
      seconds -= 1 ;
      // Вывод надписи по истечению времени
      if (seconds < 0) {
        timerEl.innerHTML = "Время вышло!";
        clearInterval(interval);
      }
    }, 1000 );
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  inputEl.value = inputEl.value.replace(/[^0-9\.]/g, "");
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);
  // Добавил блокировку кнопки и инпута после начала таймера
  buttonEl.setAttribute("disabled" , "disabled");
  inputEl.setAttribute("disabled" , "disabled");
  animateTimer(seconds);

  inputEl.value = '';
});
