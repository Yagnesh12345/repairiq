import { useState } from "react";

const TECHS = [
  { id: 1, name: "Sreehari Rao", spec: ["AC", "Fan", "Wiring", "Switchboard", "Plumbing", "AC"], area: "Vijayawada", rating: 4.8, jobs: 312, phone: "9491991503", avail: true, exp: "30 yrs", price: "₹300" },
  { id: 2, name: "Suresh Babu", spec: ["Plumbing", "Water Motor", "Pipeline"], area: "Vijayawada", rating: 4.6, jobs: 189, phone: "9876543211", avail: true, exp: "5 yrs", price: "₹150" },
  { id: 3, name: "Nagaraju", spec: ["AC", "Refrigerator", "Washing Machine"], area: "Guntur", rating: 4.9, jobs: 428, phone: "9876543212", avail: false, exp: "12 yrs", price: "₹250" },
  { id: 4, name: "Prasad Rao", spec: ["Wiring", "Solar", "Inverter"], area: "Visakhapatnam", rating: 4.7, jobs: 256, phone: "9876543213", avail: true, exp: "9 yrs", price: "₹180" },
  { id: 5, name: "Lakshmi Devi", spec: ["Plumbing", "Bathroom"], area: "Guntur", rating: 4.5, jobs: 143, phone: "9876543214", avail: true, exp: "4 yrs", price: "₹130" },
  { id: 6, name: "Venkat Reddy", spec: ["Fan", "Switchboard", "Wiring", "AC"], area: "Tirupati", rating: 4.8, jobs: 367, phone: "9876543215", avail: true, exp: "10 yrs", price: "₹200" },
  { id: 7, name: "Anjaiah Goud", spec: ["Solar", "Inverter", "Wiring"], area: "Kurnool", rating: 4.7, jobs: 198, phone: "9876543216", avail: true, exp: "7 yrs", price: "₹175" },
  { id: 8, name: "Meena Kumari", spec: ["Washing Machine", "Refrigerator", "Fan"], area: "Nellore", rating: 4.6, jobs: 225, phone: "9876543217", avail: true, exp: "6 yrs", price: "₹160" },
];

const CATS = [
  { icon: "❄️", label: "AC / Cooler", color: "#00d4ff", hint: "Not cooling, making noise..." },
  { icon: "💡", label: "Electrical", color: "#ffc853", hint: "No power, wiring issue..." },
  { icon: "🚿", label: "Plumbing", color: "#00e5a0", hint: "Leaking pipe, blocked drain..." },
  { icon: "🌀", label: "Fan / Motor", color: "#7b2fff", hint: "Fan slow, noise, stopped..." },
  { icon: "🧊", label: "Fridge / Washer", color: "#ff4d6d", hint: "Not cooling, water leak..." },
  { icon: "☀️", label: "Solar / Inverter", color: "#ff7043", hint: "Not charging, no backup..." },
];

const CITIES = ["Vijayawada", "Guntur", "Visakhapatnam", "Tirupati", "Nellore", "Kurnool"];

const PAY_OPTS = [
  { id: "cash", icon: "💵", name: "Cash on Visit", desc: "Pay after service" },
  { id: "upi", icon: "📱", name: "UPI / GPay", desc: "PhonePe, Paytm, GPay" },
  { id: "card", icon: "💳", name: "Card", desc: "Debit / Credit card" },
  { id: "emi", icon: "📅", name: "0% EMI", desc: "3 months interest-free" },
];

const EXAMPLES = ["Making loud noise", "Not working at all", "Leaking water", "Works but slowly", "Stopped suddenly", "Making sparks"];

// ── COMPONENTS ──

function BgCanvas() {
  return (
    <div className="bg-canvas">
      <div className="bg-grid" />
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />
    </div>
  );
}

function Nav({ freeUsed, tokenActive, onOpenModal }) {
  return (
    <nav className="nav">
      <div className="nav-logo">
        <div className="nav-logo-mark">🔧</div>
        <div>
          <div className="nav-brand">Repair<em>IQ</em></div>
          <div className="nav-tagline">Andhra Pradesh</div>
        </div>
      </div>
      <div className="nav-right">
        <button
          className={`free-pill${freeUsed ? " used" : ""}`}
          onClick={!freeUsed ? onOpenModal : undefined}
        >
          🎁 {freeUsed ? "Token Claimed" : "1 Free Service"}
        </button>
      </div>
    </nav>
  );
}

