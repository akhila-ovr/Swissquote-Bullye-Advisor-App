/* The five main screens, ported from "Bullyee Financial Advisor.dc.html".
 * Each screen is a pure presentational component that reads from `vm` - the
 * view-model object App builds every render (the equivalent of the original
 * `renderVals()`). */
import { css } from './lib/css.js'
import { Badge, Button, Tag } from './ds/index.jsx'
import BullyeAvatar from './components/BullyeAvatar.jsx'

/* ------------------------------------------------------------------ Home ---- */
export function HomeScreen({ vm }) {
  return (
    <div style={css('padding:14px 18px 28px')}>
      <div style={css('display:flex;align-items:center;justify-content:space-between;margin-bottom:18px')}>
        <div style={css('display:flex;align-items:center;gap:10px')}>
          <BullyeAvatar size={38} />
          <div>
            <div style={css('font-size:13px;color:var(--text-secondary)')}>Good evening</div>
            <div style={css('font-size:19px;font-weight:700;color:var(--text-primary);letter-spacing:var(--ls-tight)')}>
              Hi {vm.userName}
            </div>
          </div>
        </div>
        <div
          onClick={vm.goProfile}
          style={css(
            'width:36px;height:36px;border-radius:50%;background:var(--sq-gray-50);display:flex;align-items:center;justify-content:center;cursor:pointer;border:1px solid var(--border-subtle)'
          )}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
          </svg>
        </div>
      </div>

      {/* Weekly letter CTA - top of the feed */}
      <div
        id="coach-letter"
        onClick={vm.goLetter}
        style={css('background:var(--surface-inverse);border-radius:var(--radius-lg);padding:18px;display:flex;gap:12px;align-items:center;cursor:pointer;margin-bottom:14px')}
      >
        <BullyeAvatar size={34} />
        <div style={css('flex:1')}>
          <div style={css('color:#fff;font-size:14px;font-weight:700;margin-bottom:2px')}>Your weekly letter is ready</div>
          <div style={css('color:rgba(255,255,255,0.6);font-size:12.5px')}>Your week, from Bullyee</div>
        </div>
        <span style={css('color:rgba(255,255,255,0.5);font-size:18px')}>›</span>
      </div>

      {/* Daily quiz */}
      <div id="coach-quiz" style={css('background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);box-shadow:var(--shadow-sm);padding:18px;margin-bottom:14px')}>
        <div style={css('display:flex;justify-content:space-between;align-items:center;margin-bottom:14px')}>
          <div style={css('font-size:13px;font-weight:700;color:var(--text-primary)')}>Daily quiz</div>
          <div
            onClick={vm.openAccessories}
            style={css('display:flex;align-items:center;gap:5px;font-size:12.5px;font-weight:700;color:var(--sq-orange-600);white-space:nowrap;cursor:pointer')}
          >
            <span>🔥</span>
            <span>{vm.quizStreak}-day streak</span>
          </div>
        </div>

        {vm.quizNotDone && (
          <>
            <div style={css('display:flex;gap:4px;margin-bottom:12px')}>
              {vm.quizDots.map((dot, i) => (
                <div key={i} style={{ ...css('flex:1;height:5px;border-radius:3px'), background: dot.bg }} />
              ))}
            </div>
            <div style={css('font-size:11px;color:var(--text-tertiary);margin-bottom:8px')}>
              Question {vm.quizCurrentNum} of {vm.quizTotal}
            </div>
            <div style={css('font-size:15px;font-weight:700;color:var(--text-primary);line-height:1.4;margin-bottom:12px')}>
              {vm.quizQuestionText}
            </div>
            <div style={css('display:flex;flex-direction:column;gap:8px;margin-bottom:12px')}>
              {vm.quizOptions.map((opt, i) => (
                <button key={i} onClick={opt.onSelect} style={css(opt.style)}>
                  {opt.label}
                </button>
              ))}
            </div>
            {vm.quizAnswered && (
              <>
                <div style={css('background:var(--sq-orange-50);border-radius:12px;padding:11px 13px;margin-bottom:12px;display:flex;gap:8px;align-items:flex-start')}>
                  <span style={{ ...css('font-size:13px;font-weight:700;flex:none'), color: vm.quizWasCorrect }}>
                    {vm.quizVerdictLabel}
                  </span>
                  <span style={css('font-size:13px;color:var(--text-primary);line-height:1.5')}>{vm.quizExplain}</span>
                </div>
                <Button variant="primary" size="sm" onClick={vm.quizNext}>
                  {vm.quizNextLabel}
                </Button>
              </>
            )}
          </>
        )}

        {vm.quizDone && (
          <div style={css('text-align:center;padding:10px 0')}>
            <div style={css('font-size:26px;margin-bottom:6px')}>🎉</div>
            <div style={css('font-size:15px;font-weight:700;color:var(--text-primary);margin-bottom:2px')}>
              Nice! +{vm.quizXp} XP
            </div>
            <div style={css('font-size:12.5px;color:var(--text-secondary)')}>
              Streak now {vm.quizStreak} days. {vm.quizzesCompleted} quizzes done - keep going to unlock coins for charity
              donations and retail credit.
            </div>
          </div>
        )}
      </div>

      {/* Portfolio */}
      <div id="coach-portfolio" className="ph-swap" style={css('background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);box-shadow:var(--shadow-sm);padding:18px;margin-bottom:14px')}>
        <div className="ph-swap-note">Placeholder. In the real app this is the user's live Swissquote portfolio view.</div>
        <div style={css('display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px')}>
          <div>
            <div style={css('font-size:12px;color:var(--text-secondary);margin-bottom:2px')}>Total portfolio</div>
            <div style={css('font-size:24px;font-weight:700;color:var(--text-primary);font-family:var(--font-mono)')}>
              CHF 8,240.00
            </div>
          </div>
          <Badge tone="positive">+2.1% this month</Badge>
        </div>
        <div style={css('display:flex;align-items:flex-end;gap:5px;height:44px;margin-bottom:12px')}>
          {['40%', '55%', '48%', '70%', '65%', '85%', '100%'].map((h, i) => (
            <div
              key={i}
              style={{
                ...css('flex:1;border-radius:3px'),
                height: h,
                background: i < 3 ? 'var(--sq-orange-100)' : i < 5 ? 'var(--sq-orange-300)' : 'var(--sq-orange-500)',
              }}
            />
          ))}
        </div>
        <div style={css('display:flex;justify-content:space-between;padding:8px 0;border-top:1px solid var(--border-subtle);font-size:13px')}>
          <span style={css('color:var(--text-primary)')}>Global ETF</span>
          <span style={css('color:var(--status-positive);font-family:var(--font-mono)')}>+3.4%</span>
        </div>
        <div style={css('display:flex;justify-content:space-between;align-items:center;padding:8px 0;font-size:13px')}>
          <span style={css('color:var(--text-secondary)')}>Cash (idle)</span>
          <Tag>Not invested</Tag>
        </div>
        <div style={css('display:flex;justify-content:space-between;align-items:center;gap:10px;padding:8px 0;border-top:1px solid var(--border-subtle);font-size:13px')}>
          <span style={css('color:var(--text-secondary)')}>Pillar 3a</span>
          {vm.strategyLabel ? (
            <span style={css('color:var(--sq-orange-600);font-weight:600;text-align:right')}>{vm.strategyLabel} · not funded</span>
          ) : (
            <span style={css('color:var(--text-tertiary);font-style:italic')}>Not started</span>
          )}
        </div>
      </div>

    </div>
  )
}

