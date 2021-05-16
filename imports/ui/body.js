import { Template } from 'meteor/templating';

// links the files in startup and import to main css, html file in client folder
import './body.html';
import '../startups/routers';
import './navbar';
import './home';
import './difficulty';
import './footer';
import './questions';

Template.home.helpers({
    title() {
        return "Quiz App";
    }
});