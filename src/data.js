/* Static content for the Bullyee prototype - ported verbatim from
 * "Bullyee Financial Advisor.dc.html". Keeping copy here (not in components)
 * makes it easy to hand off to a writer/localisation pass later. */

export const CONFIG = {
  userName: 'Maya',
  notifDelaySeconds: 3,
  letterTone: 'gentle', // 'gentle' | 'direct'
}

export const CHAT_SCRIPT = [
  { id: 'timing', q: 'Why does timing matter?', a: "Compound growth needs time more than money - starting small now beats waiting for 'enough' later." },
  { id: 'risk', q: 'Is 3a risky?', a: 'You pick the strategy, from Saving to Ambitious. Markets move, but pulling out early usually costs more than staying calm.' },
  { id: 'thisweek', q: 'What should I do this week?', a: "Just one step: open your 3a and set one contribution. I'll help you keep it going after that." },
]

export const GLOSSARY = {
  etf: { title: 'ETF', body: 'A fund that bundles many investments - like dozens of company shares - into one. Your money spreads out automatically.' },
  pillar3a: { title: 'Pillar 3a', body: "Switzerland's private pension pillar. Money you set aside yourself, with tax benefits, on top of what your employer already contributes." },
  taxded: { title: 'Tax-deductible', body: 'You can subtract these contributions from your taxable income - so you pay less tax in the same year you save.' },
  compound: { title: 'Compound growth', body: 'When your returns start earning their own returns. The longer money stays invested, the faster it grows.' },
  securities3a: { title: 'Securities 3a', body: 'A pillar 3a account invested in the market (stocks and ETFs) instead of sitting in cash - more growth potential, with some ups and downs along the way.' },
  taxrefund: { title: 'Tax refund', body: 'Money returned to you after you overpaid tax during the year - often boosted by deductible contributions like your 3a.' },
}

const JARGON_TERMS = [
  { phrase: 'ETF', key: 'etf' },
  { phrase: 'Pillar 3a', key: 'pillar3a' },
  { phrase: 'securities 3a', key: 'securities3a' },
  { phrase: '3a', key: 'pillar3a' },
  { phrase: 'tax refund', key: 'taxrefund' },
]

