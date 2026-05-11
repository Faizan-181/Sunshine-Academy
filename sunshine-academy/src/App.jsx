import { useState, useEffect, useRef } from "react";
import { submitInquiry } from "./api.js";
import {
  Phone,
  Star,
  MapPin,
  Shield,
  BookOpen,
  GraduationCap,
  CalendarCheck,
  Users,
  Medal,
  Compass,
  MessageCircle,
  DoorOpen,
  PhoneCall,
  Send,
  Calculator,
  Languages,
  Lightbulb,
  Check,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ChevronsDown,
  CheckCircle,
  ArrowRight,
  Building2,
  Navigation,
  Clock,
  Award,
  MessageSquare,
  ListChecks,
  Plus,
  Minus,
  Heart,
  UserCheck,
  User,
  Circle,
  BadgeCheck,
  Pencil,
  Target,
  Quote,
} from "lucide-react";

import SunLogo from "./components/SunLogo.jsx";
import Stars from "./components/Stars.jsx";
import Particles from "./components/Particles.jsx";
import SH from "./components/SectionHeader.jsx";

import {
  PROGRAMS,
  GALLERY,
  TEACHERS,
  TESTIMONIALS,
  FAQS,
  TICKER,
} from "./data.js";
import LOGO_SRC from "/logo.png";

