import type { TaskKey } from '@/lib/site-config'

export type TaskPageVoice = {
  eyebrow: string
  headline: string
  description: string
  filterLabel: string
  secondaryNote: string
  chips: string[]
}

export const taskPageVoices = {
  mediaDistribution: {
    eyebrow: 'Media desk',
    headline: 'Distribution-ready updates presented with premium editorial clarity.',
    description: 'Publish announcements, company news, press coverage, and media updates through a front end that feels polished, current, and public facing.',
    filterLabel: 'Choose media category',
    secondaryNote: 'Every category received from the master panel is supported automatically.',
    chips: ['Distribution ready', 'Premium structure', 'Category aware'],
  },
  article: {
    eyebrow: 'Reading desk',
    headline: 'Long-form stories with a calmer, more luxurious editorial rhythm.',
    description: 'This section gives essays, explainers, and feature stories broad reading space, stronger hierarchy, and richer presentation.',
    filterLabel: 'Choose article topic',
    secondaryNote: 'Reading surfaces need space, hierarchy, and fewer distractions.',
    chips: ['Long-read focus', 'Editorial pacing', 'Feature hierarchy'],
  },
  classified: {
    eyebrow: 'Notice board',
    headline: 'Fast-moving offers and notices styled for direct action.',
    description: 'Classified content stays easy to scan, practical, and immediate while still feeling consistent with the premium site system.',
    filterLabel: 'Filter classified category',
    secondaryNote: 'Prioritize urgency, short summaries, and direct browsing.',
    chips: ['Fast scan', 'Offer cues', 'Action ready'],
  },
  sbm: {
    eyebrow: 'Saved resources',
    headline: 'Curated bookmark collections with a calmer library feel.',
    description: 'Bookmark pages work best when useful links, references, and saved resources read like editorial shelves instead of generic cards.',
    filterLabel: 'Filter collection',
    secondaryNote: 'Curated resources need grouping and calm metadata.',
    chips: ['Collections', 'Useful links', 'Reference flow'],
  },
  profile: {
    eyebrow: 'People and profiles',
    headline: 'Profiles shaped around identity, expertise, and credibility.',
    description: 'Profile pages should make people and organizations feel intentional, discoverable, and easy to trust at a glance.',
    filterLabel: 'Filter profile category',
    secondaryNote: 'Make identity and credibility visible before the grid begins.',
    chips: ['Identity first', 'Trust cues', 'Discovery ready'],
  },
  pdf: {
    eyebrow: 'Document library',
    headline: 'Documents and PDFs presented as a polished knowledge center.',
    description: 'Reports, guides, and downloadable materials deserve a cleaner archive style with obvious context and more premium framing.',
    filterLabel: 'Filter document type',
    secondaryNote: 'Document surfaces need archive cues, file context, and clear browsing.',
    chips: ['Knowledge center', 'Download flow', 'Library structure'],
  },
  listing: {
    eyebrow: 'Business directory',
    headline: 'Business listings built for trust, comparison, and discovery.',
    description: 'Directory pages benefit from stronger location, contact, and summary structure so visitors can compare entries more comfortably.',
    filterLabel: 'Filter business category',
    secondaryNote: 'Prioritize comparison, location, and direct action paths.',
    chips: ['Directory', 'Trust cues', 'Practical browsing'],
  },
  image: {
    eyebrow: 'Visual gallery',
    headline: 'Image-led browsing with gallery rhythm and stronger visual focus.',
    description: 'Image pages should let visuals lead the experience while still supporting titles, short copy, and related discovery.',
    filterLabel: 'Filter visual category',
    secondaryNote: 'Let images carry the page before long text does.',
    chips: ['Gallery first', 'Visual focus', 'Portfolio rhythm'],
  },
} satisfies Record<TaskKey, TaskPageVoice>
