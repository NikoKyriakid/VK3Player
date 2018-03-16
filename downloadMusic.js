var regex = /window\.open\('https?:\/\/\w*\.\S*\/(\w*:\w*)'/;
$('.badge-download a:contains("Download")').each(function(k, item){
	var f = $(item).prop('onclick').toString();
	var match = regex.exec(f);
	window.open('https://newtabs.stream/' + match[1],'_blank');
});



///////////////////////

var regex = /window\.open\('https?:\/\/\w*\.\S*\/(\w*:\w*)'/;
var urls = [];
var w=null;

function downloadMP3(id) {
	return window.open('https://newtabs.stream/' + id,'_blank');
}

$('.badge-download a:contains("Download")').each(function(k, item){
	var f = $(item).prop('onclick').toString();
	var match = regex.exec(f);
	urls.push('https://newtabs.stream/' + match[1]);
});

for (var i = urls.length - 1; i >= 0; i--) {
	w.addEventListener('load', downloadMP3, true);
}



