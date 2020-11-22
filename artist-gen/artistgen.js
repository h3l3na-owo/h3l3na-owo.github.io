//token url
//https://accounts.spotify.com/en/authorize?client_id=163f41ea630d40358a5b6c7a98d5134b&response_type=token&redirect_uri=http:%2F%2F0.0.0.0:8000


//authtoken = http://0.0.0.0:8000/#access_token=BQD510BzxI9VDikOmC68apGOJ81_Qzf48iDsrMnJPZAsSkLyfnl7sKtsGJggHZFBruQ2ChaQlRfCFum5KKJeh821WBjl_XTSoGXfmV8u7vCuV5IbQ2oavwlSfqQ3xTLVFx76brbKchdg82RJkTzYfbTF9_6diQ0&token_type=Bearer&expires_in=3600 

var client_id = '163f41ea630d40358a5b6c7a98d5134b'; 
var client_secret = '037a66f588924117964601f182ba29dc';

var artistNum;
// can't be above 9999

var yearRange = 'year:0000-9999';
var limit;
var offset;

var artist;
var artistName;


var spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken('BQD510BzxI9VDikOmC68apGOJ81_Qzf48iDsrMnJPZAsSkLyfnl7sKtsGJggHZFBruQ2ChaQlRfCFum5KKJeh821WBjl_XTSoGXfmV8u7vCuV5IbQ2oavwlSfqQ3xTLVFx76brbKchdg82RJkTzYfbTF9_6diQ0');


function randomButton(){
	// get artist count
	spotifyApi.searchArtists(yearRange).then(
	  function (data) {
	    console.log('all artists:', data);
	    artistNum = data.artists.total;
	    if (artistNum > 1999){
	    	artistNum = 2000;
	    }
	    console.log('artist number: ' + artistNum);

	    // get random artist
	    limit = 1;
		offset = Math.floor(Math.random()*2000);
		console.log('limit: ' + limit);
		console.log('offset: ' + offset);

		spotifyApi.searchArtists(yearRange,{limit:limit , offset:offset}).then(
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
		  }
		); 

	  },
	  function (err) {
	    console.error(err);
	  }
	);
}

function textChange(artist){
	artistTitle.textContent = artist.name;
	genre.textContent = artist.genres.join(', ');
	console.log('artist name:' + artist.name);
	artistImage.src = artist.images[0].url;
}

//artistName = artist.artists.items[0].name;


var artistTitle = document.querySelector('#artist');
var genre = document.querySelector('#genre');
var selectButton = document.querySelector("#randomButton");
var artistImage = document.querySelector('#artistImage');



selectButton.addEventListener("click", function(){
	randomButton();
});
