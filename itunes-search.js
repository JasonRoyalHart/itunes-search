//Itunes Search

function songSearch() {
  song = document.getElementById("song").value;
  document.write("Searching for " + song + "<br><br>");
  var searchURL = makeURL(song);
  document.write("Search URL: " + searchURL)
  getSongs(searchURL);
}

function makeURL(song) {
  URL = "https://itunes.apple.com/search?term=";
  songs = song.split(" ");
  for (i in songs) {
    URL += songs[i];
    if (i != songs.length-1) {
      URL += "+";
    }
  }
  URL += "&media=music&limit=25"
  return URL;
}

function getSongs(URL) {
//  $.get(URL, function(response, status) { document.write(status) });
//  jQuery('head').append(URL);
  $.ajax({
    url: URL,
    dataType: "JSONP",
    method: "GET",
    crossDomain: true,
    success: function(data) {document.write("<br><br>"+data.results[0]["trackName"]);}
  });
}



function handleSearchResults(data) {
  document.write(data);
}

function performSearch() {
  var params = { term: jQuery('#search-keyword').val(), country: 'US', media: 'music', entity: 'musicTrack', attribute: 'artistTerm,albumTerm,songTerm,musicTrackTerm', limit: 20, callback: 'handleTunesSearchResults' };
  var params = urlEncode(params);
  var url = 'http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/wa/wsSearch?' + params;
  var html = '<script src="' + url + '"><\/script>';
  jQuery('head').append(html);
 }
