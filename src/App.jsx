import { useState, useEffect } from "react";
import "./index.css";
import logo from "./assets/pressed-aged-logo.png";

const navSections = [
  { id: "experience", label: "Experience" },
  { id: "humidor",    label: "Humidor" },
  { id: "spinning",   label: "Now Spinning" },
  { id: "membership", label: "Membership" },
  { id: "events",     label: "Events" },
];

const memberships = [
  {
    name: "The Listener",
    label: "Social Access",
    perks: [
      "Priority reservations",
      "Member listening nights",
      "Early event access",
      "Curated music programming",
    ],
    featured: false,
  },
  {
    name: "The Collector",
    label: "Humidor Access",
    perks: [
      "Private locker eligibility",
      "Cigar storage",
      "Member-only pairings",
      "Preferred lounge seating",
    ],
    featured: false,
  },
  {
    name: "The Patron",
    label: "Premier Access",
    perks: [
      "Invite-only evenings",
      "Private tastings",
      "After-hours experiences",
      "Concierge booking",
    ],
    featured: true,
  },
];

const events = [
  {
    title: "Vinyl & Vices",
    day: "Thursdays",
    copy: "Classic records, premium cigars, and slow conversation in a low-lit listening room.",
  },
  {
    title: "Smoke & Sinatra",
    day: "Monthly",
    copy: "Timeless vocals, tailored cigar pairings, and old-school lounge energy.",
  },
  {
    title: "Bourbon & B-Sides",
    day: "Select Fridays",
    copy: "Rare pours, deep cuts, and curated cigars for the collector at heart.",
  },
];

const artists = [
  "Sade",
  "Miles Davis",
  "Outkast",
  "D'Angelo",
  "Anita Baker",
  "The Isley Brothers",
  "John Coltrane",
  "Erykah Badu",
  "Nina Simone",
  "Marvin Gaye",
];

const testimonials = [
  {
    quote:
      "Walking into Pressed & Aged feels like stepping into the best version of a Saturday night. The energy, the music, the smoke — there's nothing like it in Nashville.",
    name: "Marcus T.",
    title: "The Patron Member",
  },
  {
    quote:
      "The humidor selection is thoughtful without being overwhelming. They actually know what they're putting in there — and the pairings? Outstanding.",
    name: "Damon R.",
    title: "The Collector Member",
  },
  {
    quote:
      "I brought clients here for an evening and the lounge did all the talking. The vibe, the service, the vinyl — it closed the deal before the cigars were finished.",
    name: "Priya N.",
    title: "The Listener Member",
  },
];

