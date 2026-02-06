export default function handler(req, res) {
  if (req.method === 'POST') {
    const { yes, noClicks } = req.body;

    console.log('User response:');
    console.log('YES:', yes);        // true if she clicked YES or final CHOICE
    console.log('NO clicks:', noClicks); // number of times she clicked NO

    // Respond back to frontend
    return res.status(200).json({ received: true });
  }

  // Handle other request methods
  res.status(405).json({ error: 'Method not allowed' });
}