
const parsedHash = new URLSearchParams(
  window.location.hash.substr(1) // skip the first char (#)
);

console.log("access token:"+parsedHash.get("access_token"));
var authToken = parsedHash.get("access_token");

var client_id="2e53a5b23a78477e99eae192a230276c";
var client_secret = '85471551deb74a4ba8906bd3667361a7';

var spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(authToken);