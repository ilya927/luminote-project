const tracks = [
  { src: 'static/audio/graduation/01 - Good Morning.mp3', title: 'GOOD MORNING', duration: '3:15', album: 'graduation' },
  { src: 'static/audio/graduation/02 - Champion.mp3', title: 'CHAMPION', duration: '2:47', album: 'graduation' },
  { src: 'static/audio/graduation/03 - Stronger.mp3', title: 'STRONGER', duration: '5:12', album: 'graduation' },
  { src: 'static/audio/graduation/04 - I Wonder.mp3', title: 'I WONDER', duration: '4:03', album: 'graduation' },
  { src: 'static/audio/graduation/05 - Good Life feat. T-Pain.mp3', title: 'GOOD LIFE', duration: '3:27', album: 'graduation' },
  { src: 'static/audio/graduation/06 - Can\'t Tell Me Nothing.mp3', title: 'CAN\'T TELL ME NOTHING', duration: '4:32', album: 'graduation' },
  { src: 'static/audio/graduation/07 - Barry Bonds feat. Lil Wayne.mp3', title: 'BARRY BONDS', duration: '3:24', album: 'graduation' },
  { src: 'static/audio/graduation/08 - Drunk & Hot Girls feat. Mos Def.mp3', title: 'DRUNK AND HOT GIRLS', duration: '5:13', album: 'graduation' },
  { src: 'static/audio/graduation/09 - Flashing Lights feat. Dwele.mp3', title: 'FLASHING LIGHTS', duration: '3:58', album: 'graduation' },
  { src: 'static/audio/graduation/10 - Everything I Am feat. DJ Premier.mp3', title: 'EVERYTHING I AM', duration: '3:47', album: 'graduation' },
  { src: 'static/audio/graduation/11 - The Glory.mp3', title: 'THE GLORY', duration: '3:32', album: 'graduation' },
  { src: 'static/audio/graduation/12 - Homecoming.mp3', title: 'HOMECOMING', duration: '3:23', album: 'graduation' },
  { src: 'static/audio/graduation/13 - Big Brother.mp3', title: 'BIG BROTHER', duration: '4:47', album: 'graduation' },
  { src: 'static/audio/graduation/14 - Good Night feat. Mos Def & Al Be.mp3', title: 'GOOD NIGHT', duration: '3:06', album: 'graduation' }
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
    currentArtistName.textContent = 'Kanye West';
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
    updateSongInfo(currentTrackIndex);
  });
