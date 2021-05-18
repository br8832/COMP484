import './profile.html';
import { Session } from 'meteor/session'
Template.difficulty.rendered = function(){
let element = document.getElementById("scores");
element.innerHTML = "<p>You got " + Session.get("score") + "/10</p>";
}