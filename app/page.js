"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { validateKFID, fetchAndEmailCompatibility } from "./actions";

// ─── Background Effects ────────────────────────────────────────────────────
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

// ─── Loading State ─────────────────────────────────────────────────────────
function LoadingState({ message }) {
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
          textAlign: "center",
        }}
      >
        {message || "Reading the stars for you..."}
      </p>
      <div
        className="shimmer-loader"
        style={{ width: 220, height: 4, borderRadius: 100 }}
      />
    </div>
  );
}

// ─── Step Indicator ────────────────────────────────────────────────────────
function StepIndicator({ currentStep }) {
  const steps = [
    { num: 1, label: "Verify" },
    { num: 2, label: "Dates" },
    { num: 3, label: "Done" },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
        marginBottom: 40,
      }}
    >
      {steps.map((step, idx) => (
        <div key={step.num} style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: `2px solid ${
                  currentStep >= step.num ? "#db3063" : "rgba(219,48,99,0.25)"
                }`,
                background:
                  currentStep >= step.num
                    ? "linear-gradient(135deg, #db3063, #a7113c)"
                    : "rgba(219,48,99,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.85rem",
                fontWeight: 700,
                color:
                  currentStep >= step.num ? "#fff" : "rgba(219,48,99,0.35)",
                transition: "all 0.3s ease",
                boxShadow:
                  currentStep >= step.num
                    ? "0 0 16px rgba(219,48,99,0.35)"
                    : "none",
              }}
            >
              {currentStep > step.num ? "✓" : step.num}
            </div>
            <span
              style={{
                fontSize: "0.62rem",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                color:
                  currentStep >= step.num ? "#db3063" : "rgba(219,48,99,0.3)",
                fontWeight: 700,
                transition: "color 0.3s ease",
              }}
            >
              {step.label}
            </span>
          </div>

          {idx < steps.length - 1 && (
            <div
              style={{
                width: 60,
                height: 2,
                marginBottom: 22,
                background:
                  currentStep > step.num
                    ? "linear-gradient(90deg, #db3063, #a7113c)"
                    : "rgba(219,48,99,0.15)",
                transition: "background 0.3s ease",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Step 1: KFID Input ────────────────────────────────────────────────────
function KFIDStep({ onSuccess }) {
  const [kfid, setKfid] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    setError("");
    const trimmed = kfid.trim();
    if (!trimmed) {
      setError("Please enter your KFID.");
      return;
    }

    setLoading(true);
    try {
      const result = await validateKFID(trimmed);
      if (result.success) {
        onSuccess({ name: result.name, email: result.email });
      } else {
        setError(result.message || "Verification failed. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) handleVerify();
  };

  return (
    <div className="glass-card" style={{ padding: "40px 36px" }}>
      <p
        style={{
          fontSize: "0.72rem",
          textTransform: "uppercase",
          letterSpacing: "3px",
          color: "rgba(219,48,99,0.7)",
          fontWeight: 700,
          marginBottom: 28,
          textAlign: "center",
        }}
      >
        — Enter Your KFID —
      </p>

      <p
        style={{
          fontSize: "0.9rem",
          color: "rgba(255,255,255,0.45)",
          textAlign: "center",
          marginBottom: 28,
          lineHeight: 1.65,
        }}
      >
        Enter your KIITFest 9.0 Participant ID to verify your registration and
        unlock your cosmic compatibility result.
      </p>

      <div
        className="date-input-wrapper"
        style={{ maxWidth: 400, margin: "0 auto 8px" }}
      >
        <label className="date-label" htmlFor="kfid-input">
          🎟️ Your KFID
        </label>
        <input
          id="kfid-input"
          className="date-input"
          type="text"
          value={kfid}
          onChange={(e) => setKfid(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. KF123456"
          style={{ textAlign: "center", letterSpacing: "2px", fontWeight: 700 }}
          disabled={loading}
          autoFocus
        />
      </div>

      {error && (
        <p
          style={{
            marginTop: 12,
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
          onClick={handleVerify}
          disabled={loading}
          id="verify-kfid-btn"
        >
          {loading ? "✨ Verifying..." : "🎟️ Verify KFID"}
        </button>
      </div>
    </div>
  );
}

// ─── Step 2: DOB Input ─────────────────────────────────────────────────────
function DOBStep({ userInfo, onSuccess }) {
  const [dob1, setDob1] = useState("2000-01-01");
  const [dob2, setDob2] = useState("2000-01-01");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    if (!dob1 || !dob2) {
      setError("Please select both dates of birth.");
      return;
    }

    setLoading(true);
    try {
      const result = await fetchAndEmailCompatibility({
        name: userInfo.name,
        email: userInfo.email,
        dob1,
        dob2,
      });

      if (result.success) {
        onSuccess({ emailSent: result.emailSent, message: result.message });
      } else {
        setError(result.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Failed to process. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Verified user banner */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          background: "rgba(219,48,99,0.08)",
          border: "1px solid rgba(219,48,99,0.2)",
          borderRadius: 12,
          padding: "14px 20px",
          marginBottom: 24,
        }}
      >
        <div>
          <p
            style={{
              color: "#db3063",
              fontWeight: 700,
              fontSize: "0.85rem",
              margin: 0,
            }}
          >
            Verified: {userInfo.name}
          </p>
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "0.75rem",
              margin: "2px 0 0",
            }}
          >
            Result will be sent to {userInfo.email}
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: "40px 36px" }}>
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
              disabled={loading}
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
              disabled={loading}
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
            id="check-compat-btn"
          >
            {loading ? "💌 Sending to your email..." : "💘 Send My Result"}
          </button>
        </div>
      </div>

      {loading && (
        <LoadingState message="Computing your stars & sending result..." />
      )}
    </>
  );
}

// ─── Step 3: Success Screen ────────────────────────────────────────────────
function SuccessStep({ userInfo, message, onReset }) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 4500);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {showConfetti && <ConfettiBurst />}
      <div
        className="glass-card result-enter stagger-1"
        style={{
          padding: "56px 40px",
          textAlign: "center",
        }}
      >
        {/* Big icon */}
        <div
          style={{
            fontSize: "4rem",
            marginBottom: 24,
            filter: "drop-shadow(0 0 20px rgba(219,48,99,0.5))",
            animation: "pulse 1.4s ease-in-out infinite",
          }}
        >
          💌
        </div>

        <h2
          className="title-gradient"
          style={{
            fontSize: "clamp(1.6rem, 5vw, 2.4rem)",
            fontWeight: 900,
            marginBottom: 12,
          }}
        >
          Result Sent!
        </h2>

        <p
          style={{
            fontSize: "1rem",
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.75,
            maxWidth: 460,
            marginInline: "auto",
            marginBottom: 8,
          }}
        >
          {message}
        </p>

        <p
          style={{
            fontSize: "0.85rem",
            color: "rgba(255,255,255,0.35)",
            marginBottom: 36,
          }}
        >
          Sent to <strong style={{ color: "#db3063" }}>{userInfo.email}</strong>
        </p>

        {/* Divider */}
        <div
          style={{
            width: 60,
            height: 2,
            background:
              "linear-gradient(90deg, transparent, #db3063, transparent)",
            marginInline: "auto",
            marginBottom: 32,
          }}
        />

        <p
          style={{
            fontSize: "0.8rem",
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "1px",
            marginBottom: 28,
          }}
        >
          Check your inbox (and spam folder) for the detailed compatibility
          report 🌹
        </p>

        <button
          className="cta-button"
          id="try-again-btn"
          onClick={onReset}
          style={{
            background: "rgba(219,48,99,0.15)",
            border: "1px solid rgba(219,48,99,0.4)",
          }}
        >
          🔄 Try Another
        </button>
      </div>
    </>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function Home() {
  // step: 1 = KFID input, 2 = DOB input, 3 = success
  const [step, setStep] = useState(1);
  const [userInfo, setUserInfo] = useState(null); // { name, email }
  const [successMsg, setSuccessMsg] = useState("");

  const handleKFIDSuccess = ({ name, email }) => {
    setUserInfo({ name, email });
    setStep(2);
  };

  const handleDOBSuccess = ({ emailSent, message }) => {
    setSuccessMsg(message);
    setStep(3);
  };

  const handleReset = () => {
    setStep(1);
    setUserInfo(null);
    setSuccessMsg("");
  };

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

      <main
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "1300px",
          padding: "30px 20px 80px",
        }}
      >
        {/* ── HEADER ── */}
        <div style={{
          width: "100%",
        maxWidth: "1300px",
        margin: "0 auto",
        }}>
        <div style={{ marginBottom: 48, position: "relative" }}>
          <a
            href="https://phool-aur-kaante.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignSelf:"flex-start" }}
          >
            <Image
              src="/logo.svg"
              alt="Phool Aur Kaante"
              width={180}
              height={200}
              priority
              style={{
                objectFit: "contain",
                transition: "all 0.3s ease",
                cursor: "pointer",
                filter:
                  "drop-shadow(0 0 24px rgba(219, 48, 99, 0.45)) drop-shadow(0 0 8px rgba(219, 48, 99, 0.2)) brightness(1.05)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter =
                  "drop-shadow(0 0 50px rgba(219, 48, 99, 0.9)) drop-shadow(0 0 25px rgba(219, 48, 99, 0.6)) brightness(1.2)";
                e.currentTarget.style.transform = "scale(1.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter =
                  "drop-shadow(0 0 24px rgba(219, 48, 99, 0.45)) drop-shadow(0 0 8px rgba(219, 48, 99, 0.2)) brightness(1.05)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          </a>

          <h1
            className="title-gradient"
            style={{
              fontSize: "clamp(2.4rem, 6vw, 3.8rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: 14,
              marginTop: 8,
              textAlign:"center"
            }}
          >
            Phool Aur Kaante
          </h1>

          {/* KIITFest Badge */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(219, 48, 99, 0.08)",
              border: "1px solid rgba(219, 48, 99, 0.2)",
              borderRadius: 8,
              padding: "8px 18px",
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
            <a
              href="https://kiitfest.org/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-block" }}
            >
              <Image
                src="/kiitfest-main-logo.avif"
                alt="KIIT FEST 9.0"
                width={100}
                height={32}
                style={{
                  objectFit: "contain",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter =
                    "brightness(1.2) drop-shadow(0 0 12px rgba(219,48,99,0.8))";
                  e.currentTarget.style.transform = "scale(1.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = "brightness(1)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
            </a>
          </div>

          <p
            style={{
              fontSize: "0.95rem",
              color: "rgba(255, 255, 255, 0.5)",
              maxWidth: 460,
              marginInline: "auto",
              lineHeight: 1.75,
              textAlign:"center"
            }}
          >
            Verify your KFID, enter your dates of birth, and let the cosmos
            reveal your compatibility — sent directly to your email 💌
          </p>
        </div>
        </div>
        <div style={{
          width: "100%",
        maxWidth: "860px",
        margin: "0 auto",
        }}>
        {/* ── STEP INDICATOR ── */}
        <StepIndicator currentStep={step} />

        {/* ── STEP CONTENT ── */}
        {step === 1 && <KFIDStep onSuccess={handleKFIDSuccess} />}

        {step === 2 && (
          <DOBStep userInfo={userInfo} onSuccess={handleDOBSuccess} />
        )}

        {step === 3 && (
          <SuccessStep
            userInfo={userInfo}
            message={successMsg}
            onReset={handleReset}
          />
        )}

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
            Made with 💖 by{" "}
            <a
              href="https://www.konnexions.dev/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                textDecoration: "none",
                color: "inherit",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "rgba(219, 48, 99, 1)";
                e.target.style.textDecoration = "underline";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "inherit";
                e.target.style.textDecoration = "none";
              }}
            >
              Konnexions
            </a>
          </p>
        </div>
        </div>
      </main>
    </div>
  );
}
