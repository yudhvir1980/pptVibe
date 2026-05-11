const { useState, useEffect, useRef } = React;

// ───────────────────── Hero quiz ─────────────────────
const HeroQuiz = ({ pairs }) => {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null); // 'A' | 'B' | null
  const [streak, setStreak] = useState(0);
  const [history, setHistory] = useState([]); // ['hit','miss',...]
  const [randomOrder, setRandomOrder] = useState(() => pairs.map((_, i) => i < 0));

  // Decide A/B placement of the "good" slide per question (stable per index)
  const placementRef = useRef(pairs.map((_, i) => (i * 37) % 2 === 0));
  const goodIsA = placementRef.current[idx];

  const pair = pairs[idx];
  const { Bad, Good, principle, prompt, critique } = pair;

  const pick = (which) => {
    if (picked) return;
    setPicked(which);
    const correct = (which === 'A' && goodIsA) || (which === 'B' && !goodIsA);
    setHistory(h => [...h, correct ? 'hit' : 'miss']);
    setStreak(s => (correct ? s + 1 : 0));
  };

  const next = () => {
    if (idx + 1 < pairs.length) {
      setIdx(idx + 1);
      setPicked(null);
    } else {
      // finished
      setIdx(pairs.length); // sentinel
    }
  };

  const reset = () => {
    setIdx(0); setPicked(null); setStreak(0); setHistory([]);
  };

  if (idx >= pairs.length) {
    const hits = history.filter(h => h === 'hit').length;
    return (
      <div className="quiz-card quiz-card--done">
        <div className="quiz-card__meta">
          <span className="mono-label">Result</span>
          <span className="mono-label">{hits}/{pairs.length}</span>
        </div>
        <div className="quiz-card__done-headline">
          You scored <em>{hits}</em> out of {pairs.length}.
        </div>
        <div className="quiz-card__done-sub">
          {hits === pairs.length && "Your eye is sharp. Try a harder pack."}
          {hits >= 4 && hits < pairs.length && "Solid instincts. A full pack will push you further."}
          {hits < 4 && "Worth training. Start with Spot the Better Slide."}
        </div>
        <div className="quiz-card__history">
          {history.map((h, i) => (
            <span key={i} className={`hist hist--${h}`}>{h === 'hit' ? '✓' : '✕'}</span>
          ))}
        </div>
        <div className="quiz-card__actions">
          <a href="#packs" className="btn-primary">Start a full pack →</a>
          <button className="btn-ghost" onClick={reset}>Try again</button>
        </div>
      </div>
    );
  }

  const A = goodIsA ? Good : Bad;
  const B = goodIsA ? Bad : Good;
  const correctLetter = goodIsA ? 'A' : 'B';
  const correct = picked && picked === correctLetter;

  return (
    <div className="quiz-card">
      <div className="quiz-card__meta">
        <span className="mono-label">
          Question <strong>{idx + 1}</strong>/{pairs.length} · {principle}
        </span>
        <span className="streak">
          <span className="streak__dot" />
          Streak <strong>{streak}</strong>
        </span>
      </div>

      <div className="quiz-card__prompt">{prompt}</div>

      <div className="quiz-card__slides">
        {[{ letter: 'A', Comp: A }, { letter: 'B', Comp: B }].map(({ letter, Comp }) => {
          const isCorrect = picked && letter === correctLetter;
          const isWrongPick = picked === letter && letter !== correctLetter;
          return (
            <button
              key={letter}
              className={`slide-pick ${picked ? 'is-revealed' : ''} ${isCorrect ? 'is-correct' : ''} ${isWrongPick ? 'is-wrong' : ''}`}
              onClick={() => pick(letter)}
              disabled={!!picked}
            >
              <div className="slide-pick__letter">{letter}</div>
              <div className="slide-pick__frame">
                <Comp />
              </div>
              {picked && isCorrect && <div className="slide-pick__tag slide-pick__tag--ok">Better</div>}
              {picked && !isCorrect && <div className="slide-pick__tag slide-pick__tag--no">Worse</div>}
            </button>
          );
        })}
      </div>

      <div className={`quiz-card__feedback ${picked ? 'is-open' : ''}`}>
        {picked && (
          <>
            <div className="feedback__head">
              <span className={`feedback__verdict ${correct ? 'ok' : 'no'}`}>
                {correct ? 'Nice eye.' : 'Not quite.'}
              </span>
              <button className="feedback__next" onClick={next}>
                {idx + 1 < pairs.length ? 'Next question →' : 'See result →'}
              </button>
            </div>
            <div className="feedback__body">{critique}</div>
          </>
        )}
      </div>

      <div className="quiz-card__progress">
        {pairs.map((_, i) => {
          const state = i < history.length ? history[i] : i === idx ? 'cur' : 'todo';
          return <span key={i} className={`prog prog--${state}`} />;
        })}
      </div>
    </div>
  );
};

