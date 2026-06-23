import Link from 'next/link'
import { ArrowRight, Clock3 } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((value): value is string => typeof value === 'string' && Boolean(value))
  const directImage = ['featuredImage', 'image', 'thumbnail', 'coverImage', 'logo', 'avatar']
    .map((key) => content[key])
    .find((value): value is string => typeof value === 'string' && Boolean(value))
  return mediaUrl || directImage || contentImage || '/placeholder.svg?height=900&width=1400'
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    (typeof content.body === 'string' && content.body) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean || 'Fresh coverage and structured updates are available inside this story.'
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Latest'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

export function EditorialFeatureCard({ post, href, label = 'Featured' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className="group block overflow-hidden rounded-[2.5rem] bg-[var(--slot4-dark-bg)] text-white shadow-[0_32px_90px_rgba(22,55,58,0.18)]">
      <div className="relative aspect-[16/11] min-h-[340px] overflow-hidden">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,55,58,0.08),rgba(22,55,58,0.9))]" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
          <span className="inline-flex rounded-full bg-[#c03679] px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white">{label}</span>
          <h3 className="editorial-serif mt-5 max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.05em] sm:text-5xl">{post.title}</h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/78">{getEditableExcerpt(post, 190)}</p>
        </div>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group block rounded-[2rem] border border-[color:var(--slot4-card-line)] bg-[var(--slot4-surface-bg)] p-4 shadow-[0_20px_45px_rgba(98,43,20,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(22,55,58,0.12)]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.6rem] bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="pt-4">
        <div className="flex items-center justify-between gap-3 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-accent-fill)]">
          <span>{getEditableCategory(post)}</span>
          <span>{String(index + 1).padStart(2, '0')}</span>
        </div>
        <h3 className="editorial-serif mt-3 line-clamp-3 text-2xl font-semibold leading-[1.02] tracking-[-0.04em] text-[var(--slot4-highlight-strong)]">
          {post.title}
        </h3>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid min-w-0 grid-cols-[52px_1fr] gap-4 border-t border-[color:var(--slot4-card-line)] py-5 first:border-t-0">
      <span className="editorial-serif text-3xl font-semibold leading-none text-[var(--slot4-accent-fill)]">{String(index + 1).padStart(2, '0')}</span>
      <div className="min-w-0">
        <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-soft-muted-text)]">
          <Clock3 className="h-3 w-3" /> {getEditableCategory(post)}
        </p>
        <h3 className="mt-2 line-clamp-3 text-lg font-black leading-tight tracking-[-0.03em] text-[var(--slot4-highlight-strong)] group-hover:text-[var(--slot4-accent-fill)]">
          {post.title}
        </h3>
      </div>
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid gap-5 rounded-[2rem] border border-[color:var(--slot4-card-line)] bg-[var(--slot4-surface-bg)] p-5 shadow-[0_18px_45px_rgba(98,43,20,0.04)] sm:grid-cols-[260px_minmax(0,1fr)]">
      <div className="relative aspect-[16/11] overflow-hidden rounded-[1.7rem] bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="min-w-0 py-1">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-accent-fill)]">
          {String(index + 1).padStart(2, '0')} / {getEditableCategory(post)}
        </p>
        <h2 className="editorial-serif mt-3 line-clamp-3 text-3xl font-semibold leading-[1.02] tracking-[-0.05em] text-[var(--slot4-highlight-strong)] group-hover:text-[var(--slot4-accent-fill)]">
          {post.title}
        </h2>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 190)}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-[var(--slot4-highlight-strong)]">
          Read story <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}
