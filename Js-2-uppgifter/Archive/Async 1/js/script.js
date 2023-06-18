let myPromise = new Promise(function(Resolve, Reject) {
    let number = Math.floor(Math.random() * 11);
    if(number % 2) {// Uneven
        Reject(number);
    }
    else { //Even
        Resolve(number);
    }
})
myPromise.then(
    function(value) { document.querySelector("h1").innerHTML = value },
    function(error) { console.log(`${error} is not even`) }
  );