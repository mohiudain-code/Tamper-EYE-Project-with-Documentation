import { useState, useRef } from "react";
import {
  Upload,
  FileVideo,
  Activity,
  Target,
  BarChart3,
  Sparkles,
  ArrowLeft,
  Download,
  AlertCircle,
  CheckCircle,
  Clock,
  Layers,
} from "lucide-react";
import { Link } from "react-router-dom";

const API_URL = "http://127.0.0.1:8000/video/model/api/v1/predict";

export function AnalyzePage() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [apiError, setApiError] = useState(null);
  const inputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setResult(null);
      setApiError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) return;
    setIsAnalyzing(true);
    setApiError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);

      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.detail || `Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) throw new Error(data.error);

      setResult(data);
    } catch (err) {
      setApiError(err.message || "An unexpected error occurred.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!result?.report_pdf_b64) return;
    const byteChars = atob(result.report_pdf_b64);
    const byteNums = new Array(byteChars.length)
      .fill(0)
      .map((_, i) => byteChars.charCodeAt(i));
    const blob = new Blob([new Uint8Array(byteNums)], {
      type: "application/pdf",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `manipulation_report_${Date.now()}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── Derived display values from API result ──────────────────
  const manipScore = result
    ? parseFloat((result.prob_manipulated * 10).toFixed(1))
    : null;

  const getVerdict = () => {
    if (!result) return null;
    if (manipScore <= 3)
      return { label: "Natural", color: "green", range: "0-3" };
    if (manipScore <= 6)
      return { label: "Suspicious", color: "yellow", range: "4-6" };
    return { label: "Deepfake", color: "red", range: "7-10" };
  };

  const verdict = getVerdict();

  const scoreColor =
    verdict?.color === "green"
      ? "text-green-400"
      : verdict?.color === "yellow"
        ? "text-yellow-400"
        : "text-red-400";

  const scoreBg =
    verdict?.color === "green"
      ? "from-green-900/30 to-emerald-900/30 border-green-700/50"
      : verdict?.color === "yellow"
        ? "from-yellow-900/30 to-amber-900/30 border-yellow-700/50"
        : "from-red-900/30 to-rose-900/30 border-red-700/50";

  const metrics = result
    ? [
        {
          title: "Manipulation Probability",
          value: `${(result.prob_manipulated * 100).toFixed(1)}%`,
          width: `${(result.prob_manipulated * 100).toFixed(1)}%`,
          barColor:
            result.prob_manipulated > 0.6
              ? "bg-red-500"
              : result.prob_manipulated > 0.4
                ? "bg-yellow-500"
                : "bg-green-500",
        },
        {
          title: "Authentic Probability",
          value: `${(result.prob_unedited * 100).toFixed(1)}%`,
          width: `${(result.prob_unedited * 100).toFixed(1)}%`,
          barColor: "bg-blue-500",
        },
        {
          title: "Model Confidence",
          value: `${(result.confidence * 100).toFixed(1)}%`,
          width: `${(result.confidence * 100).toFixed(1)}%`,
          barColor: "bg-purple-500",
        },
        {
          title: "Suspicious Area",
          value: `${result.suspicious_area_percent.toFixed(2)}%`,
          width: `${Math.min(result.suspicious_area_percent, 100).toFixed(2)}%`,
          barColor:
            result.suspicious_area_percent > 20
              ? "bg-red-500"
              : result.suspicious_area_percent > 5
                ? "bg-yellow-500"
                : "bg-green-500",
        },
      ]
    : [
        {
          title: "Manipulation Probability",
          value: "—",
          width: "0%",
          barColor: "bg-green-500",
        },
        {
          title: "Authentic Probability",
          value: "—",
          width: "0%",
          barColor: "bg-blue-500",
        },
        {
          title: "Model Confidence",
          value: "—",
          width: "0%",
          barColor: "bg-purple-500",
        },
        {
          title: "Suspicious Area",
          value: "—",
          width: "0%",
          barColor: "bg-green-500",
        },
      ];

  return (
    <div className="bg-[#0a0e1a] min-h-screen text-white">
      {/* Header */}
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

      {/* Main */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-white text-4xl mb-4">
              Try Our Detection System
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Upload an image or video to see our AI-powered deepfake detection
              in action
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ── Left Column ── */}
            <div className="space-y-6">
              {/* Upload */}
              <div className="bg-[#0f1629] border border-gray-800 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Upload className="w-5 h-5 text-yellow-500" />
                  <h3 className="text-white font-semibold">Upload File</h3>
                  <span className="px-2 py-0.5 bg-green-600 text-white rounded text-xs">
                    Live
                  </span>
                </div>

                <div
                  className="border-2 border-dashed border-gray-700 rounded-lg p-12 text-center mb-6 hover:border-blue-500 transition-colors cursor-pointer"
                  //onClick={() => inputRef.current?.click()}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <FileVideo className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-white mb-2 font-medium">
                    Upload Your File
                  </h4>
                  <p className="text-gray-400 text-sm mb-4">
                    Support for videos (MP4, AVI, MOV, MKV, WEBM) — 5 to 20
                    seconds
                  </p>
                  <label className="inline-block">
                    <input
                      ref={inputRef}
                      type="file"
                      accept="video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <span className="px-6 py-2 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700 inline-block">
                      Select Files
                    </span>
                  </label>
                </div>

                {/* Uploaded file row */}
                {uploadedFile && (
                  <div>
                    <h4 className="text-white mb-3">Uploaded Files</h4>

                    <div className="bg-[#1a1f35] border border-gray-700 rounded-lg p-4 flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <FileVideo className="w-5 h-5 text-blue-400" />
                        <div>
                          <p className="text-white text-sm">
                            {uploadedFile.name}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {(uploadedFile.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-yellow-600 text-white rounded text-xs">
                        ready
                      </span>
                    </div>

                    <button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className="w-full py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors disabled:bg-gray-600"
                    >
                      {isAnalyzing ? "Analyzing..." : "Start Analysis"}
                    </button>
                  </div>
                )}

                {/* API error */}
                {apiError && (
                  <div className="mt-4 flex items-start gap-3 bg-red-900/30 border border-red-700/60 rounded-lg p-4">
                    <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                    <p className="text-red-300 text-sm">{apiError}</p>
                  </div>
                )}
              </div>

              {/* Analysis type cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#0f1629] border border-gray-700 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <Activity className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <p className="text-white text-sm">Fractal Analysis</p>
                </div>
                <div className="bg-[#0f1629] border border-gray-700 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <Target className="w-8 h-8 text-pink-400 mx-auto mb-3" />
                  <p className="text-white text-sm">Neural Network</p>
                </div>
                <div className="bg-[#0f1629] border border-gray-700 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <BarChart3 className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <p className="text-white text-sm">Real-time Results</p>
                </div>
              </div>
            </div>

            {/* ── Right Column ── */}
            <div className="space-y-6">
              <div className="bg-[#0f1629] border border-gray-800 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Target className="w-5 h-5 text-red-500" />
                  <h3 className="text-white font-semibold">
                    Deepfake Detection Results
                  </h3>
                  <span className="px-2 py-0.5 bg-green-600 text-white rounded text-xs">
                    {result ? result.prediction : "Natural"}
                  </span>
                </div>

                {/* Score */}
                <div
                  className={`bg-gradient-to-br ${
                    result
                      ? scoreBg
                      : "from-green-900/30 to-emerald-900/30 border-green-700/50"
                  } border rounded-xl p-8 text-center mb-6`}
                >
                  <div
                    className={`text-6xl font-bold mb-2 ${
                      result ? scoreColor : "text-green-400"
                    }`}
                  >
                    {result ? `${manipScore}/10` : "—/10"}
                  </div>
                  <h4 className="text-white mb-2 font-medium">
                    Manipulation Confidence Score
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Based on AI analysis and pattern recognition
                  </p>

                  {/* Extra metadata row */}
                  {result && (
                    <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {result.duration_message}
                      </span>
                      {result.best_frame_index !== null && (
                        <span className="flex items-center gap-1">
                          <Layers className="w-3.5 h-3.5" />
                          Best frame: #{result.best_frame_index}
                        </span>
                      )}
                      {result.prediction === "Unedited" && (
                        <span className="flex items-center gap-1 text-green-400">
                          <CheckCircle className="w-3.5 h-3.5" />
                          No manipulation detected
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Detection Metrics */}
                <div className="space-y-4 mb-6">
                  <h4 className="text-white font-medium">Detection Metrics</h4>
                  {metrics.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400 text-sm">
                          {item.title}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-xs text-white ${item.barColor
                            .replace("bg-", "bg-")
                            .replace("-500", "-700")}`}
                        >
                          {item.value}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.barColor} rounded-full transition-all duration-700`}
                          style={{ width: item.width }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Export Report */}
                <button
                  onClick={handleDownloadPDF}
                  disabled={!result?.report_pdf_b64}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-6 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export Report
                </button>

                {/* Classification cards */}
                <div className="grid grid-cols-3 gap-3">
                  <div
                    className={`rounded-lg p-3 text-center border transition-all ${
                      verdict?.color === "green" && result
                        ? "bg-green-900/50 border-green-500 ring-1 ring-green-400"
                        : "bg-green-900/30 border-green-700"
                    }`}
                  >
                    <div className="text-green-400 text-sm mb-1">
                      0-3: Natural
                    </div>
                    <div className="text-green-300 text-xs">
                      High confidence real
                    </div>
                  </div>
                  <div
                    className={`rounded-lg p-3 text-center border transition-all ${
                      verdict?.color === "yellow" && result
                        ? "bg-yellow-900/50 border-yellow-500 ring-1 ring-yellow-400"
                        : "bg-yellow-900/30 border-yellow-700"
                    }`}
                  >
                    <div className="text-yellow-400 text-sm mb-1">
                      4-6: Suspicious
                    </div>
                    <div className="text-yellow-300 text-xs">
                      Further analysis needed
                    </div>
                  </div>
                  <div
                    className={`rounded-lg p-3 text-center border transition-all ${
                      verdict?.color === "red" && result
                        ? "bg-red-900/50 border-red-500 ring-1 ring-red-400"
                        : "bg-red-900/30 border-red-700"
                    }`}
                  >
                    <div className="text-red-400 text-sm mb-1">
                      7-10: Deepfake
                    </div>
                    <div className="text-red-300 text-xs">
                      High confidence synthetic
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* End Right */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AnalyzePage;
