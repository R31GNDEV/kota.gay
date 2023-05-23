console.log(
  "Kota's LastFM \n\ncredit to me\n\nAlso, I'm really gay."
);

const parseResponse = (res) => {
  const track = res.recenttracks.track[0];
  const artist = track.artist["#text"];
  const image = track.image[3]["#text"];
  const name = track.name;

  const np = track["@attr"] ? track["@attr"]["nowplaying"] === "true" : false;

  return {
    artist,
    name,
    image,
    np,
  };
};

const setResponse = (res) => {
  if (res.np) {
    console.log(`[last.fm] Received song data: ${res.name} - ${res.artist}`);
    document.querySelector(
      "#spotify"
    ).innerHTML = `<div class="rainbow px-6 md:px-4 py-4" style="display:block">
        <div class="max-w-6xl mx-auto container">
            <a style="text-shadow: 0px 4px 4px #000;background-image: url(img/sparkle.gif);background-size: 40px;">
              <b>Kota</b> is currently listening to <b>${res.name}</b> by <b>${res.artist}</b> on <u>Spotify</u>
            </a>
            <a href="${res.image}"><img src="${res.image}"></a>
          </div>
        </div>
      </div>`;
  } else {
    console.log(`[last.fm] No song data received, waiting...`);
    document.querySelector(
      "#spotifyoff"
    ).innerHTML = `<div class="rainbow px-6 md:px-4 py-4">
        <div class="flex">
          <a>
            <b>Kota</b> is currently not listening to music! When she is, it will be displayed below.
          </a>
    </div>`;
    document.querySelector("#spotify").innerHTML = ``;
  }
};

const getSong = () => {
  fetch(
    "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=r31gnonyou&api_key=03437af1b2faa2862ff63e4e43452997&format=json&limit=1"
  )
    .then((res) => res.json())
    .then(parseResponse)
    .then(setResponse);
};

setInterval(getSong, 15 * 1000);
getSong();

// When the user scrolls the page, execute myFunction
window.onscroll = function () { myFunction() };


// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

request();