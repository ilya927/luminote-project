const tracks = [
  { src: 'static/audio/starboy/01 - Starboy (feat. Daft Punk).mp3', title: 'STARBOY', duration: '3:50' },
  { src: 'static/audio/starboy/02 - Party Monster.mp3', title: 'PARTY MONSTER', duration: '4:09' },
  { src: 'static/audio/starboy/03 - False Alarm.mp3', title: 'FALSE ALARM', duration: '3:40' },
  { src: 'static/audio/starboy/04 - Reminder.mp3', title: 'REMINDER', duration: '3:38' },
  { src: 'static/audio/starboy/05 - Rockin\'.mp3', title: 'ROCKIN\'', duration: '3:52' },
  { src: 'static/audio/starboy/06 - Secrets.mp3', title: 'SECRETS', duration: '4:25' },
  { src: 'static/audio/starboy/07 - True Colors.mp3', title: 'TRUE COLORS', duration: '3:26' },
  { src: 'static/audio/starboy/08 - Stargirl Interlude (feat. Lana Del Rey).mp3', title: 'STARGIRL INTERLUDE', duration: '1:51' },
  { src: 'static/audio/starboy/09 - Sidewalks (feat. Kendrick Lamar).mp3', title: 'SIDEWALKS', duration: '3:51' },
  { src: 'static/audio/starboy/10 - Six Feet Under.mp3', title: 'SIX FEET UNDER', duration: '3:57' },
  { src: 'static/audio/starboy/11 - Love To Lay.mp3', title: 'LOVE TO LAY', duration: '3:43' },
  { src: 'static/audio/starboy/12 - A Lonely Night.mp3', title: 'A LONELY NIGHT', duration: '3:40' },
  { src: 'static/audio/starboy/13 - Attention.mp3', title: 'ATTENTION', duration: '3:17' },
  { src: 'static/audio/starboy/14 - Ordinary Life.mp3', title: 'ORDINARY LIFE', duration: '3:41' },
  { src: 'static/audio/starboy/15 - Nothing Without You.mp3', title: 'NOTHING WITHOUT YOU', duration: '3:18' },
  { src: 'static/audio/starboy/16 - All I Know (feat. Future).mp3', title: 'ALL I KNOW', duration: '5:21' },
  { src: 'static/audio/starboy/17 - Die For You.mp3', title: 'DIE FOR YOU', duration: '4:20' },
  { src: 'static/audio/starboy/18 - I Feel It Coming (feat. Daft Punk).mp3', title: 'I FEEL IT COMING', duration: '4:29' }
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
    currentArtistName.textContent = 'The Weeknd';
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
