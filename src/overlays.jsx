/* Phone chrome + all the floating layers (chat drawer, sheets, dialog, toast,
 * incoming-notification banner). Ported from "Bullyee Financial Advisor.dc.html".
 * Every piece is a direct child of the `.phone` element (position: relative). */
import { useEffect, useState } from 'react'
import { css } from './lib/css.js'
import { Toast, Dialog, Button } from './ds/index.jsx'
import BullyeAvatar from './components/BullyeAvatar.jsx'

export function StatusBar() {
  return (
    <div style={css('flex:none;height:46px;display:flex;align-items:center;justify-content:space-between;padding:8px 26px 0;position:relative;z-index:5')}>
      <span style={css('font-size:15px;font-weight:600;color:var(--text-primary)')}>9:41</span>
      <div style={css('display:flex;gap:5px;align-items:center')}>
        <div style={css('width:18px;height:10px;border:1.5px solid var(--text-primary);border-radius:2px')} />
        <div style={css('width:22px;height:11px;border:1.5px solid var(--text-primary);border-radius:3px')} />
      </div>
    </div>
  )
}

export function Notch() {
  return (
    <div
      className="phone-notch"
      style={css('position:absolute;top:10px;left:50%;transform:translateX(-50%);width:96px;height:26px;background:#000;border-radius:18px;z-index:40')}
    />
  )
}

export function HomeIndicator() {
  return (
    <div style={css('position:absolute;bottom:0;left:0;right:0;height:22px;display:flex;justify-content:center;align-items:flex-end;padding-bottom:7px;pointer-events:none;z-index:65')}>
      <div style={css('width:120px;height:4px;border-radius:100px;background:rgba(0,0,0,0.28)')} />
    </div>
  )
}

/* First-run guided tour: spotlights one element at a time and explains what it
 * is and why the research put it there. */
export function CoachMarks({ vm }) {
  const target = vm.coachStep?.target
  const [cardPos, setCardPos] = useState('bottom')

  useEffect(() => {
    if (!target) return
    const el = document.getElementById(target)
    if (!el) return
    el.classList.add('coach-lit')
    const phone = el.closest('.phone')
    // Only scroll the inner scroll area; never let scrollIntoView move the
    // fixed phone frame itself (it can, since .phone is overflow:hidden).
    const scroller = phone && [...phone.children].find((c) => getComputedStyle(c).overflowY === 'auto')
    if (scroller && scroller.contains(el)) {
      el.scrollIntoView({ block: 'center', behavior: 'auto' })
    }
    if (phone) phone.scrollTop = 0
    if (phone) {
      const e = el.getBoundingClientRect()
      const p = phone.getBoundingClientRect()
      const mid = (e.top + e.bottom) / 2 - p.top
      setCardPos(mid < p.height / 2 ? 'bottom' : 'top')
    }
    return () => {
      el.classList.remove('coach-lit')
      if (phone) phone.scrollTop = 0
    }
  }, [target])

  if (!vm.coachStep) return null
  const step = vm.coachStep
  const last = vm.coachIndex === vm.coachTotal - 1

  return (
    <>
      {/* swallow every tap on the app while the tour is up */}
      <div onClick={(e) => e.stopPropagation()} style={css('position:absolute;inset:0;z-index:59')} />

      <div
        style={{
          ...css('position:absolute;left:12px;right:12px;z-index:60;background:var(--surface-card);border-radius:16px;box-shadow:var(--shadow-lg);padding:13px 14px 12px'),
          ...(cardPos === 'top' ? { top: 52 } : { bottom: 64 }),
        }}
      >
        <div style={css('display:flex;justify-content:space-between;align-items:center;margin-bottom:6px')}>
          <span style={css('font-size:10px;font-weight:700;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--text-tertiary)')}>
            Step {vm.coachIndex + 1} of {vm.coachTotal}
          </span>
          <button onClick={vm.coachDone} style={css('background:none;border:none;cursor:pointer;font-size:11px;font-weight:700;color:var(--text-tertiary)')}>
            Skip tour
          </button>
        </div>

        <div style={css('font-size:14.5px;font-weight:700;color:var(--text-primary);margin-bottom:6px')}>{step.title}</div>

        <div style={css('font-size:12px;color:var(--text-primary);line-height:1.5;margin-bottom:10px')}>{step.what}</div>

        {/* meta-commentary for demo reviewers, deliberately set apart from the UI */}
        <div style={css('border:1px dashed var(--border-default);border-radius:10px;background:var(--sq-gray-25);padding:9px 10px;margin-bottom:12px')}>
          <div style={css('font-size:9px;font-weight:800;letter-spacing:var(--ls-caps);text-transform:uppercase;color:var(--text-tertiary);margin-bottom:3px')}>
            Design relevance
          </div>
          <div style={css('font-size:11.5px;color:var(--text-secondary);line-height:1.5;font-style:italic')}>{step.why}</div>
        </div>

        <div style={css('display:flex;align-items:center;gap:10px')}>
          {vm.coachIndex > 0 && (
            <button onClick={vm.coachBack} style={css('background:none;border:none;cursor:pointer;font-size:13px;font-weight:700;color:var(--text-secondary);padding:6px 4px')}>
              Back
            </button>
          )}
          <div style={css('flex:1')} />
          <Button variant="primary" size="sm" onClick={last ? vm.coachDone : vm.coachNext}>
            {last ? 'Start exploring' : 'Next'}
          </Button>
        </div>
      </div>
    </>
  )
}

