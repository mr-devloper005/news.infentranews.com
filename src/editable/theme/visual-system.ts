import { slot4BrandConfig } from './brand.config'

export type Slot4VisualPreset =
  | 'premium-editorial'
  | 'executive-briefing'
  | 'golden-directory'
  | 'gallery-salon'
  | 'clean-wire'
  | 'warm-dossier'
  | 'midnight-library'

export const visualPresets = {
  'premium-editorial': {
    label: 'Premium Editorial',
    mood: 'luxury, calm, assured',
    fontDirection: 'high-contrast serif display with crisp humanist sans',
    colors: {
      background: '#f6f1e7',
      foreground: '#16373a',
      muted: '#6c6a60',
      primary: '#16373a',
      accent: '#995f2f',
      surface: '#fbf8f2',
    },
    shape: 'rounded presentation blocks with fine line-work and broad spacing',
  },
  'executive-briefing': {
    label: 'Executive Briefing',
    mood: 'credible, strategic, polished',
    fontDirection: 'serif headlines paired with tightly set sans metadata',
    colors: {
      background: '#f2ecdf',
      foreground: '#183335',
      muted: '#797467',
      primary: '#183335',
      accent: '#7b2f19',
      surface: '#fcfaf5',
    },
    shape: 'large briefing panels, quiet corners, measured contrast',
  },
  'golden-directory': {
    label: 'Golden Directory',
    mood: 'refined, practical, discoverable',
    fontDirection: 'solid sans hierarchy with serif moments',
    colors: {
      background: '#f5efe0',
      foreground: '#214447',
      muted: '#726a5b',
      primary: '#214447',
      accent: '#9b6840',
      surface: '#fffaf2',
    },
    shape: 'stacked information cards and warm filtering panels',
  },
  'gallery-salon': {
    label: 'Gallery Salon',
    mood: 'visual, composed, atmospheric',
    fontDirection: 'serif headlines and understated captions',
    colors: {
      background: '#f4efe4',
      foreground: '#183739',
      muted: '#817566',
      primary: '#183739',
      accent: '#8e4f2d',
      surface: '#faf6ee',
    },
    shape: 'image-led modules and quiet masonry rhythm',
  },
  'clean-wire': {
    label: 'Clean Wire',
    mood: 'fast, structured, current',
    fontDirection: 'compact sans with editorial serif anchors',
    colors: {
      background: '#f8f5ed',
      foreground: '#17393b',
      muted: '#6c6f68',
      primary: '#17393b',
      accent: '#7f4927',
      surface: '#ffffff',
    },
    shape: 'newswire bands, split columns, compact metadata rails',
  },
  'warm-dossier': {
    label: 'Warm Dossier',
    mood: 'approachable, premium, archival',
    fontDirection: 'soft serif display with confident sans body',
    colors: {
      background: '#f3ecdc',
      foreground: '#234142',
      muted: '#7d725f',
      primary: '#234142',
      accent: '#a16633',
      surface: '#fff9ef',
    },
    shape: 'paper-like canvases, inset cards, dossier rhythm',
  },
  'midnight-library': {
    label: 'Midnight Library',
    mood: 'dramatic, elegant, focused',
    fontDirection: 'luminous serif display on dark fields',
    colors: {
      background: '#10292c',
      foreground: '#f4efe4',
      muted: '#c6bca8',
      primary: '#f4efe4',
      accent: '#c88a4a',
      surface: '#16373a',
    },
    shape: 'deep canvases and luminous call-to-action panels',
  },
} as const

export const visualSystem = {
  productKind: slot4BrandConfig.productKind,
  recommendedPreset:
    slot4BrandConfig.productKind === 'visual'
      ? 'gallery-salon'
      : slot4BrandConfig.productKind === 'directory'
        ? 'golden-directory'
        : slot4BrandConfig.productKind === 'editorial'
          ? 'premium-editorial'
          : 'executive-briefing',
  radius: {
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '2.75rem',
  },
  motion: {
    pageLoad: 'animate-in fade-in slide-in-from-bottom-4 duration-700',
    cardHover: 'transition duration-300 hover:-translate-y-1 hover:shadow-xl',
    softHover: 'transition duration-300 hover:opacity-85',
    reduceMotionSafe: 'motion-reduce:transform-none motion-reduce:transition-none',
  },
  typography: {
    eyebrow: 'text-xs font-semibold uppercase tracking-[0.24em]',
    heroTitle: 'text-5xl font-semibold tracking-[-0.06em] sm:text-6xl lg:text-7xl',
    sectionTitle: 'text-3xl font-semibold tracking-[-0.04em] sm:text-4xl',
    body: 'text-base leading-8',
    caption: 'text-xs font-medium uppercase tracking-[0.18em]',
  },
  surfaces: {
    glass: 'border border-white/15 bg-white/10 backdrop-blur-xl',
    paper: 'rounded-[2rem] border border-[color:var(--slot4-card-line)] bg-[var(--slot4-surface-bg)] shadow-[0_24px_65px_rgba(98,43,20,0.08)]',
    quiet: 'rounded-[2rem] border border-[color:var(--slot4-card-line)] bg-black/[0.03]',
    dark: 'rounded-[2.5rem] border border-white/10 bg-[var(--slot4-dark-bg)] shadow-[0_24px_70px_rgba(0,0,0,0.25)]',
  },
  layout: {
    page: 'mx-auto w-full max-w-7xl max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-12 sm:py-16 lg:py-20',
    cardGrid: 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3',
  },
} as const

export function getVisualPreset(name: Slot4VisualPreset = visualSystem.recommendedPreset as Slot4VisualPreset) {
  return visualPresets[name]
}
