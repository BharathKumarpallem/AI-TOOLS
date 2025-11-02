import axios from "axios";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const generateImage = async (prompt: string) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        model: "gpt-image-1",
        prompt,
        size: "1024x1024",
        // Add this line 👇 to request a URL instead of Base64
        response_format: "url",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    if (response.data.data && response.data.data.length > 0) {
      // ✅ Use the image URL instead of base64
      return response.data.data[0].url;
    } else {
      throw new Error("No image returned");
    }
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};
