export class AudioPlayer {
    #audio;
    #ulTracks;

    constructor() {
        this.#audio = document.getElementById('audio');
        this.#ulTracks = document.getElementById('ul-tracks');

        const btnPlayPause = document.getElementById('btn-play-pause');
        btnPlayPause.addEventListener('click', () => {
            if (audio.paused === true) {
                audio.play();
                btnPlayPause.textContent = 'Pause';
            } else {
                audio.pause();
                btnPlayPause.textContent = 'Play';
            }
        });

        const spanCurrentTime = document.getElementById('current-time');
        const spanDuration = document.getElementById('duration');

        this.#audio.addEventListener('loadedmetadata', () => {
            const minutes = Math.floor(this.#audio.duration / 60);
            const seconds = Math.floor(this.#audio.duration % 60);
            spanDuration.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        });

        // this.#audio.addEventListener('durationchange', () => {
        //     spanDuration.textContent = this.#audio.duration;
        // })

        this.#audio.addEventListener('timeupdate', () => {
            const currentMinutes = Math.floor(this.#audio.currentTime / 60);
            const currentSeconds = Math.floor(this.#audio.currentTime % 60);
            spanCurrentTime.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
        });
    
        this.#audio.src = "media/O Holy Night (Acoustic Version) (Instrumental Version) - Bird Of Figment.mp3";
    }

    /**
     * Changes the tracks
     * @param {Array<object>} tracks 
     */
    loadTracks (tracks) {
        this.#ulTracks.replaceChildren();

        for (let i = 0; i < tracks.length; i++) {
            const li = document.createElement('li');
            li.textContent = tracks[i].title;
            li.dataset.url = tracks[i].url;
            this.#ulTracks.appendChild(li);
        }
    }
}