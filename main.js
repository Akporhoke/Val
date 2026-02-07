window.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('main-vid');
  const noBtn = document.getElementById('No-button');
  const yesBtn = document.getElementById('yes-btn');
  const choice = document.getElementById('choice');
  const text = document.getElementById('text');
  const heart = document.getElementById('heart');

  // --- Global counters ---
  let clicks = 0;         // NO button clicks
  let heartClicks = 0;    // Heart taps
  let yesClicked = false; // YES button clicked

  // --- Heart animation ---
  let scale = 1;
  const step = 0.2;
  let shrinkInterval;

  heart.addEventListener('click', () => {
    // Increment heart click count
    heartClicks++;
    console.log('Heart clicked:', heartClicks);

    // Grow the heart
    scale += step;
    scale = Math.min(scale, 8);
    heart.style.setProperty('--scale', scale);

    // Shrink step by step after 1.5s
    clearInterval(shrinkInterval);
    shrinkInterval = setInterval(() => {
      scale -= step;
      if (scale <= 1) {
        scale = 1;
        clearInterval(shrinkInterval);
      }
      heart.style.setProperty('--scale', scale);
    }, 1500);

    // Send all counts to Vercel API
    fetch('/api/response', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        yes: yesClicked,
        noClicks: clicks,
        heartClicks: heartClicks
      })
    })
    .then(res => res.json())
    .then(data => console.log('Server response:', data))
    .catch(err => console.error(err));
  });

  // --- Video setup ---
  video.muted = true;
  video.playsInline = true;

  const videos = ['beggin.mp4', 'val-sad.mp4', 'tears.mp4'];
  const messages = [
    'pretty please🥺💔',
    'please be my valentine🥺💔',
    'one last chance?🥺💐🥺'
  ];
  const noContent = ['no', 'i said no', 'let me be'];
  const width = ['9rem', '8rem', '6rem'];
  const font = ['20px', '18px', '16px'];

  let index = 0;

  function playVideo(src, loop = true) {
    video.pause();
    video.currentTime = 0;
    video.loop = loop;
    video.src = src;
    video.load();
    video.addEventListener(
      'canplay',
      () => video.play().catch(err => console.log(err)),
      { once: true }
    );
  }

  // --- NO button click ---
  function changeVid() {
    playVideo(videos[index]);
    text.textContent = messages[index];
    noBtn.textContent = noContent[index];
    noBtn.style.width = width[index];
    noBtn.style.fontSize = font[index];
    document.body.style.background = 'pink';

    index++;
    clicks++; // track NO clicks
    console.log('NO clicks:', clicks);

    // After 4 NO clicks, hide buttons and play final video
    if (clicks >= 4) {
      noBtn.style.display = 'none';
      yesBtn.style.display = 'none';
      playVideo('love.mp4', false);
      choice.style.display = 'block';
      text.textContent = 'YOU LEFT ME NO CHOICE ❤️🪄🧙‍♀️';

      // Send final counts to backend
      fetch('/api/response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          yes: yesClicked,
          noClicks: clicks,
          heartClicks: heartClicks
        })
      });
    }
  }

  // --- YES button click ---
  function yesVideo() {
    yesClicked = true;
    playVideo('val-yes.mp4');
    noBtn.style.display = 'none';
    yesBtn.style.display = 'none';
    heart.style.display = 'block';
    text.textContent = "Can't say NO now 😝❤️";

    // Send counts to backend
    fetch('/api/response', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        yes: yesClicked,
        noClicks: clicks,
        heartClicks: heartClicks
      })
    });
  }

  // --- Final CHOICE button click ---
  function choiceVid() {
    playVideo('together.mp4', true);
    choice.style.display = 'none';
    text.textContent = 'I knew you would come around 😝💐❤️';
    text.style.textAlign = 'center';

    // Also counts as YES
    yesClicked = true;
    fetch('/api/response', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        yes: yesClicked,
        noClicks: clicks,
        heartClicks: heartClicks
      })
    });
  }

  // --- Event listeners ---
  noBtn.addEventListener('click', changeVid);
  yesBtn.addEventListener('click', yesVideo);
  choice.addEventListener('click', choiceVid);
});