/* ---------------------------------------------------------------- Letter ---- */
export function LetterScreen({ vm }) {
  return (
    <div>
      <div style={css('position:sticky;top:0;background:var(--surface-page);z-index:3;padding:14px 18px 10px;border-bottom:1px solid var(--border-subtle);display:flex;align-items:center;gap:12px')}>
        <div onClick={vm.goHome} style={css('cursor:pointer;font-size:20px;color:var(--text-primary);padding:2px 4px')}>
          ‹
        </div>
        <div style={css('flex:1')}>
          <div style={css('font-size:11px;color:var(--text-tertiary);letter-spacing:var(--ls-caps);text-transform:uppercase')}>
            Week of Sep 1
          </div>
          <div style={css('font-size:18px;font-weight:700;color:var(--text-primary)')}>Bullyee's letter</div>
        </div>
        <BullyeAvatar size={32} />
      </div>

      <div style={css('padding:18px 18px 100px')}>
        <p style={css('font-size:14px;color:var(--text-secondary);line-height:1.55;margin:0 0 20px')}>
          Hi {vm.userName}, here's your week.
        </p>

        <div style={css('background:#eafaf1;border-radius:var(--radius-lg);padding:16px;margin-bottom:16px;display:flex;gap:12px;align-items:center')}>
          <div style={css('width:40px;height:40px;border-radius:50%;background:var(--status-positive);color:#fff;font-size:20px;font-weight:700;display:flex;align-items:center;justify-content:center;flex:none')}>
            ✓
          </div>
          <div>
            <div style={css('font-size:11px;font-weight:700;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--status-positive);margin-bottom:2px')}>
              How you're doing
            </div>
            <div style={css('font-size:15px;font-weight:700;color:var(--text-primary);line-height:1.4')}>
              Good week. Up 2.1%, on track.
            </div>
          </div>
        </div>

        <div style={css('background:var(--sq-gray-50);border-radius:var(--radius-lg);padding:16px;margin-bottom:16px')}>
          <div style={css('display:flex;align-items:center;gap:8px;margin-bottom:8px')}>
            <span style={css('font-size:16px')}>📉</span>
            <span style={css('font-size:11px;font-weight:700;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--text-secondary)')}>
              The market this week
            </span>
          </div>
          <p style={css('font-size:14.5px;color:var(--text-primary);line-height:1.55;margin:0')}>
            The Swiss National Bank cut rates again, so savings accounts pay even less. And the gender pension gap held at
            32.8% in 2021: CHF 35,442 a year for women against CHF 52,735 for men, mostly from part-time years and career
            breaks.
          </p>
        </div>

        <div style={css('background:var(--sq-orange-50);border-radius:var(--radius-lg);padding:16px;margin-bottom:16px')}>
          <div style={css('display:flex;align-items:center;gap:8px;margin-bottom:10px')}>
            <span style={css('font-size:16px')}>📈</span>
            <span style={css('font-size:11px;font-weight:700;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--sq-orange-600)')}>
              Your investments
            </span>
          </div>
          <div style={css('display:flex;align-items:flex-end;gap:4px;height:32px;margin-bottom:10px')}>
            {['45%', '60%', '55%', '80%', '100%'].map((h, i) => (
              <div
                key={i}
                style={{
                  ...css('flex:1;border-radius:3px'),
                  height: h,
                  background: i < 1 ? 'var(--sq-orange-200)' : i < 3 ? 'var(--sq-orange-300)' : 'var(--sq-orange-500)',
                }}
              />
            ))}
          </div>
          <p style={css('font-size:14.5px;color:var(--text-primary);line-height:1.55;margin:0')}>
            Your portfolio grew 2.1% this month, mostly carried by your{' '}
            <span onClick={vm.openEtf} style={css('text-decoration:underline dotted;text-decoration-color:var(--sq-orange-400);text-decoration-thickness:1.5px;cursor:pointer;font-weight:600')}>
              ETF
            </span>
            . Some cash sat uninvested for three weeks, earning nothing - a small but real cost of waiting.
          </p>
        </div>

        <div style={css('margin-bottom:16px')}>
          <div style={css('font-size:11px;font-weight:700;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--sq-orange-600);margin-bottom:8px')}>
            Planning for next week
          </div>
          {vm.isGentleTone ? (
            <p style={css('font-size:15px;color:var(--text-primary);line-height:1.6;margin:0 0 14px')}>
              You told me time with your family matters more than climbing fast. A{' '}
              <Jargon onClick={vm.openPillar}>pillar 3a</Jargon> isn't a product pitch - it's a way to quietly protect
              that choice. Every year you wait is a year those <Jargon onClick={vm.openTax}>tax-deductible</Jargon>{' '}
              contributions and their <Jargon onClick={vm.openCompound}>compound growth</Jargon> can't work for you.
            </p>
          ) : (
            <p style={css('font-size:15px;color:var(--text-primary);line-height:1.6;margin:0 0 14px')}>
              A <Jargon onClick={vm.openPillar}>pillar 3a</Jargon> isn't a sales pitch. Every year you wait, you lose a
              year of <Jargon onClick={vm.openTax}>tax-deductible</Jargon> relief and{' '}
              <Jargon onClick={vm.openCompound}>compound growth</Jargon> working quietly in the background. Worth setting
              up this week.
            </p>
          )}
        </div>

        <div style={css('background:var(--sq-orange-50);border-radius:var(--radius-lg);padding:16px;margin-bottom:24px')}>
          <div style={css('display:flex;gap:10px;align-items:flex-start;margin-bottom:12px')}>
            <BullyeAvatar size={30} />
            <div style={css('font-size:14px;font-weight:700;color:var(--text-primary);line-height:1.4;padding-top:2px')}>
              Quick one from me: what would financial freedom actually let you do?
            </div>
          </div>
          <div style={css('display:flex;flex-wrap:wrap;gap:8px')}>
            <button onClick={vm.answerWorkless} disabled={vm.questionLocked} style={css(vm.chipStyleWorkless)}>
              Work less, not stop
            </button>
            <button onClick={vm.answerAnxious} disabled={vm.questionLocked} style={css(vm.chipStyleAnxious)}>
              Feel less anxious
            </button>
            <button onClick={vm.answerKids} disabled={vm.questionLocked} style={css(vm.chipStyleKids)}>
              Support my kids
            </button>
            <button onClick={vm.answerRetire} disabled={vm.questionLocked} style={css(vm.chipStyleRetire)}>
              Retire earlier
            </button>
          </div>
          {vm.questionLocked && (
            <div style={css('font-size:12.5px;color:var(--sq-orange-700);margin-top:10px;font-weight:600')}>
              Thanks - I'll remember that. 💛
            </div>
          )}
        </div>

        <div style={css('font-size:11px;font-weight:700;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--text-tertiary);margin:0 0 10px')}>
          Past letters
        </div>
        <div style={css('display:flex;flex-direction:column;gap:2px')}>
          {vm.pastLetters.map((week) => (
            <div key={week} style={css('padding:11px 0;border-top:1px solid var(--border-subtle);display:flex;justify-content:space-between;align-items:center')}>
              <span style={css('font-size:12.5px;font-weight:600;color:var(--text-primary)')}>{week}</span>
              <span style={css('color:var(--text-tertiary);font-size:15px')}>›</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* --------------------------------------------------------------- Friends ---- */
export function FriendsScreen({ vm }) {
  return (
    <div style={css('padding:14px 18px 28px')}>
      <div style={css('display:flex;align-items:center;gap:12px;margin-bottom:6px')}>
        <div onClick={vm.goHome} style={css('cursor:pointer;font-size:20px;color:var(--text-primary);padding:2px 4px')}>
          ‹
        </div>
        <div style={css('font-size:18px;font-weight:700;color:var(--text-primary)')}>Friends</div>
      </div>

      <div style={css('display:flex;gap:10px;align-items:flex-start;background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:14px;padding:11px 13px;margin-bottom:20px')}>
        <span style={css('font-size:16px;flex:none')}>📎</span>
        <div>
          <div style={css('font-size:12.5px;font-weight:700;color:var(--text-primary)')}>Send a card</div>
          <div style={css('font-size:11.5px;color:var(--text-tertiary);line-height:1.5')}>
            Pass on a fact or definition you liked.
          </div>
        </div>
      </div>

      <div style={css('font-size:11px;font-weight:700;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--text-tertiary);margin-bottom:10px')}>
        Lately
      </div>
      <div style={css('display:flex;flex-direction:column;gap:2px')}>
        {vm.friendActivity.map((a, i) => (
          <div key={i} style={css('padding:11px 0;border-top:1px solid var(--border-subtle);display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:12.5px')}>
            <span style={css('color:var(--text-primary);flex:1')}>
              <strong>{a.name}</strong> {a.text}
            </span>
            {a.action ? (
              <button
                onClick={vm.reviewShared}
                style={css('font-size:11px;font-weight:700;color:var(--sq-orange-700);background:var(--sq-orange-50);border:none;border-radius:var(--radius-pill);padding:5px 12px;cursor:pointer;flex:none')}
              >
                {a.action}
              </button>
            ) : (
              <span style={css('color:var(--text-tertiary);flex:none')}>{a.when}</span>
            )}
          </div>
        ))}
      </div>

      <div style={css('font-size:11px;font-weight:700;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--text-tertiary);margin:22px 0 10px')}>
        This week's quiz
      </div>
      <div style={css('background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);box-shadow:var(--shadow-sm);padding:4px 14px')}>
        {vm.quizRanking.map((r, i) => (
          <div
            key={r.name}
            style={{
              ...css('display:flex;align-items:center;gap:10px;padding:10px 0;font-size:13px'),
              borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)',
            }}
          >
            <span style={{ ...css('width:16px;text-align:center;font-weight:700'), color: i === 0 ? 'var(--sq-orange-600)' : 'var(--text-tertiary)' }}>
              {i + 1}
            </span>
            <span style={{ ...css('flex:1'), fontWeight: r.me ? 700 : 500, color: r.me ? 'var(--sq-orange-700)' : 'var(--text-primary)' }}>
              {r.name}
            </span>
            <span style={css('font-family:var(--font-mono);font-size:12px;color:var(--text-secondary)')}>{r.points} pts</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Jargon({ onClick, children }) {
  return (
    <span
      onClick={onClick}
      style={css('text-decoration:underline dotted;text-decoration-color:var(--sq-orange-400);text-decoration-thickness:1.5px;cursor:pointer;font-weight:600')}
    >
      {children}
    </span>
  )
}

/* --------------------------------------------------------------- Profile ---- */
export function ProfileScreen({ vm }) {
  return (
    <div style={css('padding:14px 18px 28px')}>
      <div style={css('display:flex;align-items:center;gap:12px;margin-bottom:16px')}>
        <div onClick={vm.goHome} style={css('cursor:pointer;font-size:20px;color:var(--text-primary);padding:2px 4px')}>
          ‹
        </div>
        <div>
          <div style={css('font-size:11px;color:var(--text-tertiary);letter-spacing:var(--ls-caps);text-transform:uppercase')}>
            Your profile
          </div>
          <div style={css('font-size:18px;font-weight:700;color:var(--text-primary)')}>About {vm.userName}</div>
        </div>
      </div>
      <p style={css('font-size:13.5px;color:var(--text-secondary);line-height:1.5;margin:0 0 14px')}>
        What Bullyee knows about you, from what you told her and how you use the app. It’s all here, and it’s yours to
        edit.
      </p>

      {vm.profileFacts.length > 0 && (
        <div style={css('background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);box-shadow:var(--shadow-sm);padding:4px 16px;margin-bottom:16px')}>
          {vm.profileFacts.map(([label, value], i) => (
            <div
              key={label}
              style={{
                ...css('display:flex;justify-content:space-between;align-items:center;gap:12px;padding:11px 0;font-size:13px'),
                borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)',
              }}
            >
              <span style={css('color:var(--text-secondary)')}>{label}</span>
              <span style={css('color:var(--text-primary);font-weight:600;text-align:right')}>{value}</span>
            </div>
          ))}
        </div>
      )}

      <div
        onClick={vm.openAddInfo}
        style={css('display:flex;align-items:center;gap:8px;padding:12px 14px;border:1px dashed var(--border-default);border-radius:var(--radius-lg);cursor:pointer;margin-bottom:16px')}
      >
        <span style={css('font-size:16px;color:var(--sq-orange-600);font-weight:700')}>+</span>
        <span style={css('font-size:13.5px;font-weight:600;color:var(--text-primary)')}>
          Add more about yourself, for better advice
        </span>
      </div>

      {vm.savedWords.length > 0 && (
        <div style={css('margin-bottom:18px')}>
          <div style={css('font-size:11px;font-weight:700;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--text-tertiary);margin-bottom:10px')}>
            Your words
          </div>
          <div style={css('display:flex;flex-wrap:wrap;gap:7px')}>
            {vm.savedWords.map((w) => (
              <span
                key={w}
                style={css('font-size:12px;font-weight:600;color:var(--sq-orange-700);background:var(--sq-orange-50);border-radius:var(--radius-pill);padding:5px 11px')}
              >
                {w}
              </span>
            ))}
          </div>
        </div>
      )}

      <div style={css('font-size:11px;font-weight:700;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--text-tertiary);margin-bottom:10px')}>
        What Bullyee's picked up
      </div>
      <div style={css('display:flex;flex-direction:column;gap:10px')}>
        {vm.memoryItems.map((item) => (
          <div
            key={item.id}
            style={{
              ...css('background:var(--surface-card);border-radius:var(--radius-lg);padding:14px;box-shadow:var(--shadow-sm)'),
              border: `1px solid ${item.borderColor}`,
            }}
          >
            <div style={css('display:flex;justify-content:space-between;align-items:center;margin-bottom:6px')}>
              <Badge tone={item.tone}>{item.tag}</Badge>
              <span style={css('font-size:11.5px;color:var(--text-tertiary)')}>{item.when}</span>
            </div>
            <div style={css('font-size:14px;color:var(--text-primary);line-height:1.5')}>{item.text}</div>
          </div>
        ))}
      </div>

      <div style={css('font-size:11px;font-weight:700;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--text-tertiary);margin:24px 0 10px;padding-top:18px;border-top:1px solid var(--border-subtle)')}>
        Rewards
      </div>
      <div
        onClick={vm.openAccessories}
        style={css('display:flex;align-items:center;gap:12px;background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);box-shadow:var(--shadow-sm);padding:14px 16px;cursor:pointer')}
      >
        <span style={css('font-size:22px')}>🪙</span>
        <div style={css('flex:1')}>
          <div style={css('font-size:13px;font-weight:700;color:var(--text-primary)')}>Bullyee's rewards</div>
          <div style={css('font-size:11.5px;color:var(--text-tertiary)')}>{vm.coins} coins from quizzes and streaks</div>
        </div>
        <span style={css('font-size:11px;font-weight:700;color:var(--sq-orange-600)')}>Spend ›</span>
      </div>

      <button
        onClick={vm.logout}
        style={css('width:100%;margin-top:22px;background:none;border:none;padding:8px;font-size:13px;font-weight:700;color:var(--text-tertiary);cursor:pointer')}
      >
        Log out
      </button>
    </div>
  )
}

/* ------------------------------------------------------------------- 3a ---- */
export function ThreeAScreen({ vm }) {
  return (
    <div style={css('padding:14px 18px 28px')}>
      <div style={css('display:flex;align-items:center;gap:12px;margin-bottom:20px')}>
        <div onClick={vm.goHome} style={css('cursor:pointer;font-size:20px;color:var(--text-primary);padding:2px 4px')}>
          ‹
        </div>
        <div style={css('font-size:18px;font-weight:700;color:var(--text-primary)')}>Your 3a, your reasons</div>
      </div>

      {vm.threeAConfirmed ? (
        <div style={css('display:flex;flex-direction:column;align-items:center;text-align:center;padding:40px 10px')}>
          <BullyeAvatar size={64} />
          <div style={css('font-size:17px;font-weight:700;color:var(--text-primary);margin:18px 0 6px')}>
            You're on your way
          </div>
          <p style={css('font-size:14px;color:var(--text-secondary);line-height:1.5;margin:0 0 20px')}>
            No numbers to chase, no chart to watch daily. Bullyee will check in on your terms, not the market's.
          </p>
          <Button variant="secondary" onClick={vm.goHome}>
            Back to home
          </Button>
        </div>
      ) : (
        <>
          <div style={css('background:var(--sq-orange-50);border-radius:var(--radius-lg);padding:16px;margin-bottom:18px')}>
            <div style={css('font-size:14px;color:var(--text-primary);line-height:1.6;font-weight:600')}>
              {vm.threeAReasonText}
            </div>
          </div>
          <p style={css('font-size:14.5px;color:var(--text-primary);line-height:1.6;margin:0 0 18px')}>
            This isn't about performance charts. It's about buying yourself room to breathe - fewer money-worries the next
            time life asks you to slow down.
          </p>
          <div style={css('display:flex;flex-direction:column;gap:10px;margin-bottom:24px')}>
            {[
              'Money set aside quietly, on your terms',
              'Tax relief every year you contribute',
              "A safety net that doesn't depend on working full-time forever",
            ].map((t, i) => (
              <div key={i} style={css('display:flex;gap:10px;align-items:flex-start')}>
                <span style={css('color:var(--sq-orange-500);font-size:15px;line-height:1.5')}>●</span>
                <span style={css('font-size:14px;color:var(--text-primary);line-height:1.5')}>{t}</span>
              </div>
            ))}
          </div>

          {vm.strategyLabel && (
            <div
              onClick={vm.openStrategy}
              style={css('background:var(--surface-card);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);box-shadow:var(--shadow-sm);padding:14px 16px;margin-bottom:20px;cursor:pointer')}
            >
              <div style={css('display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px')}>
                <span style={css('font-size:11px;font-weight:700;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--sq-orange-600)')}>
                  {vm.strategyLabel} · {vm.strategyEquity}
                </span>
                <span style={css('font-size:11px;font-weight:600;color:var(--text-tertiary)')}>change</span>
              </div>
              <div style={css('font-size:13.5px;color:var(--text-secondary);line-height:1.55')}>{vm.strategyBlurb}</div>
            </div>
          )}

          <Button variant="primary" onClick={vm.start3a}>
            Start my 3a
          </Button>
        </>
      )}
    </div>
  )
}
