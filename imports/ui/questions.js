 
 import './questions.html';
 import { Session } from 'meteor/session'

 Template.questions.rendered = function(){
     let diff = Session.get("difficulty");
     console.log(diff);
//     //base link for requsts to the api
// opentdb = 'https://opentdb.com/api.php?';

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
const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const container = Array.from(document.getElementsByClassName('choice-container'));
const questioncountertext = document.getElementById('questionCounter');
const scoretext = document.getElementById('score');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
//gets the questions
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
//Since it's a promise, we must work in the .then() 
openTDB.then(results => {
    //for each question
    results.forEach((current, index) => {
        //convert into our format
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
        
        questions[index] = object;    
    })
    const CORRECT_BONUS = 1;
    const MAX_QUESTIONS = questions.length;
//play the quiz
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //go to the end page
        Session.set("score",score);
        return window.location.assign('/');
        
    }
    questionCounter++;
    questioncountertext.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerHTML = currentQuestion.question;
    //display the choices
    choices.forEach((choice) => {
        const number = choice.dataset.number;
        choice.innerHTML = currentQuestion['choice' + number];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};
//add EventListeners to go from question to question

container.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;
        
        acceptingAnswers = false;


        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset.number;

        const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

      if (classToApply === "correct") {
        incrementScore(CORRECT_BONUS);
      }
      if(e.path.length === 9)
      {
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
          }, 1000); 
      }
      else
      {
        selectedChoice.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.classList.remove(classToApply);
            getNewQuestion();
          }, 1000); 
      }
      
        
    });
    incrementScore = num => {
        score += num;
        scoretext.innerText = score;
      };

});

 startGame();

})
}

