var audio;

// Base Audio Function
function initAudio(element) {
	var song = element.attr('song');
	var title = element.text();
	var cover = element.attr('cover');
	var album = element.attr('album');
	var artist = element.attr('artist');

	// Create a New Audio Object
	audio = new Audio('music/'+ song);

	// Insert the Audio Info
	$('#title').text(title);
	$('#album').text(album);
	$('#artist').text(artist);

	// Insert the Song Cover
	$('#cover-img').attr('style','background-image: url(images/covers/' + cover + ')');

	// Add .active to the Item in Playlist
	$('#playlist li').removeClass('active');
	element.addClass('active');
}

// Time/Duration
function showDuration() {
	$(audio).bind('timeupdate',function() {
		//Get Hours and Minutes
		var s = parseInt(audio.currentTime % 60);
		var m = parseInt(audio.currentTime / 60) % 60;
		if(s < 10) {
			s = '0' + s;
		}
		$('#duration').html(m + ':' + s);
		var value = 0;
		if(audio.currentTime > 0) {
			value = Math.floor((100 / audio.duration) * audio.currentTime);
		}
		$('#progress').css('width', value + '%');
	});
}

// Hide Pause Button
$('#pause-btn').hide();

// Set the Initial Audio
initAudio($('#playlist li:first-child'));

// Play Button
$('#play-btn').click(function() {
	audio.play();
	$('#play-btn').hide();
	$('#pause-btn').show();
	showDuration();
});

// Pause Button
$('#pause-btn').click(function() {
	audio.pause();
	$('#play-btn').show();
	$('#pause-btn').hide();
});

// Stop Button
$('#stop-btn').click(function() {
	audio.pause();
	$('#play-btn').show();
	$('#pause-btn').hide();
	audio.currentTime = 0;
});

// Next Button
$('#next-btn').click(function() {
	audio.pause();
	var next = $('#playlist li.active').next();
	if(next.length == 0) {
		next = $('#playlist li:first-child');
	}
	initAudio(next);
	audio.play();
	showDuration();
});

// Prev Button
$('#prev-btn').click(function() {
	audio.pause();
	var prev = $('#playlist li.active').prev();
	if(prev.length == 0) {
		prev = $('#playlist li:last-child');
	}
	initAudio(prev);
	audio.play();
	showDuration();
});

// Volume Control
$('#volume-slider').change(function() {
	audio.volume = parseFloat(this.value / 10);
});

// Click a Song in Playlist
$('#playlist li').click(function() {
	audio.pause();
	initAudio($(this));
	$('#play-btn').hide();
	$('#pause-btn').show();
	audio.play();
	showDuration();
});
