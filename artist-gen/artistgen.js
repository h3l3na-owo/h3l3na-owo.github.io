//token url
//https://accounts.spotify.com/en/authorize?client_id=163f41ea630d40358a5b6c7a98d5134b&response_type=token&redirect_uri=http:%2F%2F0.0.0.0:8000


//authtoken = BQC2W1D8K9vz54gLBiZdmu33-5KVL6G5oPPQ6cEYPXiVFU6B9f0SoEQNlxU_jj37m4cHHbiWpRLeHBPqqA2J6JCPB7kMVvYL3iehvHpzWv4QornW4ZxgdP9akqIFJAAl2vGVRX6VqlP--ke-dpt4k0lz-7kF8fA

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
spotifyApi.setAccessToken('BQC2W1D8K9vz54gLBiZdmu33-5KVL6G5oPPQ6cEYPXiVFU6B9f0SoEQNlxU_jj37m4cHHbiWpRLeHBPqqA2J6JCPB7kMVvYL3iehvHpzWv4QornW4ZxgdP9akqIFJAAl2vGVRX6VqlP--ke-dpt4k0lz-7kF8fA');


function randomButton(){
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
	artistTitle.href = "https://open.spotify.com/artist/"+artist.id;
	genre.textContent = artist.genres.join(', ');
	console.log('artist name:' + artist.name);
	artistImage.src = artist.images[0].url;
}


//artistName = artist.artists.items[0].name;


var artistTitle = document.querySelector('#artist');
var genre = document.querySelector('#genre');
var selectButton = document.querySelector("#randomButton");
var searchButton = document.querySelector('#searchButton');
var searchBar = document.querySelector('#searchBar')
var artistImage = document.querySelector('#artistImage');



selectButton.addEventListener("click", function(){
	searchedGenre = 'genre:"'+searchBar.value+'"';
	randomButton();
});