const TAB_ICONS = {
  home: (
    <>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
    </>
  ),
  letter: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  friends: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20c0-3 2.6-4.6 5.5-4.6s5.5 1.6 5.5 4.6" />
      <path d="M16 5.2a3.2 3.2 0 0 1 0 6" />
      <path d="M18 15.6c2.2.5 3.5 1.9 3.5 4.4" />
    </>
  ),
  profile: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-6 8-6s8 2 8 6" />
    </>
  ),
}

export function TabBar({ vm }) {
  const tab = (label, icon, onClick, active, id) => (
    <div id={id} onClick={onClick} style={css('flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;padding:3px 0')}>
      <svg
        width="21"
        height="21"
        viewBox="0 0 24 24"
        fill="none"
        stroke={active ? 'var(--brand-primary)' : 'var(--text-tertiary)'}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {TAB_ICONS[icon]}
      </svg>
      <span style={{ ...css('font-size:11px;font-weight:600'), color: active ? 'var(--brand-primary)' : 'var(--text-tertiary)' }}>
        {label}
      </span>
    </div>
  )
  return (
    <div style={css('flex:none;display:flex;border-top:1px solid var(--border-subtle);background:var(--surface-page);padding:6px 6px 4px')}>
      {tab('Home', 'home', vm.goHome, vm.isHome)}
      {tab('Letter', 'letter', vm.goLetter, vm.isLetter)}
      {tab('Friends', 'friends', vm.goFriends, vm.isFriends, 'coach-community')}
      {tab('Profile', 'profile', vm.goProfile, vm.isProfile, 'coach-profile')}
    </div>
  )
}

export function ChatCta({ vm }) {
  return (
    <div
      style={{
        ...css('position:absolute;left:0;right:0;padding:14px 18px;background:linear-gradient(to top,var(--surface-page) 70%,transparent);z-index:20'),
        bottom: vm.chatCtaBottom,
      }}
    >
      <div
        onClick={vm.openChat}
        style={css('background:var(--surface-inverse);border-radius:var(--radius-pill);padding:12px 18px;display:flex;align-items:center;gap:10px;cursor:pointer;box-shadow:var(--shadow-lg)')}
      >
        <BullyeAvatar size={26} />
        <span style={css('color:#fff;font-size:14px;font-weight:600;flex:1')}>Talk to Bullyee</span>
        <span style={css('color:rgba(255,255,255,0.5)')}>💬</span>
      </div>
    </div>
  )
}

export function NotifBanner({ vm }) {
  return (
    <div
      onClick={vm.openLetterFromNotif}
      style={{
        ...css('position:absolute;left:12px;right:12px;transition:top 0.4s var(--ease-standard), opacity 0.4s;z-index:55'),
        top: vm.notifTop,
        opacity: vm.notifOpacity,
      }}
    >
      <div style={css('background:var(--surface-inverse);border-radius:18px;padding:12px 14px;display:flex;align-items:center;gap:10px;box-shadow:var(--shadow-lg);cursor:pointer')}>
        <BullyeAvatar size={30} />
        <div style={css('flex:1')}>
          <div style={css('color:#fff;font-size:13px;font-weight:700')}>Bullyee</div>
          <div style={css('color:rgba(255,255,255,0.65);font-size:12.5px')}>Hey! You have a letter 💛</div>
        </div>
      </div>
    </div>
  )
}