function App() {
  const [menuOpen, setMenuOpen]         = useState(false);
  const [scrolled, setScrolled]         = useState(false);
  const [parallax, setParallax]         = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [loadDone, setLoadDone]         = useState(false);
  const [cursor, setCursor]             = useState({ x: -200, y: -200 });
  const [cursorActive, setCursorActive] = useState(false);
  const [showCursor]                    = useState(
    () => typeof window !== "undefined" && !window.matchMedia("(hover: none)").matches
  );

  // Loading screen — lock scroll then release after intro
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setLoadDone(true);
      setTimeout(() => { document.body.style.overflow = ""; }, 900);
    }, 2200);
    return () => { clearTimeout(t); document.body.style.overflow = ""; };
  }, []);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Scroll: nav shrink + parallax
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setParallax(window.scrollY * 0.4);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active nav section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0, rootMargin: "-30% 0px -65% 0px" }
    );
    navSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Vinyl cursor — desktop only
  useEffect(() => {
    if (!showCursor) return;
    const move = (e) => setCursor({ x: e.clientX, y: e.clientY });
    const over = (e) =>
      setCursorActive(!!e.target.closest("a, button, input, select, textarea"));
    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
    };
  }, [showCursor]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* ── Vinyl record cursor ── */}
      {showCursor && (
        <div
          className={`vinyl-cursor${cursorActive ? " active" : ""}`}
          style={{ left: cursor.x, top: cursor.y }}
          aria-hidden="true"
        />
      )}

      {/* ── Loading / intro screen ── */}
      <div className={`loading-screen${loadDone ? " done" : ""}`} aria-hidden="true">
        <div className="loading-inner">
          <img src={logo} alt="Pressed &amp; Aged" className="loading-logo" />
          <div className="loading-bar"><span /></div>
        </div>
      </div>

      <main>
        {/* ── Mobile overlay menu ── */}
        <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
          <img src={logo} alt="Pressed &amp; Aged" className="mobile-logo" />
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <a href="#experience" onClick={closeMenu}>Experience</a>
            <a href="#humidor"    onClick={closeMenu}>Humidor</a>
            <a href="#spinning"   onClick={closeMenu}>Now Spinning</a>
            <a href="#membership" onClick={closeMenu}>Membership</a>
            <a href="#events"     onClick={closeMenu}>Events</a>
            <a href="#reserve" className="mobile-cta-btn" onClick={closeMenu}>
              Reserve an Evening
            </a>
          </nav>
        </div>

        {/* ── Hero ── */}
        <section className="hero" aria-label="Hero">
          {/* Parallax background */}
          <div className="hero-bg" style={{ transform: `translateY(${parallax}px)` }} />
          {/* Ambient glow overlay */}
          <div className="hero-ambient" />
          {/* Smoke / haze layers */}
          <div className="smoke-layer smoke-1" aria-hidden="true" />
          <div className="smoke-layer smoke-2" aria-hidden="true" />
          <div className="smoke-layer smoke-3" aria-hidden="true" />

          <nav className={`nav${scrolled ? " nav-scrolled" : ""}`} aria-label="Primary navigation">
            <a href="#" className="brand">
              <img src={logo} alt="Pressed &amp; Aged — Cigar &amp; Vinyl Lounge" className="nav-logo" />
            </a>

            <div className="nav-links">
              {navSections.map(({ id, label }) => (
                <a key={id} href={`#${id}`} className={activeSection === id ? "active" : ""}>
                  {label}
                </a>
              ))}
            </div>

            <div className="nav-right">
              <a className="nav-button" href="#reserve">Reserve</a>
              <button
                className={`hamburger${menuOpen ? " open" : ""}`}
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Toggle navigation"
                aria-expanded={menuOpen}
              >
                <span /><span /><span />
              </button>
            </div>
          </nav>

          <div className="hero-content">
            <p className="eyebrow reveal">Luxury cigar &amp; vinyl lounge</p>
            <h1 className="reveal reveal-d1">
              Analog culture.
              <br />
              Modern ritual.
            </h1>
            <p className="hero-copy reveal reveal-d2">
              A Nashville listening lounge designed for premium cigars, curated
              vinyl, timeless conversation, and elevated evenings worth
              remembering.
            </p>
            <div className="hero-actions reveal reveal-d3">
              <a href="#reserve"    className="primary-button">Reserve an Evening</a>
              <a href="#membership" className="secondary-button">Explore Membership</a>
            </div>
          </div>

          <div className="hero-scroll-hint" aria-hidden="true">
            <div className="scroll-line" />
            <span>Scroll</span>
          </div>
        </section>

        {/* ── Experience ── */}
        <section id="experience" className="section">
          <div className="split-heading reveal">
            <div>
              <p className="eyebrow">The Experience</p>
              <h2>More than a lounge. A sanctuary for ritual.</h2>
            </div>
            <p>
              Pressed &amp; Aged is built for people who still believe in presence —
              the sound of a needle touching wax, the pace of a well-aged cigar,
              and the kind of conversation that cannot be rushed.
            </p>
          </div>

          <div className="feature-grid">
            {[
              {
                num: "01",
                title: "Premium Cigars",
                copy: "A refined humidor experience with hand-selected cigars, thoughtful pairings, and a collector's eye for quality.",
              },
              {
                num: "02",
                title: "Curated Vinyl",
                copy: "Jazz, soul, hip-hop, R&B, and deep cuts selected to shape the mood of every evening.",
              },
              {
                num: "03",
                title: "Timeless Conversation",
                copy: "A room made for founders, creatives, travelers, locals, and people who appreciate atmosphere.",
              },
            ].map((f, i) => (
              <article className={`feature-card reveal reveal-d${i + 1}`} key={f.num}>
                <span className="feature-num">{f.num}</span>
                <h3>{f.title}</h3>
                <p>{f.copy}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── Humidor ── */}
        <section id="humidor" className="section dark-section">
          <div className="image-split">
            <div className="image-panel humidor-image reveal">
              <div>
                <p className="panel-label">Tonight's Pairing</p>
                <h3>
                  Aged Maduro
                  <br />+ Barrel Proof Pour
                </h3>
              </div>
            </div>

            <div className="content-panel reveal reveal-d1">
              <p className="eyebrow">The Humidor</p>
              <h2>Curated smokes for refined palates.</h2>
              <p>
                From everyday favorites to special occasion selections, the humidor
                is intentional — never overwhelming, never generic, always selected
                with taste.
              </p>
              <div className="mini-grid">
                <div>Staff Picks</div>
                <div>Rare Finds</div>
                <div>Member Lockers</div>
                <div>Pairing Notes</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Now Spinning ── */}
        <section id="spinning" className="section spinning-section">
          <div className="section-heading reveal">
            <p className="eyebrow">Now Spinning</p>
            <h2>Music sets the room.</h2>
            <p>
              Weekly vinyl rotations create a living soundtrack for the lounge —
              soulful, intentional, and unmistakably Nashville.
            </p>
          </div>

          <div className="marquee-wrapper reveal reveal-d1" aria-hidden="true">
            <div className="marquee-track">
              {[...artists, ...artists].map((a, i) => (
                <span key={i} className="marquee-item">
                  {a} <span className="marquee-dot">◆</span>
                </span>
              ))}
            </div>
          </div>

          <div className="image-split spinning-split">
            <div className="image-panel vinyl-image reveal reveal-d2">
              <div>
                <p className="panel-label">On the Turntable</p>
                <h3>The Sunday<br />Session</h3>
              </div>
            </div>

            <div className="spinning-record-panel reveal reveal-d3">
              <div className="vinyl-record" aria-hidden="true">
                <div className="vinyl-groove" />
                <div className="vinyl-groove" style={{ width: "70%", height: "70%" }} />
                <div className="vinyl-groove" style={{ width: "55%", height: "55%" }} />
                <div className="vinyl-label-circle">
                  <span>P&amp;A</span>
                </div>
              </div>
              <p>
                Slow, intentional, and unmistakably Nashville. Jazz, soul, and
                quiet-storm R&amp;B from a room that knows how to listen.
              </p>
            </div>
          </div>
        </section>

        {/* ── Membership ── */}
        <section id="membership" className="section dark-section">
          <div className="section-heading centered reveal">
            <p className="eyebrow">Membership</p>
            <h2>Belong to the room.</h2>
            <p>
              Membership transforms Pressed &amp; Aged from a place you visit into a
              culture you are part of.
            </p>
          </div>

          <div className="membership-grid">
            {memberships.map((m, i) => (
              <article
                className={`membership-card reveal reveal-d${i + 1}${m.featured ? " featured" : ""}`}
                key={m.name}
              >
                {m.featured && <div className="featured-badge">Most Exclusive</div>}
                <p className="membership-label">{m.label}</p>
                <h3>{m.name}</h3>
                <ul>
                  {m.perks.map((perk) => (
                    <li key={perk}>{perk}</li>
                  ))}
                </ul>
                <a
                  href="mailto:contact@pressedandaged.com"
                  className={`card-button${m.featured ? " gold-button" : ""}`}
                >
                  Join Waitlist
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* ── Events ── */}
        <section id="events" className="section">
          <div className="section-heading reveal">
            <p className="eyebrow">Events</p>
            <h2>Nights worth dressing for.</h2>
            <p>
              Programming that turns the lounge into a destination for music
              lovers, cigar collectors, and culture seekers.
            </p>
          </div>

          <div className="event-grid">
            {events.map((ev, i) => (
              <article className={`event-card reveal reveal-d${i + 1}`} key={ev.title}>
                <p className="event-day">{ev.day}</p>
                <h3>{ev.title}</h3>
                <p className="event-copy">{ev.copy}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="section dark-section">
          <div className="section-heading centered reveal">
            <p className="eyebrow">Member Stories</p>
            <h2>Told by the room.</h2>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <figure className={`testimonial-card reveal reveal-d${i + 1}`} key={t.name}>
                <div className="testimonial-quote-mark" aria-hidden="true">"</div>
                <blockquote className="testimonial-text">{t.quote}</blockquote>
                <figcaption className="testimonial-author">
                  <p className="testimonial-name">{t.name}</p>
                  <p className="testimonial-title">{t.title}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ── Location ── */}
        <section className="section location-section">
          <div className="location-grid">
            <div className="location-content reveal">
              <p className="eyebrow">Find Us</p>
              <h2>Nashville's best-kept listening secret.</h2>
              <p>
                Located in the heart of Nashville, Pressed &amp; Aged is a
                destination built for those who appreciate the slower things in
                life — and the better ones.
              </p>
              <address className="location-details">
                <div className="location-detail">
                  <p className="detail-label">Address</p>
                  <p>15551 Old Hickory Blvd</p>
                  <p>Nashville, TN 37211</p>
                </div>
                <div className="location-detail">
                  <p className="detail-label">Hours</p>
                  <p>Sun – Wed &nbsp; 10am – 10pm</p>
                  <p>Thu – Sat &nbsp;&nbsp;&nbsp; 10am – 11pm</p>
                </div>
                <div className="location-detail">
                  <p className="detail-label">Phone</p>
                  <a href="tel:+16156210114">(615) 621-0114</a>
                </div>
                <div className="location-detail">
                  <p className="detail-label">Email</p>
                  <a href="mailto:contact@pressedandaged.com">contact@pressedandaged.com</a>
                </div>
              </address>
              <a href="#reserve" className="primary-button location-reserve-btn">Reserve an Evening</a>
            </div>

            <div className="location-map-wrap reveal reveal-d1">
              <iframe
                title="Pressed &amp; Aged — 15551 Old Hickory Blvd, Nashville, TN"
                src="https://maps.google.com/maps?q=15551+Old+Hickory+Blvd,+Nashville,+TN+37211&output=embed"
                className="location-map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* ── Reserve CTA ── */}
        <section id="reserve" className="cta-section">
          <div className="reserve-inner">
            <div className="reserve-copy reveal">
              <p className="eyebrow">Private Events &amp; Reservations</p>
              <h2>Reserve the mood before the night begins.</h2>
              <p>
                For date nights, celebrations, private gatherings, and evenings
                where the soundtrack matters. Fill out the form and we'll be in
                touch within 24 hours.
              </p>
            </div>

            <form
              className="contact-form reveal reveal-d1"
              action="https://formsubmit.co/contact@pressedandaged.com"
              method="POST"
            >
              <input type="hidden" name="_subject" value="New Reservation Request — Pressed &amp; Aged" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" name="name" placeholder="Your name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" name="email" placeholder="your@email.com" required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" placeholder="(615) 000-0000" />
                </div>
                <div className="form-group">
                  <label htmlFor="visit-type">Visit Type</label>
                  <select id="visit-type" name="visit_type">
                    <option value="">Select occasion</option>
                    <option value="Date Night">Date Night</option>
                    <option value="Private Party">Private Party</option>
                    <option value="Business Meeting">Business Meeting</option>
                    <option value="Celebration">Celebration</option>
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="date">Preferred Date &amp; Time</label>
                <input
                  type="text"
                  id="date"
                  name="preferred_date"
                  placeholder="e.g. Friday, June 20 around 7pm"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message / Special Requests</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about your visit, group size, or any special requests..."
                />
              </div>

              <button type="submit" className="primary-button submit-btn">
                Send Request
              </button>
            </form>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer>
          <div className="footer-brand-block">
            <img src={logo} alt="Pressed &amp; Aged — Cigar &amp; Vinyl Lounge" className="footer-logo" />
            <p className="footer-tagline">
              Premium cigars. Curated vinyl. Timeless conversation.
            </p>
            <div className="footer-socials">
              <a
                href="https://www.facebook.com/profile.php?id=61578519595709"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pressed &amp; Aged on Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/pressedandaged/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pressed &amp; Aged on Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>

          <nav className="footer-links" aria-label="Footer navigation">
            <a href="#experience">Experience</a>
            <a href="#humidor">Humidor</a>
            <a href="#membership">Membership</a>
            <a href="#events">Events</a>
            <a href="#reserve">Reserve</a>
          </nav>

          <div className="footer-contact">
            <p>15551 Old Hickory Blvd, Nashville, TN 37211</p>
            <a href="tel:+16156210114">(615) 621-0114</a>
            <a href="mailto:contact@pressedandaged.com">contact@pressedandaged.com</a>
          </div>
        </footer>
      </main>
    </>
  );
}

export default App;
