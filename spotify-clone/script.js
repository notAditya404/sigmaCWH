//media player fucntionality

const songHolder = document.querySelector(".songHolder")
let songPlaying = false
const seekbar = document.getElementById("slider")
const showTime = document.getElementById("currTime")
const totalTime = document.getElementById("totalTime")
const playPauseBtn = document.getElementById("playPausebtn")
const songList = document.querySelector(".song-list")
let libList = []
let nowPlaying = -1;

function loadSong(currsong) {
    showTime.textContent = "--:--"
    totalTime.textContent = "--:--"
    nowPlaying = libList.indexOf(currsong)
    songHolder.src = "songs/" + currsong
    songPlaying = true
    playPauseBtn.firstChild.src = "img/pause.svg"

    songHolder.onloadedmetadata = null;
    songHolder.onloadedmetadata = () => {
        infoSetter(currsong)
    }
}

function infoSetter(currsong) {
    let songName = document.getElementById("songName")
    songName.textContent = libList[nowPlaying].split("/")[1].toUpperCase()


    seekbar.value = "0"
    let min = parseInt(songHolder.duration / 60)
    let sec = parseInt(songHolder.duration % 60)
    totalTime.textContent = `${(min < 10) ? '0' + min : min}:${(sec < 10) ? '0' + sec : sec}`
    seekbar.max = songHolder.duration
    songHolder.play()
}

function playPause() {
    if (songHolder.src) {
        if (songPlaying) {
            songHolder.pause()
            playPauseBtn.firstChild.src = "img/play.svg"
            songPlaying = false
        }
        else {
            songHolder.play()
            playPauseBtn.firstChild.src = "img/pause.svg"
            songPlaying = true
        }
    }
}

function volumeChanger(e) {
    let userVolume = e.target.value
    
    if (userVolume == 0) {
        document.getElementById("volumeIcon").src = "img/mute.svg"
    }
    else {
        document.getElementById("volumeIcon").src = "img/volume.svg"
    }
    songHolder.volume = userVolume/100
}

function mute(e) {
    if(songHolder.volume)
    {
        document.getElementById("volumeIcon").src = "img/mute.svg"
        songHolder.volume = 0
    }
    else{
        document.getElementById("volumeIcon").src = "img/volume.svg"
        songHolder.volume = e.target.nextElementSibling.value/100
    }
}

function seekPlay(e) {
    let userSeek = e.target.value
    console.log("user", userSeek)
    songHolder.currentTime = userSeek
    console.log("curr", songHolder.currentTime)
}

function show(e) {
    console.log("changed", e)
}

function adjustSeek(e) {
    let currTime = e.target.currentTime
    //updating seekbar
    seekbar.value = currTime

    //updating timer
    let min = parseInt(currTime / 60)
    let sec = parseInt(currTime % 60)
    showTime.textContent = `${(min < 10) ? '0' + min : min}:${(sec < 10) ? '0' + sec : sec}`
}

function reset() {
    nowPlaying = -1
    songPlaying = false
    playPauseBtn.firstChild.src = "img/pause.svg"
    document.getElementById("songName").textContent = "No Song Playing"
}

function nextSong() {
    if (nowPlaying <= libList.length - 2) {
        loadSong(libList[nowPlaying + 1])
    }
    else{
        loadSong(libList[0])
    }
}

function prevSong() {
    if (nowPlaying >= 1) {
        loadSong(libList[nowPlaying - 1])
    }
    else{
        loadSong(libList[libList.length-1])
    }
}

// sidebar fucntionality
function showSidebar() {
    let sidebar = document.querySelector(".sidebar")
    sidebar.classList.toggle("hide-sidebar")
}

function closeSidebar() {
    let sidebar = document.querySelector(".sidebar")
    sidebar.classList.add("hide-sidebar")
}


// Folder listing fucntionality

const url = "songs/";
const playlistScroller = document.querySelector(".playlistScroller")

console.log("lets go")

async function getPlayLists() {

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.text();

        let parser = new DOMParser()
        parsePlaylistInfo(parser.parseFromString(result, "text/html"))

    } catch (error) {
        console.error(error.message);
    }
}


async function parsePlaylistInfo(doc) {
    let rows = doc.querySelectorAll("tr a")
    for (let i = 1; i < rows.length; i++) {
        const folderName = rows[i].textContent

        try {
            const response = await fetch(url + folderName + "/info.json");
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const info = await response.json();

            // injecting playlist
            playlistScroller.insertAdjacentHTML("beforeend", `
                <div class="folder" onclick="getSongList('${folderName}')">
                        <img src="songs/${folderName}/cover.jpg" alt="">
                        <div class="playCircle">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5"
                                    stroke-linejoin="round"></path>
                            </svg>
                        </div>
                        <h2>${info["title"]}</h2>
                        <p>${info["description"]}</p>
                    </div>
                `)
        } catch (error) {
            console.error(error.message);
        }
    }
}

getPlayLists()

// for song list

async function getSongList(playListName) {
    try {
        const response = await fetch(url + playListName);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.text();

        let parser = new DOMParser()
        parseSongList(parser.parseFromString(result, "text/html"), playListName)

    } catch (error) {
        console.error(error.message);
    }
}

async function parseSongList(doc, fname) {
    let fileList = doc.querySelectorAll("tr a")
    libList = []
    fileList.forEach((ele) => {
        let fileName = ele.textContent

        if (!(fileName == "cover.jpg" || fileName == "info.json" || fileName == "../")) {
            libList.push(fname+fileName)
        }
    })
    songList.replaceChildren()
    libList.forEach((song) => {
        songList.insertAdjacentHTML("beforeend", `
            <div class="songinfo" onclick="loadSong('${song}')">
                <div class="songname">
                    <img src="img/music.svg" alt="">
                    <span>${song.split("/")[1]}</span>
                </div>
                <div class="playNow">
                    <span>Play Now</span>
                    <img src="img/play.svg" alt="">
                </div>
            </div>
            `)
    })
    if(!(libList.length==0) && nowPlaying==-1){
    loadSong(libList[0])}
    if(document.querySelector(".sidebar").style.left != "0")
    {
        document.querySelector(".sidebar").classList.remove("hide-sidebar")
    }
}
