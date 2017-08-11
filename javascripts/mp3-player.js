$(function() {
	var audio;

	// Base Audio Function
	function initAudio(element) {
		var song = element.attr('song'),
				cover = element.attr('cover'),
				album = element.attr('album'),
				artist = element.attr('artist'),
				title = element.text();

		audio = new Audio('music/'+ song);

		$('#title').text(title);
		$('#album').text(album);
		$('#artist').text(artist);

		$('#cover-img').attr('style','background-image: url(images/covers/' + cover + ')');

		$('#playlist li').removeClass('active');
		element.addClass('active');
	}

	// Time - Show Duration
	function showDuration() {
		$(audio).bind('timeupdate',function() {
			var timeline = $('#duration'),
					s = parseInt(audio.currentTime % 60),
					m = parseInt(audio.currentTime / 60) % 60,
					value;

			if(s < 10) {
				timeline.html(m + ':0' + s);
			} else {
				timeline.html(m + ':' + s);
			}

			if(audio.currentTime > 0) {
				value = Math.floor((100 / audio.duration) * audio.currentTime);
			}
			$('#progress').css('width', value + '%');
		});
	}

	// Time - Show Time Left
	function showTimeLeft() {
		var duration = parseInt(audio.duration);

		$(audio).bind('timeupdate',function() {
			var	currentTime = parseInt(audio.currentTime),
					timeLeft = duration - currentTime,
					s, m, h;

			s = timeLeft % 60;
			m = Math.floor(timeLeft / 60) % 60;
			h = Math.floor(timeLeft / 360) % 60;

			s = s < 10 ? "0" + s : s;
			m = m < 10 ? "0" + m : m;
			h = h < 10 ? "0" + h : h;

			$('#timeleft').html(h + ':' + m + ':' + s);
		});
	}

	// Hide Pause Button
	$('#pause-btn').hide();

	// Set the Initial Audio
	initAudio($('#playlist li:first-child'));

	// Play Button
	$('#play-btn').click(function(event) {
		event.preventDefault();
		$('#play-btn').hide();
		$('#pause-btn').show();
		showDuration();
		showTimeLeft();
		audio.play();
	});

	// Pause Button
	$('#pause-btn').click(function(event) {
		event.preventDefault();
		audio.pause();
		$('#play-btn').show();
		$('#pause-btn').hide();
	});

	// Stop Button
	$('#stop-btn').click(function(event) {
		event.preventDefault();
		audio.pause();
		$('#play-btn').show();
		$('#pause-btn').hide();
		audio.currentTime = 0;
		$('#progress').css('width', '0%');
	});

	// Next Button
	$('#next-btn').click(function(event) {
		event.preventDefault();
		audio.pause();
		var next = $('#playlist li.active').next();
		if(next.length == 0) {
			next = $('#playlist li:first-child');
		}
		initAudio(next);
		audio.addEventListener('loadeddata', function() {
			showDuration();
			showTimeLeft();
		});
		audio.play();
	});

	// Prev Button
	$('#prev-btn').click(function(event) {
		event.preventDefault();
		audio.pause();
		var prev = $('#playlist li.active').prev();
		if(prev.length == 0) {
			prev = $('#playlist li:last-child');
		}
		initAudio(prev);
		audio.addEventListener('loadeddata', function() {
			showDuration();
			showTimeLeft();
		});
		audio.play();
	});

	// Click a Song in Playlist
	$('#playlist li').click(function(event) {
		audio.pause();
		initAudio($(this));
		$('#play-btn').hide();
		$('#pause-btn').show();
		audio.addEventListener('loadeddata', function() {
			showDuration();
			showTimeLeft();
		});
		audio.play();
	});

	// Volume Control
	$('#volume-slider').change(function() {
		audio.volume = parseFloat(this.value / 10);
	});

	// Seek Control
	$('#progress-bar').on('click', function(event) {
		var total = $(this).width(),
				current = event.offsetX,
				ratio = current / total;
		$('#progress').css('width', Math.floor(ratio * 100) + '%');
		audio.currentTime = audio.duration * ratio;
	});
});
