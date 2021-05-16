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
    return data;
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
var opentbdTest = opentdbQuestions(30, null ,'easy');
//var jeopardyByCategory = jeopardyQuestionsbyCategories(3100);
var jeopardyByShow = jeopardyQuestionsbyShow(4680);

//the place in the document to append  
function display(place)
{
    place.appendChild();
}