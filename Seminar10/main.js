import { AudioPlayer } from "./audio-player.js"

const tracks = [{
        title: 'Moonlight Sonata',
        url: 'Seminar10/media/Beethoven-Moonlight-Sonata.mp3'
    }, 
    {
        title: 'O Holy Night',
        url: 'Seminar10/media/O Holy Night (Acoustic Version) (Instrumental Version) - Bird Of Figment.mp3'
    },
    {
        title: 'Canon in D Major',
        url: 'Seminar10/media/Pachelbel-Canon-in-D-Major.mp3'
    },
    {
        title: 'Bolero',
        url: 'Seminar10/media/Ravel-Bolero.mp3'
    }
]

const audioPlayer = new AudioPlayer();
audioPlayer.loadTracks(tracks);