export default function SunshineAcademy() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [toast, setToast] = useState(false);
  const [counts, setCounts] = useState({ s: 0, y: 0, p: 0 });
  const [heroReady, setHeroReady] = useState(false);
  const [mobilePage, setMobilePage] = useState('home');
  const [form, setForm] = useState({
    name: "",
    phone: "",
    grade: "",
    type: "",
    msg: "",
  });
  const countStarted = useRef(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = CSS;
    document.head.appendChild(s);
    setTimeout(() => setHeroReady(true), 100);
    return () => {
      try {
        document.head.removeChild(s);
      } catch (e) {}
    };
  }, []);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 30);
      document.querySelectorAll(".rv,.rl,.rr").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.88)
          el.classList.add("on");
      });
      if (
        statsRef.current &&
        !countStarted.current &&
        statsRef.current.getBoundingClientRect().top < window.innerHeight * 0.85
      ) {
        countStarted.current = true;
        const targets = { s: 500, y: 10, p: 6 },
          dur = 2000,
          t0 = performance.now();
        const tick = (now) => {
          const p = Math.min((now - t0) / dur, 1),
            e = 1 - Math.pow(1 - p, 3);
          setCounts({
            s: Math.floor(e * 500),
            y: Math.floor(e * 10),
            p: Math.floor(e * 6),
          });
          if (p < 1) requestAnimationFrame(tick);
          else setCounts(targets);
        };
        requestAnimationFrame(tick);
      }
    };
    window.addEventListener("scroll", fn, { passive: true });
    setTimeout(fn, 200);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => {
    setMobilePage(id);
    setTimeout(() => {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    setNavOpen(false);
  };

  const NAVS = ["home", "about", "programs", "team", "gallery", "contact"];

  const GBtn = ({ href, onClick, Ic, children, dark }) => {
    const s = {
      background: dark
        ? "linear-gradient(135deg,#0A1628,#1A2E4A)"
        : "linear-gradient(135deg,#F5A623,#E8920A)",
      color: dark ? "#fff" : "#0A1628",
      padding: "13px 26px",
      borderRadius: 11,
      fontWeight: 700,
      fontSize: ".92rem",
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
      gap: 9,
      border: "none",
      cursor: "pointer",
      transition: "all .25s",
    };
    const h = (e) => (e.currentTarget.style.transform = "translateY(-2px)");
    const u = (e) => (e.currentTarget.style.transform = "");
    return href ? (
      <a href={href} style={s} onMouseEnter={h} onMouseLeave={u}>
        {Ic && <Ic size={17} />}
        {children}
      </a>
    ) : (
      <button onClick={onClick} style={s} onMouseEnter={h} onMouseLeave={u}>
        {Ic && <Ic size={17} />}
        {children}
      </button>
    );
  };

  return (
    <div data-mpage={mobilePage} style={{ minHeight: "100vh", overflowX: "hidden", width: "100%" }}>
      {/* NAV */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: scrolled ? "rgba(10,22,40,.97)" : "rgba(10,22,40,.92)",
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid rgba(245,166,35,${scrolled ? 0.25 : 0.12})`,
          transition: "all .35s",
          boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,.35)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: 1220,
            margin: "0 auto",
            padding: "0 20px",
            height: 68,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              cursor: "pointer",
            }}
            onClick={() => go("home")}
          >
            <SunLogo sz={44} />
            <div>
              <div
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontWeight: 700,
                  color: "#fff",
                  fontSize: "1.05rem",
                  lineHeight: 1.1,
                }}
              >
                Sunshine Academy
              </div>
              <div
                style={{
                  fontSize: ".6rem",
                  color: "#F5A623",
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Education Center · Faisalabad
              </div>
            </div>
          </div>
          <nav
            className="hide-mob"
            style={{ display: "flex", alignItems: "center", gap: 28 }}
          >
            {NAVS.map((n) => (
              <span
                key={n}
                className="nav-lnk"
                onClick={() => go(n)}
                style={{
                  color: "rgba(255,255,255,.8)",
                  fontSize: ".87rem",
                  fontWeight: 500,
                  textTransform: "capitalize",
                }}
              >
                {n === "team" ? "Our Team" : n}
              </span>
            ))}
            <a
              href="tel:03009827982"
              style={{
                background: "linear-gradient(135deg,#F5A623,#E8920A)",
                color: "#0A1628",
                padding: "9px 20px",
                borderRadius: 9,
                fontWeight: 700,
                fontSize: ".84rem",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 7,
                transition: "all .2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-2px)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
            >
              <Phone size={15} strokeWidth={2.5} /> 0300 9827982
            </a>
          </nav>
          <button
            className="mob-btn"
            onClick={() => setNavOpen((v) => !v)}
            style={{
              background: "none",
              border: "1.5px solid rgba(255,255,255,.2)",
              borderRadius: 8,
              color: "#fff",
              width: 40,
              height: 40,
              cursor: "pointer",
              display: "none",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {navOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {navOpen && (
          <div
            style={{
              background: "rgba(10,22,40,.99)",
              borderTop: "1px solid rgba(245,166,35,.15)",
              padding: "8px 20px 20px",
              animation: "slideDown .3s ease",
            }}
          >
            {NAVS.map((n) => (
              <div
                key={n}
                onClick={() => go(n)}
                style={{
                  padding: "14px 0",
                  color: "rgba(255,255,255,.85)",
                  fontSize: ".95rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  borderBottom: "1px solid rgba(255,255,255,.06)",
                  textTransform: "capitalize",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <ChevronRight size={13} color="#F5A623" />
                {n === "team" ? "Our Team" : n}
              </div>
            ))}
            <a
              href="tel:03009827982"
              style={{
                marginTop: 16,
                background: "linear-gradient(135deg,#F5A623,#E8920A)",
                color: "#0A1628",
                padding: "13px 20px",
                borderRadius: 10,
                fontWeight: 700,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 9,
                justifyContent: "center",
                fontSize: ".95rem",
              }}
            >
              <Phone size={17} /> Call 0300 9827982
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        id="home" data-section="home"
        style={{
          minHeight: "100vh",
          background: "#0A1628",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          paddingTop: 68,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url(https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            animation: "zoomHero 8s ease forwards",
            filter: "brightness(.22)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg,rgba(10,22,40,.92) 0%,rgba(10,22,40,.7) 50%,rgba(245,166,35,.05) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(245,166,35,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(245,166,35,.04) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <Particles />
        <div
          className="hg"
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1220,
            margin: "0 auto",
            padding: "80px 24px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "center",
            width: "100%",
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(245,166,35,.12)",
                border: "1px solid rgba(245,166,35,.3)",
                color: "#F5A623",
                padding: "7px 18px",
                borderRadius: 100,
                fontSize: ".79rem",
                fontWeight: 700,
                marginBottom: 26,
                opacity: heroReady ? 1 : 0,
                transform: heroReady ? "none" : "translateY(-20px)",
                transition: "all .7s ease .1s",
              }}
            >
              <Stars n={5} sz={11} />
              &nbsp;4.9 Google Rating · Faisalabad
            </div>
            <h1
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(2.2rem,4.5vw,3.8rem)",
                color: "#fff",
                lineHeight: 1.1,
                marginBottom: 22,
                opacity: heroReady ? 1 : 0,
                transform: heroReady ? "none" : "translateY(35px)",
                transition: "all .8s cubic-bezier(.16,1,.3,1) .3s",
              }}
            >
              Helping Students
              <br />
              Learn with <span className="shimmer-txt">Confidence</span>
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,.68)",
                fontSize: "1.05rem",
                lineHeight: 1.72,
                marginBottom: 34,
                maxWidth: 500,
                opacity: heroReady ? 1 : 0,
                transition: "all .8s cubic-bezier(.16,1,.3,1) .5s",
              }}
            >
              A trusted local education center in Shadab Colony, Faisalabad —
              dedicated to guiding students toward academic success in a
              supportive, focused environment.
            </p>
            <div
              className="crow"
              style={{
                display: "flex",
                gap: 14,
                flexWrap: "wrap",
                marginBottom: 36,
                opacity: heroReady ? 1 : 0,
                transition: "all .8s cubic-bezier(.16,1,.3,1) .7s",
              }}
            >
              <a
                href="tel:03009827982"
                className="glow-btn"
                style={{
                  background: "linear-gradient(135deg,#F5A623,#E8920A)",
                  color: "#0A1628",
                  padding: "14px 28px",
                  borderRadius: 11,
                  fontWeight: 700,
                  fontSize: ".95rem",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  boxShadow: "0 6px 24px rgba(245,166,35,.4)",
                }}
              >
                <Phone size={18} strokeWidth={2.5} /> Call Now — 0300 9827982
              </a>
              <button
                onClick={() => go("contact")}
                style={{
                  background: "transparent",
                  color: "#fff",
                  padding: "14px 28px",
                  borderRadius: 11,
                  fontWeight: 600,
                  fontSize: ".95rem",
                  border: "1.5px solid rgba(255,255,255,.22)",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  transition: "all .25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#F5A623";
                  e.currentTarget.style.color = "#F5A623";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,.22)";
                  e.currentTarget.style.color = "#fff";
                }}
              >
                Send Inquiry
              </button>
            </div>
            <div
              style={{
                display: "flex",
                gap: 20,
                flexWrap: "wrap",
                opacity: heroReady ? 1 : 0,
                transition: "all .8s ease .9s",
              }}
            >
              {[
                { I: MapPin, t: "Shadab Colony, Faisalabad" },
                { I: Shield, t: "Trusted Local Center" },
                { I: Award, t: "10+ Years" },
              ].map(({ I, t }) => (
                <div
                  key={t}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    color: "rgba(255,255,255,.55)",
                    fontSize: ".81rem",
                  }}
                >
                  <I size={13} color="#F5A623" />
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Hero right – logo + stats */}
          <div
            className="hr"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 28,
            }}
          >
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: 300,
                  height: 300,
                  borderRadius: "50%",
                  border: "1px solid rgba(245,166,35,.15)",
                  animation: "rotate 18s linear infinite",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  width: 250,
                  height: 250,
                  borderRadius: "50%",
                  border: "1px dashed rgba(245,166,35,.1)",
                  animation: "rotate 28s linear infinite reverse",
                }}
              />
              {/* Circular logo badge */}
              <div
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 60px rgba(245,166,35,.4)",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <img
                  src={LOGO_SRC}
                  alt="Sunshine Academy"
                  style={{
                    width: 160,
                    height: 160,
                    objectFit: "contain",
                    mixBlendMode: "screen",
                    filter: "drop-shadow(0 0 20px rgba(245,166,35,0.7))",
                  }}
                />
              </div>
              <div
                className="float-anim"
                style={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  background: "#F5A623",
                  color: "#0A1628",
                  padding: "9px 14px",
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: ".77rem",
                  boxShadow: "0 8px 28px rgba(245,166,35,.45)",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Star size={13} fill="#0A1628" color="#0A1628" /> 4.9 Rating
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: -8,
                  left: -8,
                  background: "#2DD4BF",
                  color: "#0A1628",
                  padding: "9px 14px",
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: ".77rem",
                  boxShadow: "0 8px 28px rgba(45,212,191,.4)",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <CheckCircle size={13} color="#0A1628" /> 10+ Years
              </div>
            </div>
            <div
              ref={statsRef}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 14,
                width: "100%",
                maxWidth: 280,
              }}
            >
              {[
                {
                  n: counts.s,
                  s: "+",
                  l: "Students",
                  Ic: GraduationCap,
                  c: "#F5A623",
                },
                {
                  n: counts.y,
                  s: "+",
                  l: "Years",
                  Ic: CalendarCheck,
                  c: "#2DD4BF",
                },
                {
                  n: counts.p,
                  s: "",
                  l: "Programs",
                  Ic: BookOpen,
                  c: "#A78BFA",
                },
                { n: "4.9", s: "", l: "Rating", Ic: Star, c: "#F5A623" },
              ].map(({ n, s, l, Ic, c }) => (
                <div
                  key={l}
                  style={{
                    background: "rgba(255,255,255,.04)",
                    border: "1px solid rgba(255,255,255,.08)",
                    borderRadius: 14,
                    padding: "16px 12px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: 6,
                    }}
                  >
                    <Ic size={20} color={c} strokeWidth={1.8} />
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: "1.7rem",
                      fontWeight: 900,
                      color: c,
                      lineHeight: 1,
                    }}
                  >
                    {n}
                    {s}
                  </div>
                  <div
                    style={{
                      fontSize: ".72rem",
                      color: "rgba(255,255,255,.45)",
                      marginTop: 4,
                    }}
                  >
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            cursor: "pointer",
            opacity: 0.6,
          }}
          onClick={() => go("trust")}
        >
          <div
            style={{
              color: "rgba(255,255,255,.5)",
              fontSize: ".72rem",
              marginBottom: 6,
              letterSpacing: ".08em",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </div>
          <ChevronsDown
            size={20}
            color="#F5A623"
            style={{ animation: "floatY 1.5s ease-in-out infinite" }}
          />
        </div>
      </section>

      {/* TICKER */}
      <div
        id="trust" data-section="home"
        style={{ background: "#F5A623", overflow: "hidden", padding: "14px 0" }}
      >
        <div className="marquee-track">
          {[...Array(2)].map((_, rep) =>
            TICKER.map(({ Ic, t }, idx) => (
              <div
                key={`${rep}-${idx}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 32,
                  padding: "0 20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    color: "#0A1628",
                    fontWeight: 600,
                    fontSize: ".88rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Ic size={16} strokeWidth={2} />
                  {t}
                </div>
                <span
                  style={{ color: "rgba(10,22,40,.3)", fontSize: "1.2rem" }}
                >
                  ·
                </span>
              </div>
            )),
          )}
        </div>
      </div>

      {/* ABOUT */}
      <section
        id="about" data-section="about"
        className="sp"
        style={{ background: "#F9F8F6", padding: "90px 24px" }}
      >
        <div
          className="g2"
          style={{
            maxWidth: 1220,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 72,
            alignItems: "center",
          }}
        >
          <div className="rl" style={{ position: "relative" }}>
            <div
              style={{
                borderRadius: 22,
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 30px 80px rgba(0,0,0,.15)",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80"
                alt="Students at Sunshine Academy"
                style={{
                  width: "100%",
                  aspectRatio: "4/3",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform .6s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.04)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top,rgba(10,22,40,.55),transparent 55%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 20,
                  left: 20,
                  right: 20,
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                {["Focused Learning", "Small Groups", "Expert Teachers"].map(
                  (t) => (
                    <span
                      key={t}
                      style={{
                        background: "rgba(245,166,35,.9)",
                        color: "#0A1628",
                        padding: "5px 14px",
                        borderRadius: 100,
                        fontSize: ".76rem",
                        fontWeight: 700,
                      }}
                    >
                      {t}
                    </span>
                  ),
                )}
              </div>
            </div>
            <div
              className="float-anim"
              style={{
                position: "absolute",
                bottom: -16,
                right: -10,
                background: "#fff",
                borderRadius: 16,
                padding: "12px 16px",
                boxShadow: "0 14px 50px rgba(0,0,0,.12)",
                display: "flex",
                alignItems: "center",
                gap: 10,
                minWidth: 160,
                maxWidth: "85%",
              }}
            >
              <SunLogo sz={46} />
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    color: "#0A1628",
                    fontSize: ".95rem",
                    lineHeight: 1.2,
                  }}
                >
                  Faisalabad's
                  <br />
                  Trusted Center
                </div>
                <Stars n={5} sz={11} />
              </div>
            </div>
          </div>
          <div className="rr">
            <SH
              tag="Who We Are"
              title="A Dedicated Education"
              hi="Center in Faisalabad"
              sub="Sunshine Academy is a community-rooted education center in Shadab Colony, Faisalabad. We provide a warm, focused learning environment where every student receives the attention and guidance they deserve."
            />
            <ul
              style={{
                listStyle: "none",
                marginTop: 26,
                marginBottom: 32,
                display: "flex",
                flexDirection: "column",
                gap: 13,
              }}
            >
              {[
                {
                  I: UserCheck,
                  t: "Student-first approach with personal academic guidance",
                },
                {
                  I: Heart,
                  t: "Supportive learning environment for every grade level",
                },
                {
                  I: MapPin,
                  t: "Conveniently located near Lal Kothi on Jhang Road",
                },
                {
                  I: BadgeCheck,
                  t: "Trusted by families across Faisalabad for years",
                },
                {
                  I: DoorOpen,
                  t: "Simple, stress-free admission and inquiry process",
                },
              ].map(({ I, t }, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    color: "#4B5563",
                    fontSize: ".93rem",
                    lineHeight: 1.55,
                  }}
                >
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      minWidth: 24,
                      borderRadius: 8,
                      background: "linear-gradient(135deg,#F5A623,#E8920A)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 1,
                    }}
                  >
                    <I size={13} color="#0A1628" strokeWidth={2.5} />
                  </div>
                  {t}
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <GBtn href="tel:03009827982" Ic={Phone}>
                Call Us Today
              </GBtn>
              <button
                onClick={() => go("contact")}
                style={{
                  background: "transparent",
                  color: "#0A1628",
                  padding: "13px 26px",
                  borderRadius: 11,
                  fontWeight: 600,
                  fontSize: ".92rem",
                  border: "1.5px solid #F0EDE8",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  transition: "all .25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#F5A623";
                  e.currentTarget.style.color = "#D4891A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#F0EDE8";
                  e.currentTarget.style.color = "#0A1628";
                }}
              >
                Ask About Admissions <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPAL */}
      <section
        style={{
          background: "#0A1628",
          padding: "clamp(50px,8vw,90px) clamp(14px,4vw,24px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 70% at 30% 50%,rgba(245,166,35,.06),transparent 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 280,
            height: 280,
            borderRadius: "50%",
            border: "1px solid rgba(245,166,35,.07)",
          }}
          className="spin-slow"
        />
        <div
          style={{
            maxWidth: 1220,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 54 }}>
            <SH light center tag="Leadership" title="Meet Our" hi="Principal" />
          </div>
          <div className="rv" style={{ maxWidth: 900, margin: "0 auto" }}>
            <div
              className="honor-glow pgrid"
              style={{
                background: "rgba(255,255,255,.03)",
                border: "2px solid rgba(245,166,35,.3)",
                borderRadius: 22,
                padding: 48,
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: 48,
                alignItems: "center",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ position: "relative", display: "inline-block" }}>
                  <div
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg,#F5A623,#E8920A)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "3.5rem",
                      fontWeight: 900,
                      color: "#0A1628",
                      fontFamily: "'Playfair Display',serif",
                      boxShadow: "0 0 50px rgba(245,166,35,.4)",
                    }}
                  >
                    P
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: 4,
                      right: 4,
                      background: "#2DD4BF",
                      borderRadius: "50%",
                      width: 36,
                      height: 36,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "3px solid #0A1628",
                    }}
                  >
                    <BadgeCheck size={18} color="#0A1628" />
                  </div>
                </div>
                <div
                  style={{
                    marginTop: 14,
                    background: "rgba(245,166,35,.12)",
                    border: "1px solid rgba(245,166,35,.25)",
                    borderRadius: 100,
                    padding: "5px 14px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    color: "#F5A623",
                    fontSize: ".74rem",
                    fontWeight: 700,
                  }}
                >
                  <Award size={11} /> Principal
                </div>
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "1.9rem",
                    color: "#fff",
                    marginBottom: 6,
                  }}
                >
                  Mr. / Mrs. [Principal Name]
                </h3>
                <p
                  style={{
                    color: "#F5A623",
                    fontWeight: 600,
                    fontSize: ".92rem",
                    marginBottom: 22,
                  }}
                >
                  Founder & Principal, Sunshine Academy
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    marginBottom: 24,
                  }}
                >
                  {[
                    {
                      I: GraduationCap,
                      l: "Qualification",
                      v: "M.A. Education / M.Ed., University of Punjab",
                    },
                    {
                      I: CalendarCheck,
                      l: "Experience",
                      v: "15+ Years in Education & Academic Leadership",
                    },
                    {
                      I: Target,
                      l: "Expertise",
                      v: "Curriculum Design, Student Development & Mentorship",
                    },
                    {
                      I: Award,
                      l: "Achievement",
                      v: "Recognized for Outstanding Contribution to Local Education",
                    },
                  ].map(({ I, l, v }, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 14,
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          background: "rgba(245,166,35,.12)",
                          border: "1px solid rgba(245,166,35,.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <I size={16} color="#F5A623" />
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: ".7rem",
                            color: "rgba(255,255,255,.4)",
                            letterSpacing: ".06em",
                            textTransform: "uppercase",
                            fontWeight: 600,
                            marginBottom: 2,
                          }}
                        >
                          {l}
                        </div>
                        <div
                          style={{
                            color: "rgba(255,255,255,.85)",
                            fontSize: ".9rem",
                            lineHeight: 1.5,
                          }}
                        >
                          {v}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p
                  style={{
                    color: "rgba(255,255,255,.55)",
                    fontSize: ".87rem",
                    lineHeight: 1.75,
                    fontStyle: "italic",
                    borderLeft: "2px solid #F5A623",
                    paddingLeft: 16,
                  }}
                >
                  "At Sunshine Academy, we believe every child carries unlimited
                  potential. Our mission is to ignite that potential through
                  dedicated teaching, compassionate guidance, and a nurturing
                  environment that builds both knowledge and character."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEACHERS */}
      <section id="team" data-section="team" style={{ background: "#fff", padding: "90px 24px" }}>
        <div style={{ maxWidth: 1220, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 54 }}>
            <SH
              center
              tag="Our Faculty"
              title="Meet Our"
              hi="Dedicated Teachers"
              sub="Qualified, experienced and passionate educators committed to every student's success."
            />
          </div>
          <div
            className="g4"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 24,
            }}
          >
            {TEACHERS.map((t, i) => (
              <div
                key={i}
                className={`teacher-card rv td${i + 1}`}
                style={{
                  background: "#fff",
                  border: "1.5px solid #F0EDE8",
                  borderRadius: 18,
                  padding: 28,
                  boxShadow: "0 4px 20px rgba(0,0,0,.06)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 78,
                    height: 78,
                    borderRadius: "50%",
                    background: t.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                    fontWeight: 900,
                    color: "#fff",
                    fontFamily: "'Playfair Display',serif",
                    margin: "0 auto 16px",
                    boxShadow: "0 8px 28px rgba(0,0,0,.2)",
                  }}
                >
                  {t.av}
                </div>
                <h4
                  style={{
                    fontWeight: 700,
                    color: "#0A1628",
                    fontSize: "1rem",
                    lineHeight: 1.3,
                    marginBottom: 4,
                  }}
                >
                  {t.name}
                </h4>
                <p
                  style={{
                    color: "#D4891A",
                    fontSize: ".77rem",
                    fontWeight: 600,
                    marginBottom: 14,
                  }}
                >
                  {t.role}
                </p>
                <div
                  style={{
                    background: "#F9F8F6",
                    borderRadius: 10,
                    padding: "10px 12px",
                    marginBottom: 12,
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      fontSize: ".67rem",
                      color: "#9CA3AF",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: ".06em",
                      marginBottom: 4,
                    }}
                  >
                    Qualification
                  </div>
                  <div
                    style={{
                      fontSize: ".79rem",
                      color: "#4B5563",
                      lineHeight: 1.45,
                    }}
                  >
                    {t.qual}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    justifyContent: "center",
                    marginBottom: 12,
                  }}
                >
                  <CalendarCheck size={13} color="#F5A623" />
                  <span
                    style={{
                      fontSize: ".8rem",
                      fontWeight: 700,
                      color: "#0A1628",
                    }}
                  >
                    {t.exp} Experience
                  </span>
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 6 }}
                >
                  {t.expertise.map((e, j) => (
                    <div
                      key={j}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 7,
                        background: "#FFF3D4",
                        borderRadius: 8,
                        padding: "5px 10px",
                      }}
                    >
                      <Check size={12} color="#D4891A" />
                      <span
                        style={{
                          fontSize: ".74rem",
                          color: "#92400E",
                          fontWeight: 500,
                        }}
                      >
                        {e}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section
        id="programs" data-section="programs"
        style={{ background: "#F9F8F6", padding: "90px 24px" }}
      >
        <div style={{ maxWidth: 1220, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 54 }}>
            <SH
              center
              tag="What We Offer"
              title="Programs &"
              hi="Academic Services"
              sub="From foundational academic support to focused exam preparation — designed to help every student thrive."
            />
          </div>
          <div
            className="g3"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 24,
            }}
          >
            {PROGRAMS.map(({ Ic, bg, ic, title, desc, tag }, i) => (
              <div
                key={i}
                className={`prog-card rv td${i + 1}`}
                style={{
                  background: "#fff",
                  border: "1.5px solid #F0EDE8",
                  borderRadius: 18,
                  padding: 30,
                  boxShadow: "0 2px 16px rgba(0,0,0,.05)",
                }}
              >
                <div
                  className="prog-icon"
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 14,
                    background: bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <Ic size={22} color={ic} strokeWidth={1.8} />
                </div>
                <span
                  style={{
                    background: bg,
                    color: ic,
                    padding: "4px 12px",
                    borderRadius: 100,
                    fontSize: ".7rem",
                    fontWeight: 700,
                    display: "inline-block",
                    marginBottom: 12,
                  }}
                >
                  {tag}
                </span>
                <h3
                  style={{
                    fontWeight: 700,
                    color: "#0A1628",
                    fontSize: "1.03rem",
                    marginBottom: 10,
                    lineHeight: 1.3,
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    color: "#4B5563",
                    fontSize: ".87rem",
                    lineHeight: 1.62,
                    marginBottom: 18,
                  }}
                >
                  {desc}
                </p>
                <button
                  onClick={() => go("contact")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#D4891A",
                    fontWeight: 700,
                    fontSize: ".85rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: 0,
                    transition: "gap .2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.gap = "12px")}
                  onMouseLeave={(e) => (e.currentTarget.style.gap = "6px")}
                >
                  Inquire Now <ArrowRight size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section
        id="gallery" data-section="gallery"
        style={{ background: "#0A1628", padding: "90px 24px" }}
      >
        <div style={{ maxWidth: 1220, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 54 }}>
            <SH
              light
              center
              tag="Our Campus"
              title="Gallery &"
              hi="Learning Moments"
            />
          </div>
          <div
            className="gg"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 12,
            }}
          >
            {GALLERY.map((g, i) => (
              <div
                key={i}
                className={`gal-item rv td${i + 1}`}
                style={{ height: 220 }}
              >
                <img src={g.url} alt={g.label} />
                <div className="gal-overlay">
                  <span
                    style={{
                      color: "#fff",
                      fontSize: ".88rem",
                      fontWeight: 600,
                    }}
                  >
                    {g.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 TESTIMONIALS */}
      <section
        id="reviews" data-section="reviews"
        style={{ background: "#F9F8F6", padding: "90px 24px" }}
      >
        <div style={{ maxWidth: 1220, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 54 }}>
            <SH
              center
              tag="Parent Voices"
              title="What Families Say About"
              hi="Sunshine Academy"
              sub="Real experiences from parents across Faisalabad who trusted us with their children's education."
            />
          </div>
          <div
            className="g3"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 24,
            }}
          >
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className={`testi-card rv td${i + 1}`}
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: 28,
                  boxShadow: "0 4px 24px rgba(0,0,0,.06)",
                  border: "1.5px solid #F0EDE8",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      background: t.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.4rem",
                      fontWeight: 900,
                      color: "#fff",
                      fontFamily: "'Playfair Display',serif",
                      boxShadow: "0 4px 16px rgba(0,0,0,.2)",
                    }}
                  >
                    {t.av}
                  </div>
                  <Quote size={26} color="#FFF3D4" fill="#FFF3D4" />
                </div>
                <p
                  style={{
                    color: "#374151",
                    fontSize: ".88rem",
                    lineHeight: 1.78,
                    flex: 1,
                    fontStyle: "italic",
                  }}
                >
                  "{t.text}"
                </p>
                <div>
                  <div style={{ display: "flex", marginBottom: 6 }}>
                    <Stars n={t.rating} sz={13} />
                  </div>
                  <div
                    style={{
                      fontWeight: 700,
                      color: "#0A1628",
                      fontSize: ".92rem",
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontSize: ".76rem",
                      color: "#9CA3AF",
                      marginTop: 2,
                    }}
                  >
                    {t.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HONORARY NOTE */}
      <section
        style={{
          background: "linear-gradient(135deg,#0A1628 0%,#111E35 100%)",
          padding: "90px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 15% 50%,rgba(245,166,35,.07),transparent 45%),radial-gradient(circle at 85% 50%,rgba(45,212,191,.05),transparent 45%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 300,
            height: 300,
            borderRadius: "50%",
            border: "1px solid rgba(245,166,35,.07)",
          }}
          className="spin-slow"
        />
        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div className="rv" style={{ textAlign: "center", marginBottom: 44 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(245,166,35,.12)",
                border: "1px solid rgba(245,166,35,.3)",
                color: "#F5A623",
                padding: "8px 20px",
                borderRadius: 100,
                fontSize: ".77rem",
                fontWeight: 700,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              <Award size={13} /> Honorary Note
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(1.9rem,4vw,2.7rem)",
                color: "#fff",
                lineHeight: 1.2,
              }}
            >
              A Message of{" "}
              <span style={{ color: "#F5A623" }}>Gratitude & Vision</span>
            </h2>
          </div>
          <div
            className="rv hn-pad"
            style={{
              background: "rgba(255,255,255,.03)",
              border: "1px solid rgba(245,166,35,.2)",
              borderRadius: 22,
              padding: "48px 52px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background:
                  "linear-gradient(90deg,transparent,#F5A623,#FFD700,#F5A623,transparent)",
                animation: "shimmer 3s linear infinite",
                backgroundSize: "200% auto",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 20,
                right: 28,
                opacity: 0.05,
              }}
            >
              <Quote size={110} color="#F5A623" fill="#F5A623" />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 32,
              }}
            >
              <SunLogo sz={72} />
            </div>
            <p
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(1rem,2vw,1.15rem)",
                color: "rgba(255,255,255,.92)",
                lineHeight: 1.9,
                textAlign: "center",
                marginBottom: 28,
                fontStyle: "italic",
              }}
            >
              "It is with immense pride and heartfelt gratitude that we present
              Sunshine Academy — an institution built not merely on bricks and
              mortar, but on the unwavering belief that every child deserves a
              chance to shine. Over the years, we have been honored to walk
              alongside hundreds of families, guiding their children from
              uncertainty to confidence, from struggle to success."
            </p>
            <p
              style={{
                fontSize: ".95rem",
                color: "rgba(255,255,255,.6)",
                lineHeight: 1.85,
                textAlign: "center",
                marginBottom: 28,
              }}
            >
              "Sunshine Academy was founded with a singular purpose: to create a
              space where learning is not a burden, but a joy — where teachers
              are not just instructors, but mentors who genuinely care. We have
              seen quiet students discover their voice, struggling students
              become top achievers, and uncertain parents become our strongest
              advocates. That transformation is our greatest honor."
            </p>
            <p
              style={{
                fontSize: ".95rem",
                color: "rgba(255,255,255,.6)",
                lineHeight: 1.85,
                textAlign: "center",
                marginBottom: 44,
              }}
            >
              "To every parent who placed their trust in us — thank you. To
              every student who walked through our doors — you are the reason we
              continue. And to our remarkable faculty who pour their hearts into
              this mission every day — you are the true light of Sunshine
              Academy. Together, we will continue to illuminate the path of
              knowledge for generations to come."
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                paddingTop: 28,
                borderTop: "1px solid rgba(255,255,255,.08)",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 3,
                  background: "linear-gradient(90deg,#F5A623,#E8920A)",
                  borderRadius: 2,
                  marginBottom: 8,
                }}
              />
              <div
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                Principal, Sunshine Academy
              </div>
              <div
                style={{
                  color: "#F5A623",
                  fontSize: ".83rem",
                  fontWeight: 600,
                }}
              >
                Lal Kothi, Jhang Road, Shadab Colony, Faisalabad
              </div>
              <div
                style={{
                  marginTop: 12,
                  display: "flex",
                  gap: 16,
                  alignItems: "center",
                }}
              >
                <Stars n={5} sz={15} />
                <span
                  style={{ color: "rgba(255,255,255,.35)", fontSize: ".78rem" }}
                >
                  Since 2014 · Trusted by 500+ Families
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section
        style={{
          background: "#0A1628",
          padding: "clamp(50px,8vw,90px) clamp(14px,4vw,24px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 65% 75% at 80% 50%,rgba(245,166,35,.07),transparent 60%)",
          }}
        />
        <div
          className="g2"
          style={{
            maxWidth: 1220,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 72,
            alignItems: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div className="rl">
            <SH
              light
              tag="Why Choose Us"
              title="Trusted by Families"
              hi="Across Faisalabad"
              sub="We've built our reputation one student at a time — through care, consistency, and genuine commitment to learning."
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                marginTop: 32,
              }}
            >
              {[
                {
                  I: Medal,
                  t: "Trusted Local Education Center",
                  d: "Established reputation among families across Shadab Colony and Faisalabad.",
                },
                {
                  I: Target,
                  t: "Focused, Personalized Attention",
                  d: "Every student receives individual guidance tailored to their specific needs.",
                },
                {
                  I: Compass,
                  t: "Convenient Faisalabad Location",
                  d: "Easily accessible near Lal Kothi on Jhang Road — central to the community.",
                },
                {
                  I: MessageCircle,
                  t: "Simple Admission Process",
                  d: "Just one call or message to get started — no complicated paperwork.",
                },
              ].map(({ I, t, d }, i) => (
                <div
                  key={i}
                  className={`why-item rv td${i + 1}`}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 16,
                    background: "rgba(255,255,255,.04)",
                    border: "1px solid rgba(255,255,255,.07)",
                    borderRadius: 14,
                    padding: 20,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      flexShrink: 0,
                      background: "rgba(245,166,35,.12)",
                      border: "1px solid rgba(245,166,35,.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <I size={20} color="#F5A623" strokeWidth={1.8} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        color: "#fff",
                        fontSize: ".93rem",
                        marginBottom: 4,
                      }}
                    >
                      {t}
                    </div>
                    <div
                      style={{
                        color: "rgba(255,255,255,.48)",
                        fontSize: ".84rem",
                        lineHeight: 1.55,
                      }}
                    >
                      {d}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rr">
            <div
              style={{
                background: "rgba(255,255,255,.03)",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: 22,
                padding: 36,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "clamp(3rem,8vw,5.5rem)",
                  fontWeight: 900,
                  color: "#F5A623",
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                4.9
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 8,
                }}
              >
                <Stars n={5} sz={22} />
              </div>
              <p
                style={{
                  color: "rgba(255,255,255,.45)",
                  fontSize: ".87rem",
                  marginBottom: 28,
                }}
              >
                Google Rating from real local parents & students
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                  marginBottom: 22,
                }}
              >
                {[
                  { n: "500+", l: "Students Guided", c: "#F5A623", I: Users },
                  {
                    n: "10+",
                    l: "Years of Service",
                    c: "#2DD4BF",
                    I: CalendarCheck,
                  },
                ].map(({ n, l, c, I }) => (
                  <div
                    key={l}
                    style={{
                      background: "rgba(255,255,255,.04)",
                      border: "1px solid rgba(255,255,255,.07)",
                      borderRadius: 12,
                      padding: "18px 12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: 6,
                      }}
                    >
                      <I size={22} color={c} strokeWidth={1.8} />
                    </div>
                    <div
                      style={{
                        fontFamily: "'Playfair Display',serif",
                        fontSize: "1.9rem",
                        fontWeight: 900,
                        color: c,
                      }}
                    >
                      {n}
                    </div>
                    <div
                      style={{
                        color: "rgba(255,255,255,.4)",
                        fontSize: ".73rem",
                        marginTop: 3,
                      }}
                    >
                      {l}
                    </div>
                  </div>
                ))}
              </div>
              <GBtn href="tel:03009827982" Ic={PhoneCall}>
                Call Now — 0300 9827982
              </GBtn>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact" data-section="contact"
        style={{ background: "#0A1628", padding: "90px 24px" }}
      >
        <div
          className="g2"
          style={{
            maxWidth: 1220,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 56,
            alignItems: "start",
          }}
        >
          <div className="rl">
            <SH
              light
              tag="Get In Touch"
              title="Contact"
              hi="Sunshine Academy"
              sub="Reach out for admissions, program details, timings, or to arrange a visit."
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                marginTop: 32,
              }}
            >
              {[
                {
                  I: Phone,
                  t: "Call Us",
                  v: "0300 9827982",
                  href: "tel:03009827982",
                },
                {
                  I: MapPin,
                  t: "Our Location",
                  v: "Lal Kothi, Jhang Rd, Shadab Colony, Faisalabad",
                },
                {
                  I: Clock,
                  t: "Contact Hours",
                  v: "Monday – Saturday · Morning & Evening Sessions",
                },
              ].map(({ I, t, v, href }, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 16,
                    background: "rgba(255,255,255,.04)",
                    border: "1px solid rgba(255,255,255,.07)",
                    borderRadius: 14,
                    padding: 20,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      flexShrink: 0,
                      background: "rgba(245,166,35,.12)",
                      border: "1px solid rgba(245,166,35,.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <I size={20} color="#F5A623" strokeWidth={1.8} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        color: "rgba(255,255,255,.5)",
                        fontSize: ".76rem",
                        textTransform: "uppercase",
                        letterSpacing: ".06em",
                        marginBottom: 4,
                      }}
                    >
                      {t}
                    </div>
                    {href ? (
                      <a
                        href={href}
                        style={{
                          color: "#F5A623",
                          fontWeight: 700,
                          textDecoration: "none",
                          fontSize: ".95rem",
                        }}
                      >
                        {v}
                      </a>
                    ) : (
                      <div
                        style={{
                          color: "rgba(255,255,255,.8)",
                          fontSize: ".9rem",
                          lineHeight: 1.5,
                        }}
                      >
                        {v}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rr">
            <div
              style={{
                background: "#fff",
                borderRadius: 22,
                padding: 36,
                boxShadow: "0 24px 80px rgba(0,0,0,.3)",
              }}
            >
              <h3
                style={{
                  fontWeight: 700,
                  fontSize: "1.15rem",
                  color: "#0A1628",
                  marginBottom: 24,
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                }}
              >
                <Send size={20} color="#F5A623" /> Send Us an Inquiry
              </h3>
              <div
                className="fr"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                  marginBottom: 14,
                }}
              >
                <div>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      fontSize: ".8rem",
                      fontWeight: 600,
                      color: "#0A1628",
                      marginBottom: 6,
                    }}
                  >
                    <User size={12} color="#F5A623" /> Your Name *
                  </label>
                  <input
                    className="form-inp"
                    type="text"
                    placeholder="e.g. Muhammad Ali"
                    value={form.name}
                    onChange={(e) =>
                      setForm((v) => ({ ...v, name: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      fontSize: ".8rem",
                      fontWeight: 600,
                      color: "#0A1628",
                      marginBottom: 6,
                    }}
                  >
                    <Phone size={12} color="#F5A623" /> Phone *
                  </label>
                  <input
                    className="form-inp"
                    type="tel"
                    placeholder="03XX XXXXXXX"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((v) => ({ ...v, phone: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div
                className="fr"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                  marginBottom: 14,
                }}
              >
                <div>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      fontSize: ".8rem",
                      fontWeight: 600,
                      color: "#0A1628",
                      marginBottom: 6,
                    }}
                  >
                    <GraduationCap size={12} color="#F5A623" /> Student Grade
                  </label>
                  <select
                    className="form-inp"
                    value={form.grade}
                    onChange={(e) =>
                      setForm((v) => ({ ...v, grade: e.target.value }))
                    }
                  >
                    <option value="">Select (optional)</option>
                    <option>Primary (Classes 1–5)</option>
                    <option>Middle (Classes 6–8)</option>
                    <option>Matric (9–10)</option>
                    <option>FSc / Intermediate</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      fontSize: ".8rem",
                      fontWeight: 600,
                      color: "#0A1628",
                      marginBottom: 6,
                    }}
                  >
                    <ListChecks size={12} color="#F5A623" /> Inquiry Type
                  </label>
                  <select
                    className="form-inp"
                    value={form.type}
                    onChange={(e) =>
                      setForm((v) => ({ ...v, type: e.target.value }))
                    }
                  >
                    <option value="">Select (optional)</option>
                    <option>Admissions Info</option>
                    <option>Fee / Charges</option>
                    <option>Program Details</option>
                    <option>Visit / Trial Class</option>
                    <option>General Inquiry</option>
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: ".8rem",
                    fontWeight: 600,
                    color: "#0A1628",
                    marginBottom: 6,
                  }}
                >
                  <MessageSquare size={12} color="#F5A623" /> Your Message
                </label>
                <textarea
                  className="form-inp"
                  rows={4}
                  placeholder="Ask about programs, admissions, timings..."
                  value={form.msg}
                  onChange={(e) =>
                    setForm((v) => ({ ...v, msg: e.target.value }))
                  }
                  style={{ resize: "vertical", minHeight: 90 }}
                />
              </div>
              <button
                onClick={async () => {
                  if (!form.name || !form.phone) {
                    alert('Please enter your name and phone number.');
                    return;
                  }
                  const result = await submitInquiry(form);
                  if (result.success) {
                    setToast(true);
                    setTimeout(() => setToast(false), 4200);
                    setForm({ name:'', phone:'', grade:'', type:'', msg:'' });
                  } else {
                    alert(result.message || 'Something went wrong. Please try again.');
                  }
                }}
                style={{
                  width: "100%",
                  padding: "14px",
                  border: "none",
                  background: "linear-gradient(135deg,#F5A623,#E8920A)",
                  color: "#0A1628",
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  borderRadius: 11,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 9,
                  transition: "all .25s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-2px)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
              >
                <Send size={18} /> Send Inquiry to Sunshine Academy
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" data-section="contact" style={{ background: "#F9F8F6", padding: "90px 24px" }}>
        <div style={{ maxWidth: 1220, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <SH center tag="FAQ" title="Frequently Asked" hi="Questions" />
          </div>
          <div
            style={{
              maxWidth: 760,
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {FAQS.map((f, i) => (
              <div
                key={i}
                className="rv"
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  border: `1.5px solid ${openFaq === i ? "#F5A623" : "#F0EDE8"}`,
                  overflow: "hidden",
                  transition: "border-color .3s,box-shadow .3s",
                  boxShadow:
                    openFaq === i ? "0 4px 20px rgba(245,166,35,.12)" : "none",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%",
                    padding: "18px 22px",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      flexShrink: 0,
                      background: openFaq === i ? "#FFF3D4" : "#F9F8F6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background .3s",
                    }}
                  >
                    {openFaq === i ? (
                      <Minus size={14} color="#D4891A" />
                    ) : (
                      <Plus size={14} color="#9CA3AF" />
                    )}
                  </div>
                  <span
                    style={{
                      fontWeight: 600,
                      color: "#0A1628",
                      fontSize: ".93rem",
                      flex: 1,
                      lineHeight: 1.4,
                      textAlign: "left",
                    }}
                  >
                    {f.q}
                  </span>
                  {openFaq === i ? (
                    <ChevronUp size={14} color="#9CA3AF" />
                  ) : (
                    <ChevronDown size={14} color="#9CA3AF" />
                  )}
                </button>
                <div
                  style={{
                    maxHeight: openFaq === i ? 220 : 0,
                    overflow: "hidden",
                    transition: "max-height .38s cubic-bezier(.16,1,.3,1)",
                  }}
                >
                  <p
                    style={{
                      padding:
                        openFaq === i ? "0 16px 18px 16px" : "0 16px 0 16px",
                      color: "#4B5563",
                      fontSize: ".9rem",
                      lineHeight: 1.68,
                    }}
                  >
                    {f.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        style={{
          background: "linear-gradient(135deg,#F5A623 0%,#D4891A 100%)",
          padding: "80px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 300,
            height: 300,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,.15)",
          }}
          className="spin-slow"
        />
        <div
          className="rv"
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            maxWidth: 680,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(10,22,40,.12)",
              color: "#0A1628",
              padding: "5px 16px",
              borderRadius: 100,
              fontSize: ".77rem",
              fontWeight: 700,
              letterSpacing: ".08em",
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            <Circle size={10} fill="#0A1628" color="#0A1628" /> Ready to Begin?
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(1.9rem,4vw,2.9rem)",
              color: "#0A1628",
              marginBottom: 16,
              lineHeight: 1.15,
            }}
          >
            Speak with Sunshine Academy Today
          </h2>
          <p
            style={{
              color: "rgba(10,22,40,.72)",
              fontSize: "1.05rem",
              marginBottom: 36,
              lineHeight: 1.65,
            }}
          >
            Call now to ask about admissions, academic support, class timings,
            or to arrange a visit.
          </p>
          <div
            className="finrow"
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="tel:03009827982"
              className="pulse-ring"
              style={{
                background: "#0A1628",
                color: "#fff",
                padding: "14px 30px",
                borderRadius: 11,
                fontWeight: 700,
                fontSize: ".95rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                boxShadow: "0 6px 24px rgba(10,22,40,.3)",
                transition: "all .25s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-2px)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
            >
              <Phone size={18} /> Call 0300 9827982
            </a>
            <button
              onClick={() => go("contact")}
              style={{
                background: "rgba(255,255,255,.88)",
                color: "#0A1628",
                padding: "14px 30px",
                borderRadius: 11,
                fontWeight: 700,
                fontSize: ".95rem",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                transition: "all .25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,.88)";
                e.currentTarget.style.transform = "";
              }}
            >
              <Send size={18} /> Send Inquiry
            </button>
            <a
              href="https://maps.google.com/?q=Sunshine+Academy+Faisalabad"
              target="_blank"
              style={{
                background: "rgba(255,255,255,.2)",
                color: "#0A1628",
                padding: "14px 30px",
                borderRadius: 11,
                fontWeight: 700,
                fontSize: ".95rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                border: "1.5px solid rgba(255,255,255,.4)",
                transition: "all .25s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,.35)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,.2)";
                e.currentTarget.style.transform = "";
              }}
            >
              <Navigation size={18} /> Get Directions
            </a>
          </div>
          <p
            style={{
              marginTop: 22,
              fontSize: ".82rem",
              color: "rgba(10,22,40,.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              flexWrap: "wrap",
            }}
          >
            <MapPin size={12} /> Lal Kothi, Jhang Road, Shadab Colony,
            Faisalabad
            <span style={{ opacity: 0.4 }}>·</span>
            <Star size={12} fill="#D4891A" color="#D4891A" /> 4.9 Google Rating
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#060F1E", padding: "60px 24px 24px" }}>
        <div style={{ maxWidth: 1220, margin: "0 auto" }}>
          <div
            className="fg"
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr",
              gap: 40,
              marginBottom: 48,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <SunLogo sz={42} />
                <div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontWeight: 700,
                      color: "#fff",
                      fontSize: "1.05rem",
                    }}
                  >
                    Sunshine Academy
                  </div>
                  <div
                    style={{
                      fontSize: ".6rem",
                      color: "#F5A623",
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Education Center · Faisalabad
                  </div>
                </div>
              </div>
              <p
                style={{
                  color: "rgba(255,255,255,.45)",
                  fontSize: ".84rem",
                  lineHeight: 1.65,
                  marginBottom: 18,
                }}
              >
                A trusted local education center in Shadab Colony, Faisalabad —
                dedicated to academic growth and student confidence.
              </p>
              <a
                href="tel:03009827982"
                style={{
                  color: "#F5A623",
                  fontWeight: 700,
                  fontSize: ".95rem",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Phone size={17} /> 0300 9827982
              </a>
              <div
                style={{
                  marginTop: 10,
                  color: "rgba(255,255,255,.4)",
                  fontSize: ".82rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                }}
              >
                <MapPin size={13} color="rgba(245,166,35,.6)" /> Lal Kothi,
                Jhang Rd, Faisalabad
              </div>
            </div>
            {[
              {
                h: "Quick Links",
                links: [
                  { t: "Home", id: "home" },
                  { t: "About", id: "about" },
                  { t: "Programs", id: "programs" },
                  { t: "Our Team", id: "team" },
                  { t: "Gallery", id: "gallery" },
                  { t: "Contact", id: "contact" },
                ],
              },
              {
                h: "Programs",
                links: [
                  { t: "Academic Tuition" },
                  { t: "Exam Preparation" },
                  { t: "Maths & Science" },
                  { t: "English Skills" },
                  { t: "Student Mentoring" },
                ],
              },
              {
                h: "Contact",
                links: [
                  { t: "0300 9827982", href: "tel:03009827982" },
                  { t: "Send Inquiry", id: "contact" },
                  {
                    t: "Get Directions",
                    href: "https://maps.google.com/?q=Sunshine+Academy+Faisalabad",
                  },
                  { t: "Shadab Colony" },
                ],
              },
            ].map((col) => (
              <div key={col.h}>
                <h4
                  style={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: ".88rem",
                    marginBottom: 16,
                  }}
                >
                  {col.h}
                </h4>
                <ul
                  style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {col.links.map((l) => (
                    <li key={l.t}>
                      {l.href ? (
                        <a
                          href={l.href}
                          target={
                            l.href.startsWith("http") ? "_blank" : "_self"
                          }
                          style={{
                            color: "rgba(255,255,255,.45)",
                            textDecoration: "none",
                            fontSize: ".83rem",
                            transition: "color .2s",
                            display: "flex",
                            alignItems: "center",
                            gap: 7,
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.color = "#F5A623")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.color =
                              "rgba(255,255,255,.45)")
                          }
                        >
                          <ChevronRight size={11} color="rgba(245,166,35,.4)" />
                          {l.t}
                        </a>
                      ) : l.id ? (
                        <button
                          onClick={() => go(l.id)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "rgba(255,255,255,.45)",
                            fontSize: ".83rem",
                            cursor: "pointer",
                            padding: 0,
                            display: "flex",
                            alignItems: "center",
                            gap: 7,
                            transition: "color .2s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.color = "#F5A623")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.color =
                              "rgba(255,255,255,.45)")
                          }
                        >
                          <ChevronRight size={11} color="rgba(245,166,35,.4)" />
                          {l.t}
                        </button>
                      ) : (
                        <span
                          style={{
                            color: "rgba(255,255,255,.3)",
                            fontSize: ".83rem",
                            display: "flex",
                            alignItems: "center",
                            gap: 7,
                          }}
                        >
                          <ChevronRight size={11} color="rgba(245,166,35,.2)" />
                          {l.t}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div
            style={{
              paddingTop: 24,
              borderTop: "1px solid rgba(255,255,255,.07)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <p style={{ color: "rgba(255,255,255,.3)", fontSize: ".78rem" }}>
              © 2025 Sunshine Academy, Faisalabad. All rights reserved.
            </p>
            <p
              style={{
                color: "#F5A623",
                fontSize: ".76rem",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Star size={11} fill="#F5A623" color="#F5A623" /> 4.9 Google
              Rating · Trusted Education Center in Faisalabad
            </p>
          </div>
        </div>
      </footer>

      {/* FLOATING CALL */}
      <a
        href="tel:03009827982"
        className="float-cta pulse-ring"
        title="Call Sunshine Academy"
      >
        <Phone size={24} strokeWidth={2.5} />
      </a>

      {/* MOBILE BOTTOM QUICK NAV */}
      <div
        className="mob-bottom-nav"
        style={{
          display: 'none',
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          background: 'rgba(10,22,40,0.98)',
          backdropFilter: 'blur(16px)',
          borderTop: '1px solid rgba(245,166,35,0.25)',
          padding: '6px 4px',
          boxShadow: '0 -4px 24px rgba(0,0,0,0.4)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          {[
            { icon: <GraduationCap size={21} />, label: 'Programs', sec: 'programs' },
            { icon: <Users size={21} />, label: 'Team', sec: 'team' },
            { icon: <Star size={21} fill={mobilePage==='reviews'?'#F5A623':'none'} />, label: 'Reviews', sec: 'reviews' },
            { icon: <MapPin size={21} />, label: 'Location', sec: 'contact' },
            { icon: <Phone size={21} />, label: 'Call Now', sec: null, href: 'tel:03009827982' },
          ].map(({ icon, label, sec, href }) => {
            const isActive = sec && mobilePage === sec;
            const baseStyle = {
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: 2, textDecoration: 'none', flex: 1, padding: '5px 0',
              fontSize: '.6rem', fontWeight: 700,
              letterSpacing: '.04em', textTransform: 'uppercase',
              transition: 'all .2s',
            };
            if (href) {
              return (
                <a key={label} href={href}
                  style={{ ...baseStyle, color: '#F5A623' }}
                >
                  {icon}{label}
                </a>
              );
            }
            return (
              <button key={label} onClick={() => go(sec)}
                style={{
                  ...baseStyle,
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: isActive ? '#F5A623' : 'rgba(255,255,255,0.55)',
                  borderTop: isActive ? '2px solid #F5A623' : '2px solid transparent',
                }}
              >
                {icon}{label}
              </button>
            );
          })}
        </div>
      </div>

      {/* TOAST */}
      <div className={`toast${toast ? " show" : ""}`}>
        <CheckCircle
          size={16}
          color="#F5A623"
          style={{ marginRight: 8, verticalAlign: "middle" }}
        />
        Inquiry sent! We'll call you back soon.
      </div>
    </div>
  );
}
