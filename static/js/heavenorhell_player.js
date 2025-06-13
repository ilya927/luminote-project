const tracks = [
  { src: 'static/audio/heavenorhell/01-Heaven Or Hell Intro.mp3', title: 'HEAVEN OR HELL', duration: '3:03', album: 'heavenorhell' },
  { src: 'static/audio/heavenorhell/02-Euphoria (Ft. Travis Scott & Kaash Paige).mp3', title: 'EUPHORIA (feat. Travis Scott & Kaash Paige)', duration: '3:36', album: 'heavenorhell' },
  { src: 'static/audio/heavenorhell/03-Cardigan.mp3', title: 'CARDIGAN', duration: '2:38', album: 'heavenorhell' },
  { src: 'static/audio/heavenorhell/04-After Party.mp3', title: 'AFTER PARTY', duration: '2:47', album: 'heavenorhell' },
  { src: 'static/audio/heavenorhell/05-Wasted.mp3', title: 'WASTED', duration: '2:51', album: 'heavenorhell' },
  { src: 'static/audio/heavenorhell/06-Can t Feel My Legs.mp3', title: 'CAN\'T FEEL MY LEGS', duration: '3:00', album: 'heavenorhell' },
  { src: 'static/audio/heavenorhell/07-Candy.mp3', title: 'CANDY', duration: '3:56', album: 'heavenorhell' },
  { src: 'static/audio/heavenorhell/08-Company.mp3', title: 'COMPANY', duration: '3:24', album: 'heavenorhell' },
  { src: 'static/audio/heavenorhell/09-Had Enough (Ft. Quavo & Offset).mp3', title: 'HAD ENOUGH (feat. Quavo & Offset)', duration: '2:37', album: 'heavenorhell' },
  { src: 'static/audio/heavenorhell/10-Spaceship (Ft. Sheck Wes).mp3', title: 'SPACESHIP (feat. Sheck Wes)', duration: '3:05', album: 'heavenorhell' },
  { src: 'static/audio/heavenorhell/11-No Photos.mp3', title: 'NO PHOTOS', duration: '2:55', album: 'heavenorhell' },
  { src: 'static/audio/heavenorhell/12-No Idea.mp3', title: 'NO IDEA', duration: '2:34', album: 'heavenorhell' }
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
    currentArtistName.textContent = 'Don Toliver'; // Assuming the artist is fixed
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
