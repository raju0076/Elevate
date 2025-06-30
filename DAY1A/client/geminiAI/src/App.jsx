import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("LinkedIn");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const platformPrompts = {
    LinkedIn: "Write a professional LinkedIn post for the topic:",
    Twitter: "Write a catchy and short tweet for the topic:",
    Instagram: "Write a fun and friendly Instagram caption for the topic:",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    setLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `${platformPrompts[platform]} "${topic}"`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setResult({ platform, post: text });
    } catch (err) {
      console.error(err);
      setResult({ error: "Something went wrong!" });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">🎯 Social Post Generator</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter topic"
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option>LinkedIn</option>
            <option>Twitter</option>
            <option>Instagram</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Generating..." : "Generate Post"}
          </button>
        </form>

        {result && (
          <div className="mt-6 bg-gray-50 border border-gray-200 p-4 rounded">
            {result.error ? (
              <p className="text-red-500">{result.error}</p>
            ) : (
              <>
                <p className="font-semibold">Platform: {result.platform}</p>
                <p className="mt-2 whitespace-pre-wrap">{result.post}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
