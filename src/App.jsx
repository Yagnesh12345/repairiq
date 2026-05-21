import { useState } from "react";

// ── GrihaFix embedded logo (base64) ──
const GRIHAFIX_LOGO = "data:image/png;base64,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";

// ── Only Vijayawada, only Sreehari Rao, removed Solar/Inverter ──
const TECHS = [
  { id: 1, name: "Sreehari Rao", spec: ["AC", "Fan", "Wiring", "Switchboard", "Plumbing"], area: "Vijayawada", rating: 4.8, jobs: 312, phone: "9491991503", avail: true, exp: "30 yrs", price: "₹300" },
];

const CATS = [
  { icon: "❄️", label: "AC / Cooler", color: "#00b8d9", hint: "Not cooling, making noise..." },
  { icon: "💡", label: "Electrical", color: "#C97B0A", hint: "No power, wiring issue..." },
  { icon: "🚿", label: "Plumbing", color: "#1B4332", hint: "Leaking pipe, blocked drain..." },
  { icon: "🌀", label: "Fan / Motor", color: "#2D6A4F", hint: "Fan slow, noise, stopped..." },
  { icon: "🧊", label: "Fridge / Washer", color: "#1B4332", hint: "Not cooling, water leak..." },
];

const CITIES = ["Vijayawada"];

const PAY_OPTS = [
  { id: "cash", icon: "💵", name: "Cash on Visit", desc: "Pay after service" },
  { id: "upi", icon: "📱", name: "UPI / GPay", desc: "PhonePe, Paytm, GPay" },
  { id: "card", icon: "💳", name: "Card", desc: "Debit / Credit card" },
  { id: "emi", icon: "📅", name: "0% EMI", desc: "3 months interest-free" },
];

const EXAMPLES = ["Making loud noise", "Not working at all", "Leaking water", "Works but slowly", "Stopped suddenly", "Making sparks"];

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
        <img src={GRIHAFIX_LOGO} alt="GrihaFix" style={{ height: 44, width: "auto", display: "block" }} />
      </div>
      <div className="nav-right">
        <button className={`free-pill${freeUsed ? " used" : ""}`} onClick={!freeUsed ? onOpenModal : undefined}>
          🎁 {freeUsed ? "Token Claimed" : "1 Free Service"}
        </button>
      </div>
    </nav>
  );
}

function LocBar({ tokenActive }) {
  return (
    <div className="loc-bar">
      <span className="loc-label">📍 Location:</span>
      <span style={{ color: "var(--text1)", fontSize: 13, fontWeight: 600 }}>Vijayawada</span>
      {tokenActive && <div className="token-active-badge">🎫 Free token active</div>}
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
        <div className="modal-desc">Your free GrihaFix service visit — redeem whenever you want. First, second, or any booking. It's locked in for you.</div>
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
          <div key={p.id} className={`pay-opt${payMode === p.id ? " active" : ""}`} onClick={() => onSelectPay(p.id)}>
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
              <span className="avail-dot" />{tech.avail ? "Available" : "Busy"}
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
        <a className="wa-btn" href={`https://wa.me/91${tech.phone}?text=Hi%20${encodeURIComponent(tech.name)}%2C%20I%20found%20you%20on%20GrihaFix%20and%20need%20help.`} target="_blank" rel="noreferrer">
          💬 WhatsApp
        </a>
        <button className={`book-btn${booked ? " booked" : ""}`} onClick={() => onBook(tech.id)}>
          {booked ? "✓ Requested!" : "📅 Book Visit"}
        </button>
      </div>
      {booked && <PaymentPanel payMode={payMode} tokenActive={tokenActive} onSelectPay={onSelectPay} />}
    </div>
  );
}

