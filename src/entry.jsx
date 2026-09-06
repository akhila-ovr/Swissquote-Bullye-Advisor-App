/* Pre-app surfaces: the entry screen (Demo vs. How it works), the onboarding
 * questionnaire that builds the user's profile, and the scrollable
 * solution-explanation deck. All render inside the same phone frame. */
import { useState, useEffect, useRef } from 'react'
import { css } from './lib/css.js'
import { Button } from './ds/index.jsx'
import BullyeAvatar from './components/BullyeAvatar.jsx'
import { StatusBar } from './overlays.jsx'
import {
  ONBOARDING_STEPS,
  THREE_A_STRATEGIES,
  RISK_TO_STRATEGY,
  MONTHLY_LABEL,
  GOAL_LABEL,
  CARE_LABEL,
  NOTIF_TYPES,
} from './data.js'

/* ------------------------------------------------------------ entry screen ---- */
const TEAM = [
  { name: 'Ethel', role: 'Public governance & geoeconomics', url: 'https://www.linkedin.com/in/etheltanhy/' },
  { name: 'Andrea', role: 'Computational science & engineering', url: 'https://www.linkedin.com/in/andrea-hrman-408478415/' },
  { name: 'Akhila', role: 'Computer science & product design', url: 'https://www.linkedin.com/in/akhila-obilisetty/' },
]

export function EntryScreen({ onDemo, onExplain }) {
  return (
    <>
      <StatusBar />
      <div style={css('flex:1;display:flex;flex-direction:column;justify-content:center;padding:24px 26px 40px')}>
        <div style={css('display:flex;flex-direction:column;align-items:center;text-align:center')}>
          <BullyeAvatar size={76} />
          <div style={css('font-size:26px;font-weight:800;letter-spacing:var(--ls-tight);color:var(--text-primary);margin:18px 0 0')}>
            Bullyee
          </div>
          <div style={css('font-size:12px;font-weight:700;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--sq-orange-600);margin-top:4px')}>
            Your friendly neighbourhood financial bull
          </div>
          <p style={css('font-size:16px;font-weight:700;color:var(--text-primary);line-height:1.5;margin:14px 4px 0')}>
            Here to help you sort your 3a, one small step at a time.
          </p>
        </div>

        <div style={css('display:flex;flex-direction:column;gap:10px;margin-top:28px')}>
          <Button variant="primary" size="lg" onClick={onDemo} style={{ width: '100%' }}>
            Try the demo
          </Button>
          <Button variant="secondary" size="lg" onClick={onExplain} style={{ width: '100%' }}>
            How it works
          </Button>
        </div>

        <div style={css('margin-top:26px;border-top:1px solid var(--border-subtle);padding-top:16px')}>
          <div style={css('font-size:10px;font-weight:800;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--text-tertiary);margin-bottom:10px')}>
            Team
          </div>
          <div style={css('display:flex;gap:10px')}>
            {TEAM.map((m) => (
              <a
                key={m.name}
                href={m.url}
                target="_blank"
                rel="noreferrer noopener"
                style={css('flex:1;display:flex;flex-direction:column;gap:2px;text-decoration:none')}
              >
                <span style={css('font-size:12.5px;font-weight:700;color:var(--text-primary)')}>{m.name}</span>
                <span style={css('font-size:10px;color:var(--text-tertiary);line-height:1.35;flex:1')}>{m.role}</span>
                <span style={css('font-size:10px;font-weight:700;color:var(--sq-orange-600);margin-top:4px')}>LinkedIn ↗</span>
              </a>
            ))}
          </div>
        </div>

        <p style={css('font-size:11px;color:var(--text-tertiary);line-height:1.5;text-align:center;margin:16px 8px 0')}>
          A concept for the Swissquote Wave Fellowship Challenge 2026.
        </p>
      </div>
    </>
  )
}

/* -------------------------------------------------------------- onboarding ---- */
const optionStyle = (selected) =>
  'width:100%;display:flex;align-items:center;gap:8px;text-align:left;border-radius:14px;padding:13px 15px;font-size:14px;font-weight:600;cursor:pointer;transition:border-color 0.12s,background 0.12s;' +
  (selected
    ? 'border:2px solid var(--brand-primary);background:var(--sq-orange-50);color:var(--text-primary);'
    : 'border:2px solid var(--border-default);background:#fff;color:var(--text-primary);')

