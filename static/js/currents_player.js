const tracks = [
  { src: 'static/audio/currents/01 Let It Happen.mp3', title: 'LET IT HAPPEN', duration: '7:47' },
  { src: 'static/audio/currents/02 Nangs.mp3', title: 'NANGS', duration: '1:47' },
  { src: 'static/audio/currents/03 The Moment.mp3', title: 'THE MOMENT', duration: '4:15' },
  { src: 'static/audio/currents/04 Yes I\'m Changing.mp3', title: 'YES I\'M CHANGING', duration: '4:30' },
  { src: 'static/audio/currents/05 Eventually.mp3', title: 'EVENTUALLY', duration: '5:18' },
  { src: 'static/audio/currents/06 Gossip.mp3', title: 'GOSSIP', duration: '0:55' },
  { src: 'static/audio/currents/07 The Less I Know The Better.mp3', title: 'THE LESS I KNOW THE BETTER', duration: '3:36' },
  { src: 'static/audio/currents/08 Past Life.mp3', title: 'PAST LIFE', duration: '3:48' },
  { src: 'static/audio/currents/09 Disciples.mp3', title: 'DISCIPLES', duration: '1:48' },
  { src: 'static/audio/currents/10 \'Cause I\'m A Man.mp3', title: 'CAUSE I\'M A MAN', duration: '4:01' },
  { src: 'static/audio/currents/11 Reality In Motion.mp3', title: 'REALITY IN MOTION', duration: '4:12' },
  { src: 'static/audio/currents/12 Love_Paranoia.mp3', title: 'LOVE/PARANOIA', duration: '3:05' },
  { src: 'static/audio/currents/13 New Person, Same Old Mistakes.mp3', title: 'NEW PERSON, SAME OLD MISTAKES', duration: '6:03' }
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
    currentArtistName.textContent = 'Tame Impala';
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
