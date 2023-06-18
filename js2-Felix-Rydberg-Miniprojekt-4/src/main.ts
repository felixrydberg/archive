import { Tamagochi } from './modules/Tamagochi.ts';

(function () {
  let player1 = new Tamagochi();
  player1.updateDisplay();
  let feedbtn = document.querySelector('.feed');
  feedbtn.addEventListener('click', function () {
    player1.feed();
    player1.updateDisplay();
  });

  let cleanbtn = document.querySelector('.cleanbtn');
  cleanbtn.addEventListener('click', function () {
    player1.cleanthepopo();
    player1.updateDisplay();
  });

  let playbtn = document.querySelector('.play');
  playbtn.addEventListener('click', function () {
    player1.play();
    player1.updateDisplay();
  });
})();
