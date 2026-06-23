import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { CompactIndexCard, getEditableCategory, getEditableExcerpt, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function statValue(posts: SitePost[], timeSections: HomeTimeSection[]) {
  const total = posts.length + timeSections.reduce((sum, section) => sum + section.posts.length, 0)
  if (total > 48) return '48+'
  if (total > 24) return '24+'
  return `${Math.max(total, 8)}+`
}

function TextOnlyPostCard({
  post,
  href,
  index,
  dark = false,
}: {
  post: SitePost
  href: string
  index?: number
  dark?: boolean
}) {
  return (
    <Link
      href={href}
      className={`group block rounded-[2rem] p-5 shadow-[0_18px_45px_rgba(98,43,20,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(22,55,58,0.12)] ${
        dark ? 'bg-[var(--slot4-dark-bg)] text-white' : 'border border-[color:var(--slot4-card-line)] bg-white text-[var(--slot4-highlight-strong)]'
      }`}
    >
      <div className={`flex items-center justify-between gap-3 text-[10px] font-black uppercase tracking-[0.18em] ${dark ? 'text-[#e4d6a9]' : 'text-[var(--slot4-accent-fill)]'}`}>
        <span>{getEditableCategory(post)}</span>
        {typeof index === 'number' ? <span>{String(index + 1).padStart(2, '0')}</span> : null}
      </div>
      <h3 className="editorial-serif mt-3 text-2xl font-semibold leading-[1.02] tracking-[-0.04em]">{post.title}</h3>
      <p className={`mt-3 line-clamp-3 text-sm leading-7 ${dark ? 'text-white/76' : 'text-[var(--slot4-muted-text)]'}`}>
        {getEditableExcerpt(post, 160)}
      </p>
    </Link>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const lead = posts[0]
  const side = posts.slice(1, 3)
  const spotlight = posts.slice(3, 7)
  const heroTitle = pagesContent.home.hero.title.join(' ')

  return (
    <section className="editorial-shell overflow-hidden pt-6 sm:pt-8">
      <div className={dc.shell.section}>
        <div className="rounded-[3rem] bg-[#e9e5d8] px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="order-2 lg:order-1">
              <p className="editorial-kicker mt-14 text-[11px] font-black text-[var(--slot4-accent-fill)]">
                {pagesContent.home.hero.badge}
              </p>
              <h1 className="editorial-serif mt-5 max-w-3xl text-5xl font-semibold leading-[0.94] tracking-[-0.06em] text-[var(--slot4-highlight-strong)] sm:text-6xl lg:text-[5.3rem]">
                {heroTitle}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-9 text-[var(--slot4-highlight-strong)]/85">
                {pagesContent.home.hero.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href={'/search'} className={dc.button.accent}>{pagesContent.home.hero.primaryCta.label}</Link>
                <Link href="/contact" className="inline-flex rounded-full bg-[#c03679] px-7 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--slot4-accent-fill)]">
                  Request a demo
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative overflow-hidden rounded-[3.3rem] rounded-br-[5rem] bg-[var(--slot4-dark-bg)] p-[1px]">
                {lead ? (
                  <Link href={postHref(primaryTask, lead, primaryRoute)} className="group block min-h-[300px] rounded-[3.2rem] rounded-br-[4.8rem] bg-[var(--slot4-dark-bg)] p-8 text-white sm:min-h-[420px] sm:p-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#e4d6a9]">{getEditableCategory(lead)}</p>
                    <h2 className="editorial-serif mt-6 max-w-2xl text-3xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-5xl">{lead.title}</h2>
                    <p className="mt-5 max-w-2xl text-base leading-8 text-white/76">{getEditableExcerpt(lead, 220)}</p>
                    <span className="mt-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-[#e4d6a9]">
                      Read update <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                ) : (
                  <div className="flex min-h-[300px] items-center justify-center rounded-[3.2rem] rounded-br-[4.8rem] bg-[var(--slot4-dark-bg)] p-8 text-white sm:min-h-[420px]">
                    <p className="text-sm text-white/75">Fresh coverage appears here automatically.</p>
                  </div>
                )}
                <span className="absolute -bottom-8 left-[-1px] h-24 w-px bg-[var(--slot4-highlight-strong)]/60" />
                <span className="absolute right-[-1px] top-[-2.5rem] h-40 w-px bg-[var(--slot4-highlight-strong)]/60" />
                <span className="absolute -left-10 bottom-0 h-px w-24 bg-[var(--slot4-highlight-strong)]/60" />
                <span className="absolute right-0 top-14 h-px w-20 bg-[var(--slot4-highlight-strong)]/60 sm:w-28" />
              </div>
            </div>
          </div>
        </div>

        {!!side.length && (
          <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
            <div className="rounded-[3rem] bg-white px-6 py-10 shadow-[0_28px_70px_rgba(98,43,20,0.05)] sm:px-10">
              <div className="mx-auto max-w-4xl text-center">
                <div className="mx-auto flex max-w-[720px] items-center gap-6 text-[var(--slot4-accent-fill)]">
                  <span className="h-px flex-1 bg-current/60" />
                  <span className="text-5xl">"</span>
                  <span className="h-px flex-1 bg-current/60" />
                </div>
                <p className="mt-8 text-2xl italic leading-[1.45] text-[var(--slot4-highlight-strong)]/82 sm:text-[2rem]">
                  {getEditableExcerpt(side[0], 220)}
                </p>
                <p className="mt-8 text-lg font-black text-[var(--slot4-highlight-strong)]">
                  {side[0]?.title}
                </p>
                <p className="mt-2 text-base text-[var(--slot4-muted-text)]">
                  {getEditableCategory(side[0])}
                </p>
              </div>
            </div>

            <div className="rounded-[2.4rem] border border-[color:var(--slot4-card-line)] bg-[var(--slot4-surface-bg)] p-6">
              <p className="editorial-kicker text-[11px] font-black text-[var(--slot4-accent-fill)]">Quick briefing</p>
              <div className="mt-4">
                {spotlight.map((post, index) => (
                  <CompactIndexCard key={post.id || post.slug || `${post.title}-${index}`} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const railPosts = posts.slice(4, 8).length ? posts.slice(4, 8) : posts.slice(0, 4)
  if (!railPosts.length) return null

  return (
    <section className="pt-12">
      <div className={dc.shell.section}>
        <div className="text-center">
          <p className="editorial-kicker text-[11px] font-black text-[var(--slot4-accent-fill)]">Editorial services</p>
          <h2 className="editorial-serif mx-auto mt-4 max-w-4xl text-4xl font-semibold leading-[1.03] tracking-[-0.05em] text-[var(--slot4-highlight-strong)] sm:text-6xl">
            Everything your team needs to communicate with confidence.
          </h2>
        </div>
        <div className="mt-12 grid gap-7 md:grid-cols-2">
          {railPosts.map((post, index) => (
            <div key={post.id || post.slug || `${post.title}-${index}`} className="grid gap-5 sm:grid-cols-[120px_1fr] sm:items-start">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-4xl font-black text-[var(--slot4-highlight-strong)]">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div>
                <h3 className="editorial-serif text-3xl font-semibold leading-tight tracking-[-0.04em] text-[var(--slot4-highlight-strong)]">{post.title}</h3>
                <p className="mt-4 text-lg leading-8 text-[var(--slot4-highlight-strong)]/82">{getEditableExcerpt(post, 145)}</p>
                <Link href={postHref(primaryTask, post, primaryRoute)} className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[var(--slot4-highlight-strong)]">
                  Explore this update <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const featured = posts[0]
  const metrics = [
    { value: statValue(posts, timeSections), label: 'featured stories in circulation' },
    { value: `${Math.max(timeSections.length, 5)}+`, label: 'topic lanes in rotation' },
    { value: `${Math.max(SITE_CONFIG.tasks.filter((task) => task.enabled).length, 4)}+`, label: 'publishing formats supported' },
  ]

  return (
    <section className="pt-14">
      <div className={dc.shell.section}>
        <div className="rounded-[3rem] bg-white px-6 py-12 shadow-[0_24px_70px_rgba(98,43,20,0.05)] sm:px-10 lg:px-14">
          <div className="text-center">
            <h2 className="editorial-serif text-4xl font-semibold tracking-[-0.05em] text-[var(--slot4-highlight-strong)] sm:text-6xl">
              Why choose {SITE_CONFIG.name}?
            </h2>
            <p className="mx-auto mt-5 max-w-5xl text-lg leading-9 text-[var(--slot4-highlight-strong)]/82">
              A premium editorial front end for media distribution, built to help teams present releases, category archives, visual posts, and long-form information with more confidence.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {metrics.map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-6xl font-black tracking-[-0.06em] text-[#a02273] sm:text-7xl">{item.value}</p>
                <p className="mt-3 text-xl font-black text-[var(--slot4-highlight-strong)]">{item.label}</p>
              </div>
            ))}
          </div>

          {featured ? (
            <div className="mt-16 grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
              <div>
                <h3 className="editorial-serif text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-[var(--slot4-highlight-strong)] sm:text-5xl">
                  Award-worthy presentation for public-facing updates.
                </h3>
                <p className="mt-5 max-w-3xl text-lg leading-9 text-[var(--slot4-highlight-strong)]/82">
                  Each section is shaped to read like a polished communications site instead of a generic feed, while still using the same live post data and task-driven routing underneath.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {['Best visibility', 'Most readable', 'Fast scanning', 'Premium presentation', 'Flexible categories'].map((badge) => (
                    <span key={badge} className="rounded-[1.2rem] border border-[color:var(--slot4-line)] bg-[var(--slot4-surface-bg)] px-4 py-3 text-sm font-black text-[var(--slot4-highlight-strong)]">
                      {badge}
                    </span>
                  ))}
                </div>
                <Link href={postHref(primaryTask, featured, primaryRoute)} className="mt-8 inline-flex rounded-full border border-[color:var(--slot4-line)] px-7 py-4 text-sm font-black text-[var(--slot4-highlight-strong)] transition hover:bg-[var(--slot4-highlight-strong)] hover:text-white">
                  Learn more about this story
                </Link>
              </div>

              <div className="rounded-[2.4rem] bg-[var(--slot4-surface-bg)] p-6">
                <TextOnlyPostCard post={featured} href={postHref(primaryTask, featured, primaryRoute)} dark />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const collections = timeSections.flatMap((section) => section.posts)
  const quick = collections.length ? collections.slice(0, 3) : posts.slice(1, 4)
  const faqLead = posts[5] || posts[0]

  return (
    <section className="pt-14">
      <div className={dc.shell.section}>
        <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="editorial-serif text-4xl font-semibold tracking-[-0.05em] text-[var(--slot4-highlight-strong)] sm:text-6xl">
                Frequently asked questions
              </h2>
              <span className="text-2xl text-[#a02273]">+</span>
            </div>
            <div className="mt-8 rounded-[2.2rem] bg-[var(--slot4-surface-bg)] px-6 py-4 shadow-[0_18px_45px_rgba(98,43,20,0.04)]">
              {[
                {
                  question: `How does ${SITE_CONFIG.name} support media distribution teams?`,
                  answer: 'It brings together releases, editorial stories, documents, and supporting profiles in one premium browsing experience.',
                },
                {
                  question: 'Can visitors browse by category and format?',
                  answer: 'Yes. Existing task feeds, categories, search, and route structures remain intact beneath the redesigned interface.',
                },
                {
                  question: 'What kind of updates fit this site best?',
                  answer: 'Announcements, feature stories, visual assets, listings, documents, and related discovery content all work naturally here.',
                },
              ].map((item, index) => (
                <div key={item.question} className={`py-5 ${index ? 'border-t border-[color:var(--slot4-card-line)]' : ''}`}>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-2xl font-black leading-tight tracking-[-0.03em] text-[var(--slot4-highlight-strong)]">{item.question}</h3>
                    <span className="text-xl font-black text-[#a02273]">{index === 0 ? '-' : '+'}</span>
                  </div>
                  <p className="mt-4 max-w-4xl text-lg leading-8 text-[var(--slot4-highlight-strong)]/82">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[3rem] bg-[#e9e5d8] px-6 py-8 sm:px-8">
            <h2 className="editorial-serif text-4xl font-semibold tracking-[-0.05em] text-[var(--slot4-highlight-strong)] sm:text-5xl">
              What&apos;s new
            </h2>
            <div className="mt-8 grid gap-5">
              {quick.map((post, index) => (
                <TextOnlyPostCard key={post.id || post.slug || `${post.title}-${index}`} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
              ))}
            </div>
            {faqLead ? (
              <Link href={postHref(primaryTask, faqLead, primaryRoute)} className="mt-8 inline-flex rounded-full border border-[color:var(--slot4-line)] px-6 py-3 text-sm font-black text-[var(--slot4-highlight-strong)] transition hover:bg-[var(--slot4-highlight-strong)] hover:text-white">
                Visit our knowledge center
              </Link>
            ) : null}
          </div>
        </div>

       
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section className="pt-14">
      <div className={dc.shell.section}>
        <div className="rounded-[3.2rem] rounded-br-[6rem] bg-[var(--slot4-dark-bg)] px-6 py-12 text-[var(--slot4-dark-text)] sm:px-10 lg:px-14 lg:py-16">
          <div className="mx-auto max-w-4xl text-center">
            <p className="editorial-kicker text-[11px] font-black text-[var(--slot4-accent-soft)]">Stay informed</p>
            <h2 className="editorial-serif mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-6xl">
              A polished home for the stories, signals, and releases shaping your next move.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/76">
              Fresh releases, supporting materials, and newsroom updates come together in one premium editorial experience.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="inline-flex rounded-full bg-[#c03679] px-7 py-4 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:bg-[var(--slot4-accent-fill)]">Send a message</Link>
              <Link href="/signup" className="inline-flex rounded-full border border-white/20 px-7 py-4 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:bg-white hover:text-[var(--slot4-dark-bg)]">Join the readership</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
