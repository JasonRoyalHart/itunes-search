//Itunes Search

function songSearch() {
  song = document.getElementById("song").value;
  var searchURL = makeURL(song);
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
    success: function(data) {displayData(data)}
  });
}

function displayData(data) {
      var results = data.results;
      var html = '<div class="container">';
		  html += '<div class="row">';
      for (var i = 0; i < results.length; i++) {
          var item = results[i];
          html += '<div class="col-sm-4">';
          html += '<div class="card">';
          html += '<img class="card-img-top" src="{0}" alt="Card image cap">'.replace("{0}", item.artworkUrl100);
          html += '<div class="card-block">';
          html += '<h4 class="card-title">{0}</h4>'.replace("{0}", item.trackCensoredName);
          html += '<p class="card-text">';
          html += 'Artist: {0}'.replace("{0}", item.artistName);
          html += '</p>';
          html += '<a href="{0}" class="btn btn-primary">Preview</a>'.replace("{0}", item.previewUrl);
          html += '</div>';
          html += '</div>';
          html += '</div>';

      }
      jQuery('#itunes-results').html(html);
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