function LocBar({ locMode, city, gpsCity, tokenActive, onCityChange, onGps, onManual, onCityInput }) {
  return (
    <div className="loc-bar">
      <span className="loc-label">📍 Location:</span>
      {locMode === "select" ? (
        <select className="loc-select" value={city} onChange={e => onCityChange(e.target.value)}>
          {CITIES.map(c => <option key={c}>{c}</option>)}
        </select>
      ) : (
        <input
          className="loc-input"
          placeholder="Enter your city..."
          value={gpsCity}
          onChange={e => onCityInput(e.target.value)}
        />
      )}
      <button className="loc-btn" onClick={onGps}>📡 GPS</button>
      <button className="loc-btn" onClick={onManual}>✏️ Manual</button>
      {tokenActive && (
        <div className="token-active-badge">🎫 Free token active</div>
      )}
    </div>
  );
}

function TokenModal({ freeUsed, onClaim, onClose }) {
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-icon">🎫</div>
        <div className="modal-title">Your Free Service Token</div>
        <div className="modal-desc">
          Your free RepairIQ service visit—redeem whenever you want. First, second, or any booking. It’s locked in for you.
        </div>
        <div className="modal-highlight">
          ⭐ No expiry &nbsp;·&nbsp; No conditions &nbsp;·&nbsp; Any service category<br />
          <span style={{ fontSize: 12 }}>Claim now, use whenever you're ready</span>
        </div>
        <div className="modal-code-label">Your token code</div>
        <div className="modal-code">RIQFREE</div>
        <button className="modal-cta" onClick={onClaim} disabled={freeUsed}>
          {freeUsed ? "✓ Already Activated" : "🎁 Activate Free Token"}
        </button>
        <div className="modal-note">Present this code when booking. Technician verifies on arrival.</div>
      </div>
    </div>
  );
}

function PaymentPanel({ payMode, tokenActive, onSelectPay }) {
  return (
    <div className="pay-card">
      <div className="pay-title">💳 Choose Payment Method</div>
      <div className="pay-sub">Pay securely via RepairIQ — online or cash on visit</div>
      <div className="pay-grid">
        {PAY_OPTS.map(p => (
          <div
            key={p.id}
            className={`pay-opt${payMode === p.id ? " active" : ""}`}
            onClick={() => onSelectPay(p.id)}
          >
            <div className="pay-opt-icon">{p.icon}</div>
            <div className="pay-opt-name">{p.name}</div>
            <div className="pay-opt-desc">{p.desc}</div>
          </div>
        ))}
      </div>
      {payMode && (
        <div className="pay-confirmed">
          ✓ <strong>{PAY_OPTS.find(p => p.id === payMode)?.name}</strong> selected
          {tokenActive ? " — 🎫 Free token will apply at checkout" : ""}
        </div>
      )}
    </div>
  );
}

function TechCard({ tech, highlight, booked, tokenActive, payMode, onBook, onSelectPay }) {
  return (
    <div className={`tech-card${highlight ? " best" : ""}`}>
      {highlight && <div className="best-badge">Best Match</div>}
      <div className="tech-row">
        <div className="tech-avatar">{tech.name[0]}</div>
        <div style={{ flex: 1 }}>
          <div className="tech-name-row">
            <span className="tech-name">{tech.name}</span>
            <span className={`avail-badge ${tech.avail ? "avail-on" : "avail-off"}`}>
              <span className="avail-dot" />
              {tech.avail ? "Available" : "Busy"}
            </span>
          </div>
          <div className="tech-stars">{"★".repeat(Math.floor(tech.rating))} <span style={{ color: "var(--text3)", fontSize: 11 }}>{tech.rating}</span></div>
          <div className="tech-meta">📍 {tech.area} · {tech.exp} · {tech.jobs} jobs · {tech.price}/visit</div>
          <div className="spec-tags">
            {tech.spec.map(s => <span key={s} className="spec-tag">{s}</span>)}
          </div>
        </div>
      </div>
      <div className="tech-actions">
        <a
          className="wa-btn"
          href={`https://wa.me/91${tech.phone}?text=Hi%20${encodeURIComponent(tech.name)}%2C%20I%20found%20you%20on%20RepairIQ%20and%20need%20help.`}
          target="_blank" rel="noreferrer"
        >
          💬 WhatsApp
        </a>
        <button
          className={`book-btn${booked ? " booked" : ""}`}
          onClick={() => onBook(tech.id)}
        >
          {booked ? "✓ Requested!" : "📅 Book Visit"}
        </button>
      </div>
      {booked && (
        <PaymentPanel payMode={payMode} tokenActive={tokenActive} onSelectPay={onSelectPay} />
      )}
    </div>
  );
}