function FeedbackCard({ stars, text, done, onStar, onText, onSubmit }) {
  return (
    <div className="feedback-card">
      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>💬 How was your experience?</div>
      <div style={{ fontSize: 12, color: "var(--text2)" }}>Your feedback helps improve GrihaFix</div>
      <div className="stars">
        {[1, 2, 3, 4, 5].map(i => (
          <span key={i} className={`star${stars >= i ? " active" : ""}`} onClick={() => onStar(i)}>★</span>
        ))}
      </div>
      {stars > 0 && (
        <>
          <textarea className="fb-textarea" rows={3} placeholder="Tell us more (optional)..." value={text} onChange={e => onText(e.target.value)} />
          <button className={`fb-submit${done ? " done" : ""}`} onClick={onSubmit}>
            {done ? "✓ Thanks for your feedback!" : "Submit Feedback"}
          </button>
        </>
      )}
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState("home");
  const [cat, setCat] = useState(null);
  const [problem, setProblem] = useState("");
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

  const displayTechs = TECHS.filter(t =>
    t.spec.some(s => (result?.keywords || []).some(k => s.toLowerCase().includes(k.toLowerCase())))
  ).slice(0, 3);

  const handleClaim = () => { setFreeUsed(true); setTokenActive(true); setShowModal(false); };

  const runDiagnosis = async () => {
    if (!problem.trim()) return;
    setLoading(true);
    setResult(null);

    const systemPrompt = `You are an expert home repair assistant in India. Analyze the problem and return ONLY valid JSON (no markdown, no explanation outside JSON):
{
  "issue": "<4-6 word problem name>",
  "solution_type": "<diy|technician>",
  "severity": "<low|medium|high>",
  "likely_cause": "<1 sentence>",
  "cost_estimate": "<Indian rupee range e.g. ₹200–₹500>",
  "time_estimate": "<duration e.g. 30 minutes>",
  "diy_tip": "<one safe thing to try before calling technician>",
  "diy_solution": "<REQUIRED if solution_type is diy: write a full 2-3 sentence clear solution the user can do themselves. If technician, leave empty string>",
  "steps": ["<step 1>", "<step 2>", "<step 3>"],
  "keywords": ["<match from: AC, Fan, Wiring, Plumbing, Refrigerator, Inverter, Water Motor, Switchboard, Washing Machine>"]
}

CRITICAL RULES:
- solution_type MUST be "diy" for simple problems a non-expert can safely fix at home: clogged drain, dirty fan blades, tripped circuit breaker, replacing a fuse, unclogging a pipe, cleaning AC filter, fan speed regulator issue.
- solution_type MUST be "technician" for: gas refilling, rewiring, motor replacement, compressor issues, anything needing tools or spare parts.
- When solution_type is "diy", you MUST fill diy_solution with a helpful 2-3 sentence fix AND fill steps with 3 clear numbered steps.
- severity=high for dangerous issues like sparking wires, flooding, gas leaks.`;

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
            { role: "user", content: `Category: ${cat.label}\nProblem: ${problem}\nCity: Vijayawada` }
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
        likely_cause: "Please check your internet connection and try again.",
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
        <LocBar tokenActive={tokenActive} />

        <main className="main">

          {step === "home" && (
            <>
              <div className="hero fade-1">
                <div className="hero-eyebrow"><span />Trusted Home Services</div>
                <h1>Trusted repairs,<br /><span className="line2">right at your door.</span></h1>
                <p>Describe your problem. AI diagnoses it — simple issues get step-by-step DIY fixes. Complex ones connect you to Sreehari Rao, Vijayawada's most trusted technician.</p>
              </div>

              <div className="stats-row fade-2">
                {[["50+", "Jobs Done"], ["Vijayawada", "City Served"], ["4.8★", "Avg Rating"]].map(([v, l]) => (
                  <div key={l} className="stat-card">
                    <div className="stat-val">{v}</div>
                    <div className="stat-lbl">{l}</div>
                  </div>
                ))}
              </div>

              <div className="sec-label fade-3">What needs fixing?</div>
              <div className="cat-grid fade-3">
                {CATS.map(c => (
                  <div key={c.label} className="cat-card" style={{ "--hc": c.color }}
                    onClick={() => { setCat(c); setProblem(""); setStep("diagnose"); }}>
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
              <textarea className="problem-textarea" value={problem} onChange={e => setProblem(e.target.value)}
                placeholder={`e.g. "${cat.hint}"`} autoFocus />
              <div className="chips">
                {EXAMPLES.map(ex => (
                  <button key={ex} className="chip" onClick={() => setProblem(ex)}>{ex}</button>
                ))}
              </div>
              {loading ? (
                <div className="loading-state">
                  <div style={{ fontSize: 13, color: "var(--text2)", marginBottom: 12 }}>Analyzing your problem with AI...</div>
                  <div className="loading-dots">
                    <div className="loading-dot" /><div className="loading-dot" /><div className="loading-dot" />
                  </div>
                </div>
              ) : (
                <button className="cta-btn" onClick={runDiagnosis} disabled={!problem.trim()}>⚡ Get AI Diagnosis</button>
              )}
            </div>
          )}

          {step === "results" && result && (
            <div className="fade">
              <button className="back-btn" onClick={() => { setStep("diagnose"); setResult(null); }}>← New Diagnosis</button>

              <div className="sev-banner" style={{
                background: `${result.severity === "high" ? "rgba(255,77,109" : isDIY ? "rgba(0,229,160" : "rgba(255,112,67"},0.06)`,
                border: `1.5px solid ${result.severity === "high" ? "rgba(255,77,109" : isDIY ? "rgba(0,229,160" : "rgba(255,112,67"},0.25)`
              }}>
                <div className="sev-icon">{result.severity === "high" ? "🚨" : isDIY ? "✅" : "⚠️"}</div>
                <div>
                  <div className="sev-title" style={{ color: sevColor }}>{sevLabel}</div>
                  <div className="sev-sub">{result.issue}</div>
                </div>
              </div>

              {/* ── DIY SOLUTION ── */}
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

              {/* ── TECHNICIAN DIAGNOSIS ── */}
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

              {/* ── TECHNICIANS ── */}
              {(!isDIY || result.severity === "high") && (
                <>
                  <div className="sec-label" style={{ marginBottom: 14 }}>🔧 Best Technician — Vijayawada</div>
                  {(displayTechs.length ? displayTechs : TECHS).map((t, i) => (
                    <TechCard key={t.id} tech={t} highlight={i === 0}
                      booked={!!booked[t.id]} tokenActive={tokenActive}
                      payMode={booked[t.id] ? payMode : null}
                      onBook={id => setBooked(b => ({ ...b, [id]: true }))}
                      onSelectPay={setPayMode}
                    />
                  ))}
                </>
              )}

              {/* ── REVIEW — only after booking ── */}
              {Object.keys(booked).length > 0 && (
                <FeedbackCard stars={fbStars} text={fbText} done={fbDone}
                  onStar={setFbStars} onText={setFbText} onSubmit={() => setFbDone(true)} />
              )}

              <button className="outline-btn" onClick={() => {
                setStep("home"); setResult(null); setCat(null); setProblem("");
                setFbStars(0); setFbText(""); setFbDone(false);
              }}>+ Report Another Problem</button>
            </div>
          )}

        </main>
      </div>

      {showModal && <TokenModal freeUsed={freeUsed} onClaim={handleClaim} onClose={() => setShowModal(false)} />}
    </>
  );
}
