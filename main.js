window.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('main-vid');
  const noBtn = document.getElementById('No-button');
  const yesBtn = document.getElementById('yes-btn');
  const choice = document.getElementById('choice');
  const text = document.getElementById('text');

  video.muted = true;
  video.playsInline = true;

  const videos = [
    'beggin.mp4',
    'val-sad.mp4',
    'tears.mp4'
  ];

  const messages = [
    'pretty please🥺💔',
    'please be my valentine🥺💔',
    'one last chance?🥺💐🥺'
  ];
  
  const noContent = [
    'no',
    'i said no',
    'let me be'
  ]

  let index = 0;
  let clicks = 0; // NO clicks

  // Send data to backend
  function sendResponse(data) {
    fetch('/api/response', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).catch(err => console.log(err));
  }

  function playVideo(src, loop = false) {
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

  // NO button click
  function changeVid() {
    playVideo(videos[index]);
    text.textContent = messages[index];
    noBtn.textContent = noContent[index];
    document.body.style.background = 'pink';

    index++;
    clicks++; // track NO clicks

    if (clicks >= 4) {
      noBtn.style.display = 'none';
      yesBtn.style.display = 'none';
      playVideo('love.mp4');
      choice.style.display = 'block';
      text.textContent = 'YOU LEFT ME NO CHOICE❤️';
    }
  }

  // YES button click
  function yesVideo() {
    playVideo('val-yes.mp4');
    noBtn.style.display = 'none';
    yesBtn.style.display = 'none';
    text.textContent = "Can't say NO now 😝❤️";

    // Track YES click
    sendResponse({
      yes: true,      // she clicked YES
      noClicks: clicks
    });
  }

  // Final CHOICE button after 3 NOs
  function choiceVid() {
    playVideo('together.mp4', true);
    choice.style.display = 'none';
    text.textContent = 'I knew you would come around 😝💐❤️';
    text.style.textAlign = "center";

    // Also counts as YES
    sendResponse({
      yes: true,
      noClicks: clicks
    });
  }

  noBtn.addEventListener('click', changeVid);
  yesBtn.addEventListener('click', yesVideo);
  choice.addEventListener('click', choiceVid);
});