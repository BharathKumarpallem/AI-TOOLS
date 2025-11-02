import { useState } from "react";
import { generateImage } from "../api/openai";

const EnvironmentMode = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return alert("Enter a prompt first!");
    setLoading(true);
    try {
      const url = await generateImage(prompt);
      setImageUrl(url);
    } catch (err) {
      alert("Error generating image. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen text-white flex flex-col items-center p-6 bg-cover bg-center"
      style={{
        background: "linear-gradient(135deg, #064e3b, #022c22, #000000)",
      }}
    >
      <h1 className="text-3xl font-bold mb-4">🌿 Environment Mode</h1>
      <input
        type="text"
        placeholder="Describe an environment..."
        className="w-80 p-2 rounded bg-gray-800 text-white mb-4"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={handleGenerate}
        className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg font-semibold"
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>

      {imageUrl && (
        <div className="mt-6">
          <img
            src={imageUrl}
            alt="Generated environment"
            className="rounded-lg shadow-xl w-96"
          />
        </div>
      )}
    </div>
  );
};

export default EnvironmentMode;
