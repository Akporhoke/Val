export default function handler(req, res) {
  if (req.method === 'POST') {
    const { yes, noClicks, heartClicks } = req.body;  // add heartClicks

    console.log('User response:');
    console.log('YES:', yes);             // true if YES/final choice was clicked
    console.log('NO clicks:', noClicks);  // number of NO taps
    console.log('Heart clicks:', heartClicks); // number of heart taps

    // You can now store heartClicks along with yes/no in DB if needed

    return res.status(200).json({ received: true });
  }

  res.status(405).json({ error: 'Method not allowed' });
}