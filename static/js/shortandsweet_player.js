const tracks = [
  { src: 'static/audio/shortandsweet/1 Sabrina Carpenter - Taste.mp3', title: 'TASTE', duration: '2:37', album: 'shortandsweet' },
  { src: 'static/audio/shortandsweet/2 Sabrina Carpenter - Please Please Please.mp3', title: 'PLEASE PLEASE PLEASE', duration: '3:06', album: 'shortandsweet' },
  { src: 'static/audio/shortandsweet/3 Sabrina Carpenter - Good Graces.mp3', title: 'GOOD GRACES', duration: '3:05', album: 'shortandsweet' },
  { src: 'static/audio/shortandsweet/4 Sabrina Carpenter - Sharpest Tool.mp3', title: 'SHARPEST TOOL', duration: '3:38', album: 'shortandsweet' },
  { src: 'static/audio/shortandsweet/5 Sabrina Carpenter - Coincidence.mp3', title: 'COINCIDENCE', duration: '2:44', album: 'shortandsweet' },
  { src: 'static/audio/shortandsweet/6 Sabrina Carpenter - Bed Chem.mp3', title: 'BED CHEM', duration: '2:51', album: 'shortandsweet' },
  { src: 'static/audio/shortandsweet/7 Sabrina Carpenter - Espresso.mp3', title: 'ESPRESSO', duration: '2:55', album: 'shortandsweet' },
  { src: 'static/audio/shortandsweet/8 Sabrina Carpenter - Dumb & Poetic.mp3', title: 'DUMB & POETIC', duration: '2:13', album: 'shortandsweet' },
  { src: 'static/audio/shortandsweet/9 Sabrina Carpenter - Slim Pickins.mp3', title: 'SLIM PICKINS', duration: '2:32', album: 'shortandsweet' },
  { src: 'static/audio/shortandsweet/10 Sabrina Carpenter - Juno.mp3', title: 'JUNO', duration: '3:43', album: 'shortandsweet' },
  { src: 'static/audio/shortandsweet/11 Sabrina Carpenter - Lie To Girls.mp3', title: 'LIE TO GIRLS', duration: '3:22', album: 'shortandsweet' },
  { src: 'static/audio/shortandsweet/12 Sabrina Carpenter - Don’t Smile.mp3', title: 'DON\'T SMILE', duration: '3:26', album: 'shortandsweet' }
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
    currentArtistName.textContent = 'Sabrina Carpenter';
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

  // Initial song setup
  window.addEventListener('load', () => {
    updateSongInfo(currentTrackIndex);
  });
