
// global router option
// template main is set as home page which is located in  body.html

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

Router.route('/questions', {
    template: 'questions',
    name: 'questions'
});
