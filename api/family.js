export default async function handler(req, res) {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Only GET allowed' });
    }

    const { key, aadhar } = req.query;

    // Shelby key check
    if (key !== 'Shelby') {
      return res.status(401).json({ error: 'Invalid key. Use: key=Shelby' });
    }

    // Aadhar validation
    if (!aadhar || aadhar.length !== 12 || isNaN(aadhar)) {
      return res.status(400).json({ error: '12 digit Aadhar required' });
    }

    // YOUR ORIGINAL DATA (Multiple ration cards)
    const familyData = {
      "10207010822198510000": {
        "ration_card_id": "102070108221985100001551",
        "card_type": "PHH",
        "scheme": "NFSA",
        "issue_date": "2021-06-19",
        "state": "BIHAR",
        "district": "MADHUBANI",
        "address": "Village XYZ, Madhubani",
        "fps_code": "120700400037",
        "fps_name": "P.D.S SHOP",
        "members": [
          {
            "member_id": "10207010822198510000155101",
            "member_name": "Sobha Devi",
            "gender": "F",
            "uid_masked": "XXXX-XXXX-1068",
            "relationship": "SELF",
            "ekyc_status": "Y"
          },
          {
            "member_id": "10207010822198510000155102",
            "member_name": "Sunil Yadav",
            "gender": "M",
            "uid_masked": "XXXX-XXXX-7713",
            "relationship": "HUSBAND",
            "ekyc_status": "Y"
          },
          {
            "member_id": "10207010822198510000155103",
            "member_name": "Lakshmi Kumari",
            "gender": "F",
            "uid_masked": "XXXX-XXXX-5602",
            "relationship": "DAUGHTER",
            "ekyc_status": "Y"
          },
          {
            "member_id": "10207010822198510000155104",
            "member_name": "Shivani Kumari",
            "gender": "F",
            "uid_masked": "XXXX-XXXX-4196",
            "relationship": "DAUGHTER",
            "ekyc_status": "Y"
          }
        ]
      },
      "987654321012": {
        "ration_card_id": "987654321000123456",
        "card_type": "AAY",
        "scheme": "NFSA",
        "issue_date": "2022-03-15",
        "state": "UTTAR PRADESH",
        "district": "LUCKNOW",
        "address": "Gomti Nagar, Lucknow",
        "fps_code": "090100500022",
        "fps_name": "KRISHNA RATION SHOP",
        "members": [
          {
            "member_id": "98765432100012345601",
            "member_name": "Ramesh Kumar",
            "gender": "M",
            "uid_masked": "XXXX-XXXX-1234",
            "relationship": "SELF",
            "ekyc_status": "Y"
          },
          {
            "member_id": "98765432100012345602",
            "member_name": "Sita Devi",
            "gender": "F",
            "uid_masked": "XXXX-XXXX-5678",
            "relationship": "WIFE",
            "ekyc_status": "Y"
          }
        ]
      }
    };

    // Check if Aadhar exists
    if (!familyData[aadhar]) {
      return res.status(404).json({
        success: false,
        error: "No family info found",
        available_aadhars: ["10207010822198510000", "987654321012"],
        credits: "api created by harsh_shelby"
      });
    }

    // Success response
    const response = {
      success: true,
      details: familyData[aadhar],
      credits: "api created by harsh_shelby",
      api_key: "Shelby",
      powered_by: "harsh_shelby"
    };

    res.status(200).json(response);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Server error',
      credits: "api created by harsh_shelby"
    });
  }
}
