import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="editorial-shell bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-[3rem] bg-[#e9e5d8] px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
            <p className="editorial-kicker text-[11px] font-black text-[var(--slot4-accent-fill)]">{pagesContent.about.badge}</p>
            <h1 className="editorial-serif mt-5 max-w-5xl text-5xl font-semibold leading-[0.94] tracking-[-0.06em] text-[var(--slot4-highlight-strong)] sm:text-6xl lg:text-[5.2rem]">
              {pagesContent.about.title}
            </h1>
          </div>
        </section>

        <section className="mx-auto grid max-w-[var(--editable-container)] gap-6 px-4 pb-16 pt-4 sm:px-6 lg:grid-cols-[1.25fr_.75fr] lg:px-8">
          <article className="rounded-[2.6rem] bg-[var(--slot4-surface-bg)] p-7 shadow-[0_18px_45px_rgba(98,43,20,0.04)] sm:p-10">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[var(--slot4-accent-fill)]">About {SITE_CONFIG.name}</p>
            <p className="editorial-serif mt-6 text-3xl font-semibold leading-[1.2] text-[var(--slot4-highlight-strong)] sm:text-4xl">{pagesContent.about.description}</p>
            <div className="article-content mt-10 space-y-6">
              {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>

          <aside className="grid gap-5">
            {pagesContent.about.values.map((value, index) => (
              <div key={value.title} className="rounded-[2.2rem] bg-white p-7 shadow-[0_18px_45px_rgba(98,43,20,0.04)]">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--slot4-accent-fill)]">0{index + 1}</p>
                <h2 className="editorial-serif mt-4 text-3xl font-semibold leading-tight text-[var(--slot4-highlight-strong)]">{value.title}</h2>
                <p className="mt-4 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p>
              </div>
            ))}
          </aside>
        </section>

        <section className="mx-auto max-w-[var(--editable-container)] px-4 pb-16 sm:px-6 lg:px-8">
          <div className="rounded-[3rem] rounded-br-[6rem] bg-[var(--slot4-dark-bg)] px-8 py-12 text-white sm:px-12">
            <h2 className="editorial-serif max-w-3xl text-4xl font-semibold leading-none sm:text-5xl">Read the stories shaping the conversation.</h2>
            <Link href="/search" className="mt-8 inline-flex rounded-full bg-[#c03679] px-6 py-4 text-xs font-black uppercase tracking-[0.18em]">Explore the archive</Link>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
