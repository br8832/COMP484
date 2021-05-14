let Step1 = fetch('https://opentdb.com/api.php?amount=10&category=24')
let Step2 = Step1.then(res => res.json())
let Step3 = Step2.then(json => {
    let q = json.results;
    let body = document.querySelector('body');
    q.forEach(element => {
        let p = document.createElement('p');
        p.innerHTML = element.question;
        body.appendChild(p);
    });
})
let jeopardy1 = fetch('https://jeopardy-api.bentleyherron.dev/api/shows');
let jeopardy2 = jeopardy1.then(res => res.json())
let jeopardy3 = jeopardy2.then(json => {
    // random category
    console.log(json.show_numbers.length);
    let show = json.show_numbers[Math.floor(Math.random() * json.show_numbers.length)]
    fetch('https://jeopardy-api.bentleyherron.dev/api/shows/'  + show).then(
        res => res.json()).then(result => console.log(result))
})
