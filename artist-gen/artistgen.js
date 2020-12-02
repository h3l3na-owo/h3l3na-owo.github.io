//token url
//https://accounts.spotify.com/en/authorize?client_id=163f41ea630d40358a5b6c7a98d5134b&response_type=token&redirect_uri=http:%2F%2F0.0.0.0:8000
const parsedHash = new URLSearchParams(
  window.location.hash.substr(1) // skip the first char (#)
);

console.log("access token:"+parsedHash.get("access_token")); // any_value

var authToken = parsedHash.get("access_token");

// TO DO click genre ---> search by that genre

var client_id = '163f41ea630d40358a5b6c7a98d5134b'; 
var client_secret = '037a66f588924117964601f182ba29dc';

var artistNum;
// can't be above 9999
var searchedGenre;
var yearRange = 'year:0000-9999 ';
var limit;
var offset;

var artist;
var artistName;


var spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(authToken);


function randomButton(){
	searchedGenre = 'genre:"'+searchBar.value+'"';

	// get artist count
	console.log('genre: '+searchedGenre);
	spotifyApi.searchArtists(yearRange+searchedGenre).then(
	  function (data) {
	  	console.log('genre: '+searchedGenre);
	    console.log('all artists:', data);
	    artistNum = data.artists.total;
	    if (artistNum > 1999){
	    	artistNum = 2000;
	    }
	    console.log('artist number: ' + artistNum);

	    // get random artist
	    limit = 1;
		offset = Math.floor(Math.random()*artistNum);
		console.log('limit: ' + limit);
		console.log('offset: ' + offset);

		spotifyApi.searchArtists(yearRange+searchedGenre,{limit:limit , offset:offset}).then(
		  function (data) {
		  	//artist = data;
		  	//artistName = artist.artists.items[0].name;
		  	//artistTitle.textContent = artistName;
		  	textChange(data.artists.items[0]);
		  	console.log('artist name:' + artistName);
		    console.log('random artist:', data);
		    //console.log(artistNum);
		  },
		  function (err) {
		    console.error(err);
		    //console.log('reAuth!');
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

function textChange(artist){
	artistTitle.textContent = artist.name;
	artistTitle.href = "https://open.spotify.com/artist/"+artist.id;
	genre.textContent = artist.genres.join(', ');
	console.log('artist name:' + artist.name);
	artistImage.src = artist.images[0].url;
}


function reAuth(){
	console.log('reAuth!');
	document.querySelector('#authButton').style.visibility = 'visible';
	document.querySelector("#randomButton").style.visibility = 'hidden';
}


var artistTitle = document.querySelector('#artist');
var genre = document.querySelector('#genre');
var selectButton = document.querySelector("#randomButton");
var searchBar = document.querySelector('#searchBar');
var artistImage = document.querySelector('#artistImage');



selectButton.addEventListener("click", function(){
	randomButton();
});

.
randomButton();