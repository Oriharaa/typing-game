'use strict';
const gameBtn = document.querySelector('.game__title');
const container = document.querySelector('.game__container');
const gameInfo = document.querySelector('.game__info');
const gameInfo2 = document.querySelector('.game__info2');
const gameTime = document.querySelector('.game__time');
const gameScore = document.querySelector('.game__score');
const gameInput = document.querySelector('.game__input');
const gameWord = document.querySelector('.game__word');

const endPopUp = document.querySelector('.end-game__container');
const finalScore = document.querySelector('.end-game__container p');
const replayBtn = document.querySelector('.replayBtn');

const GAME_DURATION_SEC = 10;
const GAME_BASIC_SCORE = 0;

let presenterArr = [];
let words = '';
let remainingTimeSec = GAME_DURATION_SEC;
let score = 0;
let gameStatus = false;
let timer = '';

getPresenter();

gameBtn.addEventListener('click', ()=>{
  //gameMode()함수에서 게임상태값이 변경됨.
  gameMode();
  if(gameStatus){
    startGameTimer();
    changeBtn();
  }else {
    resetTimer();
    changeBtn();
  }
  gameInput.focus();
});


gameInput.addEventListener('keyup', (e)=>{
  effectKey(e);
});

gameInput.addEventListener('keydown', (e)=>{

  effectKey(e);
  let presenter = gameWord.innerText;

  //a ~ z범위의 문자만 word, words에 저장됨.
  if(e.keyCode >= 65 && 90 >= e.keyCode ){
    let word = e.key;
    words = words + word;
  }

  //enter를 눌렀을때 제시어와 사용자입력값이 같은 경우
  if(e.keyCode === 13 && presenter === words){
    resetWords();
    changePresenter();
    updateTime(remainingTimeSec+2);
    updateScore(++score);
  }

  //Backspace 눌렀을때 words 마지막 값 지워줌
  if(e.keyCode === 8){ 
    words = words.slice(0, -1);
  }
});


replayBtn.addEventListener('click',()=>{
  getPresenter();
  resetWords();
  updateTime(GAME_DURATION_SEC);
  updateScore(GAME_BASIC_SCORE)
  togglePopUp();
  startGameTimer();
});


function gameMode(){
  if(!gameStatus){
    //startMode
    container.style.animation='start-mode 1s both';
    gameInfo.style.animation='show-info 3s both';
    gameInfo2.style.animation='show-info 3s 1s both';
    gameStatus = true;
  }
  else {
    //stopMode
    container.style.animation='end-mode 3s 1s both';
    gameInfo.style.animation='hide-info 1s both';
    gameInfo2.style.animation='hide-info 1s both';
    gameStatus = false;
  }
};


function changeBtn(){
  gameBtn.classList.toggle('active');
  if(gameStatus){
    gameBtn.innerHTML = `👼GAME STOP👼`;
  }
  else{
    gameBtn.innerHTML = `😈GAME START👿`;
  }
};

function resetWords(){
  gameInput.value = null;
  words = '';
}

function changePresenter(){
  let newPresenter = presenterArr[Math.floor(Math.random() * presenterArr.length)];
  gameWord.innerText = newPresenter;
};

function startGameTimer(){
  setTimeout(()=>{
      timer = setInterval(()=>{
      if(remainingTimeSec <= 0){
        clearInterval(timer);
        togglePopUp();
        return;
      }
      updateTime(--remainingTimeSec);
    }, 1000);
  }, 1000);
}

function resetTimer(){
  clearInterval(timer);
  updateTime(GAME_DURATION_SEC);
  updateScore(0);
};

function updateTime(timeSec){
  remainingTimeSec = timeSec;
  gameTime.innerHTML= `Time limit : ${remainingTimeSec}s`;
}

function updateScore(score){
  gameScore.innerHTML = `Score : ${score}`;
}

function togglePopUp(){
  endPopUp.classList.toggle('show');
  finalScore.innerHTML=`Your final score is ${score}`;
  score = 0;
};

function getPresenter(){
  fetch('https://random-word-api.herokuapp.com/word?number=200')
  .then(res => {
    return res.json();
  })
  .then(data => {
    data.forEach(item=>{
      //난이도를 위하여 10자리로 제한
      if(item.length <= 10){
        presenterArr.push(item);
      }   
    })
  })
  .catch(err => {
    console.log('Fetch Error', err);
  });
};

function effectKey(e){
  const virtualKey = document.getElementById(e.key);

  switch(e.type){
    case 'keydown' : 
      virtualKey && virtualKey.classList.add('pressed');
      e.key === 'Tab' && e.preventDefault();
      break;

    case 'keyup' : 
      virtualKey && virtualKey.classList.remove('pressed');
      break;
  }
}