export function Onboarding({ onFinish, onSkip, onBack }) {
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState({})
  const total = ONBOARDING_STEPS.length
  const onSummary = idx >= total
  const step = ONBOARDING_STEPS[idx]
  const scrollRef = useRef(null)

  const back = () => (idx === 0 ? onBack() : setIdx((i) => i - 1))
  const setAnswer = (id, value) => setAnswers((a) => ({ ...a, [id]: value }))
  const toggleAnswer = (id, value) =>
    setAnswers((a) => {
      const cur = Array.isArray(a[id]) ? a[id] : []
      return { ...a, [id]: cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value] }
    })
  const advance = () => setIdx((i) => i + 1)

  // Always start a step from the top.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [idx])

  const canAdvance = onSummary
    ? true
    : step.kind === 'text'
      ? !!(answers[step.id] || '').trim()
      : step.multi
        ? (answers[step.id] || []).length > 0
        : !!answers[step.id]

  return (
    <>
      <StatusBar />
      {/* progress */}
      <div style={css('flex:none;display:flex;align-items:center;gap:12px;padding:6px 22px 14px')}>
        <button onClick={back} style={css('background:none;border:none;cursor:pointer;font-size:20px;color:var(--text-primary);padding:2px 4px')}>
          ‹
        </button>
        <div style={css('flex:1;display:flex;gap:4px')}>
          {ONBOARDING_STEPS.map((_, i) => (
            <div
              key={i}
              style={{
                ...css('flex:1;height:4px;border-radius:3px'),
                background: i <= idx && !onSummary ? 'var(--brand-primary)' : i < total && onSummary ? 'var(--brand-primary)' : 'var(--sq-gray-100)',
              }}
            />
          ))}
        </div>
        {!onSummary && (
          <button onClick={onSkip} style={css('background:none;border:none;cursor:pointer;font-size:12px;font-weight:700;color:var(--text-tertiary)')}>
            Skip
          </button>
        )}
      </div>

      <div ref={scrollRef} style={{ ...css('flex:1;overflow-y:auto;display:flex;flex-direction:column'), padding: '4px 22px 20px' }}>
        {!onSummary && (
          <>
            <div style={css('display:flex;align-items:flex-start;gap:10px;margin-bottom:8px')}>
              <BullyeAvatar size={30} />
              <div style={css('font-size:17px;font-weight:700;color:var(--text-primary);line-height:1.35;padding-top:2px')}>
                {step.q}
              </div>
            </div>
            {step.hint && (
              <p style={css('font-size:12.5px;color:var(--text-secondary);line-height:1.55;margin:0 0 16px 40px')}>
                {step.hint}
              </p>
            )}

            {step.kind === 'text' ? (
              <input
                autoFocus
                value={answers[step.id] || ''}
                onChange={(e) => setAnswer(step.id, e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && canAdvance && advance()}
                placeholder={step.placeholder}
                style={css('width:100%;border:2px solid var(--border-default);border-radius:14px;padding:13px 15px;font-size:15px;font-family:var(--font-sans);color:var(--text-primary)')}
              />
            ) : (
              <div style={css('display:flex;flex-direction:column;gap:9px')}>
                {step.options.map((opt) => {
                  const selected = step.multi
                    ? (answers[step.id] || []).includes(opt.value)
                    : answers[step.id] === opt.value
                  return (
                    <button
                      key={opt.value}
                      onClick={() => (step.multi ? toggleAnswer(step.id, opt.value) : setAnswer(step.id, opt.value))}
                      style={css(optionStyle(selected))}
                    >
                      <span style={{ flex: 1 }}>{opt.label}</span>
                      {selected && <span style={css('color:var(--brand-primary);font-weight:800')}>✓</span>}
                    </button>
                  )
                })}
              </div>
            )}

            <div style={{ flex: 1 }} />

            <Button variant="primary" onClick={advance} disabled={!canAdvance} style={{ width: '100%', marginTop: 18 }}>
              {idx === total - 1 ? 'See my summary' : 'Continue'}
            </Button>
          </>
        )}

        {onSummary && <OnboardingSummary answers={answers} onFinish={() => onFinish(answers)} />}
      </div>

      <div style={css('flex:none;padding:10px 22px 14px;border-top:1px solid var(--border-subtle);font-size:11px;color:var(--text-tertiary);line-height:1.5;text-align:center')}>
        Demo only. Nothing you enter is saved anywhere - close the tab and you start over.
      </div>
    </>
  )
}

