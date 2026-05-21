import { useState } from "react";

// ── GrihaFix embedded logo (base64) ──
const GRIHAFIX_LOGO = "data:image/png;base64,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";

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
  { icon: "❄️", label: "AC / Cooler", color: "#00b8d9", hint: "Not cooling, making noise..." },
  { icon: "💡", label: "Electrical", color: "#C97B0A", hint: "No power, wiring issue..." },
  { icon: "🚿", label: "Plumbing", color: "#1B4332", hint: "Leaking pipe, blocked drain..." },
  { icon: "🌀", label: "Fan / Motor", color: "#2D6A4F", hint: "Fan slow, noise, stopped..." },
  { icon: "🧊", label: "Fridge / Washer", color: "#1B4332", hint: "Not cooling, water leak..." },
  { icon: "☀️", label: "Solar / Inverter", color: "#C97B0A", hint: "Not charging, no backup..." },
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
        <img
          src={GRIHAFIX_LOGO}
          alt="GrihaFix — Trusted Home Services"
          style={{ height: 44, width: "auto", display: "block" }}
        />
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
        <div className="modal-title">Your Free GrihaFix Visit</div>
        <div className="modal-desc">
          Your free GrihaFix service visit—redeem whenever you want. First, second, or any booking. It's locked in for you.
        </div>
        <div className="modal-highlight">
          ⭐ No expiry &nbsp;·&nbsp; No conditions &nbsp;·&nbsp; Any service category<br />
          <span style={{ fontSize: 12 }}>Claim now, use whenever you're ready</span>
        </div>
        <div className="modal-code-label">Your token code</div>
        <div className="modal-code">GRIHAFIX</div>
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
      <div className="pay-sub">Pay securely via GrihaFix — online or cash on visit</div>
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
          href={`https://wa.me/91${tech.phone}?text=Hi%20${encodeURIComponent(tech.name)}%2C%20I%20found%20you%20on%20GrihaFix%20and%20need%20help.`}
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
      <div style={{ fontSize: 12, color: "var(--text2)" }}>Your feedback helps improve GrihaFix</div>
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
                  Trusted Home Services
                </div>
                <h1>
                  Trusted repairs,<br />
                  <span className="line2">right at your door.</span>
                </h1>
                <p>
                  Describe your problem. AI diagnoses it — simple issues get step-by-step DIY fixes. Complex ones connect you to the best local technician in seconds.
                </p>
              </div>

              <div className="stats-row fade-2">
                {[["50+", "Jobs Done"], ["6", "Cities in AP"], ["4.8★", "Avg Rating"]].map(([v, l]) => (
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
                    : <div style={{ marginTop: 8, fontSize: 12, color: "var(--green)" }}>✓ Token activated — use code GRIHAFIX when booking</div>
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
