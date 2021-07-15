const choice = document.querySelectorAll(".choice");
const start_quiz = document.getElementById("start_quiz");
const que_no = document.getElementById("que_no");
const score_no = document.querySelector(".score-no");
const ui_que = document.getElementById("que");
const progress_bar = document.querySelector(".progress-bar");
const container = document.querySelector('.container');

// initial values
let maxQuestion = 5;
let currentQuestionNo = 1;
let currentQuestion;
let score = 0;
let bar = 0;
async function getQuestion(){
    // return fetch("./questions.json").then(res => res.json())
    const res = await fetch("./questions.json");
    const data = await res.json();
    return data;

}
const questionData = getQuestion();
console.log(questionData);
const getNewQuestion = () => {
    questionData
    .then(data => {
        const questions = data.questions;
        if(questions.length > 0){
            que_no.textContent = `Question ${currentQuestionNo} of ${maxQuestion}`;
            score_no.textContent = `${score}`
            currentQuestion = Math.floor(Math.random() * questions.length);
            // console.log();
            const que = questions[currentQuestion];
            ui_que.textContent = `${que.question}`;
            choice.forEach(c => {
                const number = c.dataset['number'];
                c.textContent = que['choice' + number];
            }) 
        } else {
            container.innerHTML = `
            <h1 class="result">You got a <span>${score}</span> out of 100.</h1>
            `;
            setTimeout(()=>{
                window.location.reload();
            },2000)
        }
        // questions.splice(currentQuestion,1);
    })
}


choice.forEach(ch => {
     ch.addEventListener('click',(e)=>{
        // console.log(e.target.dataset.number);
        const setAnswer = e.target.dataset.number;
        questionData
        .then(data => {
            const questions = data.questions;
            const que = questions[currentQuestion];
            const ans_color = setAnswer === que.answer ? 'correct' : 'wrong';
            e.target.parentElement.classList.add(ans_color);
            questions.splice(currentQuestion,1);
            currentQuestionNo += 1
            score += ans_color === 'correct' ? 20 : 0;
            bar += 20;
            progress_bar.style.width = `${bar}%`;
            setTimeout(()=>{
                e.target.parentElement.classList.remove(ans_color);
                getNewQuestion();
            },1000)
        })      
     })
})

start_quiz.addEventListener("click",getNewQuestion);

