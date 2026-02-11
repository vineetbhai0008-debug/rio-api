export default {
  async fetch(request) {
    const url = new URL(request.url);
    const aadhar = url.searchParams.get("aadhar");
    const key = url.searchParams.get("key");

    const SECRET_KEY = "2009"; // 

    if (key !== SECRET_KEY) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid API Key",
          created_by: "harsh_shelby"
        }),
        { status: 403 }
      );
    }

    if (!aadhar) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Aadhar parameter missing",
          created_by: "harsh_shelby"
        }),
        { status: 400 }
      );
    }

    try {
      // ⚠️ Yaha sirf legal/public API hi use karo
      const response = await fetch(`https://example.com/api?id=${aadhar}`);
      const data = await response.json();

      return new Response(
        JSON.stringify({
          success: true,
          api_created_by: "harsh_shelby",
          data: data
        }),
        { status: 200 }
      );

    } catch (error) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Server Error",
          error: error.message,
          created_by: "harsh_shelby"
        }),
        { status: 500 }
      );
    }
  }
};
