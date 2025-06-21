const tracks = [
    { src: 'static/audio/astroworld/01. Travis Scott - STARGAZING.mp3', title: 'STARGAZING', duration: '4:30' },
    { src: 'static/audio/astroworld/02. Travis Scott - CAROUSEL.mp3', title: 'CAROUSEL', duration: '3:00' },
    { src: 'static/audio/astroworld/03. Travis Scott - SICKO MODE.mp3', title: 'SICKO MODE', duration: '5:12' },
    { src: 'static/audio/astroworld/04. Travis Scott - R.I.P. SCREW.mp3', title: 'R.I.P. SCREW', duration: '3:05' },
    { src: 'static/audio/astroworld/05. Travis Scott - STOP TRYING TO BE GOD.mp3', title: 'STOP TRYING TO BE GOD', duration: '5:38' },
    { src: 'static/audio/astroworld/06. Travis Scott - NO BYSTANDERS.mp3', title: 'NO BYSTANDERS', duration: '3:38' },
    { src: 'static/audio/astroworld/07. Travis Scott - SKELETONS.mp3', title: 'SKELETONS', duration: '2:25' },
    { src: 'static/audio/astroworld/08. Travis Scott - WAKE UP.mp3', title: 'WAKE UP', duration: '3:51' },
    { src: 'static/audio/astroworld/09. Travis Scott - 5% TINT.mp3', title: '5% TINT', duration: '3:16' },
    { src: 'static/audio/astroworld/10. Travis Scott - NC-17.mp3', title: 'NC-17', duration: '2:36' },
    { src: 'static/audio/astroworld/11. Travis Scott - ASTROTHUNDER.mp3', title: 'ASTROTHUNDER', duration: '2:22' },
    { src: 'static/audio/astroworld/12. Travis Scott - YOSEMITE.mp3', title: 'YOSEMITE', duration: '2:30' },
    { src: 'static/audio/astroworld/13. Travis Scott - CAN\'T SAY.mp3', title: 'CAN\'T SAY', duration: '3:18' },
    { src: 'static/audio/astroworld/14. Travis Scott - WHO WHAT!.mp3', title: 'WHO? WHAT!', duration: '2:56' },
    { src: 'static/audio/astroworld/15. Travis Scott - BUTTERFLY EFFECT.mp3', title: 'BUTTERFLY EFFECT', duration: '3:10' },
    { src: 'static/audio/astroworld/16. Travis Scott - HOUSTONFORNICATION.mp3', title: 'HOUSTONFORNICATION', duration: '3:37' },
    { src: 'static/audio/astroworld/17. Travis Scott - COFFEE BEAN.mp3', title: 'COFFEE BEAN', duration: '3:29' }
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
    currentArtistName.textContent = 'Travis Scott';
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
