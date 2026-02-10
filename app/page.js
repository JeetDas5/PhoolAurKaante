"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

/* ──────────────── Floating Hearts Background ──────────────── */
function FloatingHearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const heartEmojis = ["💖", "💕", "💗", "💘", "💝", "🌸", "✨", "💐", "🩷"];
    const generated = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      emoji: heartEmojis[i % heartEmojis.length],
      left: Math.random() * 100,
      size: 14 + Math.random() * 18,
      duration: 12 + Math.random() * 18,
      delay: Math.random() * 15,
    }));
    setHearts(generated);
  }, []);

  return (
    <div className="hearts-bg">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="floating-heart"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}

/* ──────────────── Glow Orbs ──────────────── */
function GlowOrbs() {
  return (
    <>
      <div
        className="glow-orb"
        style={{
          width: 500,
          height: 500,
          top: "-10%",
          left: "-10%",
          background:
            "radial-gradient(circle, rgba(236, 72, 153, 0.1), transparent)",
        }}
      />
      <div
        className="glow-orb"
        style={{
          width: 400,
          height: 400,
          bottom: "5%",
          right: "-5%",
          background:
            "radial-gradient(circle, rgba(190, 24, 93, 0.08), transparent)",
        }}
      />
      <div
        className="glow-orb"
        style={{
          width: 300,
          height: 300,
          top: "40%",
          left: "50%",
          background:
            "radial-gradient(circle, rgba(217, 70, 239, 0.06), transparent)",
          opacity: 1,
        }}
      />
    </>
  );
}

/* ──────────────── Confetti Burst ──────────────── */
function ConfettiBurst() {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    const colors = [
      "#ec4899",
      "#f472b6",
      "#f9a8d4",
      "#fb7185",
      "#e879f9",
      "#fda4af",
      "#fecdd3",
      "#fff",
    ];
    const generated = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: colors[i % colors.length],
      size: 6 + Math.random() * 8,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 0.8,
      shape: Math.random() > 0.5 ? "50%" : "2px",
    }));
    setPieces(generated);

    const timer = setTimeout(() => setPieces([]), 4000);
    return () => clearTimeout(timer);
  }, []);

  return pieces.map((p) => (
    <div
      key={p.id}
      className="confetti-piece"
      style={{
        left: `${p.left}%`,
        width: p.size,
        height: p.size,
        borderRadius: p.shape,
        background: p.color,
        animationDuration: `${p.duration}s`,
        animationDelay: `${p.delay}s`,
      }}
    />
  ));
}

/* ──────────────── Loading State ──────────────── */
function LoadingState() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
        padding: "60px 0",
      }}
    >
      <div className="love-spinner" style={{ fontSize: "3rem" }}>
        💖
      </div>
      <p
        style={{
          color: "#be185d",
          fontSize: "1.1rem",
          fontWeight: 500,
          letterSpacing: "0.5px",
        }}
      >
        Reading the stars for you...
      </p>
      <div
        className="shimmer-loader"
        style={{
          width: 200,
          height: 6,
          borderRadius: 100,
          background: "rgba(244, 114, 182, 0.15)",
        }}
      />
    </div>
  );
}

/* ──────────────── Trait Card ──────────────── */
function TraitCard({ trait, index }) {
  const levelClass =
    trait.level === "Strong"
      ? "level-strong"
      : trait.level === "Present"
      ? "level-present"
      : "level-absent";

  const barWidth =
    trait.level === "Strong"
      ? "100%"
      : trait.level === "Present"
      ? "50%"
      : "8%";

  return (
    <div
      className="trait-card result-enter"
      style={{ animationDelay: `${0.1 + index * 0.08}s`, opacity: 0 }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <div>
          <span className="trait-emoji">{trait.emoji}</span>
          <h4
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "#1a0014",
              marginBottom: 4,
            }}
          >
            {trait.name}
          </h4>
        </div>
        <span className={`trait-level ${levelClass}`}>{trait.level}</span>
      </div>

      <p
        style={{
          fontSize: "0.82rem",
          lineHeight: 1.6,
          color: "rgba(26, 0, 20, 0.7)",
          marginBottom: 8,
          whiteSpace: "pre-line",
        }}
      >
        {trait.personality}
      </p>

      <div className="energy-bar-bg">
        <div className="energy-bar-fill" style={{ width: barWidth }} />
      </div>
    </div>
  );
}