export function ChatDrawer({ vm }) {
  return (
    <>
      <div
        onClick={vm.closeChat}
        style={{
          ...css('position:absolute;inset:0;transition:background 0.35s;z-index:59'),
          background: vm.scrimBg,
          pointerEvents: vm.scrimPointer,
        }}
      />
      <div
        style={{
          ...css('position:absolute;left:0;right:0;bottom:0;height:74%;background:var(--surface-page);border-radius:24px 24px 0 0;box-shadow:0 -8px 30px rgba(0,0,0,0.2);z-index:60;display:flex;flex-direction:column'),
          transform: `translateY(${vm.chatTranslate})`,
          visibility: vm.chatOpen ? 'visible' : 'hidden',
          pointerEvents: vm.chatOpen ? 'auto' : 'none',
          transition: vm.chatOpen
            ? 'transform 0.35s var(--ease-standard)'
            : 'transform 0.35s var(--ease-standard), visibility 0s 0.35s',
        }}
      >
        <div style={css('flex:none;display:flex;align-items:center;gap:10px;padding:16px 16px 12px;border-bottom:1px solid var(--border-subtle)')}>
          <BullyeAvatar size={32} />
          <div style={css('flex:1')}>
            <div style={css('font-size:14px;font-weight:700;color:var(--text-primary)')}>Bullyee</div>
            <div style={css('font-size:11.5px;color:var(--status-positive)')}>● online</div>
          </div>
          <div onClick={vm.closeChat} style={css('cursor:pointer;font-size:18px;color:var(--text-tertiary);padding:4px 8px')}>
            ×
          </div>
        </div>
        <div style={css('flex:1;overflow-y:auto;padding:14px 16px;display:flex;flex-direction:column;gap:10px')}>
          {vm.chatMessages.map((msg, i) => (
            <div key={i} style={{ ...css('display:flex'), justifyContent: msg.align }}>
              <div
                style={{
                  ...css('max-width:78%;border-radius:14px;padding:10px 13px;font-size:13.5px;line-height:1.5'),
                  background: msg.bg,
                  color: msg.color,
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div style={css('flex:none;padding:10px 16px 16px;border-top:1px solid var(--border-subtle);display:flex;flex-direction:column;gap:8px')}>
          {vm.chatAllDone && (
            <div style={css('font-size:12.5px;color:var(--text-tertiary);text-align:center;padding:6px 0')}>
              That's everything for this week. Talk soon 💛
            </div>
          )}
          <div style={css('display:flex;flex-wrap:wrap;gap:8px')}>
            {vm.chatChips.map((chip) => (
              <button
                key={chip.id}
                onClick={chip.onSelect}
                style={css('background:var(--sq-gray-0);border:1px solid var(--border-default);border-radius:var(--radius-pill);padding:8px 14px;font-size:13px;font-weight:600;color:var(--text-primary);cursor:pointer')}
              >
                {chip.q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export function ToastHost({ vm }) {
  if (!vm.toastMsg) return null
  return (
    <div style={css('position:absolute;bottom:100px;left:18px;right:18px;z-index:70')}>
      <Toast tone="success">{vm.toastMsg}</Toast>
    </div>
  )
}

export function GlossaryDialog({ vm }) {
  return (
    <Dialog
      open={vm.glossaryOpen}
      title={vm.glossaryTitle}
      onClose={vm.closeGlossary}
      actions={
        <Button variant="secondary" size="sm" onClick={vm.addToDictionary} disabled={vm.glossaryInDictionary}>
          {vm.dictionaryButtonLabel}
        </Button>
      }
    >
      <div style={css('font-size:14px;color:var(--text-primary);line-height:1.6')}>{vm.glossaryBody}</div>
    </Dialog>
  )
}

function BottomSheet({ onClose, children, maxHeight }) {
  return (
    <div
      onClick={onClose}
      style={css('position:absolute;inset:0;background:var(--surface-overlay);z-index:80;display:flex;align-items:flex-end')}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          ...css('background:var(--surface-page);border-radius:20px 20px 0 0;padding:18px;width:100%;box-shadow:var(--shadow-lg);overflow-y:auto'),
          ...(maxHeight ? { maxHeight } : {}),
        }}
      >
        {children}
      </div>
    </div>
  )
}

function SheetHeader({ title, onClose }) {
  return (
    <div style={css('display:flex;justify-content:space-between;align-items:center;margin-bottom:10px')}>
      <div style={css('font-size:15px;font-weight:700;color:var(--text-primary)')}>{title}</div>
      <div onClick={onClose} style={css('cursor:pointer;font-size:18px;color:var(--text-tertiary);padding:4px 8px')}>
        ×
      </div>
    </div>
  )
}

export function RewardsSheet({ vm }) {
  if (!vm.accessoriesOpen) return null
  return (
    <BottomSheet onClose={vm.closeAccessories} maxHeight="78%">
      <SheetHeader title="Bullyee's rewards" onClose={vm.closeAccessories} />
      <div style={css('display:flex;align-items:center;gap:8px;background:var(--sq-orange-50);border-radius:14px;padding:12px 14px;margin-bottom:14px')}>
        <span style={css('font-size:20px')}>🪙</span>
        <div>
          <div style={css('font-size:11px;color:var(--text-secondary);font-weight:600')}>Your coins</div>
          <div style={css('font-size:17px;font-weight:700;color:var(--sq-orange-700)')}>{vm.coins}</div>
        </div>
      </div>
      <div style={css('display:flex;gap:8px;margin-bottom:14px')}>
        <button
          onClick={vm.setDonateCat}
          style={{
            ...css('flex:1;padding:9px;border-radius:12px;font-size:13px;font-weight:700;cursor:pointer;border:1.5px solid var(--sq-orange-600)'),
            background: vm.donateTabBg,
            color: vm.donateTabColor,
          }}
        >
          Donate
        </button>
        <button
          onClick={vm.setRetailCat}
          style={{
            ...css('flex:1;padding:9px;border-radius:12px;font-size:13px;font-weight:700;cursor:pointer;border:1.5px solid var(--sq-orange-600)'),
            background: vm.retailTabBg,
            color: vm.retailTabColor,
          }}
        >
          Retail credit
        </button>
      </div>
      <p style={css('font-size:12.5px;color:var(--text-secondary);line-height:1.5;margin:0 0 14px')}>
        Earn coins by finishing quizzes and keeping your streak. Spend them how you like.
      </p>
      <div style={css('display:flex;flex-direction:column;gap:8px')}>
        {vm.rewardItems.map((rw, i) => (
          <div
            key={i}
            style={{
              ...css('display:flex;align-items:center;gap:12px;padding:10px 12px;border:1px solid var(--border-subtle);border-radius:14px'),
              opacity: rw.cardOpacity,
            }}
          >
            <div style={css('font-size:24px;flex:none')}>{rw.emoji}</div>
            <div style={css('flex:1')}>
              <div style={css('font-size:13.5px;font-weight:700;color:var(--text-primary)')}>{rw.name}</div>
              <div style={css('font-size:11.5px;color:var(--text-tertiary)')}>{rw.cost} coins</div>
            </div>
            <span
              onClick={rw.onRedeem}
              style={{
                ...css('font-size:11px;font-weight:700;border-radius:var(--radius-pill);padding:5px 10px;white-space:nowrap;cursor:pointer'),
                background: rw.badgeBg,
                color: rw.badgeColor,
              }}
            >
              {rw.statusLabel}
            </span>
          </div>
        ))}
      </div>
      {vm.redeemedMsg && (
        <div style={css('margin-top:12px;font-size:12.5px;font-weight:600;color:var(--status-positive)')}>
          {vm.redeemedMsg}
        </div>
      )}
    </BottomSheet>
  )
}

export function AddInfoSheet({ vm }) {
  if (!vm.addInfoOpen) return null
  return (
    <BottomSheet onClose={vm.closeAddInfo}>
      <SheetHeader title="Tell Bullyee more" onClose={vm.closeAddInfo} />
      <p style={css('font-size:12.5px;color:var(--text-secondary);line-height:1.5;margin:0 0 12px')}>
        Anything about your goals, family, or plans helps her give more relevant advice.
      </p>
      <textarea
        value={vm.addInfoText}
        onChange={vm.setAddInfoText}
        placeholder="e.g. I want to go part-time again next year..."
        style={css('width:100%;min-height:80px;border:1px solid var(--border-default);border-radius:12px;padding:10px 12px;font-size:14px;font-family:var(--font-sans);color:var(--text-primary);resize:none;margin-bottom:12px')}
      />
      <Button variant="primary" onClick={vm.submitAddInfo}>
        Save
      </Button>
    </BottomSheet>
  )
}

export function StrategySheet({ vm }) {
  if (!vm.strategyOpen) return null
  return (
    <BottomSheet onClose={vm.closeStrategy} maxHeight="80%">
      <SheetHeader title="Your 3a strategy" onClose={vm.closeStrategy} />
      <p style={css('font-size:12.5px;color:var(--text-secondary);line-height:1.55;margin:0 0 14px')}>
        How much of your 3a rides the market. Change it whenever you like.
      </p>
      <div style={css('display:flex;flex-direction:column;gap:8px')}>
        {vm.strategies.map((st) => {
          const active = vm.strategyId === st.id
          return (
            <button
              key={st.id}
              onClick={() => vm.setStrategy(st.id)}
              style={css(
                'display:flex;align-items:flex-start;gap:10px;text-align:left;border-radius:14px;padding:13px 14px;cursor:pointer;' +
                  (active
                    ? 'border:2px solid var(--brand-primary);background:var(--sq-orange-50);'
                    : 'border:2px solid var(--border-default);background:#fff;')
              )}
            >
              <div style={css('flex:1')}>
                <div style={css('font-size:14px;font-weight:700;color:var(--text-primary)')}>
                  {st.label} <span style={css('font-weight:400;color:var(--text-tertiary)')}>· {st.equity}</span>
                </div>
                <div style={css('font-size:12px;color:var(--text-secondary);line-height:1.5;margin-top:2px')}>{st.blurb}</div>
              </div>
              {active && <span style={css('color:var(--brand-primary);font-weight:800;font-size:15px')}>✓</span>}
            </button>
          )
        })}
      </div>
    </BottomSheet>
  )
}
