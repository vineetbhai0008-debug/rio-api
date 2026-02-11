export default function handler(req, res) {
  const { key, aadhar } = req.query;

  const SECRET_KEY = process.env.shelby;

  // 🔐 API KEY CHECK
  if (!key || key !== SECRET_KEY) {
    return res.status(403).json({
      success: false,
      message: "Invalid API Key",
      created_by: "harsh_shelby"
    });
  }

  // 📌 Aadhaar Required
  if (!aadhar) {
    return res.status(400).json({
      success: false,
      message: "Aadhar number required",
      created_by: "harsh_shelby"
    });
  }

  // 🛡 Aadhaar Format Check (12 digits only)
  if (!/^[0-9]{12}$/.test(aadhar)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Aadhar format (must be 12 digits)",
      created_by: "harsh_shelby"
    });
  }

  // ✅ Success Response
  return res.status(200).json({
    api_name: "RIO FAMILY API",
    owner: "harsh_shelby",
    success: true,
    data: {
      aadhar: aadhar,
      name: "Demo User",
      status: "Active"
    }
  });
}
