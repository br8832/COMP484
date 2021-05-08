var result;
fetch('https://opentdb.com/api.php?amount=10&category=24')
.then(res => {result = res.json()})
.then(json => console.log(json));
console.log(result)