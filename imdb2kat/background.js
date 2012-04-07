var parseTabUrl = function ( tab ) {
	var url = tab.url,
		regExp = /^https?:\/\/www\.imdb\..*\/title\/(tt\d*)\/?/i,
		match = url.match(regExp);
	return match;
};

var getImdbId = function ( tab ) {
	var match = parseTabUrl(tab);
	return match[1];
};

var isImdbMoviePage = function ( tab ) {
	return !!parseTabUrl(tab);
};

chrome.tabs.onUpdated.addListener( function( tabId, changeInfo, tab ) {
	if ( isImdbMoviePage(tab) ) {
		chrome.pageAction.show(tab.id);
	} else {
		chrome.pageAction.hide(tab.id);
	}
} );

chrome.pageAction.onClicked.addListener( function ( tab ) {
	var imdbId = getImdbId(tab);
	$.getJSON('http://www.imdbapi.com', { i : imdbId })
	.done(function ( movie ) {
		chrome.tabs.create({ url: 'http://kat.ph/usearch/' + movie.Title + '/' });
	});
} );