// ───────────────────── Marquee ─────────────────────
const Marquee = () => {
  const items = [
    'Hierarchy', 'Restraint', 'Contrast', 'Whitespace', 'Type scale',
    'One idea per slide', 'Edit before you design', 'Show, don\u2019t list',
    'Color with intent', 'Density is a choice', 'Read the second draft',
  ];
  const doubled = [...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee__track">
        {doubled.map((t, i) => (
          <span key={i} className="marquee__item">
            <span className="marquee__star">✶</span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

// ───────────────────── How it works ─────────────────────
const How = () => (
  <section className="how" id="how">
    <div className="how__head">
      <div className="mono-label">How it works</div>
      <h2 className="section-h">Three minutes a day, sharper instincts by Friday.</h2>
    </div>
    <ol className="how__list">
      <li className="how__step">
        <div className="how__num">01</div>
        <div className="how__title">Look at two slides.</div>
        <div className="how__body">Real decks, real choices. No theory, no jargon, no warm-up.</div>
      </li>
      <li className="how__step">
        <div className="how__num">02</div>
        <div className="how__title">Pick the better one.</div>
        <div className="how__body">Trust your gut. The point is to find out where your instincts already work.</div>
      </li>
      <li className="how__step">
        <div className="how__num">03</div>
        <div className="how__title">Read the critique.</div>
        <div className="how__body">One sentence. Why this one. Why not that one. Then move on.</div>
      </li>
    </ol>
  </section>
);

// ───────────────────── Packs ─────────────────────
const PACKS = [
  {
    n: '01', title: 'Spot the Better Slide', count: 6, time: '5 min', status: 'free',
    blurb: 'The starter pack. Six side-by-side calls covering hierarchy, color, and density.',
  },
  {
    n: '02', title: 'Typography Principles', count: 8, time: '7 min', status: 'free',
    blurb: 'Scale, weight, and line-length traps that wreck otherwise-good slides.',
  },
  {
    n: '03', title: 'Color & Contrast', count: 6, time: '5 min', status: 'soon',
    blurb: 'When one accent is enough, and when your rainbow is hiding the story.',
  },
  {
    n: '04', title: 'Whitespace & Density', count: 5, time: '4 min', status: 'soon',
    blurb: 'Reading a slide should be a glance, not a task. Calibrate the difference.',
  },
];

const PackTile = ({ p, i }) => (
  <a href="#" className={`pack pack--${p.status}`}>
    <div className="pack__head">
      <span className="mono-label">{p.n} · Pack</span>
      <span className={`pack__pill pack__pill--${p.status}`}>
        {p.status === 'free' ? 'Free' : 'Coming soon'}
      </span>
    </div>
    <div className="pack__preview">
      <PackPreview i={i} />
    </div>
    <div className="pack__body">
      <h3 className="pack__title">{p.title}</h3>
      <p className="pack__blurb">{p.blurb}</p>
      <div className="pack__meta">
        <span>{p.count} questions</span>
        <span className="pack__dot">·</span>
        <span>{p.time}</span>
        {p.status === 'free' && <span className="pack__arrow">→</span>}
      </div>
    </div>
  </a>
);

// Tiny decorative preview rendered for each pack
const PackPreview = ({ i }) => {
  if (i === 0) {
    return (
      <div className="preview preview--stack">
        <div className="preview__card preview__card--a">
          <div className="dot" /><div className="line line--short" /><div className="line" /><div className="line line--med" />
        </div>
        <div className="preview__card preview__card--b">
          <div className="big">+47%</div>
        </div>
      </div>
    );
  }
  if (i === 1) {
    return (
      <div className="preview preview--type">
        <div className="type-big">Aa</div>
        <div className="type-stack">
          <div className="type-row" style={{ fontSize: 28 }}>Aa</div>
          <div className="type-row" style={{ fontSize: 20 }}>Aa</div>
          <div className="type-row" style={{ fontSize: 14 }}>Aa</div>
        </div>
      </div>
    );
  }
  if (i === 2) {
    return (
      <div className="preview preview--color">
        <div className="swatch s1" />
        <div className="swatch s2" />
        <div className="swatch s3" />
        <div className="swatch s4 swatch--accent" />
        <div className="swatch s5" />
      </div>
    );
  }
  return (
    <div className="preview preview--grid">
      <div className="g g--dense">
        {Array.from({ length: 16 }).map((_, k) => <div key={k} className="g__cell" />)}
      </div>
      <div className="g g--airy">
        {Array.from({ length: 4 }).map((_, k) => <div key={k} className="g__cell" />)}
      </div>
    </div>
  );
};

const Packs = () => (
  <section className="packs" id="packs">
    <div className="section-head">
      <div className="mono-label">Quiz packs</div>
      <h2 className="section-h">Pick a pack. Five minutes. <em>Real</em> feedback.</h2>
    </div>
    <div className="packs__grid">
      {PACKS.map((p, i) => <PackTile key={p.n} p={p} i={i} />)}
    </div>
  </section>
);

// ───────────────────── Today's challenge ─────────────────────
const TodayCard = () => (
  <section className="today">
    <div className="today__left">
      <div className="mono-label" style={{ color: 'var(--accent)' }}>Today's challenge · 11 May</div>
      <h2 className="section-h">When the chart looks impressive but says nothing.</h2>
      <p className="today__body">
        A 12-slice pie chart in eight saturations of teal. Can you find the one
        decision the slide is actually asking you to make? Drop in tomorrow for
        the critique.
      </p>
      <a href="#" className="btn-primary">Open today's question →</a>
    </div>
    <div className="today__right">
      <div className="today__mock">
        <div className="today__mock-head">
          <span className="dot dot--r" /><span className="dot dot--y" /><span className="dot dot--g" />
          <span className="today__mock-title">monday-review.key</span>
        </div>
        <div className="today__mock-body">
          <div className="today__mock-pie" />
          <div className="today__mock-legend">
            {['Acquisition','Retention','Upsell','Expansion','Reactivation','Self-serve','Partners','Enterprise','SMB','Mid-market','Channel','Other'].map((l, i) => (
              <div key={l} className="legend-row">
                <span className="legend-row__swatch" style={{ background: `hsl(${165 + i * 8}, ${30 + i * 3}%, ${40 + (i % 4) * 8}%)` }} />
                <span>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ───────────────────── Nav / Footer ─────────────────────
const Nav = ({ onTweaksToggle }) => (
  <header className="nav">
    <div className="nav__inner">
      <a href="#" className="logo">
        <span className="logo__ppt">ppt</span><span className="logo__vibe">Vibe</span>
      </a>
      <nav className="nav__links">
        <a href="#how">How it works</a>
        <a href="#packs">Quiz packs</a>
        <a href="#">Critiques</a>
      </nav>
      <a href="#hero" className="nav__cta">Start the quiz</a>
    </div>
  </header>
);

const Footer = () => (
  <footer className="footer">
    <div className="footer__row">
      <a href="#" className="logo">
        <span className="logo__ppt">ppt</span><span className="logo__vibe">Vibe</span>
      </a>
      <div className="footer__tag">A daily quiz for people who present.</div>
    </div>
    <div className="footer__row footer__row--bot">
      <span className="mono-label">© 2026 pptVibe</span>
      <ul className="footer__links">
        <li><a href="#">Quizzes</a></li>
        <li><a href="#">Submit a slide</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>
  </footer>
);

// ───────────────────── Hero ─────────────────────
const Hero = () => (
  <section className="hero" id="hero">
    <div className="hero__left">
      <div className="mono-label hero__eyebrow">
        <span className="hero__eyebrow-rule" />
        Daily Quiz
      </div>
      <h1 className="hero__h1">
        Train your eye for <em>better</em> slides.
      </h1>
      <p className="hero__sub">
        Two slides. One is sharper. Pick the better one, read the
        one-line critique, do it again tomorrow. That's the whole product.
      </p>
      <a href="#packs" className="btn-primary" style={{ marginBottom: '36px' }}>Start Quiz →</a>
      <div className="hero__meta">
        <div className="hero__meta-item"><strong>32</strong> questions</div>
        <div className="hero__meta-item"><strong>4</strong> packs</div>
        <div className="hero__meta-item"><strong>5 min</strong> each</div>
        <div className="hero__meta-item"><strong>Free</strong> to play</div>
      </div>
    </div>
    <div className="hero__right">
      <HeroQuiz pairs={window.SLIDE_PAIRS} />
    </div>
  </section>
);

// ───────────────────── Tweaks ─────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#D94030",
  "displayFont": "Instrument Serif",
  "showStreakDot": true
}/*EDITMODE-END*/;

const App = () => {
  const [t, setTweak] = window.useTweaks
    ? window.useTweaks(TWEAK_DEFAULTS)
    : [TWEAK_DEFAULTS, () => {}];

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', t.accent);
    document.documentElement.style.setProperty('--display-font', t.displayFont);
  }, [t.accent, t.displayFont]);

  const TweaksPanel = window.TweaksPanel;
  const TweakSection = window.TweakSection;
  const TweakColor = window.TweakColor;
  const TweakRadio = window.TweakRadio;
  const TweakToggle = window.TweakToggle;

  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <How />
      <Packs />
      <TodayCard />
      <Footer />

      {TweaksPanel && (
        <TweaksPanel title="Tweaks">
          <TweakSection title="Accent">
            <TweakColor
              label="Color"
              value={t.accent}
              onChange={v => setTweak('accent', v)}
              options={['#D94030', '#0B6E4F', '#1D4ED8', '#7C3AED']}
            />
          </TweakSection>
          <TweakSection title="Display type">
            <TweakRadio
              label="Family"
              value={t.displayFont}
              onChange={v => setTweak('displayFont', v)}
              options={[
                { value: 'Instrument Serif', label: 'Serif' },
                { value: 'Geist', label: 'Sans' },
              ]}
            />
          </TweakSection>
        </TweaksPanel>
      )}
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