/* ──────────────── Profile Section ──────────────── */
function ProfileSection({ profile, label, icon }) {
  const [activeTab, setActiveTab] = useState("strongest");

  const tabs = [
    { key: "strongest", label: "💪 Strongest" },
    { key: "missing", label: "🔍 Missing" },
    { key: "all", label: "🌈 All Traits" },
  ];

  // Derive strongest and missing traits from allTraits based on level
  const strongestTraits = profile.allTraits.filter(
    (trait) => trait.level === "Strong" || trait.level === "Present"
  );
  const missingTraits = profile.allTraits.filter(
    (trait) => trait.level === "Absent"
  );

  const traitsMap = {
    strongest: strongestTraits,
    missing: missingTraits,
    all: profile.allTraits,
  };

  const currentTraits = traitsMap[activeTab] || [];

  return (
    <div className="profile-section" style={{ paddingTop: 24 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 16,
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: "1.8rem" }}>{icon}</span>
        <div>
          <p
            style={{
              fontSize: "0.8rem",
              color: "rgba(190, 24, 93, 0.7)",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {label}
          </p>
          <p
            style={{
              fontSize: "0.85rem",
              color: "rgba(26, 0, 20, 0.5)",
              marginTop: 2,
            }}
          >
            DOB: {profile.dob}
          </p>
        </div>
        <span className="archetype-tag" style={{ marginLeft: "auto" }}>
          {profile.archetype}
        </span>
      </div>

      {/* Trait Tabs */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 20,
          flexWrap: "wrap",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`trait-tab ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Traits Grid */}
      <div
        className="tab-panel-enter"
        key={activeTab}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 14,
        }}
      >
        {currentTraits.map((trait, i) => (
          <TraitCard key={trait.number} trait={trait} index={i} />
        ))}
        {currentTraits.length === 0 && (
          <p
            style={{
              color: "rgba(190, 24, 93, 0.4)",
              fontStyle: "italic",
              padding: 24,
            }}
          >
            No traits in this category
          </p>
        )}
      </div>
    </div>
  );
}

/* ──────────────── Results Display ──────────────── */
function ResultsDisplay({ data }) {
  const compatType = data.compatibility.type;
  
  const badgeClass =
    compatType === "Harmony"
      ? "compat-positive"
      : compatType === "Neutral"
      ? "compat-neutral"
      : "compat-negative";

  const compatIcon =
    compatType === "Positive" ? "💖" : compatType === "Neutral" ? "🌻" : "⚡";

  return (
    <div style={{ marginTop: 40 }}>
      {/* Compatibility Header */}
      <div
        className="glass-card result-enter stagger-1"
        style={{ padding: "36px 32px", textAlign: "center", marginBottom: 28 }}
      >
        <p
          style={{
            fontSize: "0.8rem",
            color: "rgba(190, 24, 93, 0.6)",
            textTransform: "uppercase",
            letterSpacing: "2px",
            fontWeight: 700,
            marginBottom: 16,
          }}
        >
          Your Compatibility
        </p>

        <span className={`compat-badge ${badgeClass}`}>
          {compatIcon} {compatType}
        </span>

        <p
          style={{
            marginTop: 20,
            fontSize: "1.05rem",
            lineHeight: 1.7,
            color: "rgba(26, 0, 20, 0.75)",
            maxWidth: 600,
            marginInline: "auto",
          }}
        >
          {data.compatibility.message}
        </p>
      </div>

      {/* Profiles Side by Side */}
      <div
        className="result-enter stagger-3"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          marginBottom: 20,
        }}
      >
        {/* Profile A */}
        <div className="glass-card" style={{ padding: "32px 28px" }}>
          <ProfileSection
            profile={data.profileA}
            label="Partner One"
            icon="👤"
          />
        </div>

        <div className="glass-card" style={{ padding: "32px 28px" }}>
          <ProfileSection
            profile={data.profileB}
            label="Partner Two"
            icon="👤"
          />
        </div>
      </div>
    </div>
  );
}

/* ──────────────── MAIN PAGE ──────────────── */
export default function Home() {
  const [dob1, setDob1] = useState("");
  const [dob2, setDob2] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  /* format DD-MM-YYYY automatically */
  const handleDobChange = useCallback((value, setter) => {
    // strip non-digits
    let digits = value.replace(/\D/g, "");
    if (digits.length > 8) digits = digits.slice(0, 8);

    let formatted = "";
    if (digits.length > 0) formatted = digits.slice(0, 2);
    if (digits.length > 2) formatted += "-" + digits.slice(2, 4);
    if (digits.length > 4) formatted += "-" + digits.slice(4, 8);

    setter(formatted);
  }, []);

  const isValidDate = (dob) => /^\d{2}-\d{2}-\d{4}$/.test(dob);

  const handleSubmit = useCallback(async () => {
    setError("");
    setResult(null);

    if (!isValidDate(dob1) || !isValidDate(dob2)) {
      setError("Please enter both dates in DD-MM-YYYY format");
      return;
    }

    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API;
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dob1, dob2 }),
      });

      if (!res.ok) throw new Error("Something went wrong! Try again.");

      const data = await res.json();
      setResult(data);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    } catch (err) {
      setError(err.message || "Failed to fetch compatibility. Try again!");
    } finally {
      setLoading(false);
    }
  }, [dob1, dob2]);

  /* Handle Enter key press */
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && !loading) {
        handleSubmit();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleSubmit, loading]);

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <FloatingHearts />
      <GlowOrbs />
      {showConfetti && <ConfettiBurst />}

      {/* ─── HERO ─── */}
      <main
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "85%",
          padding: "48px 20px 80px",
        }}
      >
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          {/* Logo */}
          <Image
            src="/logo.svg"
            alt="Phool Aur Kaante"
            width={180}
            height={180}
            priority
            style={{
              marginBottom: 24,
              filter: "drop-shadow(0 0 20px rgba(236, 72, 153, 0.3))",
            }}
          />

          <h1
            className="title-gradient"
            style={{
              fontSize: "clamp(3rem, 7vw, 4rem)",
              fontWeight: 900,
              lineHeight: 1.15,
              marginBottom: 16,
            }}
          >
            Phool Aur Kaante
          </h1>
          <p
            style={{
              fontSize: "0.9rem",
              textTransform: "uppercase",
              letterSpacing: "3px",
              color: "rgba(249,118,212,0.8)",
              fontWeight: 600,
              marginBottom: 12,
            }}
          >
            Valentine{" "}
            <span className="pulse-heart" style={{ display: "inline-block" }}>
              💖
            </span>{" "}
            Compatibility
          </p>
          <p
            style={{
              fontSize: "1.05rem",
              color: "rgba(26, 0, 20, 0.6)",
              maxWidth: 500,
              marginInline: "auto",
              lineHeight: 1.7,
            }}
          >
            Enter your dates of birth and discover how the cosmos connects your
            souls
          </p>
        </div>

        {/* ─── INPUT CARD ─── */}
        <div className="glass-card" style={{ padding: "40px 32px" }}>
          <div
            className="date-inputs-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
            }}
          >
            {/* DOB 1 */}
            <div className="date-input-wrapper">
              <label className="date-label" htmlFor="dob1">
                🌹 Partner One
              </label>
              <input
                id="dob1"
                className="date-input"
                type="text"
                placeholder="DD-MM-YYYY"
                value={dob1}
                onChange={(e) => handleDobChange(e.target.value, setDob1)}
                maxLength={10}
              />
            </div>

            {/* DOB 2 */}
            <div className="date-input-wrapper">
              <label className="date-label" htmlFor="dob2">
                🌷 Partner Two
              </label>
              <input
                id="dob2"
                className="date-input"
                type="text"
                placeholder="DD-MM-YYYY"
                value={dob2}
                onChange={(e) => handleDobChange(e.target.value, setDob2)}
                maxLength={10}
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <p
              style={{
                marginTop: 16,
                color: "#fb7185",
                fontSize: "0.9rem",
                textAlign: "center",
                fontWeight: 500,
              }}
            >
              {error}
            </p>
          )}

          {/* CTA */}
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button
              className="cta-button"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "✨ Matching..." : "💘 Check Compatibility"}
            </button>
          </div>
        </div>

        {/* ─── LOADING ─── */}
        {loading && <LoadingState />}

        {/* ─── RESULTS ─── */}
        {result && !loading && <ResultsDisplay data={result} />}

        {/* ─── FOOTER ─── */}
        <div
          style={{
            textAlign: "center",
            marginTop: 60,
            padding: "24px 0",
          }}
        >
          <p
            style={{
              fontSize: "0.8rem",
              color: "rgba(190, 24, 93, 0.4)",
              letterSpacing: "0.5px",
            }}
          >
            Made with 💖 by Konnexions
          </p>
        </div>
      </main>
    </div>
  );
}