function OnboardingSummary({ answers, onFinish }) {
  const strategy = THREE_A_STRATEGIES.find((x) => x.id === RISK_TO_STRATEGY[answers.risk])
  const name = (answers.name || '').trim() || 'there'
  const goals = (Array.isArray(answers.goal) ? answers.goal : answers.goal ? [answers.goal] : []).map((g) => GOAL_LABEL[g])
  const facts = [
    goals.length > 0 && ['Why you’re here', goals.join(', ')],
    answers.careBreak && CARE_LABEL[answers.careBreak] && ['Working pattern', CARE_LABEL[answers.careBreak]],
    answers.monthly && answers.monthly !== 'unsure' && ['Monthly', MONTHLY_LABEL[answers.monthly]],
    strategy && ['3a strategy', strategy.label],
  ].filter(Boolean)

  return (
    <div>
      <div style={css('display:flex;align-items:flex-start;gap:10px;margin-bottom:14px')}>
        <BullyeAvatar size={30} />
        <div style={css('font-size:17px;font-weight:700;color:var(--text-primary);line-height:1.35;padding-top:2px')}>
          Here’s what I heard, {name}.
        </div>
      </div>

      <div style={css('background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);box-shadow:var(--shadow-sm);padding:6px 16px;margin-bottom:14px')}>
        {facts.map(([label, value], i) => (
          <div
            key={label}
            style={{
              ...css('display:flex;justify-content:space-between;align-items:center;gap:12px;padding:11px 0;font-size:13.5px'),
              borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)',
            }}
          >
            <span style={css('color:var(--text-secondary)')}>{label}</span>
            <span style={css('color:var(--text-primary);font-weight:600;text-align:right')}>{value}</span>
          </div>
        ))}
      </div>

      {strategy && (
        <div style={css('background:var(--sq-orange-50);border-radius:var(--radius-lg);padding:14px 16px;margin-bottom:16px')}>
          <div style={css('font-size:11px;font-weight:700;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--sq-orange-600);margin-bottom:4px')}>
            {strategy.label} · {strategy.equity}
          </div>
          <div style={css('font-size:13.5px;color:var(--text-primary);line-height:1.55')}>{strategy.blurb}</div>
        </div>
      )}

      <p style={css('font-size:12.5px;color:var(--text-secondary);line-height:1.55;margin:0 0 6px')}>
        You can change any of this later in your <strong>Profile</strong>.
      </p>
      <p style={css('font-size:12.5px;color:var(--text-tertiary);line-height:1.55;margin:0 0 16px')}>
        None of it is saved. If you leave, you’ll set it up again next time.
      </p>

      <Button variant="primary" size="lg" onClick={onFinish} style={{ width: '100%' }}>
        Enter the app
      </Button>
    </div>
  )
}

/* --------------------------------------------------------------- explainer ---- */
function P({ children }) {
  return <p style={css('font-size:13.5px;color:var(--text-primary);line-height:1.65;margin:0 0 10px')}>{children}</p>
}

// items: a string, or [boldLead, rest] to bold the opening phrase.
function UL({ items }) {
  return (
    <ul style={css('margin:0 0 12px;padding:0;list-style:none')}>
      {items.map((it, i) => (
        <li key={i} style={css('display:flex;gap:8px;margin-bottom:7px;font-size:13px;color:var(--text-primary);line-height:1.55')}>
          <span style={css('color:var(--sq-orange-500);flex:none')}>•</span>
          <span>
            {Array.isArray(it) ? (
              <>
                <strong>{it[0]}</strong>
                {it[1]}
              </>
            ) : (
              it
            )}
          </span>
        </li>
      ))}
    </ul>
  )
}

