/* Bullyee Financial Advisor - application root.
 *
 * Ported from the class component in "Bullyee Financial Advisor.dc.html".
 * The original used React.Component + this.setState; here that's a single
 * merge reducer so the handlers stay a near-1:1 translation of the source.
 *
 * `route` sits above the in-app `screen`: entry -> onboarding -> app, plus a
 * standalone `explainer`. Onboarding answers land in `profile` and personalise
 * the app (name, letter tone, 3a strategy, Profile screen). */
import { useEffect, useReducer, useRef } from 'react'
import './styles/global.css'

import {
  CONFIG,
  CHAT_SCRIPT,
  GLOSSARY,
  REASON_MAP,
  DEFAULT_REASON,
  REWARD_OPTIONS,
  QUIZ_QUESTIONS,
  INITIAL_MEMORY,
  ANSWER_MAP,
  THREE_A_STRATEGIES,
  RISK_TO_STRATEGY,
  GOAL_REASON,
  AGE_LABEL,
  GOAL_LABEL,
  CARE_LABEL,
  JARGON_LABEL,
  MONTHLY_LABEL,
  COACH_STEPS,
  FRIENDS,
  FRIEND_ACTIVITY,
  QUIZ_RANKING,
  PAST_LETTERS,
} from './data.js'

import { HomeScreen, LetterScreen, ProfileScreen, ThreeAScreen, FriendsScreen } from './screens.jsx'
import { EntryScreen, Onboarding, Explainer } from './entry.jsx'
import {
  StatusBar,
  Notch,
  HomeIndicator,
  TabBar,
  ChatCta,
  ChatDrawer,
  ToastHost,
  GlossaryDialog,
  RewardsSheet,
  AddInfoSheet,
  StrategySheet,
  CoachMarks,
} from './overlays.jsx'

const INITIAL_STATE = {
  route: 'entry', // entry | onboarding | explainer | app
  profile: null, // onboarding answers, once completed
  coach: null, // in-app guided-tour step index, or null
  screen: 'home', // home | letter | friends | profile | 3a
  strategy: null, // chosen 3a Easy strategy id
  strategyOpen: false,
  chatOpen: false,
  chatMessages: [{ from: 'bullye', text: "Hi! I'm Bullyee 🐂 - what's on your mind about the letter?" }],
  chatUsed: [],
  glossaryKey: null,
  questionAnswered: null,
  toastMsg: null,
  threeAConfirmed: false,
  memory: INITIAL_MEMORY,
  accessoriesOpen: false,
  addInfoOpen: false,
  addInfoText: '',
  dictionary: [],
  quizIndex: 0,
  quizSelected: null,
  quizStreak: 4,
  quizzesCompleted: 12,
  quizXp: 0,
  coins: 130,
  rewardCategory: 'donate',
  redeemedMsg: null,
  quizDone: false,
}

// Mirrors this.setState: accepts a partial object or an updater function.
function reducer(state, patch) {
  return { ...state, ...(typeof patch === 'function' ? patch(state) : patch) }
}

