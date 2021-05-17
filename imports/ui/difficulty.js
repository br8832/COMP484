import './difficulty.html';
import { Session } from 'meteor/session'

Template.difficulty.rendered = function(){
let btn1 = document.getElementById("easy");

let btn2 = document.getElementById("medium");

let btn3 = document.getElementById("hard");

btn1.addEventListener('click', () => {Session.set("difficulty", "easy")});
btn2.addEventListener('click', () => {Session.set("difficulty", "medium")});
btn3.addEventListener('click', () => {Session.set("difficulty", "hard")});
}