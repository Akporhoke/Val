export default function handler(req, res) {
  if (req.method === 'POST') {
    const { yes, noClicks } = req.body;

    console.log('User response:');
    console.log('YES:', yes);       // true if YES or final CHOICE was clicked
    console.log('NO clicks:', noClicks);

    return res.status(200).json({ received: true });
  }

  res.status(405).json({ error: 'Method not allowed' });
}