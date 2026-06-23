'use client'

import { FileText, Mail, Megaphone } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const desks = [
  { icon: FileText, title: 'Editorial desk', body: 'Send story ideas, corrections, source material, and publishing questions.' },
  { icon: Megaphone, title: 'Distribution support', body: 'Discuss release formatting, campaign direction, syndication, and category strategy.' },
  { icon: Mail, title: 'General support', body: 'Reach out for account, publishing, or site-related help through one clear intake path.' },
]

export default function ContactPage() {
  return (
    <EditableSiteShell>
      <main className="editorial-shell bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-[3rem] bg-[#e9e5d8] px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
            <p className="editorial-kicker text-[11px] font-black text-[var(--slot4-accent-fill)]">{pagesContent.contact.eyebrow}</p>
            <h1 className="editorial-serif mt-5 max-w-5xl text-5xl font-semibold leading-[0.94] tracking-[-0.06em] text-[var(--slot4-highlight-strong)] sm:text-6xl lg:text-[5.1rem]">{pagesContent.contact.title}</h1>
            <p className="mt-6 max-w-2xl border-l-4 border-[var(--slot4-accent-fill)] pl-5 text-base leading-8 text-[var(--slot4-highlight-strong)]/70">{pagesContent.contact.description}</p>
          </div>
        </section>

        <section className="mx-auto grid max-w-[var(--editable-container)] gap-6 px-4 pb-16 pt-4 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
          <aside className="rounded-[2.8rem] bg-[var(--slot4-dark-bg)] text-white">
            {desks.map((desk, index) => (
              <div key={desk.title} className={`p-7 sm:p-9 ${index ? 'border-t border-white/15' : ''}`}>
                <div className="flex items-center justify-between"><desk.icon className="h-5 w-5 text-[var(--slot4-accent-soft)]" /><span className="text-xs font-black text-white/45">0{index + 1}</span></div>
                <h2 className="editorial-serif mt-6 text-3xl font-semibold">{desk.title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/68">{desk.body}</p>
              </div>
            ))}
          </aside>
          <div className="rounded-[2.8rem] bg-white p-6 shadow-[0_18px_45px_rgba(98,43,20,0.04)] sm:p-10">
            <p className="editorial-kicker text-[11px] font-black text-[var(--slot4-accent-fill)]">Send a message</p>
            <h2 className="editorial-serif mt-3 text-4xl font-semibold">{pagesContent.contact.formTitle}</h2>
            <EditableContactLeadForm />
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
