
import { useState} from "react";
import { motion } from "framer-motion";

export default function TechnologyMode() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse("");
    setImageUrl("");

    try {
      // 🧠 Demo AI Text Response (you can replace with OpenAI API)
      const aiText = `🔍 Here's what I found about "${query}":
      
- ${query} is a rapidly evolving technology reshaping industries.
- It uses AI-driven algorithms for automation and innovation.
- Integration with IoT, Machine Learning, and Cloud enhances its efficiency.
- Future applications include smart environments, robotics, and data analytics.`;

      setResponse(aiText);

      // 🌆 Demo AI Image (replace with OpenAI Image API or Unsplash)
      const encoded = encodeURIComponent(query);
      const image = `https://source.unsplash.com/featured/?${encoded},technology,ai,futuristic`;
      setImageUrl(image);
    } catch (error) {
      console.error("Error generating AI data:", error);
      alert("⚠️ Failed to generate. Try again later.");
    }

    setLoading(false);
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-[80vh] text-center text-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-4xl font-bold mb-4 text-cyan-300 drop-shadow-[0_0_10px_#00ffff]">
        🤖 Technology Mode – Powered by AI
      </h2>
      <p className="text-lg mb-6 text-gray-300">
        Ask anything about modern technologies — AI will respond and visualize it.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-6 w-full sm:w-2/3 justify-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Example: Quantum Computing or AI Robotics"
          className="w-full px-4 py-3 rounded-lg bg-gray-800 text-cyan-100 placeholder-cyan-400 border border-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`px-6 py-3 rounded-lg font-semibold bg-cyan-600 hover:bg-cyan-700 transition ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "⚡ Generating..." : "Generate"}
        </button>
      </div>

      {loading && (
        <div className="animate-pulse text-cyan-300 text-lg">Processing AI data...</div>
      )}

      {response && (
        <motion.div
          className="bg-gray-900/60 border border-cyan-700 p-6 rounded-xl mt-6 text-left w-full sm:w-2/3 shadow-[0_0_20px_#00ffff]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <pre className="whitespace-pre-wrap text-cyan-100 font-mono">{response}</pre>
        </motion.div>
      )}

      {imageUrl && (
        <motion.div
          className="mt-6 rounded-lg overflow-hidden shadow-[0_0_20px_#00ffff]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={imageUrl}
            alt={query}
            className="max-w-md w-full rounded-lg border border-cyan-700"
          />
        </motion.div>
      )}
    </motion.div>
  );
}
