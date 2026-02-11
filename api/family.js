export default async function handler(req, res) {
  try {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { key, aadhar } = req.query;

    // FIXED: Sirf key=Shelby check karo
    if (key !== 'Shelby') {
      return res.status(401).json({ error: 'Invalid key. Use key=Shelby' });
    }

    // Aadhar validation
    if (!aadhar || aadhar.length !== 12 || isNaN(aadhar)) {
      return res.status(400).json({ error: 'Invalid Aadhar number (12 digits)' });
    }

    // Original API call
    const originalApiUrl = `https://usesirosint.vercel.app/api/family?key=land&aadhar=${aadhar}`;
    
    const response = await fetch(originalApiUrl);
    
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Data not found for this Aadhar' });
    }

    const data = await response.json();

    // Your branding
    const modifiedResponse = {
      ...data,
      credits: "api created by harsh_shelby",
      api_key: "Shelby",
      source: "https://github.com/YOUR_USERNAME/family-api"
    };

    res.status(200).json(modifiedResponse);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Server error',
      credits: "api created by harsh_shelby"
    });
  }
}
