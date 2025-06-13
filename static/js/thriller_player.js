const tracks = [
  { src: "static/audio/thriller/01. Wanna Be Startin' Somethin'.mp3", title: "WANNA BE STARTIN' SOMETHIN'", duration: "6:03" },
  { src: "static/audio/thriller/02. Baby Be Mine.mp3", title: "BABY BE MINE", duration: "4:20" },
  { src: "static/audio/thriller/03. The Girl Is Mine.mp3", title: "THE GIRL IS MINE (WITH PAUL MCCARTNEY)", duration: "3:42" },
  { src: "static/audio/thriller/04. Thriller.mp3", title: "THRILLER", duration: "5:57" },
  { src: "static/audio/thriller/05. Beat It.mp3", title: "BEAT IT", duration: "4:18" },
  { src: "static/audio/thriller/06. Billie Jean.mp3", title: "BILLIE JEAN", duration: "4:54" },
  { src: "static/audio/thriller/07. Human Nature.mp3", title: "HUMAN NATURE", duration: "4:06" },
  { src: "static/audio/thriller/08. P.Y.T. (Pretty Young Thing).mp3", title: "P.Y.T. (PRETTY YOUNG THING)", duration: "3:59" },
  { src: "static/audio/thriller/09. The Lady in My Life.mp3", title: "THE LADY IN MY LIFE", duration: "5:00" }
];




  let currentTrackIndex = 0;
  let audio = new Audio(tracks[currentTrackIndex].src);

  const playPauseButton = document.getElementById('play-pause-button');
  const progressBar = document.getElementById('progress-bar');
  const currentSongTitle = document.getElementById('current-song-title');
  const currentArtistName = document.getElementById('current-artist-name');
  const trackList = document.querySelectorAll('.track-item');
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');
  const progressContainer = document.getElementById('progress-container');

  // Play/Pause functionality
  playPauseButton.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      playPauseButton.innerHTML = '<i class="bi bi-pause-fill"></i>';
    } else {
      audio.pause();
      playPauseButton.innerHTML = '<i class="bi bi-play-fill"></i>';
    }
  });

  // Update the current song info
  function updateSongInfo(index) {
    currentSongTitle.textContent = tracks[index].title;
    currentArtistName.textContent = 'Michael Jackson'; // Assuming the artist is fixed
    audio.src = tracks[index].src;
    audio.play();
    playPauseButton.innerHTML = '<i class="bi bi-pause-fill"></i>';
    updateProgressBar();
  }

  // Track click functionality
  trackList.forEach((track, index) => {
    track.addEventListener('click', () => {
      currentTrackIndex = index;
      updateSongInfo(currentTrackIndex);
    });
  });

  // Progress bar update
  audio.addEventListener('timeupdate', () => {
    updateProgressBar();
  });

  // Function to update progress bar width
  function updateProgressBar() {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progress + '%';
  }

  // Next and previous buttons
  nextButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    updateSongInfo(currentTrackIndex);
  });

  prevButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    updateSongInfo(currentTrackIndex);
  });

  // Auto skip to next song when current song ends
  audio.addEventListener('ended', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    updateSongInfo(currentTrackIndex);
  });

  // Click on progress bar to seek to specific time
  progressContainer.addEventListener('click', (event) => {
    const clickPosition = event.offsetX;
    const progressWidth = progressContainer.offsetWidth;
    const newTime = (clickPosition / progressWidth) * audio.duration;
    audio.currentTime = newTime;
    updateProgressBar();
  });

  // Initial song setup (this ensures song info appears immediately after page load)
  window.addEventListener('load', () => {
    updateSongInfo(currentTrackIndex); // Ensure first song is loaded right away
  });
