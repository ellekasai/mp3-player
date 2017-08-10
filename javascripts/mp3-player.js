var audio;

// Base Audio Function
function initAudio(element) {
	var song = element.attr('song');
	var title = element.text();
	var cover = element.attr('cover');
	var artist = element.attr('artist');

	// Create a New Audio Object
	audio = new Audio('music/'+ song);

	// Insert the Audio Info
	$('.title').text(title);
	$('.artist').text(artist);

	// Insert the Song Cover
	$('img.cover').attr('src','images/covers/'+cover);

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
$('#pause').hide();

// Set the Initial Audio
initAudio($('#playlist li:first-child'));

// Play Button
$('#play').click(function() {
	audio.play();
	$('#play').hide();
	$('#pause').show();
	showDuration();
});

// Pause Button
$('#pause').click(function() {
	audio.pause();
	$('#play').show();
	$('#pause').hide();
});

// Stop Button
$('#stop').click(function() {
	audio.pause();
	$('#play').show();
	$('#pause').hide();
	audio.currentTime = 0;
});

// Next Button
$('#next').click(function() {
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
$('#prev').click(function() {
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
$('#volume').change(function() {
	audio.volume = parseFloat(this.value / 10);
});

// Click a Song in Playlist
$('#playlist li').click(function() {
	audio.pause();
	initAudio($(this));
	$('#play').hide();
	$('#pause').show();
	audio.play();
	showDuration();
});
