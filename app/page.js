"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

function FloatingHearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const heartEmojis = ["💖", "💕", "💗", "💘", "💝", "🌸", "✨", "💐", "🩷"];
    const generated = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      emoji: heartEmojis[i % heartEmojis.length],
      left: Math.random() * 100,
      size: 12 + Math.random() * 16,
      duration: 14 + Math.random() * 20,
      delay: Math.random() * 18,
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

function GlowOrbs() {
  return (
    <>
      <div
        className="glow-orb"
        style={{
          width: 600,
          height: 600,
          top: "-15%",
          left: "-10%",
          background:
            "radial-gradient(circle, rgba(219, 48, 99, 0.18), transparent)",
        }}
      />
      <div
        className="glow-orb"
        style={{
          width: 500,
          height: 500,
          bottom: "5%",
          right: "-8%",
          background:
            "radial-gradient(circle, rgba(167, 17, 60, 0.14), transparent)",
        }}
      />
      <div
        className="glow-orb"
        style={{
          width: 350,
          height: 350,
          top: "45%",
          left: "48%",
          background:
            "radial-gradient(circle, rgba(124, 58, 237, 0.08), transparent)",
          opacity: 0.6,
        }}
      />
    </>
  );
}

function ConfettiBurst() {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    const colors = [
      "#db3063",
      "#f472b6",
      "#f9a8d4",
      "#fb7185",
      "#a7113c",
      "#fda4af",
      "#fecdd3",
      "#ffffff",
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
          color: "#fda4af",
          fontSize: "0.95rem",
          fontWeight: 600,
          letterSpacing: "2px",
          textTransform: "uppercase",
        }}
      >
        Reading the stars for you...
      </p>
      <div
        className="shimmer-loader"
        style={{
          width: 220,
          height: 4,
          borderRadius: 100,
        }}
      />
    </div>
  );
}