export function splitJargon(text) {
  const pattern = JARGON_TERMS.map((t) => t.phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
  const re = new RegExp('(' + pattern + ')', 'g')
  return text
    .split(re)
    .filter((p) => p !== '')
    .map((p) => {
      const match = JARGON_TERMS.find((t) => t.phrase === p)
      return { text: p, key: match ? match.key : null }
    })
}

export const ANSWER_MAP = {
  workless: { mem: 'Wants to work less, not stop working entirely.' },
  anxious: { mem: 'Wants to feel less anxious about money day-to-day.' },
  kids: { mem: 'Wants to support her kids without financial stress.' },
  retire: { mem: 'Wants the option to retire earlier than the default path.' },
}

export const REASON_MAP = {
  workless: 'You told Bullyee you want to work less, not stop. A 3a is how you buy that choice quietly.',
  anxious: 'You told Bullyee money-anxiety is real for you. A 3a is one less thing to worry about, on autopilot.',
  kids: 'You told Bullyee your kids come first. A 3a protects that without touching your day-to-day cash.',
  retire: 'You told Bullyee you want the option to retire earlier. Every year in a 3a keeps that option open.',
}
export const DEFAULT_REASON =
  'You told Bullyee time with your family matters more than climbing fast. A 3a protects that choice quietly.'

export const FRIENDS = ['Priya', 'Elena', 'Mila', 'Sofia', 'Nadia']

export const FRIEND_ACTIVITY = [
  { name: 'Elena', text: 'shared “compound growth” with you', when: 'just now', action: 'Review' },
  { name: 'Priya', text: 'finished this week’s quiz', when: '2h ago' },
]

export const QUIZ_RANKING = [
  { name: 'Priya', points: 240 },
  { name: 'You', points: 210, me: true },
  { name: 'Sofia', points: 195 },
  { name: 'Elena', points: 160 },
  { name: 'Mila', points: 120 },
]

export const PAST_LETTERS = ['Week of Aug 25', 'Week of Aug 18', 'Week of Aug 11', 'Week of Aug 4']

export const REWARD_OPTIONS = [
  { emoji: '🇨🇭', name: 'CHF 5 to Pro Juventute', category: 'donate', cost: 50 },
  { emoji: '🌸', name: 'CHF 10 to BENEVOL Schweiz', category: 'donate', cost: 100 },
  { emoji: '🎗️', name: 'CHF 25 to Swiss Women’s Fund', category: 'donate', cost: 220 },
  { emoji: '🛒', name: 'CHF 10 Migros credit', category: 'retail', cost: 100 },
  { emoji: '👗', name: 'CHF 15 Zalando credit', category: 'retail', cost: 140 },
  { emoji: '📦', name: 'CHF 20 Galaxus credit', category: 'retail', cost: 190 },
]

export const QUIZ_QUESTIONS = [
  {
    q: 'What does ETF stand for?',
    options: ['Exchange-Traded Fund', 'Extra Tax Fee', 'Equity Transfer Form'],
    correct: 0,
    explain:
      'An ETF bundles many stocks into one fund you can trade like a single share - an easy way to own a slice of hundreds of companies at once.',
  },
  {
    q: 'What is a pillar 3a?',
    options: ["Switzerland's private pension pillar", 'A type of savings account', 'A stock market index'],
    correct: 0,
    explain:
      "Pillar 3a is Switzerland's voluntary private pension - money you set aside yourself, on top of your employer pension, with tax benefits each year.",
  },
  {
    q: 'What does "tax-deductible" mean for your 3a?',
    options: ['You pay tax twice', 'You can subtract it from taxable income', "It's tax-free forever"],
    correct: 1,
    explain:
      'Every franc you contribute to your 3a is subtracted from your taxable income, so you owe less tax the same year you save.',
  },
]

/* Each concept is one of two natures:
 *  - 'self'  : the notification is the whole point. You learn or feel something
 *              in the lock screen and never have to open the app. It still
 *              builds the habit that makes you open it later.
 *  - 'bring' : it only pays off inside the app (a quiz, the letter, a friend
 *              waiting on you). This is the pull. */
export const NOTIF_TYPES = [
  {
    type: 'self',
    title: 'New word: ETF',
    body: 'One investment that bundles lots of different shares together. Buy an S&P 500 ETF and you own a tiny slice of 500 big companies at once.',
    tags: ['Learn in 10s'],
    why: 'Teaches one term on the lock screen, so the jargon barrier drops without the user opening anything.',
  },
  {
    type: 'self',
    title: 'Fact of the week',
    body: 'Swiss women retire on 32.8% less than men (CHF 35,442 a year vs CHF 52,735, 2021). Part-time years and career breaks are the main cause, and a 3a is one of the few things that helps close it.',
    tags: ['Weekly'],
    why: 'Names the unfairness with a hard number instead of a returns chart, which is what the research says lands.',
  },
  {
    type: 'self',
    title: "Sarah's story",
    body: 'A mum from Zurich in her 30s maxed out her CHF 7,258 for the year, and got a CHF 2,100 tax refund she put straight back into her 3a.',
    tags: ['Real story'],
    why: 'A relatable peer at a similar life stage models one specific, doable action.',
  },
  {
    type: 'self',
    title: 'Myth: it’s not worth starting until you can pay in the full amount',
    body: 'The full 3a amount is CHF 7,258 a year, and a lot of people wait until they can manage that. But CHF 100 a month started now beats CHF 300 a month started in five years, because the early years compound the longest.',
    tags: ['Myth-buster'],
    why: 'Directly corrects a misconception that keeps people from starting small.',
  },
  {
    type: 'bring',
    title: 'Test your financial knowledge 👀',
    body: "5 minutes, three questions. Bet you can't beat your friends.",
    tags: ['Time-bound', 'Leaderboard'],
    why: 'Light competition and a time box pull the competitive user back without feeling like homework.',
  },
  {
    type: 'bring',
    title: "This week's letter is ready",
    body: 'One thing worth doing this week, and a question from me. Two minutes.',
    tags: ['Weekly'],
    why: 'Deliberately vague to spark curiosity; the weekly cadence is what builds the habit.',
  },
  {
    type: 'bring',
    title: 'Priya sent you this',
    body: '“Thought you’d find this one interesting.” Priya shared a card about the pension gap. Give it a read?',
    tags: ['From a friend'],
    why: 'A prompt from a trusted friend is the strongest behaviour trigger we saw in the research.',
  },
  {
    type: 'bring',
    title: "Don't wait 3 months",
    body: 'CHF 150/month into a securities 3a from today closes your pension gap by 65. Five minutes now saves you CHF 2,400 more this year.',
    tags: ['Personalized', 'Urgency'],
    why: 'Personalised urgency with a concrete figure frames delay as a measurable cost, not a vague one.',
  },
]

export const INITIAL_MEMORY = [
  { id: 'seed2', tag: 'Goal', tone: 'brand', text: 'Wants to close the retirement gap her career break created.', when: '2 weeks ago', borderColor: 'var(--border-subtle)' },
  { id: 'seed3', tag: 'Value', tone: 'positive', text: 'Time with family matters more than climbing fast at work.', when: '2 weeks ago', borderColor: 'var(--border-subtle)' },
]

/* -------------------------------------------------------------- onboarding ---- */
/* A short "get to know you" flow, modelled on what Swissquote asks when you
 * open a 3a (identity, capacity, risk appetite, knowledge) but re-weighted
 * toward the things the research says actually matter to women: working
 * pattern / career breaks, and comfort with the jargon. */
export const ONBOARDING_STEPS = [
  {
    id: 'name',
    kind: 'text',
    q: 'What should Bullyee call you?',
    hint: 'A first name is plenty.',
    placeholder: 'Your first name',
  },
  {
    id: 'age',
    kind: 'choice',
    q: 'How old are you, roughly?',
    hint: 'It changes how Bullyee talks about time. Early 20s and late 20s really aren’t the same.',
    options: [
      { value: 'u25', label: 'Under 25' },
      { value: '25_29', label: '25 to 29' },
      { value: '30_34', label: '30 to 34' },
      { value: '35_44', label: '35 to 44' },
      { value: '45p', label: '45 or older' },
    ],
  },
  {
    id: 'goal',
    kind: 'choice',
    multi: true,
    q: 'What’s got you thinking about a 3a?',
    hint: 'Pick as many as apply. Bullyee keeps this in your profile to keep advice relevant.',
    options: [
      { value: 'gap', label: 'Closing my pension gap' },
      { value: 'early', label: 'The option to retire earlier' },
      { value: 'calm', label: 'Feeling less anxious about money' },
      { value: 'family', label: 'Protecting my family' },
      { value: 'learn', label: 'Honestly, just learning for now' },
    ],
  },
  {
    id: 'careBreak',
    kind: 'choice',
    q: 'Has your work ever gone part-time or paused? Care, study, health, travel, anything.',
    hint: 'Two of the three Swiss pension pillars only grow while you’re employed. A 3a is how you cover the gap.',
    options: [
      { value: 'now', label: 'Yes, right now' },
      { value: 'past', label: 'Yes, in the past' },
      { value: 'no', label: 'No, full-time throughout' },
      { value: 'skip', label: 'Rather not say' },
    ],
  },
  {
    id: 'risk',
    kind: 'choice',
    q: 'Your 3a drops 10% in a month. Gut reaction?',
    hint: 'There’s no right answer - it just sets your starting strategy.',
    options: [
      { value: 'pull_out', label: "I'd want to pull it out" },
      { value: 'uneasy', label: "Uneasy, but I'd leave it" },
      { value: 'normal', label: "That's normal, no drama" },
      { value: 'invest_more', label: "I'd put a bit more in" },
    ],
  },
  {
    id: 'monthly',
    kind: 'choice',
    q: 'Roughly what could you set aside each month?',
    hint: 'A guess is fine. You can change it any time - starting small still counts.',
    options: [
      { value: 'lt100', label: 'Under CHF 100' },
      { value: '100_300', label: 'CHF 100–300' },
      { value: '300_600', label: 'CHF 300–600' },
      { value: 'gt600', label: 'CHF 600+' },
      { value: 'unsure', label: 'Not sure yet' },
    ],
  },
  {
    id: 'jargon',
    kind: 'choice',
    q: 'Words like ETF, compound growth, securities 3a. How do they land?',
    hint: 'This helps Bullyee pitch explanations at the right level for you.',
    options: [
      { value: 'new', label: 'New to all of it' },
      { value: 'some', label: 'I know some' },
      { value: 'comfortable', label: 'Pretty comfortable' },
    ],
  },
]

/* The four 3a Easy strategies (swissquote.com/en-ch/private/invest/products/3a-easy).
 * Equity splits are approximate - Swissquote doesn't publish exact numbers. */
export const THREE_A_STRATEGIES = [
  { id: 'saving', label: 'Saving', equity: '0% shares', blurb: 'Interest only, no market ups and downs. Safest, and the slowest to grow.' },
  { id: 'balanced', label: 'Balanced', equity: 'about 45% shares', blurb: 'A middle mix. Some growth, smaller swings to sit through.' },
  { id: 'dynamic', label: 'Dynamic', equity: 'about 75% shares', blurb: 'Growth-leaning. Bumpier year to year, better odds over a long run.' },
  { id: 'ambitious', label: 'Ambitious', equity: 'about 99% shares', blurb: 'Almost all shares. The biggest swings, and the highest ceiling over decades.' },
]

export const RISK_TO_STRATEGY = {
  pull_out: 'saving',
  uneasy: 'balanced',
  normal: 'dynamic',
  invest_more: 'ambitious',
}

export const GOAL_MEMORY = {
  gap: 'Wants to close the pension gap her working pattern created.',
  early: 'Wants the option to retire earlier than the default path.',
  calm: 'Wants to feel less anxious about money day-to-day.',
  family: 'Wants to protect her family without financial stress.',
  learn: 'Here to learn first - not ready to be sold anything.',
}

export const GOAL_REASON = {
  gap: 'You told Bullyee you want to close your pension gap. A 3a is the one pillar that rewards you for starting, whatever your working pattern.',
  early: 'You told Bullyee you want the option to retire earlier. Every year in a 3a keeps that option open.',
  calm: 'You told Bullyee money-anxiety is real for you. A 3a is one less thing to worry about, on autopilot.',
  family: 'You told Bullyee your family comes first. A 3a protects that without touching your day-to-day cash.',
  learn: "You told Bullyee you're here to learn. No pressure - a 3a is just one idea worth understanding early.",
}

export const MONTHLY_LABEL = {
  lt100: 'under CHF 100',
  '100_300': 'CHF 100–300',
  '300_600': 'CHF 300–600',
  gt600: 'CHF 600+',
  unsure: 'an amount you’re still working out',
}

/* Short labels for the Profile screen + onboarding summary. */
export const AGE_LABEL = {
  u25: 'Under 25',
  '25_29': '25 to 29',
  '30_34': '30 to 34',
  '35_44': '35 to 44',
  '45p': '45 or older',
}
export const GOAL_LABEL = {
  gap: 'Close the pension gap',
  early: 'Option to retire earlier',
  calm: 'Less money anxiety day-to-day',
  family: 'Protect her family',
  learn: 'Learning for now',
}
export const CARE_LABEL = {
  now: 'Part-time or on a break now',
  past: 'Career breaks in the past',
  no: 'Full-time throughout',
  skip: '',
}
export const JARGON_LABEL = {
  new: 'New to the terms',
  some: 'Knows some of the terms',
  comfortable: 'Comfortable with the terms',
}

/* -------------------------------------------------------- in-demo coach tour ---- */
/* Small step-through popups the first time you enter the app. Each points at one
 * element and says what it is and why the research put it there. `target` is a
 * DOM id set on the element in screens.jsx / overlays.jsx. */
export const COACH_STEPS = [
  {
    target: 'coach-letter',
    title: 'Your weekly letter',
    what: 'How you’re doing, what the market did, one plan for the week, and a question back to you.',
    why: 'It’s the thing women in our research said they’d actually read: short, honest, useful.',
  },
  {
    target: 'coach-quiz',
    title: 'The quiz, and your words',
    what: 'Three questions a day, with a streak to keep. Any word you tap to learn gets saved to your words, and comes back in a later quiz.',
    why: 'A little every day beats one big scary decision. The jargon is the real wall, so we turn learning it into the game.',
  },
  {
    target: 'coach-community',
    title: 'Friends',
    what: 'A short list of friends you can nudge - pass on a card, throw a quiz challenge, or ask if they’ve opened theirs. That’s the whole social layer.',
    why: 'Women invest more easily next to people they trust. Kept as light as adding a friend on Duolingo: no shared money, no group account.',
  },
  {
    target: 'coach-profile',
    title: 'Your profile',
    what: 'Everything Bullyee knows about you, in one place you can see and edit.',
    why: 'It’s all from what the user told her and how they use the app, and it’s theirs to edit.',
  },
]