function PieceRow({ label, body, visual }) {
  return (
    <div style={css('margin-bottom:18px')}>
      <div style={css('font-size:13px;color:var(--text-primary);line-height:1.55;margin-bottom:8px')}>
        <strong>{label}</strong> {body}
      </div>
      {visual}
    </div>
  )
}

function NumSection({ n, kicker, title, children }) {
  return (
    <div style={css('margin-bottom:26px')}>
      <div style={css('font-size:11px;font-weight:800;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--sq-orange-600);margin-bottom:4px')}>
        {n} · {kicker}
      </div>
      <div style={css('font-size:17px;font-weight:800;letter-spacing:var(--ls-tight);color:var(--text-primary);line-height:1.3;margin-bottom:10px')}>
        {title}
      </div>
      {children}
    </div>
  )
}

function NotifCard({ item }) {
  const chip = css(
    'font-size:10px;font-weight:700;color:rgba(255,255,255,0.85);border:1px solid rgba(255,255,255,0.22);border-radius:var(--radius-pill);padding:3px 9px'
  )
  return (
    <div style={css('margin-bottom:12px')}>
      <div style={css('background:var(--surface-inverse);border-radius:16px;padding:12px 14px;display:flex;gap:9px;align-items:flex-start')}>
        <BullyeAvatar size={22} />
        <div style={css('flex:1')}>
          <div style={css('color:#fff;font-size:12.5px;font-weight:700;margin-bottom:2px;line-height:1.35')}>{item.title}</div>
          <div style={css('color:rgba(255,255,255,0.7);font-size:11.5px;line-height:1.5;margin-bottom:8px')}>{item.body}</div>
          <div style={css('display:flex;gap:6px')}>
            <span style={chip}>＋ Save</span>
            <span style={chip}>↗ Share</span>
          </div>
        </div>
      </div>
      <div style={css('border-left:2px solid var(--sq-orange-300);padding-left:9px;margin:6px 0 0 4px')}>
        <span style={css('font-size:10px;font-weight:800;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--text-tertiary)')}>
          Design choice
        </span>
        <span style={css('font-size:11px;color:var(--text-secondary);line-height:1.5;font-style:italic')}> {item.why}</span>
      </div>
    </div>
  )
}

function NotifPreview() {
  const groups = [
    { label: 'Worth reading on the lock screen', items: NOTIF_TYPES.filter((n) => n.type === 'self') },
    { label: 'Meant to bring the user back in', items: NOTIF_TYPES.filter((n) => n.type === 'bring') },
  ]
  return (
    <div style={css('margin:6px 0 14px')}>
      {groups.map((g) => (
        <div key={g.label} style={css('margin-bottom:14px')}>
          <div style={css('font-size:11px;font-weight:700;color:var(--text-tertiary);margin-bottom:8px')}>{g.label}</div>
          {g.items.map((item, i) => (
            <NotifCard key={i} item={item} />
          ))}
        </div>
      ))}
    </div>
  )
}

