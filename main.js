window.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('main-vid');
  const noBtn = document.getElementById('No-button');
  const yesBtn = document.getElementById('yes-btn');
  const choice = document.getElementById('choice');
  const text = document.getElementById('text');

  video.muted = true;
  video.playsInline = true; // 🔥 important for Chrome/mobile

  const videos = [
    'beggin.mp4',
    'val-sad.mp4',
    'tears.mp4'
  ];

  const messages = [
    'pretty please🥺💔',
    'please be my valentine🥺💔',
    'one last chance?🥺🥺'
  ];

  let index = 0;
  let clicks = 0;

  function playVideo(src, loop = false) {
    video.pause();
    video.currentTime = 0;
    video.loop = loop;
    video.src = src;
    video.load();

    video.addEventListener(
      'canplay',
      () => {
        video.play().catch(err => console.log(err));
      },
      { once: true } // 🔥 THIS is the magic
    );
  }

  function changeVid() {
    playVideo(videos[index]);

    text.textContent = messages[index];
    document.body.style.background = 'pink';

    index++;
    clicks++;

    if (clicks >= 3) {
      noBtn.style.display = 'none';
      yesBtn.style.display = 'none';

      playVideo('love.mp4');
      choice.style.display = 'block';
      text.textContent = 'YOU LEFT ME NO CHOICE❤️';
      
    }
  }

  function yesVideo() {
    playVideo('val-yes.mp4');
    noBtn.style.display = 'none';
    yesBtn.style.display = 'none';
    text.textContent = "Can't say NO now 😝❤️";
  }

  function choiceVid() {
    playVideo('together.mp4', true);
    choice.style.display = 'none';
    text.textContent = 'I knew you would come around 😝💐❤️';
    text.style.textAlign="center"
    text.style.wrap="nowrap"
  }

  noBtn.addEventListener('click', changeVid);
  yesBtn.addEventListener('click', yesVideo);
  choice.addEventListener('click', choiceVid);
});