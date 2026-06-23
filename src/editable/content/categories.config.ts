export type EditableCategory = { name: string; slug: string }

export const mediaDistributionCategories = {
  allowAnyCategoryFromMasterPanel: true,
  defaults: [
    { name: 'News Media', slug: 'news-media' },
    { name: 'Business', slug: 'business' },
    { name: 'Technology', slug: 'technology' },
    { name: 'Finance', slug: 'finance' },
    { name: 'Health', slug: 'health' },
    { name: 'Entertainment', slug: 'entertainment' },
    { name: 'Lifestyle', slug: 'lifestyle' },
    { name: 'Sports', slug: 'sports' },
    { name: 'Education', slug: 'education' },
    { name: 'Travel', slug: 'travel' },
    { name: 'Real Estate', slug: 'real-estate' },
    { name: 'Automotive', slug: 'automotive' },
    { name: 'Public Relations', slug: 'public-relations' },
    { name: 'Press Release', slug: 'press-release' },
    { name: 'Media Strategy', slug: 'media-strategy' },
    { name: 'Distribution Insights', slug: 'distribution-insights' },
  ] satisfies EditableCategory[],
} as const
