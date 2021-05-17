 
 import './questions.html';
 import { Session } from 'meteor/session'

 Template.questions.rendered = function(){
     let diff = Session.get("difficulty");
     console.log(diff);
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

// let opentdbTest = opentdbQuestions(10, null, null, 'multiple');

// opentdbTest.then(results => {document.getElementById("question").innerHTML=results[0].question}) 
// $('p.choice-text')


const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const container = Array.from(document.getElementsByClassName('choice-container'));
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
async function opentdbQuestions(amount, category, difficulty, type)
{
    //append the api call
    var append = "";
    if(amount)
        append += `amount=${amount}`;
    if(category)
        append += `&category=${category}`;
    if(difficulty)
        append += `&difficulty=${difficulty}`;
    if(type)
        append += `&type=${type}`;
    const response = await fetch(`https://opentdb.com/api.php?${append}`);
    const data = await response.json();
    return data.results;
}
let openTDB = opentdbQuestions(10, null, diff, 'multiple');
let questions = [];
openTDB.then(results => {
    results.forEach((current, index) => {
        let object = {};
        let pos = 1 + Math.floor(Math.random() * 4);
        object.answer = pos;
        object.question = current.question;
        let correct = 'choice' + pos;
        object[correct] = current.correct_answer;
        let j = 0;
        for(let i = 1; i <= 4; i++)
        {
            if(i == pos)
                continue
            let string = 'choice' + i;
            object[string] = current.incorrect_answers[j];
            j++;
        }
        // console.log(current);
        // console.log(object);
        questions[index] = object;    
    })
    const CORRECT_BONUS = 10;
    const MAX_QUESTIONS = questions.length;

startGame = () => {
    questionCounter = 0;
    score = 0;
    console.log(questions);
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
    question.innerHTML = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset.number;
        choice.innerHTML = currentQuestion['choice' + number];
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

})
// console.log(q1);
// console.log([...q1]);
// let questions = [
//     {
//         question: 'Inside which HTML element do we put the JavaScript??',
//         choice1: '<script>',
//         choice2: '<javascript>',
//         choice3: '<js>',
//         choice4: '<scripting>',
//         answer: 1,
//     },
//     {
//         question:
//             "What is the correct syntax for referring to an external script called 'xxx.js'?",
//         choice1: "<script href='xxx.js'>",
//         choice2: "<script name='xxx.js'>",
//         choice3: "<script src='xxx.js'>",
//         choice4: "<script file='xxx.js'>",
//         answer: 3,
//     },
//     {
//         question: " How do you write 'Hello World' in an alert box?",
//         choice1: "msgBox('Hello World');",
//         choice2: "alertBox('Hello World');",
//         choice3: "msg('Hello World');",
//         choice4: "alert('Hello World');",
//         answer: 4,
//     },
// ];
// console.log(questions);
// //CONSTANTS

}

