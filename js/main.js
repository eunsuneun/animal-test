const $start = document.querySelector('.start');
const $qna = document.querySelector('.qna');
const $qnaContent = document.querySelector('#qna-content');
const $result = document.querySelector('.result');
const $question = document.querySelector('.question');
const $answer = document.querySelector('.answer');
const $statusBar = document.querySelector('.status-bar');
const $resultTitle = document.querySelector('.result-tit');
const $resultImg = document.querySelector('.result-img');
const $resultDesc = document.querySelector('.result-desc');
const $back = document.querySelector('#back');

const endPoint = 12;
let selected = [0,0,0,0,0,0,0,0,0,0,0,0];
let history = [];
let questionIdx = 0;

// 되돌리기
if($back){
  $back.addEventListener('click',()=>{
    questionIdx--;
    let prevData = history.pop();
    if(!prevData){
      selected = [0,0,0,0,0,0,0,0,0,0,0,0];
      goStart();
      return;
    }
    selected = history[history.length-1];
    showQuestion(questionIdx);
  });
}


// 시작하기 ( 질문페이지 이동 )
function goQna(){
  $start.classList.remove('active');
  $qna.style.display = 'block';
  setTimeout(() => {
    $qna.classList.add('active');
    $start.style.display = 'none';
    showQuestion(questionIdx);
  }, 500);
}

// 질문하기
function showQuestion(qIdx){
  if(qIdx === endPoint){
    goResult();
    return;
  }
  $question.innerHTML = qnaList[qIdx].q;
  $answer.innerHTML = '';
  for (let i in qnaList[qIdx].a) {
     addAnswer(qnaList[qIdx].a[i].answer, qIdx ,i);
  }
  $statusBar.style.width = (100/endPoint) * (qIdx + 1) +'%';
}

// 답변 뿌려주기
function addAnswer(txt, qIdx, idx){
  const answer = document.createElement('button');
  answer.classList.add('answer-list');
  answer.classList.add('fadeIn');
  $answer.appendChild(answer);
  answer.innerHTML = txt;
  // 답변 클릭
  answer.addEventListener('click', () => {
    let children = document.querySelectorAll('.answer-list');
    // 1초간 사라진다.
    for(let i = 0; i < children.length; i++){
      children[i].disabled = true;
      children[i].style.animation = 'fadeOut .5s';
    }
    setTimeout(() => {
      // qnaList의 a의 type의 값을 인덱스로 하여 selected배열에 +1 해주기
      let target = qnaList[qIdx].a[idx].type;
      for(let j = 0; j < target.length; j++){
        selected[target[j]] += 1;
      }
      history.push(JSON.parse(JSON.stringify(selected)));
      for(let i = 0; i < children.length; i++){ 
        // 1초 뒤 완전히 사라지고, 다시 뿌려준다.
        children[i].style.display = 'none';
      }
      qIdx += 1;
      showQuestion(qIdx);
      questionIdx = qIdx;
    }, 450);
  })
}

// 결과페이지 이동
function goResult(){
  let point = calResult();
  $resultTitle.innerHTML = infoList[point].name;
  $resultDesc.innerHTML = infoList[point].desc;
  let imgUrl = './img/image-' + point + '.png';
  const resultImg = document.createElement('img');
  resultImg.classList.add('img-fluid');
  resultImg.src = imgUrl;
  resultImg.alt = point;
  $resultImg.appendChild(resultImg);
  $qnaContent.innerHTML = '';

  const loader = document.createElement('div');
  const loaderTxt = document.createElement('p');
  loaderTxt.innerHTML = '분석 중 ...';
  loader.classList.add('loader');
  loader.classList.add('loader-6');
  $qnaContent.appendChild(loader);
  $qnaContent.appendChild(loaderTxt);
  
  setTimeout(() => {
    $qna.classList.remove('active');
    $result.style.display = 'block';
    setTimeout(() => {
      $result.classList.add('active');
      $qna.style.display = 'none';
    }, 500);
  }, 2000);
  calResult();
}

// 결과 계산하기
function calResult(){
  let result = selected.indexOf(Math.max(...selected));
  return result;
}

// 다시하기
function goStart(){
  window.location.href = '/index.html';
}

