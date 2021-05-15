import { Template } from 'meteor/templating';

import './body.html';
import '../startups/routers';
import './navbar';
import './home';
import './difficulty';
import './footer';

Template.home.helpers({
    title() {
        return "Quiz App";
    }
});