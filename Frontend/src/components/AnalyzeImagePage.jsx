import { useState } from "react";
import {
  Upload,
  FileVideo,
  Activity,
  Target,
  BarChart3,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

export function AnalyzePage() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setUploadedFile(file);
      setResult(null);
      setError("");
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) return;

    setIsAnalyzing(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);

      const response = await fetch(
        "http://127.0.0.1:8000/image/model/detect",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Analysis failed");
        return;
      }

      setResult(data);

      console.log("Analysis result:", data);
    } catch (err) {
      console.error("Analysis failed:", err);
      setError("Failed to connect to server");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // FIXED PDF DOWNLOAD
  const handleExportPDF = () => {
    if (!result?.pdf_base64) return;

    const byteCharacters = atob(result.pdf_base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "deepfake-report.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  // -----------------------------
  // SAFE API VALUES
  // -----------------------------
  const probFake = result?.prob_fake ?? 0;
  const probReal = result?.prob_real ?? 0;
  const prediction = result?.prediction ?? "Real";
  const suspiciousArea = result?.suspicious_area_percent ?? 0;

  const manipulationScore = probFake * 10;

  const manipulationPct = `${(probFake * 100).toFixed(1)}%`;
  const realPct = `${(probReal * 100).toFixed(1)}%`;
  const suspiciousPct = `${suspiciousArea.toFixed(1)}%`;

  // -----------------------------
  // METRICS (UNCHANGED)
  // -----------------------------
  const metrics = [
    {
      title: "Prediction",
      value: prediction,
      width: prediction === "Fake" ? "100%" : "0%",
    },
    {
      title: "Probability Real",
      value: realPct,
      width: realPct,
    },
    {
      title: "Probability Fake",
      value: manipulationPct,
      width: manipulationPct,
    },
    {
      title: "Suspicious Area %",
      value: suspiciousPct,
      width: suspiciousPct,
    },
  ];

  // -----------------------------
  // CLASSIFICATION LOGIC
  // -----------------------------
  const isDeepfake = manipulationScore >= 7;
  const isSuspicious = manipulationScore >= 4 && manipulationScore < 7;

  const resultLabel = isDeepfake
    ? "Deepfake"
    : isSuspicious
      ? "Suspicious"
      : "Natural";

  const scoreBgClass = isDeepfake
    ? "from-red-900/30 to-rose-900/30 border-red-700/50"
    : isSuspicious
      ? "from-yellow-900/30 to-amber-900/30 border-yellow-700/50"
      : "from-green-900/30 to-emerald-900/30 border-green-700/50";

  const scoreColorClass = isDeepfake
    ? "text-red-400"
    : isSuspicious
      ? "text-yellow-400"
      : "text-green-400";

  const barColorClass = isDeepfake
    ? "bg-red-500"
    : isSuspicious
      ? "bg-yellow-500"
      : "bg-green-500";

  return (
    <div className="bg-[#0a0e1a] min-h-screen text-white">
      {/* HEADER (UNCHANGED) */}
      <div className="border-b border-gray-800 bg-[#0d1221]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Back</span>
          </Link>

          <div className="h-5 w-px bg-gray-700" />

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-lg text-white">Analyze Media</h1>
          </div>
        </div>
      </div>

      {/* MAIN UI (UNCHANGED) */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LEFT SIDE (UNCHANGED) */}
            <div className="space-y-6">
              <div className="bg-[#0f1629] border border-gray-800 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Upload className="w-5 h-5 text-yellow-500" />
                  <h3 className="text-white font-semibold">Upload File</h3>
                  <span className="px-2 py-0.5 bg-green-600 text-white rounded text-xs">
                    Live
                  </span>
                </div>

                <div className="border-2 border-dashed border-gray-700 rounded-lg p-12 text-center mb-6 cursor-pointer">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <FileVideo className="w-8 h-8 text-white" />
                  </div>

                  <h4 className="text-white mb-2 font-medium">
                    Upload Your File
                  </h4>

                  <p className="text-gray-400 text-sm mb-4">
                    Support up to 5MB
                  </p>

                  <label>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <span className="px-6 py-2 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700">
                      Select Files
                    </span>
                  </label>
                </div>

                {uploadedFile && (
                  <>
                    <button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className="w-full py-3 bg-cyan-500 text-white rounded-lg"
                    >
                      {isAnalyzing ? "Analyzing..." : "Start Analysis"}
                    </button>

                    {error && (
                      <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-300 text-sm">
                        {error}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-6">
              <div className="bg-[#0f1629] border border-gray-800 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Target className="w-5 h-5 text-red-500" />
                  <h3 className="text-white font-semibold">
                    Deepfake Detection Results
                  </h3>

                  {/* 🔥 ONLY UPGRADED PART */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide
                    ${isDeepfake
                        ? "bg-red-500/20 text-red-300 border border-red-500/40"
                        : isSuspicious
                          ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/40"
                          : "bg-green-500/20 text-green-300 border border-green-500/40"
                      }`}
                  >
                    {resultLabel}
                  </span>
                </div>

                {/* SCORE */}
                <div
                  className={`bg-gradient-to-br ${scoreBgClass} border rounded-xl p-8 text-center mb-6`}
                >
                  <div className={`text-6xl font-bold ${scoreColorClass} mb-2`}>
                    {manipulationScore.toFixed(1)}/10
                  </div>
                  <p className="text-gray-400 text-sm">Manipulaton Score</p>
                </div>

                {/* METRICS */}
                <div className="space-y-4 mb-6">
                  {metrics.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400 text-sm">
                          {item.title}
                        </span>
                        <span className="text-white text-xs">{item.value}</span>
                      </div>

                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${barColorClass}`}
                          style={{ width: item.width }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* EXPORT */}
                <button
                  onClick={handleExportPDF}
                  disabled={!result?.pdf_base64}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg"
                >
                  Export Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AnalyzePage;
