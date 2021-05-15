import { IronRouter } from 'meteor/iron:router';

Router.configure({
    layoutTemplate: 'main'
});

Router.route('/', {
    template: 'home',
    name: 'home'
});

Router.route('/difficulty', {
    template: 'difficulty',
    name: 'difficulty'
});
