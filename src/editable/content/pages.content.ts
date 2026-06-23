import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Premium media distribution and editorial discovery',
      description: 'Explore releases, stories, visuals, and supporting resources through a luxury editorial interface built for media distributors.',
      openGraphTitle: 'Premium media distribution and editorial discovery',
      openGraphDescription: 'A refined public-facing environment for releases, newsroom stories, and structured discovery.',
      keywords: ['media distribution', 'editorial archive', 'press updates', 'newsroom stories'],
    },
    hero: {
      badge: '',
      title: ['Your global media distribution', 'partner for high-visibility stories.'],
      description: 'From news distribution and editorial releases to visual assets, documents, and supporting profiles, every update is presented with clarity and polish.',
      primaryCta: { label: 'Browse latest updates', href: '/search' },
      secondaryCta: { label: 'Open archive', href: '/search' },
      searchPlaceholder: 'Search news, companies, categories, and updates',
      focusLabel: 'Focus',
      featureCardBadge: 'featured coverage',
      featureCardTitle: 'A premium presentation layer for every active post type.',
      featureCardDescription: 'The homepage blends live content with magazine-like hierarchy so distribution feels stronger at first glance.',
    },
    intro: {
      badge: 'About the platform',
      title: 'A calmer, more confident way to present public updates.',
      paragraphs: [
        'The interface is designed to help media distributors showcase releases, long-form stories, documents, visuals, and supporting listings without looking generic.',
        'Every active content type keeps its existing route logic and data source, while the front end shifts into a more premium editorial rhythm.',
        'Visitors can move from feature stories to archives, profiles, documents, and supporting pages without losing context.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Magazine-inspired homepage with stronger hero storytelling.',
        'Distinct card styles across featured, compact, list, and image-first moments.',
        'Luxury editorial detail pages with safer fallbacks for missing data.',
        'Refined navigation, search, and footer structure for public-facing credibility.',
      ],
      primaryLink: { label: 'Browse articles', href: '/article' },
      secondaryLink: { label: 'See visuals', href: '/image' },
    },
    cta: {
      badge: 'Start exploring',
      title: 'Present your updates with a public-facing experience that feels established and trustworthy.',
      description: 'Move between releases, visuals, documents, and supporting resources in one connected editorial system.',
      primaryCta: { label: 'Browse Articles', href: '/article' },
      secondaryCta: { label: 'Contact', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'About the platform',
    title: 'A refined front end for media distribution and public-facing storytelling.',
    description: `${slot4BrandConfig.siteName} is built to help media distributors present releases, editorial updates, and discovery pages with more confidence.`,
    paragraphs: [
      'The experience prioritizes hierarchy, atmosphere, and readability so each update feels deliberate rather than dropped into a generic feed.',
      'By keeping routes, props, and data intact while redesigning the editable surface, the site supports a broader range of public-facing communication without sacrificing flexibility.',
    ],
    values: [
      {
        title: 'Editorial polish',
        description: 'Large reading moments, premium spacing, and multiple card styles create a stronger first impression.',
      },
      {
        title: 'Connected discovery',
        description: 'Stories, visuals, documents, profiles, and listings remain easy to move between through a unified design system.',
      },
      {
        title: 'Practical clarity',
        description: 'Search, category filters, related posts, and comments stay visible without overwhelming the page.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'A communications page that feels as intentional as the rest of the site.',
    description: 'Share publishing questions, distribution goals, correction requests, or partnership ideas through a page that feels structured, calm, and premium.',
    formTitle: 'Send a message',
  },
  search: {
    metadata: {
      title: 'Search',
      description: 'Search posts, topics, categories, and content across the site.',
    },
    hero: {
      badge: 'Search the archive',
      title: 'Find releases, stories, visuals, and supporting resources faster.',
      description: 'Use keywords, categories, and content types to move through every active section from one premium search page.',
      placeholder: 'Search by keyword, topic, category, or title',
    },
    resultsTitle: 'Latest searchable content',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the site.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to open the publishing workspace.',
      description: 'Use your account to prepare new posts for the active sections of this site and save draft-ready details locally.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Create content for every active section.',
      description: 'Switch between live task types, prepare a summary, add links and images, and shape a polished post draft without leaving the editorial workspace.',
    },
    formTitle: 'Content details',
    submitLabel: 'Submit content',
    successTitle: 'Content submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Welcome back to your publishing space.',
      description: 'Login to continue browsing, managing submissions, and creating new content from your account.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Site access',
      title: 'Create your account and start publishing.',
      description: 'Create an account to access the publishing workspace, save details, and submit content through the site.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested articles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