export function Explainer({ onBack, onDemo }) {
  return (
    <>
      <StatusBar />
      <div style={css('flex:none;background:var(--surface-page);z-index:3;padding:6px 20px 12px;border-bottom:1px solid var(--border-subtle);display:flex;align-items:center;gap:12px')}>
        <button onClick={onBack} style={css('background:none;border:none;cursor:pointer;font-size:20px;color:var(--text-primary);padding:2px 4px')}>
          ‹
        </button>
        <div style={css('flex:1')}>
          <div style={css('font-size:11px;color:var(--text-tertiary);letter-spacing:var(--ls-caps);text-transform:uppercase')}>
            The thinking behind it
          </div>
          <div style={css('font-size:17px;font-weight:700;color:var(--text-primary)')}>How Bullyee works</div>
        </div>
        <BullyeAvatar size={30} />
      </div>

      <div style={{ ...css('flex:1;overflow-y:auto'), padding: '20px 20px 40px' }}>
        <p style={css('font-size:12.5px;color:var(--text-secondary);line-height:1.65;margin:0 0 22px')}>
          A UX case for the Swissquote pillar 3a, aimed at women.
        </p>

        <NumSection n="1" kicker="Research approach" title="What we did">
          <P>Qualitative and exploratory, read against published Swiss pension data. We wanted the “why” behind the gap.</P>
          <UL
            items={[
              'Secondary data: Federal Statistical Office figures on the pension gap, part-time work, and 3a participation.',
              'Desk research: ~24 threads across Mustachian Post and EnglishForum.ch, the elleXX content library, and an SRF / cash.ch piece with its comments.',
              'Informal interviews with women in their 20s to 40s about pensions and the 3a.',
            ]}
          />
        </NumSection>

        <NumSection n="2" kicker="Findings" title="Why the 3a gets skipped">
          <div style={css('background:var(--sq-orange-50);border-radius:var(--radius-lg);padding:14px 15px;margin-bottom:14px')}>
            <div style={css('font-size:10.5px;font-weight:700;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--sq-orange-600);margin-bottom:8px')}>
              The gap, in numbers (Federal Statistical Office)
            </div>
            {[
              ['32.8%', 'gender pension gap in 2021: CHF 35,442 a year for women vs CHF 52,735 for men.'],
              ['58% vs 19.6%', 'women vs men working part-time in 2023.'],
              ['46%', 'how much lower women’s Pillar 2 benefits are, on average.'],
              ['34.9% vs 45.1%', 'women vs men receiving Pillar 3a benefits in 2019; median capital CHF 41.9k vs CHF 49.6k.'],
            ].map(([n, t]) => (
              <div key={n} style={css('display:flex;gap:8px;margin-bottom:5px;font-size:12px;line-height:1.5')}>
                <span style={css('font-weight:800;color:var(--text-primary);flex:none')}>{n}</span>
                <span style={css('color:var(--text-secondary)')}>{t}</span>
              </div>
            ))}
          </div>
          <P>That’s the backdrop. What we heard:</P>
          <UL
            items={[
              ['Perceived unfairness. ', 'Career breaks and part-time years quietly cost women, and they feel they carry that risk alone. It reads as emotional, not financial.'],
              ['Jargon as a barrier to entry. ', 'Questions start at “what even is a 3a”. Confusion, not lack of ambition.'],
              ['Low trust from prior experience. ', 'High-fee, insurance-linked bank 3a products left people wary of the whole category.'],
              ['Choice overload and lock-in aversion. ', 'Ten providers to compare, and the money is locked until retirement.'],
            ]}
          />
          <P>What moved people, when something did:</P>
          <UL
            items={[
              ['A concrete moment ', 'that made the unfairness real, often a life event.'],
              ['A peer prompt: ', 'a friend asking “have you sorted yours?”'],
              ['Life-stage transitions: ', 'a new baby, a separation, going back to work.'],
            ]}
          />
        </NumSection>

        <NumSection n="3" kicker="Design response" title="Findings, mapped to decisions">
          <P>Goal: help women feel confident enough to start, and keep going once the novelty fades.</P>
          <UL
            items={[
              ['Perceived unfairness → ', 'name it directly, and build a friend into the product.'],
              ['Jargon → ', "every term is tappable, saved to the user's words, and reused in a friendly, low-pressure quiz."],
              ['Low trust → ', "Bullyee explains rather than pitches; the user's profile is visible and editable."],
              ['Choice overload → ', 'onboarding sets one starting strategy (Saving to Ambitious), changeable any time.'],
              ['Lock-in aversion → ', 'addressed openly as a commitment device, in a myth-buster notification.'],
            ]}
          />
        </NumSection>

        <NumSection n="4" kicker="Design" title="The two problems, and the parts that solve them">
          <P>
            <strong>Getting women on the app.</strong> Notifications carry the load, in two types:
          </P>
          <UL
            items={[
              ['Self-contained: ', 'a definition, a fact, a myth busted. Value on the lock screen, nothing to open.'],
              ['Return-driving: ', 'the quiz, the weekly letter, a friend’s activity. The payoff is inside.'],
            ]}
          />
          <NotifPreview />
          <P>
            The social layer is intentionally minimal: peer nudging only, closer to a Duolingo friends list than a group
            portfolio. It leans on the finding that women engage more readily alongside people they trust.
          </P>

          <div style={css('margin:14px 0 12px')} />
          <PieceRow
            label="The weekly letter."
            body="A short, recurring touchpoint: how the user is doing, one thing to do, one question back. Low effort, no charts to decode."
            visual={
              <>
                <div style={css('background:var(--surface-inverse);border-radius:12px;padding:11px 13px;display:flex;gap:9px;align-items:center;margin-bottom:8px')}>
                  <BullyeAvatar size={22} />
                  <div style={css('flex:1')}>
                    <div style={css('color:#fff;font-size:11.5px;font-weight:700')}>Your weekly letter is ready</div>
                    <div style={css('color:rgba(255,255,255,0.6);font-size:10.5px')}>Your week, from Bullyee</div>
                  </div>
                  <span style={css('color:rgba(255,255,255,0.5);font-size:15px')}>›</span>
                </div>
                <div style={css('border:1px solid var(--border-subtle);border-radius:12px;padding:12px 13px')}>
                  <div style={css('font-size:11px;font-weight:700;color:var(--text-primary);margin-bottom:8px')}>
                    Bullyee's letter · Week of Sep 1
                  </div>
                  <div style={css('background:#eafaf1;border-radius:9px;padding:8px 10px;margin-bottom:6px')}>
                    <div style={css('font-size:9px;font-weight:800;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--status-positive)')}>
                      How you're doing
                    </div>
                    <div style={css('font-size:11px;color:var(--text-primary);font-weight:600')}>
                      Good week. Up 2.1%, on track.
                    </div>
                  </div>
                  <div style={css('background:var(--sq-gray-50);border-radius:9px;padding:8px 10px;margin-bottom:6px')}>
                    <div style={css('font-size:9px;font-weight:800;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--text-tertiary)')}>
                      The market this week
                    </div>
                    <div style={css('font-size:10.5px;color:var(--text-secondary);line-height:1.45')}>
                      Rates cut again; the gender pension gap held at 32.8%.
                    </div>
                  </div>
                  <div style={css('background:var(--sq-orange-50);border-radius:9px;padding:8px 10px')}>
                    <div style={css('font-size:9px;font-weight:800;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--sq-orange-600)')}>
                      Planning for next week
                    </div>
                    <div style={css('font-size:10.5px;color:var(--text-primary);line-height:1.45')}>
                      One step: open your 3a and set one contribution. And a question back: what would financial freedom
                      let you do?
                    </div>
                  </div>
                </div>
              </>
            }
          />
          <PieceRow
            label="Chat with Bullyee."
            body="From the letter, a tap opens a chat. Judgement-free, with the common questions ready to pick, so asking never feels like exposing what you don't know."
            visual={
              <div style={css('border:1px solid var(--border-subtle);border-radius:12px;padding:11px 13px')}>
                <div style={css('display:flex;justify-content:flex-start;margin-bottom:6px')}>
                  <div style={css('max-width:80%;background:var(--sq-gray-50);border-radius:12px;padding:7px 10px;font-size:10.5px;color:var(--text-primary);line-height:1.45')}>
                    Hi! I'm Bullyee 🐂 - what's on your mind about the letter?
                  </div>
                </div>
                <div style={css('display:flex;justify-content:flex-end;margin-bottom:6px')}>
                  <div style={css('max-width:80%;background:var(--brand-primary);color:#fff;border-radius:12px;padding:7px 10px;font-size:10.5px;line-height:1.45')}>
                    Is 3a risky?
                  </div>
                </div>
                <div style={css('display:flex;flex-wrap:wrap;gap:5px')}>
                  {['Why does timing matter?', 'What should I do this week?'].map((q) => (
                    <span
                      key={q}
                      style={css('font-size:9.5px;font-weight:600;color:var(--text-primary);border:1px solid var(--border-default);border-radius:var(--radius-pill);padding:3px 9px')}
                    >
                      {q}
                    </span>
                  ))}
                </div>
              </div>
            }
          />
          <PieceRow
            label="The value profile."
            body="What the user shares in onboarding, plus what Bullyee picks up from use. Visible and editable, so advice stays relevant and the user stays in control."
            visual={
              <div style={css('background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:12px;padding:4px 12px')}>
                {[
                  ['Age', '30 to 34'],
                  ['3a strategy', 'Balanced'],
                  ['Working pattern', 'Career breaks in the past'],
                ].map(([k, v], i) => (
                  <div
                    key={k}
                    style={{
                      ...css('display:flex;justify-content:space-between;gap:10px;padding:8px 0;font-size:11px'),
                      borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)',
                    }}
                  >
                    <span style={css('color:var(--text-tertiary)')}>{k}</span>
                    <span style={css('color:var(--text-primary);font-weight:600')}>{v}</span>
                  </div>
                ))}
              </div>
            }
          />
          <PieceRow
            label="The quiz and saved words."
            body="Daily, three questions, a streak. Any term the user taps is saved and resurfaces later. Learning the vocabulary is the game."
            visual={
              <div style={css('background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:12px;padding:11px 13px')}>
                <div style={css('display:flex;justify-content:space-between;align-items:center;margin-bottom:8px')}>
                  <span style={css('font-size:11.5px;font-weight:700;color:var(--text-primary)')}>Daily quiz</span>
                  <span style={css('font-size:10.5px;font-weight:700;color:var(--sq-orange-600)')}>🔥 4-day streak</span>
                </div>
                <div style={css('font-size:11.5px;font-weight:700;color:var(--text-primary);margin-bottom:7px')}>
                  What does ETF stand for?
                </div>
                <div style={css('display:flex;flex-wrap:wrap;gap:5px')}>
                  {['ETF', 'Compound growth', 'Pillar 3a'].map((w) => (
                    <span
                      key={w}
                      style={css('font-size:10px;font-weight:600;color:var(--sq-orange-700);background:var(--sq-orange-50);border-radius:var(--radius-pill);padding:3px 8px')}
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            }
          />
          <PieceRow
            label="Community."
            body="A small friends list to nudge. No shared account, no group portfolio, just peer prompts."
            visual={
              <div style={css('background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:12px;padding:11px 13px;display:flex;align-items:center;gap:10px')}>
                <div style={css('display:flex')}>
                  {['E', 'N', 'P', 'L'].map((c, i) => (
                    <div
                      key={c}
                      style={{
                        ...css('width:24px;height:24px;border-radius:50%;background:var(--sq-orange-100);color:var(--sq-orange-700);font-weight:700;font-size:10px;display:flex;align-items:center;justify-content:center;border:2px solid var(--surface-card)'),
                        marginLeft: i === 0 ? 0 : -7,
                      }}
                    >
                      {c}
                    </div>
                  ))}
                </div>
                <span style={css('font-size:11px;color:var(--text-tertiary)')}>Tap a friend to nudge them</span>
              </div>
            }
          />

          <div style={css('margin:16px 0 0')}>
            <P>
              <strong>Keeping them after the novelty.</strong> We designed for three engagement patterns seen in
              research, and let the app shift weight toward whichever fits:
            </P>
            <UL
              items={[
                ['The reader: ', 'wants the vocabulary. Gets the glossary and definition notifications.'],
                ['The competitor: ', 'here for the quiz, the streak, the leaderboard.'],
                ['The letter-only user: ', 'opens one thing a week. Gets a tight letter and little else.'],
              ]}
            />
            <P>It also grows with the user, from “what’s a 3a” toward “should I max my contribution this year”.</P>
          </div>
        </NumSection>

        <NumSection n="5" kicker="Validation" title="Two moderated concept sessions">
          <P>We walked two users through the prototype and talked it back.</P>
          <UL
            items={[
              'Resonated: the explain-first tone, tappable jargon, and the low-pressure peer nudge.',
              'Read as doable: the letter’s single “plan for next week”.',
            ]}
          />
          <P>Two sessions is an early signal, not a result. The next step is a proper test.</P>
        </NumSection>

        <NumSection n="6" kicker="Next steps" title="From concept to product">
          <UL
            items={[
              'Broader qualitative research, plus a short survey to size the themes.',
              'Moderated usability testing on the onboarding, letter and notification flows.',
              'Instrument the build and run a limited pilot: measure real behaviour and drop-off, not stated preferences.',
              'Iterate on what the pilot surfaces, then widen.',
            ]}
          />
        </NumSection>

        <Button variant="primary" size="lg" onClick={onDemo} style={{ width: '100%' }}>
          Try the demo
        </Button>
      </div>
    </>
  )
}
