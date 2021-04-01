'use strict';
const gameBtn = document.querySelector('.game__title');
const container = document.querySelector('.game__container');
const gameInfo = document.querySelector('.game__info');
const gameInfo2 = document.querySelector('.game__info2');
const gameTime = document.querySelector('.game__time');
const gameScore = document.querySelector('.game__score');
const gameInput = document.querySelector('.game__input');
const gameWord = document.querySelector('.game__word');


const GAME_DURATION_SEC = 10;

let status = true;
let val = '';
let words = '';

//초기 빈배열 ㅡ> fetch통신을 이용하여 api에서 제공하는 단어를 넣을것임. 
let presenterArr = [];

let remainingTimeSec = GAME_DURATION_SEC;
let score = 0;


getPresenter();

gameBtn.addEventListener('click', ()=>{
  startMode();
  startGame();
});

gameInput.addEventListener('keydown', (e)=>{
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



function updateScore(){
  gameScore.innerHTML = `Score : ${score}`;
}

function resetWords(){
  gameInput.value = null;
  words = '';
}

function changePresenter(){
  let newPresenter = presenterArr[Math.floor(Math.random() * presenterArr.length)];
  gameWord.innerText = newPresenter;
};


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
  setTimeout(()=>{
    const timer = setInterval(()=>{
      if(remainingTimeSec <= 0){
        console.log("시간초과");
        clearInterval(timer);
        showPopUp();
        return;
      }
      updateTime(--remainingTimeSec);
    }, 1000);
  }, 2000);
}

function updateTime(timeSec){
  remainingTimeSec = timeSec;
  gameTime.innerHTML= `Time limit : ${timeSec}s`;
}


function endMode(){
  container.style.animation='end-mode 3s 1s both';
  gameInfo.style.animation='hide-info 1s both';
  gameInfo2.style.animation='hide-info 1s both';
};


function showPopUp(){

};
