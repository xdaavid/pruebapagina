
let audioPlayer = document.getElementById('audioPlayer');
let backgroundAudioPlayer = document.getElementById('backgroundAudioPlayer');
let mediaRecorder, audioChunks = [];

function playAudio(filename) {
    audioPlayer.src = filename;
    audioPlayer.play();
}

function playBackgroundAudio(filename) {
    backgroundAudioPlayer.src = filename;
    backgroundAudioPlayer.volume = 0.5;
    backgroundAudioPlayer.play();
}

function stopBackgroundAudio() {
    backgroundAudioPlayer.pause();
    backgroundAudioPlayer.currentTime = 0;
}

function setVolume(val) {
    audioPlayer.volume = val;
    backgroundAudioPlayer.volume = val * 0.5;
}

function changePlaybackRate(rate) {
    audioPlayer.playbackRate = rate;
}

function toggleLoop() {
    audioPlayer.loop = !audioPlayer.loop;
    document.getElementById('loopToggle').textContent = audioPlayer.loop ? "🔁 Repetir: Activado" : "🔁 Repetir: Desactivado";
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

function hideSections() {
    document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
}

async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();

    mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
    mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioURL = URL.createObjectURL(audioBlob);
        const li = document.createElement('li');
        const audio = document.createElement('audio');
        audio.controls = true;
        audio.src = audioURL;
        li.appendChild(audio);
        document.getElementById('recordingsList').appendChild(li);
        audioChunks = [];
    };
}

function stopRecording() {
    if (mediaRecorder) {
        mediaRecorder.stop();
    }
}
