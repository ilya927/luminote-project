const tracks = [
  { src: 'static/audio/evolve/1 Imagine Dragons - Next To Me.mp3', title: 'NEXT TO ME', duration: '3:50' },
  { src: 'static/audio/evolve/2 Imagine Dragons - I Don\'t Know Why.mp3', title: 'I DON\'T KNOW WHY', duration: '3:10' },
  { src: 'static/audio/evolve/3 Imagine Dragons - Whatever It Takes.mp3', title: 'WHATEVER IT TAKES', duration: '3:21' },
  { src: 'static/audio/evolve/4 Imagine Dragons - Believer.mp3', title: 'BELIEVER', duration: '3:24' },
  { src: 'static/audio/evolve/5 Imagine Dragons - Walking The Wire.mp3', title: 'WALKING THE WIRE', duration: '3:52' },
  { src: 'static/audio/evolve/6 Imagine Dragons - Rise Up.mp3', title: 'RISE UP', duration: '3:51' },
  { src: 'static/audio/evolve/7 Imagine Dragons - I\'ll Make It Up To You.mp3', title: 'I\'LL MAKE IT UP TO YOU', duration: '4:22' },
  { src: 'static/audio/evolve/8 Imagine Dragons - Yesterday.mp3', title: 'YESTERDAY', duration: '3:25' },
  { src: 'static/audio/evolve/9 Imagine Dragons - Mouth Of The River.mp3', title: 'MOUTH OF THE RIVER', duration: '3:41' },
  { src: 'static/audio/evolve/10 Imagine Dragons - Thunder.mp3', title: 'THUNDER', duration: '3:07' },
  { src: 'static/audio/evolve/11 Imagine Dragons - Start Over.mp3', title: 'START OVER', duration: '3:06' },
  { src: 'static/audio/evolve/12Imagine Dragons - Dancing In The Dark.mp3', title: 'DANCING IN THE DARK', duration: '3:53' }
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
    currentArtistName.textContent = 'Imagine Dragons';
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
