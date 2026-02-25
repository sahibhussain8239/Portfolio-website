let currentSong = new Audio();
let songs;
let currfolder;

function secondsToMinsec(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "Invalid input";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs(folder) {
    currfolder = folder;
    // We can now fetch from our API or if we already have the data from displayAlbums
    // But for compatibility with existing structure, we can fetch the specific folder if needed
    // Actually, it's better to use the API for everything
    let a = await fetch(`/api/songs`);
    let response = await a.json();
    let album = response.albums.find(a => `songs/${a.folder}` === folder || a.folder === folder);

    if (!album) return [];

    songs = album.songs;

    //Show all the songs on playlist
    let songUl = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    songUl.innerHTML = ""
    for (const song of songs) {
        songUl.innerHTML = songUl.innerHTML + `<li> <div class="info">${song}</div> <div><img style="filter: invert();" src="assets/img/circlePlay.svg" alt=""></div></li>`
    }

    // Attach an event listner to each song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            playMusic(e.querySelector(".info").innerHTML)
        })

    })
    return songs
}

const playMusic = (track, pause = false) => {
    currentSong.src = `${currfolder}/` + track
    if (!pause) {
        currentSong.play()
        play.src = "assets/img/pause.svg"
    }
    document.querySelector(".songinfo").innerHTML = track
    document.querySelector(".songtime").innerHTML = "00/00"
}

async function displayAlbums() {
    let a = await fetch(`/api/songs`)
    let response = await a.json()
    let cardContainer = document.querySelector(".cardContainer")
    cardContainer.innerHTML = "" // Clear existing

    response.albums.forEach(album => {
        cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder="${album.folder}" class="card">
                <div class="play"><img src="assets/img/play.svg" alt=""></div>
                <img src="songs/${album.folder}/cover.jpg" alt="">
                <div class="card-content">
                    <h3>${album.title}</h3>
                    <p>${album.description}</p>
                </div>
            </div>`
    })

    // Load the playlist whenever card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        e.addEventListener("click", async item => {
            songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
            playMusic(songs[0])
        })
    })
}

async function main() {
    //Get the list of all songs
    await getSongs("songs/play1")

    // Display all the albums on the page
    await displayAlbums()

    // Attach an evant listner to play
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "assets/img/pause.svg"
        }
        else {
            currentSong.pause()
            play.src = "assets/img/playbtn.svg"
        }
    })

    // Listen for timeupdate
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinsec(currentSong.currentTime)} / ${secondsToMinsec(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

    // ADD an event listner in seek bar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;
    })

    // Add an evant listner to previous and next
    previous.addEventListener("click", () => {
        currentSong.pause()
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1])
        }
    })

    next.addEventListener("click", () => {
        currentSong.pause()
        let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1])
        }
    })

    // To show and hide volume range on click on volume icon
    document.querySelector(".volbtn").addEventListener("click", () => {
        document.querySelector(".range").classList.toggle("showrange")
    })

    // Add an event to volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        currentSong.volume = parseInt(e.target.value) / 100
    })
}

main()