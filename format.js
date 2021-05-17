//using node.js's fetch isn't working, so it's something to fix later
//import fetch from 'node-fetch';

//base link for requsts to the api
const opentdb = 'https://opentdb.com/api.php?';
const jeopardy = 'https://jeopardy-api.bentleyherron.dev/api/';

//these are the modifiers for opentbd
let opentdb_options = {
    amount: "",//max of 50
    category: "",//9-32 maybe   
    difficulty: "",//easy, medium, hard
    type:"" //can be multiple or boolean
}
//what you get back
let openttdb_results = {
    category: "",
    correct_answer: "",
    difficulty: "",
    incorrect_answers: [],
    question: "",
    type: ""
}
let jeopardy_options = {
    shows: "",//these works for sure 4680, 5957, 3751, 3673, 4931, 5690, 2825, 6037, 5243, 3036, 4107, 2735
    categories: ""//retrieve all categories (too many to list)
}
let shows = [4680, 5957, 3751, 3673, 4931, 5690, 2825, 6037, 5243, 3036, 4107, 2735];
var i = 0;
let jeopardy_parts = {
    question: {
        'Air Date': "2004-12-31",
        Answer: "Copernicus",
        Category: "HISTORY",
        Question: "For the last 8 years of his life, Galileo was under house arrest for espousing this man's theory",
        Round: "Jeopardy!",
        'Show Number': 4680,
        Value: "$200"
    }
}
// in the call, specify the opentbd parameters
// you always need to specify amount
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
        append += `type=${type}`;
    console.log(append);
    const response = await fetch(`https://opentdb.com/api.php?${append}`);
    const data = await response.json();
    return data.results;
}
// in the call, specify jeopardy paramaters
// realisticall for jeopardy, we'll do random numbers
async function jeopardyQuestionsbyShow (showNumber)
{
    const response = await fetch(`https://jeopardy-api.bentleyherron.dev/api/shows/${showNumber}`);
    const data = await response.json();
    return data.questions;
}
async function jeopardyQuestionsbyCategories (category)
{
    const response = await fetch(`https://jeopardy-api.bentleyherron.dev/api/categories/${category}`);
    const data = await response.json();
    return data;
}

//this holds all the quesions globally
//although to work with it requires funky buisiness
//I'll see if there is an easier way later
var opentbdTestE = opentdbQuestions(10, null ,'easy');
var opentbdTestM = opentdbQuestions(10, null ,'medium');
var opentbdTestH = opentdbQuestions(10, null ,'hard');
//var jeopardyByCategory = jeopardyQuestionsbyCategories(3100);
var jeopardyByShow = jeopardyQuestionsbyShow(shows[i++]);

let question = document.querySelector(".container").querySelector("p");
let answers = document.querySelector(".meta");
let progressBar = document.querySelector("#progress");
// store correct question
var selected = [];

function nextQuestions(test, num)
{
    test.then(results =>
        {   
            if(num == results.length){
                LastQuestion(num);
                return;
            }
            answers.innerHTML="";
            let now = num;
            let next = now + 1;
            let first = results[now];
            let percentage = now/results.length;
            progressBar.value = (percentage > 1) ? 1 : percentage;
            console.log(first);
            console.log(first.question);
            question.innerHTML = first.question;
            if(first.type == "boolean")
            {
                let b1 = document.createElement("button");
                let b2 = document.createElement("button");
                b1.innerHTML = "True";
                b2.innerHTML = "False";
                b1.name = "True";
                b2.name = "False";
                b1.addEventListener('click', function() {check(this, next);nextQuestions(test, next)})
                b2.addEventListener('click', function() {check(this, next);nextQuestions(test, next)})
                if(first.correct_answer = "False")
                {
                    b2.classList.add("correct");
                    b1.classList.add("not");
                }
                else{
                    b2.classList.add("not");
                    b1.classList.add("correct")
                }            
                answers.appendChild(b1);
                answers.appendChild(b2);
                return;
            }
            var num_answer = 4;
            let pos = 1 + Math.floor(Math.random() * 4);
            var i=0;
            while (num_answer > 0)
            {
                
                let b = document.createElement("button");
                
                if(num_answer == pos)
                {
                    b.innerHTML=first.correct_answer;
                    b.name=first.correct_answer;
                    b.classList.add("correct");
                }
                else
                {
                    b.innerHTML=first.incorrect_answers[i];
                    b.name=first.incorrect_answers[i++];
                    b.classList.add("not");
                }
                b.addEventListener('click', function() {check(this, next);nextQuestions(test, next)})
                answers.appendChild(b);
                num_answer--;
            }
        })
}
function check(select, num){
    selected[num] = select;
}
function LastQuestion(num){
    progressBar.value = 1;
    console.log(num);
    var correct = 0;
    for(let i=1; i<=num; i++)
    {   
        console.log(selected[i]);
        if(selected[i].classList[0] == "correct")
            correct = correct + 1;
    }
    question.innerHTML = "CONGRATULATIONS You got " + correct + "/" + num;
    answers.innerHTML = "";
}
nextQuestions(opentbdTestE,0);
// opentbdTestE.then(results =>
//     {   let now = 1;
//         let first = results[0];
//         let percentage = now/results.length;
//         progressBar.value = (percentage > 1) ? 1 : percentage;
//         console.log(first.question);
//         question.innerHTML = first.question;
//         if(first.type == "boolean")
//         {
//             let b1 = document.createElement("button");
//             let b2 = document.createElement("button");
//             b1.innerHTML = "True";
//             b2.innerHTML = "False";
//             b1.name = "True";
//             b2.name = "False";
//             b1.addEventListener('click', (event) => {nextQuestions(event, opentbdTestE, now)})
//             b2.addEventListener('click', (event) => {nextQuestions(event, opentbdTestE, now)})
//             if(first.correct_answer = "False")
//             {
//                 b2.classList.add("correct");
//                 b1.classList.add("not");
//             }
//             else{
//                 b2.classList.add("not");
//                 b1.classList.add("correct")
//             }            
//             answers.appendChild(b1);
//             answers.appendChild(b2);
//             return;
//         }
//         var num_answer = 4;
//         let pos = 1 + Math.floor(Math.random() * 4);
//         var i=0;
//         while (num_answer > 0)
//         {
            
//             let b = document.createElement("button");
            
//             if(num_answer == pos)
//             {
//                 b.innerHTML=first.correct_answer;
//                 b.name=first.correct_answer;
//                 b.classList.add("correct");
//             }
//             else
//             {
//                 b.innerHTML=first.incorrect_answers[i];
//                 b.name=first.incorrect_answers[i];
//                 i++;
//                 console.log(i);
//                 b.classList.add("not");
//             }
//             b.addEventListener('click', (event) => {nextQuestions(event, opentbdTestE, now)})
//             num_answer--;
//             answers.appendChild(b);
//         }
//     })