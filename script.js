const url = 'https://lrw.ca/mux/irkvjb';
function addPlayer(data, id) {
	flag = false;
	for (element in data) {
		data[element].data.playback_ids.forEach((element) => {
			mux = document.createElement('mux-player');
			if (id == 'live') {
				mux.setAttribute('stream-type', 'live');
				document.getElementById('chat').classList.remove('hidden');
				document.getElementById('offline').classList.add('hidden');
				document.getElementById('footerTitle').classList.add('hidden');
				document.getElementById('footerTitleLive').classList.remove('hidden');
				document.getElementById('footerStream').classList.add('purple');
			} else {
				mux.setAttribute('stream-type', 'on-demand');
			}
			mux.setAttribute('playback-id', element.id);
			document.getElementById(id).append(mux);
			document.getElementById(id).classList.remove('hidden');
			flag = true;
		});
	}
	return flag;
}
fetch(url)
	.then((response) => response.json())
	.then((data) => {
		if (data['video.live_stream.active']) {
			if (!addPlayer(data['video.live_stream.active'], 'live')) {
				/* if (data['video.asset.ready']) {
					addPlayer(data['video.asset.ready'], 'past');
				} */
				retry = setInterval(function () {
					fetch(url)
						.then((response) => response.json())
						.then((data) => {
							if (addPlayer(data['video.live_stream.active'], 'live')) {
								clearTimeout(retry);
							}
						});
				}, 10000);
			}
		}
	});

// dripdrop.tv text toggle

var dripdropPhrases = [
	'a place to stream',
	'inconsistent and juicy',
	'tinydrain.tv',
	'stream catcher',
	'SOOSE southern ontario occasional streaming effort',
	'weshallsee.tv',
	'underthepillow.tv',
	'never in your wildest streams',
	'growing puddle',
];

function newPhrase() {
	var randomNumber = Math.floor(Math.random() * dripdropPhrases.length);

	document.getElementById('phrases').innerHTML = dripdropPhrases[randomNumber];
}

// footer
const pastVideo = ['date', 'img', 'title', 'artist', 'duration'];

// dropdown button
const dropdown = document.getElementById('dropdown');
function displayContent() {
	dropdown.classList.toggle('hide');
}
