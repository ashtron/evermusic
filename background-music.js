const { execSync } = require('child_process')

const spotifyPlay = "dbus-send --print-reply --dest=org.mpris.MediaPlayer2.spotify /org/mpris/MediaPlayer2 org.mpris.MediaPlayer2.Player.Play"
const spotifyPause = "dbus-send --print-reply --dest=org.mpris.MediaPlayer2.spotify /org/mpris/MediaPlayer2 org.mpris.MediaPlayer2.Player.Pause"

let run = function() {
    var soundDeviceData = execSync("pacmd list-sink-inputs").toString().split("\t")
    
    for (let i = 0; i < soundDeviceData.length; i++) {
        if (soundDeviceData[i].includes("client") && soundDeviceData[i].includes("Firefox")) {
            console.log(soundDeviceData[i - 12])
    
            if (soundDeviceData[i - 12].includes("RUNNING"))
                execSync(spotifyPause)
        }
    }
}

var intervalID = setInterval(run, 100)
