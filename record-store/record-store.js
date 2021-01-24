//https://accounts.spotify.com/en/authorize?client_id=163f41ea630d40358a5b6c7a98d5134b&response_type=token&redirect_uri=https:%2F%2Fh3l3na-owo.github.io%2Fartist-gen%2F

const parsedHash = new URLSearchParams(
  window.location.hash.substr(1) // skip the first char (#)
);

console.log("yo:"+parsedHash.get("access_token"));
var authToken = parsedHash.get("access_token");

var client_id="2e53a5b23a78477e99eae192a230276c";
var client_secret = '85471551deb74a4ba8906bd3667361a7';

var spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(authToken);

var searchNew = document.querySelector("#search-new");

var getAnother = document.querySelector("#get-another");

searchNew.addEventListener("click", function(){
	searchNew.textContent="it worked!";
	console.log("search new test"+searchNew.textContent);
});

getAnother.addEventListener("click", function(){
	getAnother.textContent="it worked2 !";
	console.log("get another test:"+getAnother.textContent);
});

/* TO DO: 
make page recognize reauthentication

set up drop-down search
set up audio player	

*/

