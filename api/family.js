export default function handler(req, res) {

  const { key, aadhar } = req.query;

  // Secret key from Vercel Environment Variable
  const SECRET_KEY = process.env.Shelby;

  // Key check
  if (key !== SECRET_KEY) {
    return res.status(403).json({
      success: false,
      message: "Invalid API Key",
      created_by: "harsh_shelby"
    });
  }

  // Aadhar check
  if (!aadhar) {
    return res.status(400).json({
      success: false,
      message: "Aadhar parameter missing",
      created_by: "harsh_shelby"
    });
  }

  // Success response
  return res.status(200).json({
    success: true,
    created_by: "harsh_shelby",
    message: "API Working Successfully",
    aadhar_received: aadhar
  });

}
