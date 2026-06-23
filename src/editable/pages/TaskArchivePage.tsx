import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowRight, Bookmark, BriefcaseBusiness, Building2, Camera, Download, FileText, Filter, Image as ImageIcon, MapPin, Megaphone, Search, Newspaper, UserRound } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { getVisualPreset, visualSystem } from '@/editable/theme/visual-system'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage } from '@/editable/cards/PostCards'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const summaryOf = (post: SitePost) => getEditableExcerpt(post, 160)
const categoryOf = (post: SitePost, fallback: string) => getEditableCategory(post) || fallback

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

const taskDeck: Record<TaskKey, { icon: typeof FileText; archiveClass: string; promise: string; badge: string }> = {
  mediaDistribution: { icon: Newspaper, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3', promise: 'Distribution-led cards balance immediacy, credibility, and polished summaries.', badge: 'News' },
  article: { icon: FileText, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3', promise: 'Long-form stories keep spacious headlines, visual hierarchy, and editorial pacing.', badge: 'Read' },
  listing: { icon: Building2, archiveClass: 'grid gap-5 xl:grid-cols-2', promise: 'Directory modules emphasize trust cues, place, and business context.', badge: 'Business' },
  classified: { icon: Megaphone, archiveClass: 'grid gap-5 xl:grid-cols-2', promise: 'Offer-led layouts stay direct, fast, and action ready.', badge: 'Offer' },
  image: { icon: Camera, archiveClass: 'columns-1 gap-5 space-y-5 md:columns-2 xl:columns-3', promise: 'Image-first browsing gives visuals room to carry the page.', badge: 'Gallery' },
  sbm: { icon: Bookmark, archiveClass: 'grid gap-4 md:grid-cols-2 xl:grid-cols-3', promise: 'Saved resources scan like curated editorial collections.', badge: 'Bookmark' },
  pdf: { icon: Download, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3', promise: 'Document cards feel like a clean premium library.', badge: 'PDF' },
  profile: { icon: UserRound, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-4', promise: 'Profile cards foreground identity, expertise, and discovery.', badge: 'Profile' },
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return <TaskArchiveView task={task} posts={posts} pagination={pagination} category={category} basePath={basePath || taskConfig?.route || `/${task}`} />
}

export function TaskArchiveView({ task, posts, pagination, category, basePath }: { task: TaskKey; posts: SitePost[]; pagination: SiteFeedPagination; category: string; basePath: string }) {
  const taskConfig = getTaskConfig(task)
  const voice = taskPageVoices[task]
  const preset = getVisualPreset(visualSystem.recommendedPreset as any)
  const page = pagination.page || 1
  const label = taskConfig?.label || task
  const deck = taskDeck[task]
  const Icon = deck.icon
  const archiveVars = {
    '--archive-bg': preset.colors.background,
    '--archive-text': preset.colors.foreground,
    '--archive-surface': preset.colors.surface,
    '--archive-accent': preset.colors.accent,
  } as CSSProperties

  const dynamicCategories = Array.from(new Map([
    ...CATEGORY_OPTIONS,
    ...posts.map((post) => {
      const raw = categoryOf(post, '')
      return raw ? { name: raw, slug: normalizeCategory(raw) } : null
    }).filter((item): item is { name: string; slug: string } => Boolean(item)),
  ].map((item) => [item.slug, item])).values())

  const categoryLabel = category === 'all' ? 'All categories' : dynamicCategories.find((item) => item.slug === category)?.name || category

  if (task === 'mediaDistribution' || task === 'article') {
    return (
      <EditorialArchive
        posts={posts}
        pagination={pagination}
        category={category}
        categoryLabel={categoryLabel}
        categories={dynamicCategories}
        basePath={basePath}
        label={label}
        voice={voice}
      />
    )
  }

  return (
    <EditableSiteShell>
      <main style={archiveVars} className="min-h-screen bg-[var(--archive-bg)] text-[var(--archive-text)]">
        <section className="editorial-shell pt-8 sm:pt-10 lg:pt-12">
          <div className="mx-auto max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 rounded-[3rem] bg-[#e9e5d8] p-6 sm:p-8 lg:grid-cols-[1.05fr_.95fr] lg:p-10">
              <div className="self-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--slot4-line)] bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-[var(--archive-accent)]">
                  <Icon className="h-4 w-4" /> {deck.badge}
                </div>
                <h1 className="editorial-serif mt-5 max-w-4xl text-5xl font-semibold leading-[0.94] tracking-[-0.06em] sm:text-6xl lg:text-[5.1rem]">
                  {voice.headline}
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--archive-text)]/75">{voice.description}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={basePath} className="inline-flex rounded-full bg-[#c03679] px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[var(--archive-accent)]">Browse all</Link>
                  <Link href="/search" className="inline-flex rounded-full border border-[color:var(--slot4-line)] px-6 py-3 text-sm font-black transition hover:bg-[var(--archive-text)] hover:text-[var(--archive-bg)]">Search posts</Link>
                </div>
              </div>

              <div className="rounded-[2.4rem] border border-[color:var(--slot4-card-line)] bg-white/72 p-5 shadow-sm backdrop-blur">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[var(--archive-accent)]"><Filter className="h-4 w-4" /> Filter</div>
                <p className="mt-4 text-lg leading-8 text-[var(--archive-text)]/75">{deck.promise}</p>
                <form action={basePath} className="mt-5 grid gap-3">
                  <select name="category" defaultValue={category} className="h-12 w-full rounded-[1.2rem] border border-[color:var(--slot4-card-line)] bg-white px-4 text-sm font-bold outline-none">
                    <option value="all">All categories</option>
                    {dynamicCategories.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
                  </select>
                  <button className="h-12 rounded-full bg-[var(--archive-text)] text-sm font-black text-[var(--archive-bg)]">Apply</button>
                  <p className="text-xs font-bold text-[var(--archive-text)]/55">Showing: {categoryLabel}</p>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[var(--editable-container)] px-4 pb-16 pt-12 sm:px-6 lg:px-8">
          {posts.length ? (
            <div className={deck.archiveClass}>
              {posts.map((post, index) => <ArchivePostCard key={post.id || post.slug || `${task}-${index}`} post={post} task={task} basePath={basePath} index={index} />)}
            </div>
          ) : (
            <div className="rounded-[2.2rem] border border-dashed border-[color:var(--slot4-line)] bg-white/70 p-10 text-center">
              <Search className="mx-auto h-8 w-8 opacity-45" />
              <h2 className="editorial-serif mt-4 text-3xl font-semibold tracking-[-0.05em]">No posts found</h2>
              <p className="mt-2 text-sm text-[var(--archive-text)]/65">Try another category or refresh after publishing new content.</p>
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {pagination.hasPrevPage ? <Link href={pageHref(basePath, category, page - 1)} className="rounded-full border border-[color:var(--slot4-line)] bg-white px-5 py-3 text-sm font-black">Previous</Link> : null}
            <span className="rounded-full bg-[var(--archive-text)] px-5 py-3 text-sm font-black text-[var(--archive-bg)]">Page {page} of {pagination.totalPages || 1}</span>
            {pagination.hasNextPage ? <Link href={pageHref(basePath, category, page + 1)} className="rounded-full border border-[color:var(--slot4-line)] bg-white px-5 py-3 text-sm font-black">Next</Link> : null}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function EditorialArchive({
  posts,
  pagination,
  category,
  categoryLabel,
  categories,
  basePath,
  label,
  voice,
}: {
  posts: SitePost[]
  pagination: SiteFeedPagination
  category: string
  categoryLabel: string
  categories: { name: string; slug: string }[]
  basePath: string
  label: string
  voice: typeof taskPageVoices.article
}) {
  const page = pagination.page || 1
  const lead = posts[0]
  const featured = posts.slice(1, 4)
  const remaining = posts.slice(4)

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="editorial-shell pt-8 sm:pt-10">
          <div className="mx-auto max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8">
            <div className="rounded-[3rem] bg-[#e9e5d8] px-6 py-8 sm:px-8 lg:px-12 lg:py-10">
              <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
                <div>
                  <p className="editorial-kicker text-[11px] font-black text-[var(--slot4-accent-fill)]">{voice.eyebrow}</p>
                  <h1 className="editorial-serif mt-5 max-w-5xl text-5xl font-semibold leading-[0.94] tracking-[-0.06em] text-[var(--slot4-highlight-strong)] sm:text-6xl lg:text-[5.3rem]">
                    {category === 'all' ? voice.headline : `${label}: ${categoryLabel}`}
                  </h1>
                  <p className="mt-6 max-w-2xl text-lg leading-9 text-[var(--slot4-highlight-strong)]/82">{voice.description}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href={basePath} className="inline-flex rounded-full bg-[#c03679] px-6 py-3 text-sm font-black text-white transition hover:bg-[var(--slot4-accent-fill)]">Browse latest</Link>
                    <Link href="/contact" className="inline-flex rounded-full border border-[color:var(--slot4-line)] px-6 py-3 text-sm font-black transition hover:bg-[var(--slot4-highlight-strong)] hover:text-white">Request access</Link>
                  </div>
                </div>

                <div className="rounded-[2.4rem] bg-white/72 p-6 shadow-sm">
                  <div className="flex flex-wrap gap-2">
                    {voice.chips.map((chip) => (
                      <span key={chip} className="rounded-full border border-[color:var(--slot4-line)] px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[var(--slot4-highlight-strong)]">
                        {chip}
                      </span>
                    ))}
                  </div>
                  <form action={basePath} className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <select name="category" defaultValue={category || 'all'} className="min-w-0 flex-1 rounded-full border border-[color:var(--slot4-card-line)] bg-white px-5 py-3 text-sm font-bold outline-none">
                      <option value="all">All categories</option>
                      {categories.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
                    </select>
                    <button className="rounded-full bg-[var(--slot4-highlight-strong)] px-6 py-3 text-sm font-black text-white">Filter</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[var(--editable-container)] px-4 pb-16 pt-12 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              {lead ? (
                <Link href={`${basePath}/${lead.slug}`} className="group block overflow-hidden rounded-[2.8rem] bg-[var(--slot4-dark-bg)] text-white shadow-[0_32px_90px_rgba(22,55,58,0.16)]">
                  <div className="relative min-h-[420px] overflow-hidden">
                    <img src={getEditablePostImage(lead)} alt={lead.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,55,58,0.08),rgba(22,55,58,0.92))]" />
                    <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                      <span className="rounded-full bg-[#c03679] px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em]">{categoryOf(lead, label)}</span>
                      <h2 className="editorial-serif mt-5 max-w-4xl text-4xl font-semibold leading-[0.97] tracking-[-0.05em] sm:text-6xl">{lead.title}</h2>
                      <p className="mt-5 max-w-2xl text-sm leading-7 text-white/78">{summaryOf(lead)}</p>
                    </div>
                  </div>
                </Link>
              ) : null}
            </div>

            <div className="rounded-[2.5rem] border border-[color:var(--slot4-card-line)] bg-[var(--slot4-surface-bg)] p-6">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="editorial-kicker text-[11px] font-black text-[var(--slot4-accent-fill)]">Trending now</p>
                  <h2 className="editorial-serif mt-2 text-3xl font-semibold tracking-[-0.04em] text-[var(--slot4-highlight-strong)]">Latest coverage</h2>
                </div>
                <Link href={basePath} className="text-xs font-black uppercase tracking-[0.16em] text-[var(--slot4-accent-fill)]">View all</Link>
              </div>
              <div className="mt-4">
                {featured.map((post, index) => (
                  <Link key={post.id || post.slug || `${post.title}-${index}`} href={`${basePath}/${post.slug}`} className={`group block py-5 ${index ? 'border-t border-[color:var(--slot4-card-line)]' : ''}`}>
                    <div className="grid gap-4 sm:grid-cols-[132px_1fr]">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem] bg-[var(--slot4-media-bg)]">
                        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-accent-fill)]">{String(index + 1).padStart(2, '0')}</p>
                        <h3 className="editorial-serif mt-2 text-2xl font-semibold leading-[1.04] tracking-[-0.04em] text-[var(--slot4-highlight-strong)] group-hover:text-[var(--slot4-accent-fill)]">{post.title}</h3>
                        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{summaryOf(post)}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="editorial-kicker text-[11px] font-black text-[var(--slot4-accent-fill)]">More to discover</p>
                <h2 className="editorial-serif mt-3 text-4xl font-semibold tracking-[-0.05em] text-[var(--slot4-highlight-strong)] sm:text-5xl">
                  Additional stories from the desk
                </h2>
              </div>
            </div>

            {remaining.length ? (
              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {remaining.map((post, index) => (
                  <Link key={post.id || post.slug || `${post.title}-${index}`} href={`${basePath}/${post.slug}`} className="group rounded-[2rem] border border-[color:var(--slot4-card-line)] bg-[var(--slot4-surface-bg)] p-4 shadow-[0_18px_45px_rgba(98,43,20,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(22,55,58,0.12)]">
                    <div className="relative aspect-[16/11] overflow-hidden rounded-[1.6rem] bg-[var(--slot4-media-bg)]">
                      <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    </div>
                    <div className="pt-4">
                      <div className="flex items-center justify-between gap-4 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-accent-fill)]">
                        <span>{categoryOf(post, label)}</span><span>{String(index + 4).padStart(2, '0')}</span>
                      </div>
                      <h3 className="editorial-serif mt-3 text-2xl font-semibold leading-[1.04] tracking-[-0.04em] text-[var(--slot4-highlight-strong)] group-hover:text-[var(--slot4-accent-fill)]">{post.title}</h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{summaryOf(post)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : !lead ? (
              <div className="mt-8 rounded-[2.2rem] border border-dashed border-[color:var(--slot4-line)] bg-white/70 p-10 text-center">
                <Search className="mx-auto h-8 w-8" />
                <h2 className="editorial-serif mt-4 text-3xl font-semibold">No stories found</h2>
                <p className="mt-2 text-sm text-[var(--slot4-muted-text)]">Try another category or publish a new story.</p>
              </div>
            ) : null}

            <div className="mt-10 flex items-center justify-center gap-3">
              {pagination.hasPrevPage ? <Link href={pageHref(basePath, category, page - 1)} className="rounded-full border border-[color:var(--slot4-line)] bg-white px-5 py-3 text-xs font-black uppercase">Previous</Link> : null}
              <span className="rounded-full bg-[var(--slot4-highlight-strong)] px-5 py-3 text-xs font-black uppercase text-white">Page {page} / {pagination.totalPages || 1}</span>
              {pagination.hasNextPage ? <Link href={pageHref(basePath, category, page + 1)} className="rounded-full border border-[color:var(--slot4-line)] bg-white px-5 py-3 text-xs font-black uppercase">Next</Link> : null}
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function ArchivePostCard({ post, task, basePath, index }: { post: SitePost; task: TaskKey; basePath: string; index: number }) {
  const href = `${basePath}/${post.slug}`
  if (task === 'listing') return <ListingArchiveCard post={post} href={href} />
  if (task === 'classified') return <ClassifiedArchiveCard post={post} href={href} />
  if (task === 'image') return <ImageArchiveCard post={post} href={href} index={index} />
  if (task === 'sbm') return <BookmarkArchiveCard post={post} href={href} index={index} />
  if (task === 'pdf') return <PdfArchiveCard post={post} href={href} />
  if (task === 'profile') return <ProfileArchiveCard post={post} href={href} />
  return <ArticleArchiveCard post={post} href={href} index={index} />
}

function ArticleArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group overflow-hidden rounded-[2rem] border border-[color:var(--slot4-card-line)] bg-white shadow-[0_18px_45px_rgba(98,43,20,0.04)] transition hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(22,55,58,0.12)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--slot4-highlight-strong)]">{getEditableCategory(post)}</span>
      </div>
      <div className="p-5">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--slot4-accent-fill)]">Story {String(index + 1).padStart(2, '0')}</p>
        <h2 className="editorial-serif mt-3 text-2xl font-semibold leading-[1.04] tracking-[-0.04em] text-[var(--slot4-highlight-strong)]">{post.title}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{summaryOf(post)}</p>
      </div>
    </Link>
  )
}

function ListingArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const location = asText(getContent(post).location) || asText(getContent(post).address) || asText(getContent(post).city)
  const phone = asText(getContent(post).phone) || asText(getContent(post).telephone)
  const website = asText(getContent(post).website) || asText(getContent(post).url)
  return (
    <Link href={href} className="group grid gap-5 rounded-[2rem] border border-[color:var(--slot4-card-line)] bg-white p-5 shadow-[0_18px_45px_rgba(98,43,20,0.04)] transition hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(22,55,58,0.12)] sm:grid-cols-[120px_1fr]">
      <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-[1.6rem] bg-[var(--slot4-panel-bg)] text-[var(--slot4-highlight-strong)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover" />
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-[var(--slot4-highlight-strong)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white">Directory</span>
          {location ? <span className="inline-flex items-center gap-1 rounded-full border border-[color:var(--slot4-line)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--slot4-highlight-strong)]"><MapPin className="h-3 w-3" /> {location}</span> : null}
        </div>
        <h2 className="editorial-serif mt-4 text-3xl font-semibold leading-[1.02] tracking-[-0.04em] text-[var(--slot4-highlight-strong)]">{post.title}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{summaryOf(post)}</p>
        <div className="mt-4 grid gap-2 text-xs font-bold text-[var(--slot4-soft-muted-text)] sm:grid-cols-2">
          {phone ? <span>Phone: {phone}</span> : null}
          {website ? <span>Website available</span> : null}
        </div>
      </div>
    </Link>
  )
}

function ClassifiedArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const price = asText(getContent(post).price) || asText(getContent(post).amount) || asText(getContent(post).budget)
  const location = asText(getContent(post).location) || asText(getContent(post).address) || asText(getContent(post).city)
  const condition = asText(getContent(post).condition) || asText(getContent(post).type)
  return (
    <Link href={href} className="group overflow-hidden rounded-[2rem] border border-[color:var(--slot4-card-line)] bg-white shadow-[0_18px_45px_rgba(98,43,20,0.04)] transition hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(22,55,58,0.12)]">
      <div className="grid min-h-64 sm:grid-cols-[0.72fr_1fr]">
        <div className="relative bg-[var(--slot4-dark-bg)] p-5 text-[var(--slot4-dark-text)]">
          <span className="rounded-full bg-white/12 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">Classified</span>
          <h2 className="mt-10 text-3xl font-black leading-[1] tracking-[-0.07em]">{price || 'Open offer'}</h2>
          <p className="mt-4 text-sm font-bold text-white/75">{location || condition || 'Details inside'}</p>
        </div>
        <div className="p-6">
          <h2 className="editorial-serif text-3xl font-semibold leading-[1.02] tracking-[-0.04em] text-[var(--slot4-highlight-strong)]">{post.title}</h2>
          <p className="mt-4 line-clamp-4 text-sm leading-7 text-[var(--slot4-muted-text)]">{summaryOf(post)}</p>
          <p className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--slot4-accent-fill)]">View listing <ArrowRight className="h-4 w-4" /></p>
        </div>
      </div>
    </Link>
  )
}

function ImageArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const image = getEditablePostImage(post)
  return (
    <Link href={href} className="group mb-5 block break-inside-avoid overflow-hidden rounded-[2rem] border border-[color:var(--slot4-card-line)] bg-white shadow-[0_18px_45px_rgba(98,43,20,0.04)] transition hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(22,55,58,0.12)]">
      <div className={index % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}>
        <img src={image} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-panel-bg)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--slot4-highlight-strong)]"><ImageIcon className="h-3 w-3" /> Visual</div>
        <h2 className="editorial-serif mt-4 line-clamp-3 text-2xl font-semibold leading-[1.04] tracking-[-0.04em] text-[var(--slot4-highlight-strong)]">{post.title}</h2>
      </div>
    </Link>
  )
}

function BookmarkArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const website = asText(getContent(post).website) || asText(getContent(post).url) || asText(getContent(post).link)
  return (
    <Link href={href} className="group block rounded-[1.8rem] border border-[color:var(--slot4-card-line)] bg-white p-6 shadow-[0_18px_45px_rgba(98,43,20,0.04)] transition hover:-translate-y-1 hover:bg-[var(--slot4-highlight-strong)] hover:text-white">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full border border-current/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">Save {String(index + 1).padStart(2, '0')}</span>
        <Bookmark className="h-5 w-5" />
      </div>
      <h2 className="editorial-serif mt-8 text-3xl font-semibold leading-[1.02] tracking-[-0.04em]">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-7 opacity-75">{summaryOf(post)}</p>
      {website ? <p className="mt-5 truncate text-xs font-black uppercase tracking-[0.16em] opacity-60">{website.replace(/^https?:\/\//, '')}</p> : null}
    </Link>
  )
}

function PdfArchiveCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group rounded-[2rem] border border-[color:var(--slot4-card-line)] bg-white p-6 shadow-[0_18px_45px_rgba(98,43,20,0.04)] transition hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(22,55,58,0.12)]">
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-[1.4rem] bg-[var(--slot4-highlight-strong)] p-5 text-white"><FileText className="h-8 w-8" /></div>
        <span className="rounded-full bg-[var(--slot4-panel-bg)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-highlight-strong)]">{getEditableCategory(post)}</span>
      </div>
      <h2 className="editorial-serif mt-8 text-3xl font-semibold leading-[1.02] tracking-[-0.04em] text-[var(--slot4-highlight-strong)]">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-7 text-[var(--slot4-muted-text)]">{summaryOf(post)}</p>
      <p className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--slot4-accent-fill)]">Open document <Download className="h-4 w-4" /></p>
    </Link>
  )
}

function ProfileArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const role = asText(getContent(post).role) || asText(getContent(post).designation) || asText(getContent(post).company) || asText(getContent(post).location)
  return (
    <Link href={href} className="group rounded-[2rem] border border-[color:var(--slot4-card-line)] bg-white p-6 text-center shadow-[0_18px_45px_rgba(98,43,20,0.04)] transition hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(22,55,58,0.12)]">
      <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-[var(--slot4-panel-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover" />
      </div>
      <h2 className="editorial-serif mt-5 text-2xl font-semibold leading-[1.02] tracking-[-0.04em] text-[var(--slot4-highlight-strong)]">{post.title}</h2>
      {role ? <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--slot4-accent-fill)]">{role}</p> : null}
      <p className="mt-4 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{summaryOf(post)}</p>
    </Link>
  )
}