function TraitCard({ trait, index }) {
  const levelClass =
    trait.level === "Extreme"
      ? "level-extreme"
      : trait.level === "Intense"
      ? "level-intense"
      : trait.level === "Strong"
      ? "level-strong"
      : trait.level === "Present"
      ? "level-present"
      : "level-absent";

  const barWidth =
    trait.level === "Extreme"
      ? "100%"
      : trait.level === "Intense"
      ? "85%"
      : trait.level === "Strong"
      ? "70%"
      : trait.level === "Present"
      ? "40%"
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
              fontSize: "0.95rem",
              fontWeight: 700,
              color: "#ffffff",
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
          lineHeight: 1.65,
          color: "rgba(255, 255, 255, 0.55)",
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

function ProfileSection({ profile, label, icon }) {
  const [activeTab, setActiveTab] = useState("all");

  // Find which levels exist in this person's traits
  const levelCounts = {};
  profile.allTraits.forEach((trait) => {
    levelCounts[trait.level] = (levelCounts[trait.level] || 0) + 1;
  });

  // Define level metadata
  const levelMeta = {
    Extreme: { emoji: "🔥", label: "Extreme" },
    Intense: { emoji: "⚡", label: "Intense" },
    Strong: { emoji: "💪", label: "Strong" },
    Present: { emoji: "✨", label: "Present" },
    Absent: { emoji: "🔍", label: "Absent" },
  };

  // Create dynamic tabs based on existing levels
  const dynamicTabs = [];

  // Add tabs for each level that exists
  ["Extreme", "Intense", "Strong", "Present", "Absent"].forEach((level) => {
    if (levelCounts[level]) {
      const meta = levelMeta[level];
      dynamicTabs.push({
        key: level,
        label: `${meta.emoji} ${meta.label}`,
        count: levelCounts[level],
      });
    }
  });

  // Always add "All" tab at the end
  dynamicTabs.push({
    key: "all",
    label: "🌈 All Traits",
    count: profile.allTraits.length,
  });

  const tabs = dynamicTabs;

  // Filter traits based on active tab
  const currentTraits =
    activeTab === "all"
      ? profile.allTraits
      : profile.allTraits.filter((trait) => trait.level === activeTab);

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
              fontSize: "0.75rem",
              color: "#db3063",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            {label}
          </p>
          <p
            style={{
              fontSize: "0.82rem",
              color: "rgba(255, 255, 255, 0.38)",
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
              color: "rgba(219, 48, 99, 0.35)",
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

function ResultsDisplay({ data }) {
  const compatType = data.compatibility.type;
  console.log("Compat Type: ", compatType);

  const badgeClass =
    compatType === "Destined"
      ? "compat-destined"
      : compatType === "Harmony"
      ? "compat-harmony"
      : compatType === "Favourable"
      ? "compat-favourable"
      : compatType === "Neutral"
      ? "compat-neutral"
      : compatType === "Challenging"
      ? "compat-challenging"
      : "compat-clash";

  const compatIcon =
    compatType === "Destined"
      ? "🌌"
      : compatType === "Harmony"
      ? "💖 "
      : compatType === "Favorable"
      ? "💝"
      : compatType === "Neutral"
      ? "🤝"
      : compatType === "Challenging"
      ? "⚡"
      : "💔";

  return (
    <div style={{ marginTop: 40 }}>
      <div
        className="glass-card result-enter stagger-1"
        style={{ padding: "36px 32px", textAlign: "center", marginBottom: 28 }}
      >
        <p
          style={{
            fontSize: "0.72rem",
            color: "#db3063",
            textTransform: "uppercase",
            letterSpacing: "3px",
            fontWeight: 700,
            marginBottom: 20,
          }}
        >
          Your Compatibility
        </p>

        <span className={`compat-badge ${badgeClass}`}>
          {compatIcon} {compatType}
        </span>

        <p
          style={{
            marginTop: 24,
            fontSize: "1rem",
            lineHeight: 1.75,
            color: "rgba(255, 255, 255, 0.65)",
            maxWidth: 600,
            marginInline: "auto",
          }}
        >
          {data.compatibility.message}
        </p>
      </div>

      <div
        className="result-enter stagger-3"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          marginBottom: 20,
          alignItems: "start",
        }}
      >
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

export default function Home() {
  const [dob1, setDob1] = useState("2026-01-01");
  const [dob2, setDob2] = useState("2026-01-01");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  // Convert YYYY-MM-DD to DD-MM-YYYY for API
  const convertToApiFormat = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    const dayPadded = (day || "").padStart(2, "0");
    const monthPadded = (month || "").padStart(2, "0");
    return `${dayPadded}-${monthPadded}-${year}`;
  };

  const handleSubmit = useCallback(async () => {
    setError("");
    setResult(null);

    if (!dob1 || !dob2) {
      setError("Please select both dates of birth");
      return;
    }

    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API;
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dob1: convertToApiFormat(dob1),
          dob2: convertToApiFormat(dob2),
        }),
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

      <main
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "1200px",
          padding: "56px 20px 80px",
        }}
      >
        {/* ── HEADER ── */}
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <Image
            src="/logo.svg"
            alt="Phool Aur Kaante"
            width={220}
            height={220}
            priority
            style={{
              filter:
                "drop-shadow(0 0 24px rgba(219, 48, 99, 0.45)) drop-shadow(0 0 8px rgba(219, 48, 99, 0.2)) brightness(1.05)",
            }}
          />

          <h1
            className="title-gradient"
            style={{
              fontSize: "clamp(2.8rem, 7vw, 4.5rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: 14,
              marginTop: 8,
            }}
          >
            Phool Aur Kaante
          </h1>

          <p
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "4px",
              color: "#db3063",
              fontWeight: 700,
              marginBottom: 20,
            }}
          >
            Valentine{" "}
            <span className="pulse-heart" style={{ display: "inline-block" }}>
              💖
            </span>{" "}
            Compatibility
          </p>

          {/* KIITFest Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(219, 48, 99, 0.08)",
              border: "1px solid rgba(219, 48, 99, 0.2)",
              borderRadius: 8,
              padding: "8px 18px",
              marginBottom: 20,
            }}
          >
            <span
              style={{
                fontSize: "0.65rem",
                textTransform: "uppercase",
                letterSpacing: "2px",
                color: "rgba(255,255,255,0.35)",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              Presented at
            </span>
            <Image
              src="/kiitfest-main-logo.avif"
              alt="KIIT FEST 9.0"
              width={100}
              height={32}
              style={{
                objectFit: "contain",
                filter:
                  "brightness(1.1) drop-shadow(0 0 6px rgba(219,48,99,0.3))",
              }}
            />
          </div>

          <p
            style={{
              fontSize: "1rem",
              color: "rgba(255, 255, 255, 0.5)",
              maxWidth: 480,
              marginInline: "auto",
              lineHeight: 1.75,
            }}
          >
            Enter your dates of birth and discover how the cosmos connects your
            souls
          </p>
        </div>

        {/* ── INPUT CARD ── */}
        <div className="glass-card" style={{ padding: "40px 36px" }}>
          {/* subtle section label */}
          <p
            style={{
              fontSize: "0.72rem",
              textTransform: "uppercase",
              letterSpacing: "3px",
              color: "rgba(219,48,99,0.7)",
              fontWeight: 700,
              marginBottom: 24,
              textAlign: "center",
            }}
          >
            — Enter Dates of Birth —
          </p>

          <div
            className="date-inputs-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
            }}
          >
            <div className="date-input-wrapper">
              <label className="date-label" htmlFor="dob1">
                🌹 Partner One
              </label>
              <input
                id="dob1"
                className="date-input"
                type="date"
                value={dob1}
                onChange={(e) => setDob1(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="date-input-wrapper">
              <label className="date-label" htmlFor="dob2">
                🌷 Partner Two
              </label>
              <input
                id="dob2"
                className="date-input"
                type="date"
                value={dob2}
                onChange={(e) => setDob2(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          {error && (
            <p
              style={{
                marginTop: 16,
                color: "#fda4af",
                fontSize: "0.88rem",
                textAlign: "center",
                fontWeight: 600,
                letterSpacing: "0.5px",
              }}
            >
              ⚠ {error}
            </p>
          )}

          <div style={{ textAlign: "center", marginTop: 36 }}>
            <button
              className="cta-button"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "✨ Matching..." : "💘 Check Compatibility"}
            </button>
          </div>
        </div>

        {loading && <LoadingState />}

        {result && !loading && <ResultsDisplay data={result} />}

        {/* ── FOOTER ── */}
        <div
          style={{
            textAlign: "center",
            marginTop: 64,
            padding: "24px 0",
            borderTop: "1px solid rgba(219, 48, 99, 0.12)",
          }}
        >
          <p
            style={{
              fontSize: "0.72rem",
              color: "rgba(219, 48, 99, 0.6)",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Made with 💖 by Konnexions
          </p>
        </div>
      </main>
    </div>
  );
}