function FeedbackCard({ stars, text, done, onStar, onText, onSubmit }) {
  return (
    <div className="feedback-card">
      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>💬 Rate your experience</div>
      <div style={{ fontSize: 12, color: "var(--text2)" }}>Your feedback helps improve RepairIQ</div>
      <div className="stars">
        {[1, 2, 3, 4, 5].map(i => (
          <span key={i} className={`star${stars >= i ? " active" : ""}`} onClick={() => onStar(i)}>★</span>
        ))}
      </div>
      {stars > 0 && (
        <>
          <textarea
            className="fb-textarea"
            rows={3}
            placeholder="Tell us more (optional)..."
            value={text}
            onChange={e => onText(e.target.value)}
          />
          <button className={`fb-submit${done ? " done" : ""}`} onClick={onSubmit}>
            {done ? "✓ Thanks for your feedback!" : "Submit Feedback"}
          </button>
        </>
      )}
    </div>
  );
}

// ── APP ──

export default function App() {
  const [step, setStep] = useState("home");
  const [cat, setCat] = useState(null);
  const [problem, setProblem] = useState("");
  const [city, setCity] = useState("Vijayawada");
  const [locMode, setLocMode] = useState("select");
  const [gpsCity, setGpsCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [booked, setBooked] = useState({});
  const [payMode, setPayMode] = useState(null);
  const [fbStars, setFbStars] = useState(0);
  const [fbText, setFbText] = useState("");
  const [fbDone, setFbDone] = useState(false);
  const [freeUsed, setFreeUsed] = useState(false);
  const [tokenActive, setTokenActive] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const isDIY = result?.solution_type === "diy";
  const sevColor = result?.severity === "high" ? "var(--red)" : isDIY ? "var(--green)" : "var(--orange)";
  const sevLabel = result?.severity === "high" ? "Urgent — Call a Technician" : isDIY ? "Simple Fix — Do It Yourself!" : "Moderate — Needs a Pro";

  const matchedTechs = TECHS.filter(t =>
    t.spec.some(s => (result?.keywords || []).some(k => s.toLowerCase().includes(k.toLowerCase())))
  ).slice(0, 3);

  const displayTechs = matchedTechs.length ? matchedTechs : TECHS.slice(0, 2);

  const handleGps = () => {
    setLocMode("gps");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setGpsCity("Detecting location..."),
        () => setGpsCity("GPS unavailable — enter manually")
      );
    } else {
      setGpsCity("GPS not supported");
    }
  };

  const handleClaim = () => {
    setFreeUsed(true);
    setTokenActive(true);
    setShowModal(false);
  };

  const runDiagnosis = async () => {
    if (!problem.trim()) return;
    setLoading(true);
    setResult(null);

    const systemPrompt = `You are an expert home repair assistant in India. Analyze the problem and return ONLY valid JSON (no markdown):
{
  "issue": "<4-6 word problem name>",
  "solution_type": "<diy|technician>",
  "severity": "<low|medium|high>",
  "likely_cause": "<1 sentence>",
  "cost_estimate": "<₹ range>",
  "time_estimate": "<duration>",
  "diy_tip": "<one safe thing to try first>",
  "diy_solution": "<if solution_type is diy: full clear solution in 2-3 sentences, else empty string>",
  "steps": ["<step 1>", "<step 2>", "<step 3>"],
  "keywords": ["<from: AC, Fan, Wiring, Plumbing, Refrigerator, Solar, Inverter, Water Motor, Switchboard, Washing Machine>"]
}
RULES: solution_type=diy ONLY for simple non-expert fixes (tripped breaker, dirty filter, clogged drain, dust). solution_type=technician for anything needing tools, parts, gas, rewiring. severity=high means dangerous or urgent.`;

    try {
const res = await fetch("https://api.openai.com/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_KEY}`
  },
  body: JSON.stringify({
    model: "gpt-4o",
    max_tokens: 1000,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Category: ${cat.label}\nProblem: ${problem}\nCity: ${city}` }
    ],
  }),
});
const data = await res.json();
const raw = data.choices?.[0]?.message?.content || "";
      const clean = raw.replace(/```json|```/g, "").trim();
      setResult(JSON.parse(clean));
    } catch {
      setResult({
        issue: "Could not analyze",
        solution_type: "technician",
        severity: "medium",
        likely_cause: "Please check your connection and try again.",
        cost_estimate: "₹200–₹500",
        time_estimate: "1–2 hours",
        diy_tip: "Restart the appliance and check power connections first.",
        diy_solution: "",
        steps: [],
        keywords: [],
      });
    } finally {
      setLoading(false);
      setStep("results");
    }
  };

  return (
    <>
      <BgCanvas />
      <div className="app">
        <Nav freeUsed={freeUsed} tokenActive={tokenActive} onOpenModal={() => setShowModal(true)} />
        <LocBar
          locMode={locMode} city={city} gpsCity={gpsCity} tokenActive={tokenActive}
          onCityChange={setCity} onGps={handleGps}
          onManual={() => setLocMode("select")}
          onCityInput={v => { setGpsCity(v); if (v) setCity(v); }}
        />

        <main className="main">

          {/* ── HOME ── */}
          {step === "home" && (
            <>
              <div className="hero fade-1">
                <div className="hero-eyebrow">
                  <span />
                  AI-Powered Home Repair
                </div>
                <h1>
                  Fix anything<br />
                  <span className="line2">at home. Instantly.</span>
                </h1>
                <p>
                  Describe your problem. AI diagnoses it — simple issues get step-by-step DIY fixes. Complex ones connect you to the best local technician in seconds.
                </p>
              </div>

              <div className="stats-row fade-2">
                {[["1,200+", "Problems Solved"], ["6", "Cities in AP"], ["4.8★", "Avg Rating"]].map(([v, l]) => (
                  <div key={l} className="stat-card">
                    <div className="stat-val">{v}</div>
                    <div className="stat-lbl">{l}</div>
                  </div>
                ))}
              </div>

              <div className="sec-label fade-3">What needs fixing?</div>
              <div className="cat-grid fade-3">
                {CATS.map(c => (
                  <div
                    key={c.label}
                    className="cat-card"
                    style={{ "--hc": c.color }}
                    onClick={() => { setCat(c); setProblem(""); setStep("diagnose"); }}
                  >
                    <div className="cat-icon-wrap">{c.icon}</div>
                    <div className="cat-name">{c.label}</div>
                    <div className="cat-hint">{c.hint}</div>
                  </div>
                ))}
              </div>

              <div className="free-banner fade-4">
                <div className="free-banner-icon">🎫</div>
                <div>
                  <h3>1 Free Service — Claim Anytime</h3>
                  <p>Your free visit can be redeemed on any booking — 1st, 2nd, or 3rd. You choose when to use it, no pressure.</p>
                  {!freeUsed
                    ? <button className="free-claim-btn" onClick={() => setShowModal(true)}>Claim My Free Token →</button>
                    : <div style={{ marginTop: 8, fontSize: 12, color: "var(--green)" }}>✓ Token activated — use code RIQFREE when booking</div>
                  }
                </div>
              </div>
            </>
          )}

          {/* ── DIAGNOSE ── */}
          {step === "diagnose" && cat && (
            <div className="fade">
              <button className="back-btn" onClick={() => setStep("home")}>← Back</button>

              <div className="diag-header" style={{ background: `${cat.color}0d`, border: `1.5px solid ${cat.color}30` }}>
                <div className="diag-header-icon">{cat.icon}</div>
                <div>
                  <h2>{cat.label}</h2>
                  <p>Describe your issue — AI diagnoses it instantly</p>
                </div>
              </div>

              <div className="sec-label">Describe the problem</div>
              <textarea
                className="problem-textarea"
                value={problem}
                onChange={e => setProblem(e.target.value)}
                placeholder={`e.g. "${cat.hint}"`}
                autoFocus
              />

              <div className="chips">
                {EXAMPLES.map(ex => (
                  <button key={ex} className="chip" onClick={() => setProblem(ex)}>{ex}</button>
                ))}
              </div>

              {loading ? (
                <div className="loading-state">
                  <div style={{ fontSize: 13, color: "var(--text2)", marginBottom: 12 }}>Analyzing your problem with AI...</div>
                  <div className="loading-dots">
                    <div className="loading-dot" />
                    <div className="loading-dot" />
                    <div className="loading-dot" />
                  </div>
                </div>
              ) : (
                <button className="cta-btn" onClick={runDiagnosis} disabled={!problem.trim()}>
                  ⚡ Get AI Diagnosis
                </button>
              )}
            </div>
          )}

          {/* ── RESULTS ── */}
          {step === "results" && result && (
            <div className="fade">
              <button className="back-btn" onClick={() => { setStep("diagnose"); setResult(null); }}>← New Diagnosis</button>

              {/* Severity Banner */}
              <div className="sev-banner" style={{ background: `${result.severity === "high" ? "rgba(255,77,109" : isDIY ? "rgba(0,229,160" : "rgba(255,112,67"},0.06)`, border: `1.5px solid ${result.severity === "high" ? "rgba(255,77,109" : isDIY ? "rgba(0,229,160" : "rgba(255,112,67"},0.25)` }}>
                <div className="sev-icon">{result.severity === "high" ? "🚨" : isDIY ? "✅" : "⚠️"}</div>
                <div>
                  <div className="sev-title" style={{ color: sevColor }}>{sevLabel}</div>
                  <div className="sev-sub">{result.issue}</div>
                </div>
              </div>

              {/* DIY Solution */}
              {isDIY && (
                <div className="diy-card">
                  <div className="diy-lbl">🛠 You can fix this yourself!</div>
                  <p className="diy-desc">{result.diy_solution}</p>
                  {result.steps?.length > 0 && (
                    <ul className="steps-list">
                      {result.steps.map((s, i) => (
                        <li key={i} className="step-item">
                          <div className="step-num">{i + 1}</div>
                          <span className="step-text">{s}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="diy-meta">
                    <div className="diy-meta-item">⏱ <strong>{result.time_estimate}</strong></div>
                    <div className="diy-meta-item">💰 <strong>{result.cost_estimate}</strong></div>
                  </div>
                </div>
              )}

              {/* Technician Diagnosis */}
              {!isDIY && (
                <div className="result-card">
                  <div className="card-label">🔍 AI Diagnosis</div>
                  <div className="meta-grid">
                    <div className="meta-item">
                      <div className="meta-item-lbl">💰 Cost Estimate</div>
                      <div className="meta-item-val">{result.cost_estimate}</div>
                    </div>
                    <div className="meta-item">
                      <div className="meta-item-lbl">⏱ Time to Fix</div>
                      <div className="meta-item-val">{result.time_estimate}</div>
                    </div>
                  </div>
                  <div className="cause-box">
                    <div className="cause-lbl">Likely Cause</div>
                    <div className="cause-text">{result.likely_cause}</div>
                  </div>
                  <div className="tip-box">
                    <div className="tip-lbl">💡 Try this first</div>
                    <div className="tip-text">{result.diy_tip}</div>
                  </div>
                </div>
              )}

              {/* Technicians */}
              {(!isDIY || result.severity === "high") && (
                <>
                  <div className="sec-label" style={{ marginBottom: 14 }}>🔧 Best Technicians — {city}</div>
                  {displayTechs.map((t, i) => (
                    <TechCard
                      key={t.id}
                      tech={t}
                      highlight={i === 0}
                      booked={!!booked[t.id]}
                      tokenActive={tokenActive}
                      payMode={booked[t.id] ? payMode : null}
                      onBook={id => setBooked(b => ({ ...b, [id]: true }))}
                      onSelectPay={setPayMode}
                    />
                  ))}
                </>
              )}

              {/* Feedback */}
              {Object.keys(booked).length > 0 && <FeedbackCard
                stars={fbStars} text={fbText} done={fbDone}
                onStar={setFbStars} onText={setFbText}
                onSubmit={() => setFbDone(true)}
              />}

              <button
                className="outline-btn"
                onClick={() => { setStep("home"); setResult(null); setCat(null); setProblem(""); setFbStars(0); setFbText(""); setFbDone(false); }}
              >
                + Report Another Problem
              </button>
            </div>
          )}

        </main>
      </div>

      {showModal && (
        <TokenModal freeUsed={freeUsed} onClaim={handleClaim} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
