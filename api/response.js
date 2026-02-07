export default function handler(req, res) {
  if (req.method === 'POST') {
    const { yes, noClicks, heartClicks } = req.body;  // add heartClicks

    // --- Device detection ---
    const userAgent = req.headers['user-agent'] || '';
    let deviceType;

    if (userAgent.includes('iPhone')) {
      deviceType = 'iPhone';
    } else if (userAgent.includes('Android')) {
      deviceType = 'Android';
    } else {
      deviceType = 'Unknown';
    }

    // --- Logging ---
    console.log('User response:');
    console.log('YES:', yes);
    console.log('NO clicks:', noClicks);
    console.log('Heart clicks:', heartClicks);
    console.log('Device type:', deviceType);

    return res.status(200).json({ received: true, deviceType });
  }

  res.status(405).json({ error: 'Method not allowed' });
}