export default async function handler(req, res) {
  const { key, id } = req.query;

  const SECRET_KEY = process.env.shelby;

  if (!key || key !== SECRET_KEY) {
    return res.status(403).json({
      success: false,
      message: "Invalid API Key",
      created_by: "harsh_shelby"
    });
  }

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID required",
      created_by: "harsh_shelby"
    });
  }

  try {
    // Public Test API (safe)
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const data = await response.json();

    if (!data.id) {
      return res.status(404).json({
        success: false,
        message: "No Record Found",
        created_by: "harsh_shelby"
      });
    }

    return res.status(200).json({
      api_name: "RIO FAMILY API",
      owner: "harsh_shelby",
      success: true,
      data: data
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      created_by: "harsh_shelby"
    });
  }
}
