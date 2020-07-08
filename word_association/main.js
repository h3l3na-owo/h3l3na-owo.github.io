$(document).ready(function() {

  /* 
  * The following two functions are used for making the API call using
  * pure Javascript. I wouldn't worry about the details
  */

  function encodeQueryData(data)
  {
     var ret = [];
     for (var d in data)
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
     return ret.join("&");
  }

  function httpGetAsync(theUrl, callback)
  {
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() { 
          if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
              callback(xmlHttp.responseText);
      }
      xmlHttp.open("GET", theUrl, true); // true for asynchronous 
      xmlHttp.send(null);
  }

  /*
  * The following functions are what do the work for retrieving and displaying gifs
  * that we search for.
  */
  function error(){
    console.log("hi")
    clearInterval(timer);
    const message = document.querySelector('p');
    message.textContent = "uh oh! looks like what you entered isn't a word."
  }

  function displayWord(word){
   const myLI = document.createElement('li');
    myLI.textContent = word;
    list.appendChild(myLI);
    myLI.scrollIntoView();
  }

  function getWord(query) {
    console.log(query);
    query = query.replace(' ', '+');
    //var params = { 'api_key': apikey, 'q': query};
    //params = encodeQueryData(params);

    // api from https://github.com/Giphy/GiphyAPI#search-endpoint 

    httpGetAsync('https://api.datamuse.com/words?rel_trg='+query+'&max=10', function(data) {
      var words = JSON.parse(data);
      console.log(words);
      var randomElement = words[Math.floor(Math.random()*words.length)];
      let firstWord;
      if (!randomElement){
        error();
      }
      else{
        const message = document.querySelector('p');
        message.textContent = "";
        firstWord = randomElement.word;
        console.log(firstWord);
        displayWord(firstWord);
        nextWord = firstWord;
      }
    });
  }

  let nextWord;
  let timer;
  let list = document.querySelector('ol');

  $("#submitButton").on("click", function() {
    var query = $("#inputQuery").val();

    nextWord = query;
    timer = setInterval(function(){
      getWord(nextWord);
    },500);
    getWord(query);
  });

  $("#stopButton").on("click", function() {
    clearInterval(timer);
  });
  $("#resetButton").on("click", function() {
    list.innerHTML = '';
  });
})


