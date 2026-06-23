import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Filter, Search } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditableExcerpt } from '@/editable/cards/PostCards'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compactText = (value: unknown) => typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase() : ''
const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const summaryOf = (post: SitePost) => getEditableExcerpt(post, 140)

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (task && derivedTask !== task) return false
  const categoryText = compactText(typeof content.category === 'string' ? content.category : '')
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

function SearchResultCard({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const href = task ? buildPostUrl(task, post.slug) : `/article/${post.slug}`
  const summary = summaryOf(post)
  const taskLabel = SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Post'
  const strong = index % 5 === 0

  return (
    <Link href={href} className={`group block overflow-hidden rounded-[2rem] bg-white shadow-[0_18px_45px_rgba(98,43,20,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(22,55,58,0.12)] ${strong ? 'md:col-span-2' : ''}`}>
      <div className="p-5 sm:p-6">
        <span className="inline-flex rounded-full bg-[#c03679] px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white">{taskLabel}</span>
        <h2 className="editorial-serif mt-4 line-clamp-3 text-2xl font-semibold leading-[1.03] tracking-[-0.04em] text-[var(--slot4-highlight-strong)]">{post.title}</h2>
        {summary ? <p className="mt-4 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{summary}</p> : null}
        <span className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--slot4-accent-fill)]">
          Open result <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length ? feed.posts : useMaster ? [] : SITE_CONFIG.tasks.filter((item) => item.enabled).flatMap((item) => getMockPostsForTask(item.key))
  const results = posts.filter((post) => matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => item.enabled)

  return (
    <EditableSiteShell>
      <main className="editorial-shell min-h-screen bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-6 rounded-[3rem] bg-[#e9e5d8] p-6 sm:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:p-10">
            <div className="rounded-[2.5rem] bg-[var(--slot4-dark-bg)] p-7 text-white sm:p-10">
              <p className="editorial-kicker text-[11px] font-black text-[var(--slot4-accent-soft)]">{pagesContent.search.hero.badge}</p>
              <h1 className="editorial-serif mt-5 text-5xl font-semibold leading-[0.94] tracking-[-0.06em] sm:text-6xl">{pagesContent.search.hero.title}</h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/76">{pagesContent.search.hero.description}</p>
            </div>
            <form action="/search" className="self-center rounded-[2.4rem] bg-white p-6 shadow-sm sm:p-8">
              <input type="hidden" name="master" value="1" />
              <label className="flex items-center gap-3 rounded-full border border-[color:var(--slot4-card-line)] bg-[var(--slot4-surface-bg)] px-4 py-3">
                <Search className="h-5 w-5 text-[var(--slot4-soft-muted-text)]" />
                <input name="q" defaultValue={query} placeholder={pagesContent.search.hero.placeholder} className="min-w-0 flex-1 bg-transparent text-base font-semibold outline-none placeholder:text-[var(--slot4-soft-muted-text)]" />
              </label>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className="flex items-center gap-2 rounded-full border border-[color:var(--slot4-card-line)] bg-[var(--slot4-surface-bg)] px-4 py-3">
                  <Filter className="h-4 w-4 text-[var(--slot4-soft-muted-text)]" />
                  <input name="category" defaultValue={category} placeholder="Category" className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:text-[var(--slot4-soft-muted-text)]" />
                </label>
                <select name="task" defaultValue={task} className="rounded-full border border-[color:var(--slot4-card-line)] bg-[var(--slot4-surface-bg)] px-4 py-3 text-sm font-black outline-none">
                  <option value="">All content types</option>
                  {enabledTasks.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
                </select>
              </div>
              <button className="mt-3 inline-flex h-12 w-full items-center justify-center rounded-full bg-[#c03679] px-6 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5 hover:bg-[var(--slot4-accent-fill)]" type="submit">Search</button>
            </form>
          </div>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="editorial-kicker text-[11px] font-black text-[var(--slot4-accent-fill)]">{results.length} results</p>
              <h2 className="editorial-serif mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--slot4-highlight-strong)]">{query ? `Results for "${query}"` : pagesContent.search.resultsTitle}</h2>
            </div>
           </div>

          {results.length ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {results.map((post, index) => <SearchResultCard key={post.id || post.slug || `${post.title}-${index}`} post={post} index={index} />)}
            </div>
          ) : (
            <div className="mt-8 rounded-[2.2rem] border border-dashed border-[color:var(--slot4-line)] bg-white p-10 text-center">
              <p className="editorial-serif text-3xl font-semibold tracking-[-0.04em]">No matching posts found.</p>
              <p className="mt-3 text-sm text-[var(--slot4-muted-text)]">Try a different keyword, task type, or category.</p>
            </div>
          )}
        </section>
      </main>
    </EditableSiteShell>
  )
}
