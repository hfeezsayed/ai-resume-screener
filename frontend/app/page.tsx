"use client";

import { useState, useRef } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Drag & Drop handlers
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Submit
  const handleSubmit = async () => {
    if (!file || !jobDesc) {
      alert("Please upload file and enter job description");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_description", jobDesc);

    try {
      setLoading(true);

      const res = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data.analysis);
    } catch (error) {
      console.error(error);
      alert("Error connecting to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-10 bg-gray-100 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">AI Resume Screener</h1>

        {/* Drag & Drop + Click Upload */}
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-gray-300 p-6 text-center rounded cursor-pointer hover:bg-gray-50 mb-4 transition"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden"
          />

          <p className="text-gray-600">
            {file ? (
              <span className="font-semibold text-green-600">
                ✅ {file.name}
              </span>
            ) : (
              "📄 Drag & drop your resume here or click to upload"
            )}
          </p>
        </div>

        {/* Job Description */}
        <textarea
          placeholder="Paste job description..."
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full transition cursor:pointer"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        {/* Result */}
        {result && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Result</h2>

            <div className="mb-4">
              <p className="font-semibold">Score</p>

              <div className="w-full bg-gray-200 rounded h-4">
                <div
                  className="bg-green-500 h-4 rounded"
                  style={{ width: `${result.score}%` }}
                ></div>
              </div>

              <p className="mt-1 text-sm">{result.score}%</p>
            </div>

            <p>
              <strong>Missing Skills:</strong>
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {result.missing_skills.map((skill: string, i: number) => (
                <span
                  key={i}
                  className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="bg-gray-50 p-3 rounded">
              <p className="font-semibold mb-2">Suggestions</p>
              <ul className="list-disc ml-5 text-sm">
                {result.suggestions.map((s: string, i: number) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
