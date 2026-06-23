'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="mt-16">
      <section className="mx-auto max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8">
        <div className="rounded-t-[3.5rem] rounded-br-[7rem] bg-[var(--slot4-dark-bg)] px-6 py-12 text-[var(--slot4-dark-text)] shadow-[0_40px_100px_rgba(22,55,58,0.18)] sm:px-10 lg:px-14 lg:py-16">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="editorial-serif text-4xl font-semibold leading-[1.02] tracking-[-0.05em] sm:text-6xl">
              Ready to transform your communications?
            </h2>
            <p className="mt-5 text-xl text-white/82">Take a personalized tour today.</p>
            <div className="mt-8 flex justify-center">
              <Link href={session ? '/create' : '/contact'} className="inline-flex rounded-full bg-[#c03679] px-8 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[var(--slot4-accent-fill)]">
                {session ? 'Start publishing' : 'Request a free demo'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[var(--editable-container)] px-4 pb-10 pt-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <Link href="/" className="inline-flex items-center gap-3 editorial-serif text-4xl font-semibold tracking-[-0.05em] text-[var(--slot4-highlight-strong)]">
              <img src="/favicon.png" width="48" height="48" alt="logo" className="h-12 w-12 object-contain" />
              <span>{SITE_CONFIG.name}</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[var(--slot4-muted-text)]">
              {globalContent.footer.description}
            </p>
          </div>

          {globalContent.footer.columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-lg font-black text-[var(--slot4-highlight-strong)]">{column.title}</h3>
              <div className="mt-4 grid gap-3 text-sm text-[var(--slot4-muted-text)]">
                {column.links.map((link) => (
                  <Link key={`${column.title}-${link.href}`} href={link.href} className="transition hover:text-[var(--slot4-accent-fill)]">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div>
            <h3 className="text-lg font-black text-[var(--slot4-highlight-strong)]">Account</h3>
            <div className="mt-4 grid gap-3 text-sm text-[var(--slot4-muted-text)]">
              {session ? (
                <>
                  <Link href="/create" className="transition hover:text-[var(--slot4-accent-fill)]">Create a post</Link>
                  <button type="button" onClick={logout} className="text-left transition hover:text-[var(--slot4-accent-fill)]">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="transition hover:text-[var(--slot4-accent-fill)]">Login</Link>
                  <Link href="/signup" className="transition hover:text-[var(--slot4-accent-fill)]">Sign up</Link>
                </>
              )}
            </div>
            
          </div>
        </div>

        <div className="mt-10 border-t border-[color:var(--slot4-line)] pt-5 text-xs uppercase tracking-[0.18em] text-[var(--slot4-soft-muted-text)]">
          © {year} {SITE_CONFIG.name}. {globalContent.footer.bottomNote}
        </div>
      </div>
    </footer>
  )
}
