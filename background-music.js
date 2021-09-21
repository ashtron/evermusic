const { execSync, exec } = require('child_process')

const spotifyPlay = "dbus-send --print-reply --dest=org.mpris.MediaPlayer2.spotify /org/mpris/MediaPlayer2 org.mpris.MediaPlayer2.Player.Play"
const spotifyPause = "dbus-send --print-reply --dest=org.mpris.MediaPlayer2.spotify /org/mpris/MediaPlayer2 org.mpris.MediaPlayer2.Player.Pause"

let run = function() {
    let soundDeviceData = execSync("pacmd list-sink-inputs").toString().split("\t")
    let videoPlaying = false
    
    for (let i = 0; i < soundDeviceData.length; i++) {
        if (soundDeviceData[i].includes("client") && soundDeviceData[i].includes("Firefox")) {    
            if (soundDeviceData[i - 12].includes("RUNNING"))
                videoPlaying = true
        }
    }

    videoPlaying ? execSync(spotifyPause) : execSync(spotifyPlay)
}

var intervalID = setInterval(run, 100)
