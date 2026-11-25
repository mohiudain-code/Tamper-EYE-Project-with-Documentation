import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Camera,
  FileBarChart2,
  Zap,
  Target,
  Eye,
  ArrowRight,
  CheckCircle,
  Sparkles,
  User,
  Brain,
  Lock,
  Upload,
  FileText,
  AlertTriangle,
  TrendingUp,
  Globe,
  Users,
  BarChart3,
  Layers,
  Cpu,
  Fingerprint,
  ScanLine,
} from "lucide-react";

import robotImg from "../assets/robot.png";
import neuralBg from "../assets/neural-bg.jpg";
import reportBg from "../assets/report-bg.jpg";

export function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const robotRef = useRef(null);

  // Scan card state: "idle" | "scanning" | "detected"
  const [scanState, setScanState] = useState("idle");

  const triggerScan = useCallback(() => {
    setScanState("scanning");
    setTimeout(() => setScanState("detected"), 2600);
  }, []);

  // Auto-trigger scan loop
  useEffect(() => {
    const startDelay = setTimeout(() => {
      triggerScan();
    }, 800);
    return () => clearTimeout(startDelay);
  }, [triggerScan]);

  const handleRescan = () => {
    setScanState("idle");
    setTimeout(() => triggerScan(), 400);
  };

  // Scroll reveal observer
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(
              () => entry.target.classList.add("visible"),
              Number(delay),
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (robotRef.current) {
        const rect = robotRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 50;
        const y = (e.clientY - rect.top - rect.height / 2) / 50;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="bg-[#0a0e1a] min-h-screen text-white">
      {/* Hero Section with 3D Robot */}
      <section className="relative min-h-[calc(100vh-64px)] flex items-center overflow-hidden ">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-transparent"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-2 leading-tight">
                Detect{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  Deepfakes
                </span>{" "}
                Instantly
              </h1>

              <p className="text-lg text-gray-400 mb-5 leading-relaxed">
                Advanced AI technology that analyzes images and videos to
                identify manipulated content in real-time. Protect yourself from
                misinformation and digital fraud.
              </p>

              {/* Live Analysis Scan Card */}
              <div
                className={`relative rounded-xl border p-4 mb-5 max-w-lg transition-all duration-700 ${
                  scanState === "detected"
                    ? "bg-[#1a0a1a]/80 border-pink-500/60 shadow-[0_0_30px_rgba(236,72,153,0.15)]"
                    : "bg-[#0d1525]/80 border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)]"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Avatar with scan effect */}
                  <div className="relative w-24 h-28 rounded-lg bg-[#0a1628] border border-cyan-800/40 flex items-center justify-center overflow-hidden flex-shrink-0">
                    <User className="w-10 h-10 text-cyan-700/60" />
                    {/* Scan line */}
                    {scanState === "scanning" && (
                      <div
                        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                        style={{
                          animation: "scanLine 1.3s ease-in-out infinite",
                        }}
                      />
                    )}
                    {/* Detection box overlay */}
                    {scanState === "detected" && (
                      <>
                        <div className="absolute inset-1 border-2 border-red-500/70 rounded-sm" />
                        <div className="absolute -bottom-0 left-0 right-0 bg-red-600 text-white text-[9px] font-bold tracking-wider text-center py-0.5">
                          DEEPFAKE
                        </div>
                      </>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-[10px] tracking-[0.2em] text-gray-500 uppercase mb-0.5">
                          Live Analysis
                        </p>
                        <p className="text-white text-sm">
                          video_frame_042.png
                        </p>
                      </div>
                      <span
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide transition-all duration-500 ${
                          scanState === "detected"
                            ? "bg-red-500/20 text-red-400 border border-red-500/40"
                            : scanState === "scanning"
                              ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                              : "bg-gray-500/20 text-gray-400 border border-gray-500/40"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            scanState === "detected"
                              ? "bg-red-400"
                              : scanState === "scanning"
                                ? "bg-cyan-400 animate-pulse"
                                : "bg-gray-400"
                          }`}
                        />
                        {scanState === "detected"
                          ? "DETECTED"
                          : scanState === "scanning"
                            ? "SCANNING"
                            : "READY"}
                      </span>
                    </div>

                    {/* Confidence bar */}
                    <div className="mb-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">Fake confidence</span>
                        <span
                          className={`font-semibold transition-colors duration-500 ${
                            scanState === "detected"
                              ? "text-cyan-400"
                              : "text-gray-500"
                          }`}
                        >
                          {scanState === "detected" ? "87%" : "—"}
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 transition-all duration-[1.5s] ease-out"
                          style={{
                            width: scanState === "detected" ? "87%" : "0%",
                          }}
                        />
                      </div>
                    </div>

                    {/* Artifacts bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">
                          Artifacts detected
                        </span>
                        <span
                          className={`font-semibold transition-colors duration-500 ${
                            scanState === "detected"
                              ? "text-green-400"
                              : "text-gray-500"
                          }`}
                        >
                          {scanState === "detected" ? "12 regions" : "—"}
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-[2s] ease-out"
                          style={{
                            width: scanState === "detected" ? "65%" : "0%",
                          }}
                        />
                      </div>
                    </div>

                    {/* Re-scan link */}
                    <button
                      onClick={handleRescan}
                      className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <span>Click to re-scan</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-5">
                <Link
                  to="/signup"
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/50"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/about"
                  className="px-8 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-400 hover:text-white transition-all flex items-center gap-2"
                >
                  Watch Demo
                </Link>
              </div>

              <div className="flex items-center gap-8 text-sm flex-wrap">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-400">97% Accuracy</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-400">Real-time Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-gray-400">Secure & Private</span>
                </div>
              </div>
            </div>

            {/* Right - 3D Interactive Robot */}
            <div className="relative" ref={robotRef}>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-20"></div>

              <div
                className="relative transition-transform duration-300 ease-out"
                style={{
                  transform: `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`,
                }}
              >
                <div className="relative flex justify-center items-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-500 rounded-full blur-3xl opacity-30"></div>

                  <img
                    src={robotImg}
                    alt="AI Robot"
                    className="relative z-10 w-[250px] md:w-[280px] lg:w-[320px] select-none pointer-events-none drop-shadow-2xl"
                    style={{
                      transform: `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg) translateZ(70px)`,
                      transition: "transform 0.15s ease-out",
                    }}
                  />
                </div>

                {/* Floating Icons */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-lg flex items-center justify-center animate-bounce">
                  <Eye className="w-6 h-6 text-blue-400" />
                </div>
                <div
                  className="absolute -bottom-4 -left-4 w-12 h-12 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 rounded-lg flex items-center justify-center animate-bounce"
                  style={{ animationDelay: "0.5s" }}
                >
                  <Zap className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two-Card Navigation Section */}
      <section
        className="py-16"
        style={{
          backgroundImage: "url('/aibg1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 reveal">
            <h2 className="text-white mb-4">Get Started</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Choose how you want to interact with our AI deepfake detection
              system
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Card — Analyze / Camera */}
            <Link
              to="/analyze"
              className="reveal from-left group relative overflow-hidden border border-gray-800 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:border-blue-500 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer min-h-[380px] bg-cover bg-center bg-no-repeat"
              data-delay="150"
              style={{ backgroundImage: `url(${neuralBg})` }}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-[#0f1629]/80"></div>

              {/* Gradient hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Background glow */}
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-500" />

              {/* Icon */}
              <div className="relative z-10 w-28 h-28 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl mb-8 flex items-center justify-center shadow-2xl shadow-blue-500/40 group-hover:scale-110 transition-transform duration-500">
                <Camera className="w-14 h-14 text-white" />
              </div>

              <h3 className="relative z-10 text-white text-3xl mb-4 group-hover:text-blue-300 transition-colors duration-300">
                Analyze Image
              </h3>
              <p className="relative z-10 text-gray-300 text-base max-w-xs leading-relaxed mb-8 group-hover:text-white transition-colors">
                Upload an image file and let our AI scan for deepfake
                manipulation in real-time.
              </p>

              <div className="relative z-10 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl group-hover:from-blue-500 group-hover:to-cyan-400 transition-all duration-300 shadow-lg shadow-blue-500/30">
                <span className="text-sm font-medium">Upload & Detect</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Corner badge */}
              <div className="absolute top-5 right-5 z-10 px-3 py-1 bg-blue-500/20 border border-blue-500/40 text-blue-400 rounded-full text-xs">
                Detailed
              </div>
            </Link>

            {/* Right Card — Report */}
            <Link
              to="/report"
              className="reveal from-right group relative overflow-hidden border border-gray-800 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:border-purple-500 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer min-h-[380px] bg-cover bg-center bg-no-repeat"
              data-delay="350"
              style={{ backgroundImage: `url(${reportBg})` }}
            >
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-[#0f1629]/80"></div>

              {/* Gradient hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Background glow */}
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-500" />

              {/* Icon */}
              <div className="relative z-10 w-28 h-28 bg-gradient-to-br from-purple-600 to-pink-500 rounded-3xl mb-8 flex items-center justify-center shadow-2xl shadow-purple-500/40 group-hover:scale-110 transition-transform duration-500">
                <FileBarChart2 className="w-14 h-14 text-white" />
              </div>

              <h3 className="relative z-10 text-white text-3xl mb-4 group-hover:text-purple-300 transition-colors duration-300">
                Analyze Video
              </h3>
              <p className="relative z-10 text-gray-300 text-base max-w-xs leading-relaxed mb-8 group-hover:text-white transition-colors">
                Explore detailed detection metrics, confidence scores, and AI
                verdict summaries for analyzed media.
              </p>

              <div className="relative z-10 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl group-hover:from-purple-500 group-hover:to-pink-400 transition-all duration-300 shadow-lg shadow-purple-500/30">
                <span className="text-sm font-medium">Upload & Detect</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Corner badge */}
              <div className="absolute top-5 right-5 z-10 px-3 py-1 bg-purple-500/20 border border-purple-500/40 text-purple-400 rounded-full text-xs">
                Detailed
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section
        className="py-20"
        style={{
          backgroundImage: "url('/aibg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-white text-3xl sm:text-4xl font-bold mb-4">
              Powered by Advanced AI
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Our technology combines cutting-edge neural networks with
              explainable AI to provide reliable deepfake detection.
            </p>
          </motion.div>

          <div className="flex flex-col gap-6">
            {/* Card 1 — Real-time Analysis */}
            <motion.div
              className="group relative overflow-hidden bg-gradient-to-r from-[#0f1629] to-[#1a1040] border border-gray-700/50 rounded-2xl p-8 sm:p-10 hover:border-red-500/60 transition-all duration-500"
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.015 }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/5 rounded-full blur-3xl group-hover:bg-red-500/10 transition-all duration-700" />
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <Zap className="w-7 h-7 text-red-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white text-xl font-semibold mb-3">
                    Real-time Analysis
                  </h4>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    Get instant results as our AI processes your media in
                    milliseconds. Whether it's a live video stream or an
                    uploaded image, our pipeline delivers frame-by-frame
                    verdicts without any noticeable delay.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="text-xs px-3 py-1 rounded-full bg-red-500/10 text-red-300 border border-red-500/20">
                      &lt; 200ms latency
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-red-500/10 text-red-300 border border-red-500/20">
                      Live stream support
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-red-500/10 text-red-300 border border-red-500/20">
                      Batch processing
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2 — High Accuracy */}
            <motion.div
              className="group relative overflow-hidden bg-gradient-to-r from-[#0f1629] to-[#0f2035] border border-gray-700/50 rounded-2xl p-8 sm:p-10 hover:border-blue-500/60 transition-all duration-500"
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.015 }}
            >
              <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all duration-700" />
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Target className="w-7 h-7 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white text-xl font-semibold mb-3">
                    High Accuracy Detection
                  </h4>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    Built on state-of-the-art deep learning models trained on
                    millions of authentic and manipulated samples. Our
                    multi-model ensemble approach cross-validates findings to
                    minimize false positives and catch even the most
                    sophisticated forgeries.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                      99.2% accuracy
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                      Multi-model ensemble
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                      GAN & diffusion aware
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 3 — Explainable AI */}
            <motion.div
              className="group relative overflow-hidden bg-gradient-to-r from-[#0f1629] to-[#1a0f35] border border-gray-700/50 rounded-2xl p-8 sm:p-10 hover:border-purple-500/60 transition-all duration-500"
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.015 }}
            >
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-all duration-700" />
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <Brain className="w-7 h-7 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white text-xl font-semibold mb-3">
                    Explainable AI
                  </h4>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    We don't just tell you something is fake — we show you why.
                    Interactive heatmaps highlight manipulated regions, detailed
                    confidence breakdowns explain each finding, and downloadable
                    PDF reports give you evidence-grade documentation.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      Visual heatmaps
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      Confidence scores
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                      PDF reports
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 4 — Secure & Private */}
            <motion.div
              className="group relative overflow-hidden bg-gradient-to-r from-[#0f1629] to-[#0f2519] border border-gray-700/50 rounded-2xl p-8 sm:p-10 hover:border-green-500/60 transition-all duration-500"
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.015 }}
            >
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-green-500/5 rounded-full blur-3xl group-hover:bg-green-500/10 transition-all duration-700" />
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <Lock className="w-7 h-7 text-green-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white text-xl font-semibold mb-3">
                    Secure & Private
                  </h4>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    Your data never leaves your control. All uploads are
                    encrypted end-to-end, processed in isolated sandboxed
                    environments, and permanently deleted after analysis. We are
                    fully compliant with GDPR and SOC 2 standards so you can
                    trust us with sensitive media.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-300 border border-green-500/20">
                      End-to-end encryption
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-300 border border-green-500/20">
                      Auto-delete after scan
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-300 border border-green-500/20">
                      GDPR compliant
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - Above Footer */}
      <section
        className="py-16"
        style={{
          backgroundImage: "url('/aibg1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center mb-8">
          <h2 className="text-white">
            The Threat of{" "}
            <span className="text-blue-400">AI-generated Deepfake</span>
          </h2>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              {
                title: "Content Propaganda",
                desc: "The rise of political deepfakes makes it easier to manipulate public opinion through false narratives.",
                color: "blue",
                image: "/Content-prooganda.png",
              },
              {
                title: "Fake Profiles",
                desc: "Fake profiles on social platforms with AI-generated images & videos can lure people into deepfake scams.",
                color: "purple",
                image: "/fake-profiles.png",
              },
              {
                title: "Real-Time Video Manipulation",
                desc: "Advanced scammers can hack live feeds and manipulate real-time videos.",
                color: "green",
                image: "/realtime-manipulation.png",
              },
              {
                title: "Misinformation",
                desc: "AI deepfakes can be used to spread misinformation and manipulate public opinion by creating realistic fake videos or audio.",
                color: "yellow",
                image: "/misinformation.png",
              },
            ].map(({ title, desc, image }, index) => (
              <div
                key={title}
                className="reveal group relative overflow-hidden rounded-xl border border-gray-800 h-full min-h-[280px] flex flex-col justify-end"
                data-delay={index * 150}
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${image})` }}
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-[#0a0e1a]/80 to-transparent" />

                {/* Content */}
                <div className="relative z-10 p-6">
                  <h4 className="text-white text-lg font-semibold mb-2">
                    {title}
                  </h4>
                  <p className="text-gray-400 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section: How It Works ── */}
      <section className="py-24 bg-[#060a14] relative overflow-hidden">
        {/* Animated background grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-sm font-medium tracking-widest text-blue-400 uppercase mb-4">
              Simple Process
            </span>
            <h2 className="text-white text-3xl sm:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              From upload to verdict in three simple steps. No technical
              expertise required — just drag, drop, and know the truth.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px -translate-y-1/2">
              <motion.div
                className="h-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.2, delay: 0.5 }}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  step: "01",
                  icon: Upload,
                  accent: "#06b6d4",
                  ringClass: "border-cyan-500/30",
                  bgClass: "bg-cyan-500/10",
                  iconClass: "text-cyan-400",
                  title: "Upload Your Media",
                  desc: "Drag and drop any image or video file into our secure analyzer. We support all major formats including JPEG, PNG, MP4, and WebM up to 500MB.",
                },
                {
                  step: "02",
                  icon: ScanLine,
                  accent: "#3b82f6",
                  ringClass: "border-blue-500/30",
                  bgClass: "bg-blue-500/10",
                  iconClass: "text-blue-400",
                  title: "AI Scans & Analyzes",
                  desc: "Our neural network ensemble examines facial landmarks, pixel-level artifacts, temporal inconsistencies, and compression signatures across every frame.",
                },
                {
                  step: "03",
                  icon: FileText,
                  accent: "#a855f7",
                  ringClass: "border-purple-500/30",
                  bgClass: "bg-purple-500/10",
                  iconClass: "text-purple-400",
                  title: "Get Detailed Report",
                  desc: "Receive a comprehensive breakdown with confidence scores, highlighted manipulation zones, and a downloadable forensic report you can use as evidence.",
                },
              ].map(
                (
                  {
                    step,
                    icon: Icon,
                    accent,
                    ringClass,
                    bgClass,
                    iconClass,
                    title,
                    desc,
                  },
                  index,
                ) => (
                  <motion.div
                    key={step}
                    className="relative"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    <div className="group relative bg-[#0b1022] border border-gray-800 rounded-2xl p-8 text-center hover:border-blue-500/40 transition-all duration-500 h-full">
                      {/* Step number */}
                      <motion.div
                        className="text-7xl font-black text-white/[0.03] absolute top-4 right-6 select-none"
                        whileInView={{ opacity: [0, 1] }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 + index * 0.2 }}
                      >
                        {step}
                      </motion.div>

                      {/* Icon with animated ring */}
                      <div className="relative w-20 h-20 mx-auto mb-6">
                        <motion.div
                          className={`absolute inset-0 rounded-full border-2 border-dashed ${ringClass}`}
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        <div
                          className={`absolute inset-2 rounded-full ${bgClass} flex items-center justify-center`}
                        >
                          <Icon className={`w-8 h-8 ${iconClass}`} />
                        </div>
                      </div>

                      <h4 className="text-white text-xl font-semibold mb-3">
                        {title}
                      </h4>
                      <p className="text-gray-400 leading-relaxed text-sm">
                        {desc}
                      </p>

                      {/* Arrow connector for mobile */}
                      {index < 2 && (
                        <div className="lg:hidden flex justify-center mt-6">
                          <motion.div
                            animate={{ y: [0, 6, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ArrowRight className="w-5 h-5 text-blue-500/50 rotate-90" />
                          </motion.div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section: Live Detection Ticker + Deepfake Timeline ── */}
      <section
        className="py-24 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #060a14 0%, #0a1028 50%, #060a14 100%)",
        }}
      >
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{ left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-sm font-medium tracking-widest text-purple-400 uppercase mb-4">
              The Growing Crisis
            </span>
            <h2 className="text-white text-3xl sm:text-4xl font-bold mb-4">
              Deepfakes Are Evolving —{" "}
              <span className="bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
                So Are We
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Every year deepfakes become harder to detect with the naked eye.
              Our AI stays ahead of the curve with continuous model updates.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical center line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px sm:-translate-x-px">
              <motion.div
                className="w-full h-full bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-red-500/50"
                initial={{ scaleY: 0, originY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 1.5 }}
              />
            </div>

            <div className="space-y-12">
              {[
                {
                  year: "2017",
                  title: "The Beginning",
                  desc: "First deepfake videos surface on Reddit using basic face-swapping autoencoders. Detection was trivial — visible artifacts and blurring made fakes obvious to the trained eye.",
                  icon: Layers,
                  dotColor: "#3b82f6",
                  iconBoxClass: "bg-blue-500/10 border-blue-500/20",
                  iconClass: "text-blue-400",
                  yearClass: "text-blue-400",
                  side: "left",
                },
                {
                  year: "2019",
                  title: "GANs Go Mainstream",
                  desc: "Generative Adversarial Networks produce photorealistic faces. StyleGAN makes it possible to create entirely fictional people that fool most humans. Detection difficulty rises sharply.",
                  icon: Cpu,
                  dotColor: "#06b6d4",
                  iconBoxClass: "bg-cyan-500/10 border-cyan-500/20",
                  iconClass: "text-cyan-400",
                  yearClass: "text-cyan-400",
                  side: "right",
                },
                {
                  year: "2021",
                  title: "Real-time Manipulation",
                  desc: "Live video deepfakes emerge, enabling real-time face swaps during video calls. Scammers begin using the technology for financial fraud and identity theft at scale.",
                  icon: AlertTriangle,
                  dotColor: "#eab308",
                  iconBoxClass: "bg-yellow-500/10 border-yellow-500/20",
                  iconClass: "text-yellow-400",
                  yearClass: "text-yellow-400",
                  side: "left",
                },
                {
                  year: "2023",
                  title: "Diffusion Models Era",
                  desc: "Diffusion-based generators produce near-perfect synthetic media. Traditional detection methods fail. Multi-modal AI analysis becomes essential for reliable detection.",
                  icon: TrendingUp,
                  dotColor: "#a855f7",
                  iconBoxClass: "bg-purple-500/10 border-purple-500/20",
                  iconClass: "text-purple-400",
                  yearClass: "text-purple-400",
                  side: "right",
                },
                {
                  year: "2025",
                  title: "Our Response",
                  desc: "DeepDetect launches with an ensemble of 12+ specialized models capable of detecting GAN, diffusion, and hybrid deepfakes with over 99% accuracy — even on compressed social-media uploads.",
                  icon: Fingerprint,
                  dotColor: "#22c55e",
                  iconBoxClass: "bg-green-500/10 border-green-500/20",
                  iconClass: "text-green-400",
                  yearClass: "text-green-400",
                  side: "left",
                },
              ].map(
                (
                  {
                    year,
                    title,
                    desc,
                    icon: Icon,
                    dotColor,
                    iconBoxClass,
                    iconClass,
                    yearClass,
                    side,
                  },
                  index,
                ) => (
                  <motion.div
                    key={year}
                    className={`relative flex items-start gap-6 sm:gap-0 ${
                      side === "right" ? "sm:flex-row-reverse" : ""
                    }`}
                    initial={{ opacity: 0, x: side === "left" ? -60 : 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {/* Dot on the line */}
                    <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-3 h-3 mt-2">
                      <motion.div
                        className="w-full h-full rounded-full"
                        style={{
                          backgroundColor: dotColor,
                          boxShadow: `0 0 12px ${dotColor}80`,
                        }}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: 0.3 + index * 0.1,
                          type: "spring",
                        }}
                      />
                    </div>

                    {/* Content card */}
                    <div
                      className={`ml-10 sm:ml-0 sm:w-[calc(50%-2rem)] ${side === "left" ? "sm:pr-0" : "sm:pl-0"}`}
                    >
                      <div className="group bg-[#0b1022]/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition-all duration-500">
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className={`w-10 h-10 rounded-lg border flex items-center justify-center ${iconBoxClass}`}
                          >
                            <Icon className={`w-5 h-5 ${iconClass}`} />
                          </div>
                          <span
                            className={`font-mono font-bold text-lg ${yearClass}`}
                          >
                            {year}
                          </span>
                        </div>
                        <h4 className="text-white font-semibold text-lg mb-2">
                          {title}
                        </h4>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {desc}
                        </p>
                      </div>
                    </div>

                    {/* Spacer for the other side */}
                    <div className="hidden sm:block sm:w-[calc(50%-2rem)]" />
                  </motion.div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section: CTA / Ready to Detect ── */}
      <section className="py-28 relative overflow-hidden bg-[#060a14]">
        {/* Animated radial gradient background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(59,130,246,0.08) 0%, transparent 70%)",
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(139,92,246,0.08) 0%, transparent 70%)",
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(59,130,246,0.08) 0%, transparent 70%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Orbiting ring decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px]">
          <motion.div
            className="w-full h-full rounded-full border border-dashed border-white/[0.04]"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-12 rounded-full border border-dashed border-white/[0.03]"
            animate={{ rotate: -360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-24 rounded-full border border-dashed border-white/[0.02]"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Ready to Uncover the{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Truth
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </span>
              ?
            </h2>

            <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Don't let manipulated media deceive you. Upload any suspicious
              image or video and get an instant AI-powered forensic analysis
              with full transparency into what was detected and why.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/analyze">
                <motion.button
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold text-lg overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center gap-2">
                    Start Analyzing Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </Link>

              <Link to="/about">
                <motion.button
                  className="px-8 py-4 border border-gray-700 rounded-xl text-gray-300 font-semibold text-lg hover:border-gray-500 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Learn More
                </motion.button>
              </Link>
            </div>

            {/* Trust indicators */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-14 pt-10 border-t border-gray-800/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {[
                { icon: Globe, label: "Used in 40+ Countries" },
                { icon: Users, label: "50K+ Scans Completed" },
                { icon: BarChart3, label: "99.2% Detection Rate" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-gray-500"
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
