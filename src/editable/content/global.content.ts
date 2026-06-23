import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Media distribution with premium editorial clarity',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Luxury editorial distribution for modern media teams',
    primaryLinks: [
      { label: 'Distribution', href: '/media-distribution' },
      { label: 'Newsroom', href: '/article' },
      { label: 'Archive', href: '/search' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Get started', href: '/signup' },
      secondary: { label: 'Request access', href: '/contact' },
    },
  },
  footer: {
    tagline: 'Editorial tools, distribution rhythm, and discovery built into one publishing surface.',
    description: 'Amplify your brand’s reach with our trusted media distribution platform. Share news, press releases, and business updates across a growing network of publishers, helping your content connect with the right audience.',
    columns: [
      {
        title: '',
        links: [
          { label: '', href: '/media-distribution' },
          { label: '', href: '/article' },
          { label: '', href: '/image' },
          { label: '', href: '/pdf' },
        ],
      },
      {
        title: 'Explore',
        links: [
          { label: 'Search', href: '/search' },
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'A premium editorial environment for timely media distribution.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
