'use strict';
const gameBtn = document.querySelector('.game__title');
const container = document.querySelector('.game__container');
const gameInfo = document.querySelector('.game__info');
const gameInfo2 = document.querySelector('.game__info2');
const gameTime = document.querySelector('.game__time');
const gameInput = document.querySelector('.game__input');
const gameWord = document.querySelector('.game__word');

const GAME_DURATION_SEC = 10;
let status = true;
let val = '';

gameBtn.addEventListener('click', ()=>{
  startMode();
  startGame();
});

gameInput.addEventListener('keydown', (e)=>{
  let aword = e.key;
  let bword = aword.concat(`${aword}`);
  console.log(bword);
});

function startMode(){
  container.style.animation='start-mode 1s both';
  gameInfo.style.animation='show-info 3s both';
  gameInfo2.style.animation='show-info 3s 1s both';
};

function startGame(){
  changeBtn();
  startGameTimer();
};


function changeBtn(){
  gameBtn.classList.toggle('active');
  let activeBtn = gameBtn.classList.contains('active');
  if(activeBtn){
    gameBtn.innerHTML = `👼GAME STOP👼`;
    gameBtn.style.background='#fff';
    gameBtn.style.color='#151515';
  }
  else if(!activeBtn){
    gameBtn.innerHTML = `😈GAME START👿`;
    gameBtn.style.background='#151515';
    gameBtn.style.color='#fff';
    endMode();
  }
};

function startGameTimer(){
  let remainingTimeSec = GAME_DURATION_SEC;
  setTimeout(()=>{
    const timer = setInterval(()=>{
      if(remainingTimeSec <= 0){
        console.log("시간초과");
        clearInterval(timer);
        return;
      }
      updateTime(--remainingTimeSec);
    }, 1000);
  }, 2000);
}

function updateTime(remainingTimeSec){
  gameTime.innerHTML= `Time limit : ${remainingTimeSec}s`;
}


function endMode(){
  container.style.animation='end-mode 3s 1s both';
  gameInfo.style.animation='hide-info 1s both';
  gameInfo2.style.animation='hide-info 1s both';
};