export default function App() {
  const [state, setState] = useReducer(reducer, INITIAL_STATE)
  const toastTimer = useRef(null)
  const redeemTimer = useRef(null)

  useEffect(() => {
    return () => {
      clearTimeout(toastTimer.current)
      clearTimeout(redeemTimer.current)
    }
  }, [])

  // Scale the fixed 390x844 phone frame to fit smaller viewports.
  useEffect(() => {
    const fit = () => {
      const scale = Math.min(1, (window.innerWidth - 32) / 390, (window.innerHeight - 32) / 844)
      document.documentElement.style.setProperty('--phone-scale', String(Math.max(0.4, scale)))
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  const flashToast = (msg) => {
    setState({ toastMsg: msg })
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setState({ toastMsg: null }), 2600)
  }

  /* ---- route ---- */
  const startDemo = () => setState({ route: 'onboarding' })
  const openExplainer = () => setState({ route: 'explainer' })
  const backToEntry = () => setState({ route: 'entry' })
  const logout = () => setState({ ...INITIAL_STATE })
  const finishOnboarding = (answers) =>
    setState({
      profile: answers,
      route: 'app',
      screen: 'home',
      coach: 0,
      strategy: RISK_TO_STRATEGY[answers.risk] || null,
    })
  const skipOnboarding = () => setState({ profile: null, route: 'app', screen: 'home', coach: 0 })

  const coachNext = () => setState((s) => ({ coach: Math.min(s.coach + 1, COACH_STEPS.length - 1) }))
  const coachBack = () => setState((s) => ({ coach: Math.max(s.coach - 1, 0) }))
  const coachDone = () => setState({ coach: null })

  /* ---- in-app navigation ---- */
  const goHome = () => setState({ screen: 'home', chatOpen: false })
  const goLetter = () => setState({ screen: 'letter', chatOpen: false })
  const goProfile = () => setState({ screen: 'profile', chatOpen: false })
  const goFriends = () => setState({ screen: 'friends', chatOpen: false })
  const go3a = () => setState({ screen: '3a', chatOpen: false })

  /* ---- 3a strategy ---- */
  const openStrategy = () => setState({ strategyOpen: true })
  const closeStrategy = () => setState({ strategyOpen: false })
  const setStrategy = (id) => setState({ strategy: id, strategyOpen: false })

  const nudgeFriend = (name) => flashToast('Nudged ' + name + '.')
  const reviewShared = () => flashToast('Opened “compound growth” from Elena.')

  /* ---- chat ---- */
  const openChat = () => setState({ chatOpen: true })
  const closeChat = () => setState({ chatOpen: false })
  const sendChat = (item) =>
    setState((s) => ({
      chatMessages: [...s.chatMessages, { from: 'user', text: item.q }, { from: 'bullye', text: item.a }],
      chatUsed: [...s.chatUsed, item.id],
    }))

  /* ---- letter reflection question ---- */
  const answerQuestion = (key) => {
    if (state.questionAnswered) return
    const info = ANSWER_MAP[key]
    setState((s) => ({
      questionAnswered: key,
      memory: [
        { id: 'new-' + key, tag: 'Motivation', tone: 'brand', text: info.mem, when: 'just now', borderColor: 'var(--sq-orange-300)' },
        ...s.memory,
      ],
    }))
    flashToast("Saved. I'll remember that.")
  }
  const answerWorkless = () => answerQuestion('workless')
  const answerAnxious = () => answerQuestion('anxious')
  const answerKids = () => answerQuestion('kids')
  const answerRetire = () => answerQuestion('retire')

  /* ---- glossary ---- */
  const openGlossary = (key) => setState({ glossaryKey: key })
  const openEtf = () => openGlossary('etf')
  const openPillar = () => openGlossary('pillar3a')
  const openTax = () => openGlossary('taxded')
  const openCompound = () => openGlossary('compound')
  const closeGlossary = () => setState({ glossaryKey: null })
  const addToDictionary = () => {
    const key = state.glossaryKey
    if (!key || state.dictionary.includes(key)) return
    setState((s) => ({ dictionary: [...s.dictionary, key] }))
    flashToast('Added to your dictionary.')
  }

  /* ---- 3a ---- */
  const start3a = () => setState({ threeAConfirmed: true })

  /* ---- rewards ---- */
  const openAccessories = () => setState({ accessoriesOpen: true })
  const closeAccessories = () => setState({ accessoriesOpen: false })
  const setRewardCategory = (cat) => setState({ rewardCategory: cat })
  const redeemReward = (opt) => {
    if (state.coins < opt.cost) return
    setState((s) => ({ coins: s.coins - opt.cost, redeemedMsg: 'Redeemed: ' + opt.name }))
    clearTimeout(redeemTimer.current)
    redeemTimer.current = setTimeout(() => setState({ redeemedMsg: null }), 2600)
  }

  /* ---- "tell Bullyee more" ---- */
  const openAddInfo = () => setState({ addInfoOpen: true })
  const closeAddInfo = () => setState({ addInfoOpen: false, addInfoText: '' })
  const setAddInfoText = (e) => setState({ addInfoText: e.target.value })
  const submitAddInfo = () => {
    const text = state.addInfoText.trim()
    if (!text) return
    setState((s) => ({
      memory: [
        { id: 'note-' + Date.now(), tag: 'Note', tone: 'neutral', text, when: 'just now', borderColor: 'var(--sq-orange-300)' },
        ...s.memory,
      ],
      addInfoOpen: false,
      addInfoText: '',
    }))
    flashToast("Thanks. I'll use that for better advice.")
  }

  /* ---- quiz ---- */
  const quizPick = (idx) => {
    if (state.quizSelected !== null) return
    setState({ quizSelected: idx })
  }
  const quizNext = () => {
    setState((s) => {
      const wasCorrect = s.quizSelected === QUIZ_QUESTIONS[s.quizIndex].correct
      const nextIndex = s.quizIndex + 1
      if (nextIndex >= QUIZ_QUESTIONS.length) {
        return {
          quizDone: true,
          quizXp: s.quizXp + (wasCorrect ? 10 : 0),
          quizStreak: s.quizStreak + 1,
          quizzesCompleted: s.quizzesCompleted + 1,
          coins: s.coins + (wasCorrect ? 10 : 0) + 15,
        }
      }
      return { quizIndex: nextIndex, quizSelected: null, quizXp: s.quizXp + (wasCorrect ? 10 : 0) }
    })
  }

  const chipStyleFor = (key) => {
    const answered = state.questionAnswered
    const isSelected = answered === key
    const base = 'border-radius:var(--radius-pill);padding:9px 14px;font-size:13px;font-weight:600;cursor:pointer;transition:background 0.15s;'
    if (isSelected) return base + 'background:var(--brand-primary);color:#fff;border:1px solid var(--brand-primary);'
    if (answered) return base + 'background:var(--sq-gray-50);color:var(--text-tertiary);border:1px solid var(--border-subtle);cursor:default;'
    return base + 'background:#fff;color:var(--text-primary);border:1px solid var(--border-default);'
  }

  /* ------------------------------------------------------------- view-model ---- */
  const s = state
  const profile = s.profile

  const userName = (profile?.name || '').trim() || CONFIG.userName || 'Maya'
  const tone = profile
    ? profile.careBreak === 'now' || profile.careBreak === 'past'
      ? 'gentle'
      : 'direct'
    : CONFIG.letterTone ?? 'gentle'
  const isGentleTone = tone === 'gentle'

  const strategy = s.strategy ? THREE_A_STRATEGIES.find((x) => x.id === s.strategy) || null : null
  const strategyLabel = strategy?.label || null

  // `goal` is multi-select, so normalise to an array.
  const goals = Array.isArray(profile?.goal) ? profile.goal : profile?.goal ? [profile.goal] : []

  const savedWords = s.dictionary.map((k) => GLOSSARY[k].title)

  const isHome = s.screen === 'home'
  const isLetter = s.screen === 'letter'
  const isProfile = s.screen === 'profile'
  const isFriends = s.screen === 'friends'
  const is3a = s.screen === '3a'

  const questionLocked = !!s.questionAnswered

  const chatUsedSet = new Set(s.chatUsed)
  const chatChips = CHAT_SCRIPT.filter((it) => !chatUsedSet.has(it.id)).map((it) => ({ ...it, onSelect: () => sendChat(it) }))
  const chatAllDone = chatChips.length === 0
  const chatMessages = s.chatMessages.map((m) => ({
    ...m,
    align: m.from === 'user' ? 'flex-end' : 'flex-start',
    bg: m.from === 'user' ? 'var(--brand-primary)' : 'var(--sq-gray-50)',
    color: m.from === 'user' ? '#fff' : 'var(--text-primary)',
  }))

  const glossaryKey = s.glossaryKey
  const glossaryOpen = !!glossaryKey
  const glossaryTitle = glossaryKey ? GLOSSARY[glossaryKey].title : ''
  const glossaryBody = glossaryKey ? GLOSSARY[glossaryKey].body : ''
  const glossaryInDictionary = glossaryKey ? s.dictionary.includes(glossaryKey) : false
  const dictionaryButtonLabel = glossaryInDictionary ? 'Added to dictionary ✓' : 'Add to dictionary'

  const threeAReasonText = s.questionAnswered
    ? REASON_MAP[s.questionAnswered]
    : goals[0]
      ? GOAL_REASON[goals[0]]
      : DEFAULT_REASON

  const profileFacts = profile
    ? [
        profile.age && ['Age', AGE_LABEL[profile.age]],
        goals.length > 0 && ["Why you're here", goals.map((g) => GOAL_LABEL[g]).join(', ')],
        profile.careBreak && CARE_LABEL[profile.careBreak] && ['Working pattern', CARE_LABEL[profile.careBreak]],
        strategy && ['3a strategy', strategy.label + ' · ' + strategy.equity],
        profile.monthly && profile.monthly !== 'unsure' && ['Can set aside', MONTHLY_LABEL[profile.monthly] + ' / month'],
        profile.jargon && ['Comfort with terms', JARGON_LABEL[profile.jargon]],
      ].filter(Boolean)
    : []

  const quizQ = QUIZ_QUESTIONS[s.quizIndex]
  const quizOptions = quizQ
    ? quizQ.options.map((opt, idx) => {
        let style =
          'width:100%;text-align:left;border-radius:14px;padding:12px 14px;font-size:14px;font-weight:600;cursor:pointer;border:2px solid var(--border-default);background:#fff;color:var(--text-primary);'
        if (s.quizSelected !== null) {
          if (idx === quizQ.correct)
            style =
              'width:100%;text-align:left;border-radius:14px;padding:12px 14px;font-size:14px;font-weight:600;cursor:default;border:2px solid var(--status-positive);background:var(--sq-gray-0);color:var(--status-positive);'
          else if (idx === s.quizSelected)
            style =
              'width:100%;text-align:left;border-radius:14px;padding:12px 14px;font-size:14px;font-weight:600;cursor:default;border:2px solid var(--status-negative);background:var(--sq-gray-0);color:var(--status-negative);'
          else
            style =
              'width:100%;text-align:left;border-radius:14px;padding:12px 14px;font-size:14px;font-weight:600;cursor:default;border:2px solid var(--border-subtle);background:#fff;color:var(--text-tertiary);'
        }
        return { label: opt, onSelect: () => quizPick(idx), style }
      })
    : []
  const quizDots = QUIZ_QUESTIONS.map((_, idx) => {
    const filled = idx < s.quizIndex || (idx === s.quizIndex && s.quizDone)
    return { filled, bg: filled ? 'var(--brand-primary)' : 'var(--sq-gray-100)' }
  })
  const quizAnswered = s.quizSelected !== null
  const quizIsLast = s.quizIndex === QUIZ_QUESTIONS.length - 1
  const quizWasCorrectBool = quizAnswered && quizQ && s.quizSelected === quizQ.correct

  const rewardItems = REWARD_OPTIONS.filter((o) => o.category === s.rewardCategory).map((o) => {
    const affordable = s.coins >= o.cost
    const remaining = Math.max(0, o.cost - s.coins)
    return {
      ...o,
      affordable,
      statusLabel: affordable ? 'Redeem' : remaining + ' more coins',
      cardOpacity: affordable ? '1' : '0.6',
      onRedeem: affordable ? () => redeemReward(o) : () => {},
      badgeBg: affordable ? 'var(--sq-orange-600)' : 'var(--sq-gray-100)',
      badgeColor: affordable ? '#fff' : 'var(--text-tertiary)',
    }
  })
  const isDonateCat = s.rewardCategory === 'donate'
  const isRetailCat = s.rewardCategory === 'retail'

  const showTabBar = !s.chatOpen && s.screen !== '3a'
  const showChatCta = isLetter && !s.chatOpen
  const chatCtaBottom = showTabBar ? '58px' : '0px'

  const vm = {
    userName,
    strategyLabel,
    strategyBlurb: strategy?.blurb || null,
    strategyEquity: strategy?.equity || null,
    strategyId: s.strategy,
    strategies: THREE_A_STRATEGIES,
    strategyOpen: s.strategyOpen,
    openStrategy,
    closeStrategy,
    setStrategy,
    profileFacts,
    savedWords,

    friends: FRIENDS.slice(0, 4).map((n) => ({ name: n, initial: n[0], onNudge: () => nudgeFriend(n) })),

    coachStep: s.coach == null ? null : COACH_STEPS[s.coach],
    coachIndex: s.coach ?? 0,
    coachTotal: COACH_STEPS.length,
    coachNext,
    coachBack,
    coachDone,

    isHome,
    isLetter,
    isProfile,
    isFriends,
    is3a,
    goHome,
    goLetter,
    goProfile,
    goFriends,
    go3a,
    logout,

    friendActivity: FRIEND_ACTIVITY,
    quizRanking: QUIZ_RANKING,
    reviewShared,
    pastLetters: PAST_LETTERS,

    isGentleTone,
    questionLocked,
    chipStyleWorkless: chipStyleFor('workless'),
    chipStyleAnxious: chipStyleFor('anxious'),
    chipStyleKids: chipStyleFor('kids'),
    chipStyleRetire: chipStyleFor('retire'),
    answerWorkless,
    answerAnxious,
    answerKids,
    answerRetire,

    openEtf,
    openPillar,
    openTax,
    openCompound,

    memoryItems: s.memory,

    threeAConfirmed: s.threeAConfirmed,
    threeAReasonText,
    start3a,

    showTabBar,
    showChatCta,
    chatCtaBottom,

    chatOpen: s.chatOpen,
    chatTranslate: s.chatOpen ? '0%' : '110%',
    scrimBg: s.chatOpen ? 'rgba(13,13,13,0.45)' : 'rgba(13,13,13,0)',
    scrimPointer: s.chatOpen ? 'auto' : 'none',
    openChat,
    closeChat,
    chatMessages,
    chatChips,
    chatAllDone,

    glossaryOpen,
    glossaryTitle,
    glossaryBody,
    glossaryInDictionary,
    dictionaryButtonLabel,
    closeGlossary,
    addToDictionary,

    toastMsg: s.toastMsg,

    addInfoOpen: s.addInfoOpen,
    openAddInfo,
    closeAddInfo,
    addInfoText: s.addInfoText,
    setAddInfoText,
    submitAddInfo,

    quizStreak: s.quizStreak,
    quizzesCompleted: s.quizzesCompleted,
    quizXp: s.quizXp,
    quizDone: s.quizDone,
    quizNotDone: !s.quizDone,
    quizQuestionText: quizQ ? quizQ.q : '',
    quizOptions,
    quizDots,
    quizAnswered,
    quizExplain: quizQ ? quizQ.explain : '',
    quizWasCorrect: quizWasCorrectBool ? 'var(--status-positive)' : 'var(--status-negative)',
    quizVerdictLabel: quizWasCorrectBool ? 'Correct.' : 'Not quite.',
    quizNextLabel: quizIsLast ? 'See results' : 'Next question',
    quizNext,
    quizCurrentNum: s.quizIndex + 1,
    quizTotal: QUIZ_QUESTIONS.length,

    coins: s.coins,
    rewardItems,
    setDonateCat: () => setRewardCategory('donate'),
    setRetailCat: () => setRewardCategory('retail'),
    donateTabBg: isDonateCat ? 'var(--sq-orange-600)' : '#fff',
    donateTabColor: isDonateCat ? '#fff' : 'var(--sq-orange-600)',
    retailTabBg: isRetailCat ? 'var(--sq-orange-600)' : '#fff',
    retailTabColor: isRetailCat ? '#fff' : 'var(--sq-orange-600)',
    redeemedMsg: s.redeemedMsg,
    accessoriesOpen: s.accessoriesOpen,
    openAccessories,
    closeAccessories,
  }

  return (
    <div className="app-stage">
      <div className="phone-scaler">
        <div className="phone">
          <Notch />

          {s.route === 'entry' && <EntryScreen onDemo={startDemo} onExplain={openExplainer} />}
          {s.route === 'explainer' && <Explainer onBack={backToEntry} onDemo={startDemo} />}
          {s.route === 'onboarding' && (
            <Onboarding onFinish={finishOnboarding} onSkip={skipOnboarding} onBack={backToEntry} />
          )}

          {s.route === 'app' && (
            <>
              <StatusBar />
              <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
                {isHome && <HomeScreen vm={vm} />}
                {isLetter && <LetterScreen vm={vm} />}
                {isFriends && <FriendsScreen vm={vm} />}
                {isProfile && <ProfileScreen vm={vm} />}
                {is3a && <ThreeAScreen vm={vm} />}
              </div>

              {showChatCta && <ChatCta vm={vm} />}
              {showTabBar && <TabBar vm={vm} />}

              <ChatDrawer vm={vm} />
              <ToastHost vm={vm} />
              <GlossaryDialog vm={vm} />
              <RewardsSheet vm={vm} />
              <AddInfoSheet vm={vm} />
              <StrategySheet vm={vm} />
              <CoachMarks vm={vm} />
            </>
          )}

          <HomeIndicator />
        </div>
      </div>
    </div>
  )
}
