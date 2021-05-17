import { Template } from 'meteor/templating';
import { Session } from 'meteor/session'

// links the files in startup and import to main css, html file in client folder
import './body.html';
import '../startups/routers';
import './navbar';
import './home';
import './difficulty';
import './footer';
import './questions';
import './profile'



Template.home.helpers({
    title() {
        return "Quiz App";
    }
});