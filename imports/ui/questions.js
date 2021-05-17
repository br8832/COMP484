 
 import './questions.html';

 Template.questions.rendered = function(){
//     //base link for requsts to the api
// opentdb = 'https://opentdb.com/api.php?';
// jeopardy = 'https://jeopardy-api.bentleyherron.dev/api/';

// //these are the modifiers for opentbd
// opentdb_options = {
//     amount: "",//max of 50
//     category: "",//9-32 maybe   
//     difficulty: "",//easy, medium, hard
//     type:"" //can be multiple or boolean
// }
// //what you get back
// openttdb_results = {
//     category: "",
//     correct_answer: "",
//     difficulty: "",
//     incorrect_answers: [],
//     question: "",
//     type: ""
// }
// jeopardy_options = {
//     shows: "",//these works for sure 4680, 5957, 3751, 3673, 4931, 5690, 2825, 6037, 5243, 3036, 4107, 2735
//     categories: ""//retrieve all categories (too many to list)
// }
// shows = [4680, 5957, 3751, 3673, 4931, 5690, 2825, 6037, 5243, 3036, 4107, 2735];
// i = 0;
// jeopardy_parts = {
//     question: {
//         'Air Date': "2004-12-31",
//         Answer: "Copernicus",
//         Category: "HISTORY",
//         Question: "For the last 8 years of his life, Galileo was under house arrest for espousing this man's theory",
//         Round: "Jeopardy!",
//         'Show Number': 4680,
//         Value: "$200"
//     }
// }
// // in the call, specify the opentbd parameters
// // you always need to specify amount
// async function opentdbQuestions(amount, category, difficulty, type)
// {
//     //append the api call
//     var append = "";
//     if(amount)
//         append += `amount=${amount}`;
//     if(category)
//         append += `&category=${category}`;
//     if(difficulty)
//         append += `&difficulty=${difficulty}`;
//     if(type)
//         append += `&type=${type}`;
//     console.log(append);
//     const response = await fetch(`https://opentdb.com/api.php?${append}`);
//     const data = await response.json();
//     return data.results;
// }
// // in the call, specify jeopardy paramaters
// // realisticall for jeopardy, we'll do random numbers
// async function jeopardyQuestionsbyShow (showNumber)
// {
//     const response = await fetch(`https://jeopardy-api.bentleyherron.dev/api/shows/${showNumber}`);
//     const data = await response.json();
//     return data.questions;
// }
// async function jeopardyQuestionsbyCategories (category)
// {
//     const response = await fetch(`https://jeopardy-api.bentleyherron.dev/api/categories/${category}`);
//     const data = await response.json();
//     return data;
// }

// let opentdbTest = opentdbQuestions(10, null, null, 'multiple');

// opentdbTest.then(results => {document.getElementById("question").innerHTML=results[0].question}) 
// $('p.choice-text')
// function nextQuestions(test, num)
// {
//     test.then(results =>
//         {   
//             if(num == results.length){
//                 LastQuestion(num);
//                 return;
//             }
//             let now = num;
//             let next = now + 1;
//             let first = results[now];
//             console.log(first);
//             console.log(first.question);
//             question.innerHTML = first.question;
//             if(first.type == "boolean")
//             {
//                 let b1 = document.createElement("button");
//                 let b2 = document.createElement("button");
//                 b1.innerHTML = "True";
//                 b2.innerHTML = "False";
//                 b1.name = "True";
//                 b2.name = "False";
//                 b1.addEventListener('click', function() {check(this, next);nextQuestions(test, next)})
//                 b2.addEventListener('click', function() {check(this, next);nextQuestions(test, next)})
//                 if(first.correct_answer = "False")
//                 {
//                     b2.classList.add("correct");
//                     b1.classList.add("not");
//                 }
//                 else{
//                     b2.classList.add("not");
//                     b1.classList.add("correct")
//                 }            
//                 answers.appendChild(b1);
//                 answers.appendChild(b2);
//                 return;
//             }
//             var num_answer = 4;
//             let pos = 1 + Math.floor(Math.random() * 4);
//             var i=0;
//             while (num_answer > 0)
//             {
                
//                 let b = document.createElement("button");
                
//                 if(num_answer == pos)
//                 {
//                     b.innerHTML=first.correct_answer;
//                     b.name=first.correct_answer;
//                     b.classList.add("correct");
//                 }
//                 else
//                 {
//                     b.innerHTML=first.incorrect_answers[i];
//                     b.name=first.incorrect_answers[i++];
//                     b.classList.add("not");
//                 }
//                 b.addEventListener('click', function() {check(this, next);nextQuestions(test, next)})
//                 answers.appendChild(b);
//                 num_answer--;
//             }
//         })
// }
// function check(select, num){
//     selected[num] = select;
// }
// function LastQuestion(num){
//     progressBar.value = 1;
//     console.log(num);
//     var correct = 0;
//     for(let i=1; i<=num; i++)
//     {   
//         console.log(selected[i]);
//         if(selected[i].classList[0] == "correct")
//             correct = correct + 1;
//     }
//     question.innerHTML = "CONGRATULATIONS You got " + correct + "/" + num;
//     answers.innerHTML = "";
// }
// nextQuestions(opentdbTest,0);

const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const container = Array.from(document.getElementsByClassName('choice-container'));
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript??',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1,
    },
    {
        question:
            "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3,
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    },
];

// //CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //go to the end page
        return window.location.assign('/end.html');
    }
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset.number;
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset.number;
        getNewQuestion();
    });
});


 startGame();

}

