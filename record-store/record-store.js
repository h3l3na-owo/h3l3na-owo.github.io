//https://accounts.spotify.com/en/authorize?client_id=163f41ea630d40358a5b6c7a98d5134b&response_type=token&redirect_uri=https:%2F%2Fh3l3na-owo.github.io%2Fartist-gen%2F

const parsedHash = new URLSearchParams(
  window.location.hash.substr(1) // skip the first char (#)
);

const parsedHost = window.location.hostname;

console.log("yo:"+parsedHash.get("access_token"));
var authToken = parsedHash.get("access_token");

var client_id="2e53a5b23a78477e99eae192a230276c";
var client_secret = '85471551deb74a4ba8906bd3667361a7';

var spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(authToken);

var searchNew = document.querySelector("#search-new");
var getAnother = document.querySelector("#get-another");
var searchedSong = document.querySelector("#searchedSong");
var authButton = document.querySelector('#reauth');
var mainText = document.querySelector('#main');
var yesButton = document.querySelector('#yes');
var songLink = document.querySelector("#song-link");
var searchBar= document.querySelector('#searchBar');
var resultList = document.querySelector('#results');

var searchedTitle;

var isAuth=false;

const myLI1 = document.createElement('li');
const myLI2 = document.createElement('li');
const myLI3 = document.createElement('li');
const myLI4 = document.createElement('li');
const myLI5 = document.createElement('li');


function test(){
	var searchedGenre = 'genre:"metal"';
	var yearRange = 'year:0000-9999 ';
	var artistName;

	spotifyApi.searchTracks(yearRange+searchedGenre).then(
	  function (data) {
	    console.log('all results:', data);




	    artistNum = data.tracks.total;
	    if (artistNum > 500){
	    	artistNum = 501;
	    }

	    // get random artist
	    limit = 1;
		offset = Math.floor(Math.random()*artistNum);
		spotifyApi.searchTracks(yearRange+searchedGenre,{limit:limit , offset:offset}).then(
		  function (data) {
		  	//artist = data;
		  	//artistName = artist.artists.items[0].name;
		  	//artistTitle.textContent = artistName;
		  	//displayArtist(data.tracks.items[0]);
		    //console.log(artistNum);
		    
		  },
		  function (err) {
		    console.error(err);
		    reAuth();
		  }
		); 

	  },
	  function (err) {
	    console.error(err);
	    reAuth();
	  }
	);
}



function trackSelector(){
	var yearRange = 'year:0000-9999 ';
	console.log('year range:'+yearRange);
	searchedTitle = 'track:"'+searchBar.value+'"';
	console.log(searchedTitle);

	spotifyApi.searchTracks(yearRange+searchedTitle).then(
	  function (data) {
	    console.log('all results:', data);
	    displaySong(data.tracks.items[0]);
	    resetResults();
	    displayResults(data.tracks.items);
	    

	  },
	  function (err) {
	    console.error(err);
	    reAuth();
	  }
	);
}

yesButton.addEventListener('click', search1);

myLI1.addEventListener("click", selected1);
console.log("my li "+myLI1);

window.addEventListener('load', function(){
	songLink.style.display = 'none';
	searchNew.style.display = 'none';
	getAnother.style.display ='none';
	searchedSong.style.visibility = 'hidden';
	searchBar.style.visibility = 'hidden';
});

window.addEventListener("keyup", function(event){
	event.preventDefault();
    if (event.keyCode === 13) {
        
    }	
});

searchNew.addEventListener("click", searchnew);

getAnother.addEventListener("click", getanother);

searchBar.addEventListener("input", trackSelector);

function displaySong(track){
	searchedSong.textContent = track.name;
	console.log(searchedSong.textContent);
	console.log("auth: "+isAuth);
}

function displayResults(tracks){
	var max = 8;
	if (tracks.length <= max){
		max = tracks.length;
	}
	for (i = 0; i < max; i++) {
		const myLI1 = document.createElement('li');
		myLI1.textContent = tracks[i].name+" by "+tracks[i].artists[0].name;
        resultList.appendChild(myLI1);
        myLI1.addEventListener("click", selected1);
		console.log("my li "+myLI1.value);
    }
    myLI1.addEventListener("click", selected1);
	console.log("my li "+myLI1.value);
}

function resetResults(){
	while (resultList.firstChild) {
        resultList.removeChild(resultList.firstChild);
    }
	
}

function introScreen(){
	authButton.style.display = 'none';
	mainText.innerHTML="Sup! Welcome to my record store. Give me a song and I'll give you another. You ready?";
	yesButton.value= "yes";
}

function search1(){
	console.log("screen twoooooo");
	mainText.innerHTML = "Alright, type in your song!";
	searchBar.style.visibility = 'visible';
	yesButton.style.display = "none";
}

function selected1(track){
	console.log("screen 3");
	mainText.innerHTML = "Awesome! If you like that song, check this one out. It's fire!";
	searchBar.style.visibility = 'hidden';
	songLink.style.display = 'block';
	getAnother.style.display = 'block';
	searchNew.style.display = 'block';
	yesButton.style.display = "none";
	searchedSong.style.visibility = 'visible';

}

function getanother(){
	mainText.innerHTML = "You want another one? Of course! Here you go";
	songLink.style.display = 'block';
	getAnother.style.display = 'block';
	searchNew.style.display = 'block';
	searchedSong.style.visibility = 'visible';
}

function searchnew(){
	mainText.innerHTML = "Want something new? That's fair. Type away!";
	searchBar.style.visibility = 'visible';
	getAnother.style.display = 'none';
	searchNew.style.display = 'none';
	searchedSong.style.visibility = 'hidden';
	songLink.style.display = 'none';
}


function reAuth(){
	console.log('reAuth!');
	authButton.style.display = 'block';
	yesButton.display = "none";
	if (parsedHost === '0.0.0.0'){
		authButton.href = "https://accounts.spotify.com/en/authorize?client_id=2e53a5b23a78477e99eae192a230276c&response_type=token&redirect_uri=http://0.0.0.0:8000";
	}
	else if (parsedHost === "h3l3na-owo.github.io"){
		authButton.href = "https://accounts.spotify.com/en/authorize?client_id=163f41ea630d40358a5b6c7a98d5134b&response_type=token&redirect_uri=https:%2F%2Fh3l3na-owo.github.io/artist-gen/"
	}
}

function auth(){
	isAuth=true;
	if (isAuth === true){
		introScreen();
	}
}
auth();




/* TO DO: 

set up drop-down search
	-make individual li's clickable
		-creat li handles
		
		-clicking transitions yo next screen
set up audio player	

change non-local (production) reauth url

*/

