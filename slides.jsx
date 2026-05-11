// Mini-slide mockups for the A/B quiz pairs.
// Each pair has a "bad" and "good" version designed to teach a real principle.
// All slides render at 16:9 — sized by parent.

const S = {
  base: {
    width: '100%',
    aspectRatio: '16 / 9',
    background: '#FFFFFF',
    borderRadius: 6,
    position: 'relative',
    overflow: 'hidden',
    fontFamily: 'Geist, system-ui, sans-serif',
    color: '#18171A',
    boxShadow: '0 1px 0 rgba(24,23,26,0.06), 0 10px 30px -18px rgba(24,23,26,0.4)',
  },
};

const BadHierarchy = () => (
  <div style={{ ...S.base, padding: '7% 8%' }}>
    <div style={{ fontSize: '4.2cqw', fontWeight: 600, color: '#6b6358', marginBottom: '3%' }}>Q3 Performance Update</div>
    <ul style={{ margin: 0, paddingLeft: '4%', listStyle: 'disc', color: '#3a3631', fontSize: '3.4cqw', lineHeight: 1.35 }}>
      <li>Revenue increased by 47% compared to Q2</li>
      <li>Customer acquisition grew 23% YoY</li>
      <li>Churn dropped to 2.1% from 3.4%</li>
      <li>NPS reached an all-time high of 64</li>
      <li>Headcount expanded across 4 teams</li>
      <li>Launched in 2 new EU markets</li>
    </ul>
  </div>
);

const GoodHierarchy = () => (
  <div style={{ ...S.base, padding: '7% 8%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <div style={{ fontSize: '3cqw', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9a8f80', fontFamily: 'JetBrains Mono, monospace' }}>Q3 Performance</div>
    <div>
      <div style={{ fontSize: '16cqw', fontWeight: 600, lineHeight: 0.95, letterSpacing: '-0.03em' }}>+47%</div>
      <div style={{ fontSize: '3.6cqw', color: '#6b6358', marginTop: '2%' }}>Revenue, quarter over quarter.</div>
    </div>
    <div style={{ fontSize: '2.6cqw', color: '#9a8f80', fontFamily: 'JetBrains Mono, monospace' }}>vs +12% Q2 · target +30%</div>
  </div>
);

const BadPie = () => {
  const slices = [
    { c: '#E25C42', a: 14 }, { c: '#F2A640', a: 12 }, { c: '#F4D24A', a: 11 },
    { c: '#7BC96F', a: 10 }, { c: '#4FB3C2', a: 9 }, { c: '#5A8DEE', a: 9 },
    { c: '#8C6BD9', a: 8 }, { c: '#C962B5', a: 7 }, { c: '#E25C42', a: 6 },
    { c: '#F2A640', a: 5 }, { c: '#F4D24A', a: 5 }, { c: '#7BC96F', a: 4 },
  ];
  let acc = 0;
  const segs = slices.map(s => {
    const start = acc;
    acc += s.a;
    return `${s.c} ${start}% ${acc}%`;
  }).join(', ');
  return (
    <div style={{ ...S.base, padding: '6% 7%', display: 'flex', alignItems: 'center', gap: '5%' }}>
      <div>
        <div style={{ fontSize: '4cqw', fontWeight: 600, marginBottom: '4%' }}>Revenue by Region</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '2% 6%', fontSize: '2.4cqw' }}>
          {['NA','EMEA','APAC','LATAM','SA','UK','DE','FR','IT','ES','BR','MX'].map((l, i) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 8, height: 8, background: slices[i].c, borderRadius: 1, flexShrink: 0 }}></span>
              <span style={{ color: '#3a3631' }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ width: '38%', aspectRatio: '1', borderRadius: '50%', background: `conic-gradient(${segs})`, flexShrink: 0 }}></div>
    </div>
  );
};

