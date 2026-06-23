import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#f6f1e7',
  '--slot4-page-text': '#16373a',
  '--slot4-panel-bg': '#ebe2d0',
  '--slot4-surface-bg': '#fbf8f2',
  '--slot4-muted-text': '#6c6a60',
  '--slot4-soft-muted-text': '#847d6f',
  '--slot4-accent': '#995f2f',
  '--slot4-accent-fill': '#995f2f',
  '--slot4-accent-soft': '#e4d6a9',
  '--slot4-highlight': '#622b14',
  '--slot4-highlight-strong': '#16373a',
  '--slot4-dark-bg': '#16373a',
  '--slot4-dark-text': '#f8f4ec',
  '--slot4-media-bg': '#d8ccb1',
  '--slot4-line': 'rgba(22,55,58,0.18)',
  '--slot4-card-line': 'rgba(22,55,58,0.12)',
  '--slot4-body-gradient': 'radial-gradient(circle at top left, rgba(228,214,169,0.4), transparent 28%), linear-gradient(180deg, #f4efe4 0%, #fbf8f2 48%, #f1eadb 100%)',
  '--editable-container': '1360px',
  '--editable-border': 'rgba(22,55,58,0.14)',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  border: 'border-[color:var(--slot4-line)]',
  cardBorder: 'border-[color:var(--slot4-card-line)]',
  darkBorder: 'border-white/15',
  shadow: 'shadow-[0_24px_65px_rgba(98,43,20,0.08)]',
  shadowStrong: 'shadow-[0_40px_110px_rgba(22,55,58,0.16)]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-12 sm:py-16 lg:py-20',
  },
  layout: {
    rail: 'grid gap-5 md:grid-cols-2 xl:grid-cols-4',
    minRailCard: 'min-w-0',
    topicGrid: 'grid gap-6 md:grid-cols-2',
    split: 'grid gap-8 lg:grid-cols-[1.05fr_.95fr]',
  },
  type: {
    eyebrow: 'text-[11px] font-black uppercase tracking-[0.26em]',
    heroTitle: 'text-5xl font-semibold leading-[0.94] tracking-[-0.06em] sm:text-6xl lg:text-[5.6rem]',
    sectionTitle: 'text-4xl font-semibold leading-[0.96] tracking-[-0.05em] sm:text-5xl',
    body: 'text-base leading-8',
  },
  surface: {
    card: `rounded-[2rem] border ${editablePalette.cardBorder} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-[2rem] border ${editablePalette.cardBorder} ${editablePalette.surfaceBg}`,
    dark: `rounded-[2.5rem] ${editablePalette.darkBg} ${editablePalette.darkText}`,
  },
  button: {
    primary: 'inline-flex items-center justify-center rounded-full bg-[var(--slot4-dark-bg)] px-7 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-[var(--slot4-dark-text)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--slot4-accent-fill)]',
    secondary: 'inline-flex items-center justify-center rounded-full border border-[color:var(--slot4-line)] bg-transparent px-7 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-[var(--slot4-page-text)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--slot4-page-text)] hover:text-[var(--slot4-dark-text)]',
    accent: 'inline-flex items-center justify-center rounded-full bg-[var(--slot4-accent-fill)] px-7 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--slot4-highlight)]',
  },
  media: {
    frame: 'relative overflow-hidden rounded-[2rem] bg-[var(--slot4-media-bg)]',
    ratio: 'aspect-[4/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(22,55,58,0.16)]',
    fade: 'transition duration-300 hover:opacity-85',
  },
} as const

export const aiLayoutRules = [
  'All visible layout decisions belong inside src/editable; keep data, SEO, API, and route logic untouched.',
  'Use a luxury editorial system with soft ivory backgrounds, dark presentation panels, bronze accents, and sculpted rounded modules.',
  'Keep dynamic post fetching intact and never replace backend posts with mock arrays in live archive or detail routes.',
  'Use task-aware links so every supported route and detail page keeps working.',
  'Support missing image, summary, category, and metadata gracefully with safe fallbacks.',
  'Preserve dynamic branding from SITE_CONFIG instead of hardcoding any outside publication identity.',
] as const
