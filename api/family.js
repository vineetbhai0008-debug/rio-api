export default function handler(req, res) {
  const { key, aadhar } = req.query;

  const SECRET_KEY = process.env.shelby;

  if (!key || key !== SECRET_KEY) {
    return res.status(403).json({
      success: false,
      message: "Invalid API Key",
      created_by: "harsh_shelby"
    });
  }

  if (!aadhar) {
    return res.status(400).json({
      success: false,
      message: "Aadhar number required",
      created_by: "harsh_shelby"
    });
  }

  return res.status(200).json({
    success: true,
    created_by: "harsh_shelby",
    data: {
      aadhar: aadhar,
      name: "Demo User",
      status: "Active"
    }
  });
}