const GoodBars = () => {
  const data = [
    { l: 'NA', v: 100 }, { l: 'EMEA', v: 64 }, { l: 'APAC', v: 48 },
    { l: 'LATAM', v: 22 }, { l: 'Other', v: 14 },
  ];
  return (
    <div style={{ ...S.base, padding: '6% 7%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: '4cqw', fontWeight: 600, marginBottom: '5%' }}>Revenue by Region</div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '2%' }}>
        {data.map(d => (
          <div key={d.l} style={{ display: 'flex', alignItems: 'center', gap: '3%' }}>
            <div style={{ width: '14%', fontSize: '2.6cqw', color: '#6b6358' }}>{d.l}</div>
            <div style={{ flex: 1, height: '60%', background: '#F2EDE4', borderRadius: 2, position: 'relative' }}>
              <div style={{ width: `${d.v}%`, height: '100%', background: d.l === 'NA' ? 'var(--accent, #D94030)' : '#cfc6b8', borderRadius: 2 }}></div>
            </div>
            <div style={{ width: '10%', fontSize: '2.4cqw', color: '#3a3631', fontFamily: 'JetBrains Mono, monospace', textAlign: 'right' }}>{d.v}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BadCentered = () => (
  <div style={{ ...S.base, padding: '6% 7%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: 'radial-gradient(circle at 50% 30%, #fff8ee 0%, #fff 70%)' }}>
    <div style={{ fontSize: '12cqw', marginBottom: '2%' }}>🚀</div>
    <div style={{ fontSize: '5cqw', fontWeight: 700, letterSpacing: '-0.01em', marginBottom: '2%', textShadow: '0 2px 0 rgba(0,0,0,0.05)' }}>Our Mission</div>
    <div style={{ fontSize: '2.8cqw', color: '#6b6358', maxWidth: '70%', fontStyle: 'italic' }}>
      "To synergize cross-functional ideation and deliver world-class outcomes through innovative, scalable solutions."
    </div>
  </div>
);

const GoodCentered = () => (
  <div style={{ ...S.base, padding: '8% 9%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <div style={{ fontSize: '2.6cqw', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#9a8f80', fontFamily: 'JetBrains Mono, monospace' }}>Mission</div>
    <div style={{ fontSize: '6.5cqw', fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.02em', fontFamily: 'Instrument Serif, serif' }}>
      Help one million people <span style={{ fontStyle: 'italic', color: 'var(--accent, #D94030)' }}>see design</span> the way designers do.
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '2.4cqw', color: '#9a8f80', fontFamily: 'JetBrains Mono, monospace' }}>
      <span>2026 — pptVibe</span>
      <span>01</span>
    </div>
  </div>
);

const BadType = () => (
  <div style={{ ...S.base, padding: '6% 7%' }}>
    <div style={{ fontSize: '2.4cqw', fontWeight: 700, marginBottom: '3%', textAlign: 'center' }}>Why this approach works for our customers and team</div>
    <div style={{ fontSize: '4.4cqw', color: '#3a3631', lineHeight: 1.25, fontWeight: 400 }}>
      Most organizations spend weeks aligning on a roadmap. We compress that into a single afternoon with a structured workshop, async pre-reads, and decisions captured live in the doc — no follow-ups required.
    </div>
  </div>
);

const GoodType = () => (
  <div style={{ ...S.base, padding: '6% 7%' }}>
    <div style={{ fontSize: '5cqw', fontWeight: 600, marginBottom: '3%', letterSpacing: '-0.02em', lineHeight: 1.1 }}>One afternoon, not three weeks.</div>
    <div style={{ fontSize: '2.8cqw', color: '#6b6358', lineHeight: 1.5, maxWidth: '85%' }}>
      We compress roadmap alignment into a single workshop: structured pre-reads, decisions captured live, no follow-up meetings.
    </div>
  </div>
);

const BadColor = () => (
  <div style={{ ...S.base, padding: '6% 7%', background: 'linear-gradient(135deg, #6a3aef 0%, #ef3a8c 100%)', color: '#fff' }}>
    <div style={{ fontSize: '4.4cqw', fontWeight: 700, color: '#ffe14a', textShadow: '0 0 8px rgba(0,0,0,0.3)', marginBottom: '3%' }}>Customer Growth</div>
    <div style={{ display: 'flex', gap: '4%', alignItems: 'flex-end', height: '65%' }}>
      {[40, 55, 35, 78, 62, 90].map((h, i) => (
        <div key={i} style={{ flex: 1, height: `${h}%`, background: ['#00ffd0','#ffe14a','#ff6ad5','#94ff00','#00b8ff','#ff8a3a'][i], borderRadius: '4px 4px 0 0', boxShadow: '0 0 12px rgba(255,255,255,0.3)' }}></div>
      ))}
    </div>
  </div>
);

const GoodColor = () => (
  <div style={{ ...S.base, padding: '6% 7%' }}>
    <div style={{ fontSize: '4cqw', fontWeight: 600, marginBottom: '5%' }}>Customer Growth</div>
    <div style={{ display: 'flex', gap: '2.5%', alignItems: 'flex-end', height: '60%' }}>
      {[40, 55, 35, 78, 62, 90].map((h, i) => (
        <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 5 ? 'var(--accent, #D94030)' : '#E4DBC9', borderRadius: 1 }}></div>
      ))}
    </div>
    <div style={{ display: 'flex', gap: '2.5%', marginTop: '2%', fontSize: '2.2cqw', color: '#9a8f80', fontFamily: 'JetBrains Mono, monospace' }}>
      {['Jan','Feb','Mar','Apr','May','Jun'].map(m => <div key={m} style={{ flex: 1, textAlign: 'center' }}>{m}</div>)}
    </div>
  </div>
);

const BadDensity = () => (
  <div style={{ ...S.base, padding: '4% 5%', fontSize: '1.8cqw', lineHeight: 1.3 }}>
    <div style={{ fontWeight: 700, fontSize: '3cqw', marginBottom: '1.5%' }}>Roadmap — H1 2026</div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5%' }}>
      {['Jan','Feb','Mar','Apr','May','Jun'].map(m => (
        <div key={m} style={{ border: '1px solid #ddd', padding: '4% 5%', borderRadius: 2 }}>
          <div style={{ fontWeight: 600, marginBottom: '4%' }}>{m}</div>
          <div style={{ color: '#3a3631' }}>• Feature flag rollout to all enterprise tenants in the EU and APAC</div>
          <div style={{ color: '#3a3631', marginTop: '3%' }}>• Begin migration off legacy auth provider with zero downtime targets</div>
          <div style={{ color: '#3a3631', marginTop: '3%' }}>• New onboarding flow A/B test with 4 cohorts</div>
        </div>
      ))}
    </div>
  </div>
);

const GoodDensity = () => (
  <div style={{ ...S.base, padding: '6% 7%' }}>
    <div style={{ fontWeight: 600, fontSize: '4cqw', marginBottom: '6%', letterSpacing: '-0.01em' }}>Roadmap — H1 2026</div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4%' }}>
      {[
        { q: 'Q1', t: 'Enterprise rollout', sub: 'EU + APAC tenants' },
        { q: 'Q2', t: 'Auth migration', sub: 'Zero-downtime cutover' },
        { q: 'Q2', t: 'Onboarding redesign', sub: '4-cohort A/B test' },
      ].map((r, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '4%' }}>
          <div style={{ width: '10%', fontSize: '2.2cqw', color: '#9a8f80', fontFamily: 'JetBrains Mono, monospace' }}>{r.q}</div>
          <div style={{ flex: 1, fontSize: '3.2cqw', fontWeight: 500 }}>{r.t}</div>
          <div style={{ fontSize: '2.4cqw', color: '#6b6358' }}>{r.sub}</div>
        </div>
      ))}
    </div>
  </div>
);

// Pairs: [BadComponent, GoodComponent, principle, critique]
const SLIDE_PAIRS = [
  {
    Bad: BadHierarchy, Good: GoodHierarchy,
    principle: 'Hierarchy',
    prompt: 'Which slide gets the message across faster?',
    critique: 'A bullet list of six numbers buries the lede. One headline number with context lands in a second.',
  },
  {
    Bad: BadPie, Good: GoodBars,
    principle: 'Data Clarity',
    prompt: 'Which chart is easier to read?',
    critique: '12-slice pies force the eye to compare angles. A sorted bar chart with one highlight does the work for you.',
  },
  {
    Bad: BadCentered, Good: GoodCentered,
    principle: 'Restraint',
    prompt: 'Which mission slide feels more confident?',
    critique: 'Emoji, italic centered jargon, and a drop shadow all dilute the message. Specificity and air do the opposite.',
  },
  {
    Bad: BadType, Good: GoodType,
    principle: 'Type scale',
    prompt: 'Which slide has the right hierarchy?',
    critique: 'When the body text is bigger than the title, the eye has no idea where to land first.',
  },
  {
    Bad: BadColor, Good: GoodColor,
    principle: 'Color',
    prompt: 'Which chart guides your eye to the point?',
    critique: 'A rainbow gives every bar equal weight. One accent color tells you which bar matters.',
  },
  {
    Bad: BadDensity, Good: GoodDensity,
    principle: 'Density',
    prompt: 'Which roadmap respects your time?',
    critique: 'Three columns of six-line cards is a reading task. Three rows of one phrase each is a roadmap.',
  },
];

window.SLIDE_PAIRS = SLIDE_PAIRS;
