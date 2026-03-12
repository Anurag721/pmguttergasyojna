import { useState, useEffect, useRef } from "react";

const SAFFRON = "#FF9933";
const NAVY = "#000080";
const GREEN = "#138808";
const WHITE = "#FFFFFF";
const CREAM = "#FFF8F0";
const DARK = "#1a1a2e";
const RED = "#DC2626";

// Animated counter component
function AnimatedCounter({ end, duration = 2000, suffix = "", prefix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, end, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString("en-IN")}{suffix}</span>;
}

// Scroll reveal wrapper
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function ShareButtons() {
  const url = "https://pmguttergasyojna.com";
  const text = "🚨 Pradhan Mantri Gutter Gas Yojna — India's real energy policy exposed. From nala gas in 2018 to LPG crisis in 2026.\n\n";

  return (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        style={shareBtn("#1DA1F2")}
      >
        𝕏 Share on Twitter
      </a>
      <a
        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(text + url)}`}
        target="_blank"
        rel="noopener noreferrer"
        style={shareBtn("#25D366")}
      >
        📱 Share on WhatsApp
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        style={shareBtn("#1877F2")}
      >
        📘 Share on Facebook
      </a>
    </div>
  );
}

function shareBtn(bg) {
  return {
    background: bg,
    color: WHITE,
    padding: "14px 28px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: "15px",
    fontFamily: "'Noto Sans', sans-serif",
    display: "inline-block",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: `0 4px 15px ${bg}44`,
  };
}

const timelineData = [
  { year: "2018", event: "PM Modi discovers 'Gutter Gas Technology' at World Biofuel Day. Says a chaiwala used nala gas to make tea. India laughs.", icon: "🚽", color: SAFFRON },
  { year: "2019", event: "Rahul Gandhi mocks: 'Apne saamne ek pipe lagao, dekhte hain gas nikalti hai ya nahi.' Internet coins 'Liquid Nala Gas (LNG)'.", icon: "😂", color: "#E91E63" },
  { year: "2020", event: "COVID lockdown. LPG prices start climbing. No gutter gas scheme announced.", icon: "📈", color: "#FF5722" },
  { year: "2022", event: "Russia-Ukraine war disrupts energy markets. India increases dependence on Middle East LPG imports to 90% via Hormuz.", icon: "⚠️", color: "#FF9800" },
  { year: "Feb 2026", event: "Modi stands in Israel's Knesset: 'India stands with Israel with full conviction.' Signs US trade deal without full cabinet approval.", icon: "🤝", color: NAVY },
  { year: "Mar 2026", event: "Strait of Hormuz choked. LPG supply collapses. 25-day wait for refills. 10,000 restaurants shut in TN. Essential Commodities Act invoked.", icon: "🔥", color: RED },
  { year: "Mar 11, 2026", event: "PM Modi flags off trains in Tamil Nadu for election rally while the same state's restaurants shut down from gas shortage.", icon: "🤡", color: "#7B1FA2" },
];

const faqData = [
  {
    q: "Is the PM Gutter Gas Yojna a real scheme?",
    a: "No. But the PM's suggestion to harvest cooking gas from gutters was very real (August 10, 2018, World Biofuel Day). The LPG crisis of March 2026 — where Indians wait 25 days for a cylinder — is also very real. This website connects the dots."
  },
  {
    q: "Why can't I get an LPG cylinder?",
    a: "Because 90% of India's LPG imports transit through the Strait of Hormuz, which is now disrupted by the Iran-US war. India can only meet 41% of its LPG demand domestically. But don't worry — the Petroleum Minister says there's 'no shortage and no reason to panic' (while invoking the Essential Commodities Act)."
  },
  {
    q: "What is the government doing about it?",
    a: "Flagging off trains. Holding election rallies. Censoring social media posts. And refusing to allow a parliamentary debate on West Asia. Also, rationing your gas and telling refineries to produce more. The usual."
  },
  {
    q: "Can I actually make cooking gas from a gutter?",
    a: "According to actual scientists: No. Bio-methanation requires proper plants, pressure systems, and safety infrastructure. A Delhi University professor called PM Modi's description a 'complicated, technical process' that was dangerously oversimplified. Lighting a stove over combustible sewer gas risks explosion."
  },
  {
    q: "Why is this website needed?",
    a: "Because in 2018, when the PM told Indians they could cook from gutters, people laughed. In 2026, when Indians can't cook at all because there's no gas, nobody's laughing. Satire is the last weapon when the government won't even allow a discussion."
  },
];

const schemeBenefits = [
  { icon: "🚽", title: "Universal Nala Coverage", desc: "Every Indian will be assigned their nearest gutter for gas extraction. Priority to BPL families living near open drains." },
  { icon: "🏺", title: "Free Ulta Bartan Kit", desc: "As described by PM Modi himself — one inverted utensil, one pipe, one hole. That's all you need. Jugaad is innovation!" },
  { icon: "⏳", title: "No 25-Day Wait", desc: "Unlike LPG cylinders, gutter gas is available 24/7. India's 3 million km of open drains are our untapped energy reserves." },
  { icon: "📊", title: "Atmanirbhar Energy", desc: "Why import 67% of LPG through Hormuz when you have methane flowing freely in your neighbourhood nala?" },
  { icon: "🏆", title: "Nobel Prize Potential", desc: "As Twitter noted in 2018: PM Modi deserves the Nobel Prize in Chemistry for discovering LNG — Liquid Nala Gas." },
  { icon: "🍵", title: "Chai Pe Charcha 2.0", desc: "From chaiwala to PM, and now PM tells chaiwalas to use gutter gas. The circle of life." },
];

export default function App() {
  const [openFaq, setOpenFaq] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'Noto Sans', sans-serif", background: CREAM, color: DARK, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700;900&family=Playfair+Display:wght@700;900&family=Tiro+Devanagari+Hindi&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        html { scroll-behavior: smooth; }
        
        body { overflow-x: hidden; }
        
        .marquee-track {
          display: flex;
          animation: marquee 25s linear infinite;
          width: max-content;
        }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .share-btn:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 25px rgba(0,0,0,0.2) !important;
        }

        .faq-item:hover {
          background: #fff8f0 !important;
        }

        .benefit-card:hover {
          transform: translateY(-8px) !important;
          box-shadow: 0 20px 40px rgba(0,0,0,0.12) !important;
        }

        .timeline-card:hover {
          transform: scale(1.02) !important;
        }
      `}</style>

      {/* OFFICIAL-LOOKING TOP BAR */}
      <div style={{
        background: `linear-gradient(135deg, ${SAFFRON} 0%, ${SAFFRON} 33%, ${WHITE} 33%, ${WHITE} 66%, ${GREEN} 66%, ${GREEN} 100%)`,
        height: "6px",
      }} />
      
      <header style={{
        background: NAVY,
        color: WHITE,
        padding: "12px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        flexWrap: "wrap",
      }}>
        <div style={{ fontSize: "28px" }}>☸️</div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", opacity: 0.8 }}>
            Ministry of Nala Affairs | नाला मामलों का मंत्रालय
          </div>
          <div style={{ fontSize: "11px", opacity: 0.6, marginTop: "2px" }}>
            Government of India (Satire Division) | भारत सरकार (व्यंग्य विभाग)
          </div>
        </div>
        <div style={{ fontSize: "28px" }}>☸️</div>
      </header>

      {/* BREAKING NEWS MARQUEE */}
      <div style={{
        background: RED,
        color: WHITE,
        padding: "10px 0",
        overflow: "hidden",
        fontSize: "14px",
        fontWeight: 700,
      }}>
        <div className="marquee-track">
          {[1, 2].map(i => (
            <span key={i} style={{ whiteSpace: "nowrap", paddingRight: "80px" }}>
              🚨 BREAKING: LPG crisis deepens across India — 25-day wait for refills — 10,000 restaurants shutting in Tamil Nadu — Essential Commodities Act invoked — Petroleum Minister says "no shortage" — PM busy flagging off trains — Commercial LPG supply HALTED in Mumbai, Bengaluru, Chennai, Delhi — India imports 67% LPG, 90% through Hormuz — Strait of Hormuz disrupted by Iran-US war — Parliament debate on West Asia REFUSED —&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* HERO SECTION */}
      <section style={{
        background: `linear-gradient(170deg, ${NAVY} 0%, #16213e 60%, #0f3460 100%)`,
        color: WHITE,
        padding: "80px 20px 100px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background pattern */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle at 20% 50%, ${SAFFRON}15 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${GREEN}10 0%, transparent 40%)`,
        }} />
        
        <div style={{ position: "relative", zIndex: 1, maxWidth: "900px", margin: "0 auto" }}>
          <div style={{
            display: "inline-block",
            background: `${SAFFRON}`,
            color: WHITE,
            padding: "6px 24px",
            borderRadius: "30px",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "30px",
          }}>
            ⚡ A Satirical Public Service Announcement
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(36px, 7vw, 72px)",
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: "10px",
          }}>
            प्रधानमंत्री
          </h1>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(36px, 7vw, 72px)",
            fontWeight: 900,
            lineHeight: 1.1,
            background: `linear-gradient(90deg, ${SAFFRON}, #FFD700, ${SAFFRON})`,
            backgroundSize: "200% 100%",
            animation: "gradientShift 3s ease infinite",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "10px",
          }}>
            Gutter Gas Yojna
          </h1>
          <h2 style={{
            fontFamily: "'Tiro Devanagari Hindi', serif",
            fontSize: "clamp(20px, 4vw, 32px)",
            fontWeight: 400,
            opacity: 0.9,
            marginBottom: "40px",
          }}>
            गटर गैस योजना
          </h2>

          <p style={{
            fontSize: "clamp(18px, 3vw, 26px)",
            fontWeight: 600,
            opacity: 0.9,
            marginBottom: "10px",
            fontFamily: "'Tiro Devanagari Hindi', serif",
          }}>
            "हर नाले से, हर घर तक" 🚽➡️🏠
          </p>
          <p style={{
            fontSize: "16px",
            opacity: 0.7,
            maxWidth: "600px",
            margin: "0 auto 40px",
            lineHeight: 1.7,
          }}>
            The visionary scheme that was never launched — because why build infrastructure when you can just tell people to stick a pipe in a drain?
          </p>

          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: RED,
            padding: "12px 28px",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: 700,
            animation: "pulse 2s ease infinite",
          }}>
            <span style={{ animation: "blink 1s infinite" }}>●</span>
            LIVE: India's LPG Crisis — March 2026
          </div>
        </div>
      </section>

      {/* PM's ACTUAL QUOTE */}
      <section style={{
        background: WHITE,
        padding: "80px 20px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Reveal>
            <div style={{
              fontSize: "13px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: SAFFRON,
              fontWeight: 700,
              marginBottom: "30px",
            }}>
              The Original Statement — August 10, 2018
            </div>
            
            <div style={{
              background: `linear-gradient(135deg, #fef9f0, #fff5e6)`,
              border: `3px solid ${SAFFRON}`,
              borderRadius: "16px",
              padding: "40px 30px",
              position: "relative",
            }}>
              <div style={{
                fontSize: "80px",
                fontFamily: "'Playfair Display', serif",
                color: SAFFRON,
                opacity: 0.3,
                position: "absolute",
                top: "10px",
                left: "20px",
                lineHeight: 1,
              }}>"</div>
              
              <p style={{
                fontFamily: "'Tiro Devanagari Hindi', serif",
                fontSize: "clamp(18px, 3vw, 22px)",
                lineHeight: 1.8,
                color: DARK,
                marginBottom: "20px",
                fontStyle: "italic",
              }}>
                "Ussne ek chote se bartan ko ulta karke, ched karke ek pipe daal di. Aur jo gutter se gas nikalta tha, woh pipeline se uske chai ke thele mein le liya. Ek aasan technology."
              </p>
              
              <p style={{
                fontSize: "16px",
                lineHeight: 1.8,
                color: "#555",
                marginBottom: "20px",
              }}>
                "He took a small utensil, inverted it, made a hole in it and put a pipe through that. Gas used to emanate from the gutter and using that pipeline, he used the gas for his tea stall. <strong>An easy technique.</strong>"
              </p>
              
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                marginTop: "20px",
              }}>
                <div style={{
                  width: "50px", height: "50px",
                  background: SAFFRON,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                }}>🧑‍💼</div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontWeight: 700, fontSize: "15px" }}>Prime Minister Narendra Modi</div>
                  <div style={{ fontSize: "13px", color: "#888" }}>World Biofuel Day Event, New Delhi — Aug 10, 2018</div>
                </div>
              </div>
            </div>

            <div style={{
              marginTop: "30px",
              background: "#FEF2F2",
              border: "1px solid #FECACA",
              borderRadius: "12px",
              padding: "20px",
              fontSize: "14px",
              color: "#991B1B",
              lineHeight: 1.7,
            }}>
              <strong>What scientists said:</strong> Delhi University Prof. Akhilesh Kumar Verma called this a "complicated, technical process which requires expertise and proper scientific understanding." Bio-methanation requires full-fledged plants — not a pipe, a utensil, and a stove. Lighting a flame over sewer gas risks explosion.
            </div>
          </Reveal>
        </div>
      </section>

      {/* CRISIS DASHBOARD */}
      <section style={{
        background: DARK,
        color: WHITE,
        padding: "80px 20px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal>
            <div style={{
              fontSize: "13px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: RED,
              fontWeight: 700,
              marginBottom: "10px",
            }}>
              🚨 Reality Check — March 2026
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 5vw, 44px)",
              marginBottom: "50px",
            }}>
              India's LPG Crisis <span style={{ color: RED }}>Right Now</span>
            </h2>
          </Reveal>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginBottom: "40px",
          }}>
            {[
              { num: 25, suffix: " Days", label: "Wait time for LPG refill", sub: "Was 48 hours", color: RED },
              { num: 67, suffix: "%", label: "Of India's LPG is imported", sub: "41% met domestically", color: SAFFRON },
              { num: 90, suffix: "%", label: "Imports via Strait of Hormuz", sub: "Now disrupted", color: "#F97316" },
              { num: 10000, suffix: "+", label: "Restaurants shutting in TN", sub: "More across India", color: "#EF4444" },
              { num: 8, suffix: "M", label: "Jobs at risk in restaurant sector", sub: "₹5.7T annual turnover", color: "#DC2626" },
              { num: 300, suffix: "%", label: "Increase in govt content takedowns", sub: "Censoring criticism", color: "#7C3AED" },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 100}>
                <div style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "16px",
                  padding: "30px 20px",
                  transition: "all 0.3s",
                }}>
                  <div style={{
                    fontSize: "clamp(36px, 5vw, 48px)",
                    fontWeight: 900,
                    color: item.color,
                    fontFamily: "'Playfair Display', serif",
                  }}>
                    <AnimatedCounter end={item.num} suffix={item.suffix} />
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 600, marginTop: "8px", opacity: 0.9 }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: "12px", opacity: 0.5, marginTop: "4px" }}>
                    {item.sub}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div style={{
              background: `linear-gradient(135deg, ${RED}20, ${RED}10)`,
              border: `1px solid ${RED}40`,
              borderRadius: "12px",
              padding: "24px",
              maxWidth: "700px",
              margin: "0 auto",
              fontSize: "15px",
              lineHeight: 1.7,
            }}>
              <strong style={{ color: RED }}>Meanwhile, Petroleum Minister Hardeep Singh Puri says:</strong>
              <br />
              "There is no shortage for domestic consumers and no reason to panic."
              <br />
              <span style={{ opacity: 0.6, fontSize: "13px" }}>
                (Same minister whose name appears in the Epstein files. Same government that invoked the Essential Commodities Act.)
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SCHEME BENEFITS */}
      <section style={{
        background: `linear-gradient(180deg, ${CREAM}, #fff)`,
        padding: "80px 20px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal>
            <div style={{
              fontSize: "13px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: GREEN,
              fontWeight: 700,
              marginBottom: "10px",
            }}>
              Scheme Benefits | योजना के लाभ
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 5vw, 44px)",
              color: NAVY,
              marginBottom: "50px",
            }}>
              Why Wait for LPG When You Have a Nala?
            </h2>
          </Reveal>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}>
            {schemeBenefits.map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="benefit-card" style={{
                  background: WHITE,
                  borderRadius: "16px",
                  padding: "32px 24px",
                  textAlign: "left",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                  border: "1px solid #eee",
                  transition: "all 0.3s ease",
                  cursor: "default",
                  height: "100%",
                }}>
                  <div style={{ fontSize: "40px", marginBottom: "16px" }}>{item.icon}</div>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "20px",
                    color: NAVY,
                    marginBottom: "10px",
                  }}>{item.title}</h3>
                  <p style={{ fontSize: "14px", color: "#666", lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section style={{
        background: WHITE,
        padding: "80px 20px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Reveal>
            <div style={{
              fontSize: "13px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: NAVY,
              fontWeight: 700,
              marginBottom: "10px",
            }}>
              The Journey | यात्रा
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 5vw, 44px)",
              color: NAVY,
              marginBottom: "50px",
            }}>
              From <span style={{ color: SAFFRON }}>Gutter Gas</span> to <span style={{ color: RED }}>Gas Crisis</span>
            </h2>
          </Reveal>

          <div style={{ position: "relative" }}>
            {/* Vertical line */}
            <div style={{
              position: "absolute",
              left: "24px",
              top: "0",
              bottom: "0",
              width: "3px",
              background: `linear-gradient(180deg, ${SAFFRON}, ${RED})`,
              borderRadius: "3px",
            }} />

            {timelineData.map((item, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="timeline-card" style={{
                  display: "flex",
                  gap: "24px",
                  alignItems: "flex-start",
                  marginBottom: "32px",
                  transition: "transform 0.3s",
                  cursor: "default",
                }}>
                  <div style={{
                    width: "50px",
                    height: "50px",
                    minWidth: "50px",
                    background: item.color,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "22px",
                    zIndex: 1,
                    boxShadow: `0 0 0 4px ${CREAM}, 0 4px 15px ${item.color}33`,
                  }}>
                    {item.icon}
                  </div>
                  <div style={{
                    background: CREAM,
                    borderRadius: "12px",
                    padding: "20px 24px",
                    textAlign: "left",
                    flex: 1,
                    borderLeft: `4px solid ${item.color}`,
                  }}>
                    <div style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: item.color,
                      marginBottom: "6px",
                      letterSpacing: "1px",
                    }}>
                      {item.year}
                    </div>
                    <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#444" }}>{item.event}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO APPLY - SATIRICAL */}
      <section style={{
        background: `linear-gradient(135deg, ${NAVY}, #16213e)`,
        color: WHITE,
        padding: "80px 20px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Reveal>
            <div style={{
              fontSize: "13px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: SAFFRON,
              fontWeight: 700,
              marginBottom: "10px",
            }}>
              Application Process | आवेदन प्रक्रिया
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 5vw, 44px)",
              marginBottom: "50px",
            }}>
              How to Get Your Gutter Gas Connection
            </h2>
          </Reveal>

          {[
            { step: 1, title: "Locate Your Nearest Nala", desc: "Use the Swachh Bharat app (if it works) to find an open drain near you. The smellier, the better — that's methane!", icon: "📍" },
            { step: 2, title: "Acquire an Ulta Bartan", desc: "Take one small utensil. Invert it. Make a hole. Insert pipe. PM Modi certified this as 'easy technology'.", icon: "🏺" },
            { step: 3, title: "Pray It Doesn't Explode", desc: "Scientists warn sewer gas can cause dangerous explosions. But what do scientists know? The PM read it in a newspaper.", icon: "🙏" },
            { step: 4, title: "Make Chai, Not Questions", desc: "Use your nala gas to make tea. Do NOT ask why India imports 67% of its LPG. Do NOT demand a Parliament debate. Just drink chai.", icon: "🍵" },
            { step: 5, title: "Share This Website", desc: "Because the government censors social media posts about the LPG crisis. Share before this gets taken down too.", icon: "📢" },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 100}>
              <div style={{
                display: "flex",
                gap: "20px",
                alignItems: "flex-start",
                textAlign: "left",
                marginBottom: "24px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "16px",
                padding: "24px",
              }}>
                <div style={{
                  width: "56px",
                  height: "56px",
                  minWidth: "56px",
                  background: `${SAFFRON}22`,
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: SAFFRON, fontWeight: 700, letterSpacing: "2px" }}>
                    STEP {item.step}
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "4px 0 8px" }}>{item.title}</h3>
                  <p style={{ fontSize: "14px", opacity: 0.7, lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{
        background: CREAM,
        padding: "80px 20px",
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <div style={{
              fontSize: "13px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: NAVY,
              fontWeight: 700,
              marginBottom: "10px",
            }}>
              FAQ | अक्सर पूछे जाने वाले सवाल
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 5vw, 44px)",
              color: NAVY,
              marginBottom: "50px",
            }}>
              Frequently Asked Questions
            </h2>
          </Reveal>

          {faqData.map((item, i) => (
            <Reveal key={i} delay={i * 80}>
              <div
                className="faq-item"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  background: WHITE,
                  borderRadius: "12px",
                  marginBottom: "12px",
                  overflow: "hidden",
                  cursor: "pointer",
                  border: openFaq === i ? `2px solid ${SAFFRON}` : "2px solid #eee",
                  transition: "all 0.3s",
                }}
              >
                <div style={{
                  padding: "20px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "16px",
                }}>
                  <h3 style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    textAlign: "left",
                    color: openFaq === i ? SAFFRON : DARK,
                    transition: "color 0.3s",
                  }}>{item.q}</h3>
                  <span style={{
                    fontSize: "24px",
                    fontWeight: 300,
                    transition: "transform 0.3s",
                    transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                    color: SAFFRON,
                    minWidth: "24px",
                  }}>+</span>
                </div>
                <div style={{
                  maxHeight: openFaq === i ? "300px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.4s ease",
                }}>
                  <p style={{
                    padding: "0 24px 20px",
                    fontSize: "14px",
                    color: "#555",
                    lineHeight: 1.8,
                    textAlign: "left",
                  }}>{item.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SHARE / CTA */}
      <section style={{
        background: `linear-gradient(135deg, ${SAFFRON}, #FF6600)`,
        color: WHITE,
        padding: "80px 20px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontSize: "60px", marginBottom: "20px", animation: "float 3s ease infinite" }}>📢</div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 5vw, 44px)",
              marginBottom: "16px",
            }}>
              Share Before They Censor This Too
            </h2>
            <p style={{
              fontSize: "16px",
              opacity: 0.9,
              lineHeight: 1.7,
              marginBottom: "40px",
            }}>
              The government has ordered 300% more social media takedowns in 2025. Cartoons about India-Iran relations are being censored. Posts questioning the PM are being deleted under IT Act Section 69A. Share this website while you still can.
            </p>
            <ShareButtons />
            <p style={{
              fontSize: "13px",
              opacity: 0.7,
              marginTop: "30px",
            }}>
              pmguttergasyojna.com — Because when the PM told India to cook from gutters, we laughed. Now we can't cook at all.
            </p>
          </Reveal>
        </div>
      </section>

      {/* THE REAL ASK */}
      <section style={{
        background: DARK,
        color: WHITE,
        padding: "60px 20px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <Reveal>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(22px, 4vw, 32px)",
              marginBottom: "20px",
            }}>
              What We Actually Demand
            </h2>
            <div style={{ textAlign: "left", fontSize: "15px", lineHeight: 2.2 }}>
              {[
                "Allow a full parliamentary debate on the West Asia crisis and its impact on India",
                "Make the India-US trade deal details public for democratic scrutiny",
                "Explain why India's energy security was tied to a single chokepoint without diversification",
                "Stop censoring citizens who question government policy on social media",
                "Accountability for an energy policy that left 1.4 billion people vulnerable",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "4px" }}>
                  <span style={{ color: SAFFRON, fontWeight: 900, minWidth: "24px" }}>{i + 1}.</span>
                  <span style={{ opacity: 0.9 }}>{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        background: "#0d0d1a",
        color: "rgba(255,255,255,0.4)",
        padding: "40px 20px",
        textAlign: "center",
        fontSize: "13px",
        lineHeight: 1.8,
      }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            padding: "24px",
            marginBottom: "20px",
          }}>
            <strong style={{ color: "rgba(255,255,255,0.7)" }}>⚖️ Disclaimer:</strong> This is a satirical website created for political commentary and public awareness. It is not affiliated with any political party, government ministry, or official scheme. All factual claims about the LPG crisis, PM's statements, and government actions are sourced from verified news reports (CNBC, The Week, Business Today, ANI, Zee News, Newslaundry, Al Jazeera, Scroll.in). Satire is protected under Article 19(1)(a) of the Indian Constitution — the fundamental right to freedom of speech and expression.
          </div>
          <p>
            pmguttergasyojna.com | Made by concerned citizens of India 🇮🇳
          </p>
          <p style={{ marginTop: "8px", opacity: 0.5 }}>
            "In a democracy, the people get the government they deserve." — Alexis de Tocqueville
          </p>
        </div>
      </footer>
    </div>
  );
}
