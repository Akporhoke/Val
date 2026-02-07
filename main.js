heart.addEventListener('click', () => {
  // increment count
  heartClicks++;
  console.log('Heart clicked:', heartClicks);

  // grow the heart
  scale += step;
  scale = Math.min(scale, 8);  // max size
  heart.style.setProperty('--scale', scale);

  // shrink step by step
  clearInterval(shrinkInterval);
  shrinkInterval = setInterval(() => {
    scale -= step;
    if (scale <= 1) {
      scale = 1;
      clearInterval(shrinkInterval);
    }
    heart.style.setProperty('--scale', scale);
  }, 1500);

  // send heart click count to your existing API
  fetch('/api/response', {   // use your main API, not /api/heart-click
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      yes: yesClicked,
      noClicks: clicks,
      heartClicks: heartClicks
    })
  })
  .then(res => res.json())
  .then(data => console.log('Backend response:', data))
  .catch(err => console.error('Error sending clicks:', err));
});