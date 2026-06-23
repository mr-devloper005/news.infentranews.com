'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Globe, Menu, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const primaryLinks = [
  { label: ' ', href: '/media-distribution', hasMenu: true },
  { label: '  ', href: '/listing', hasMenu: true },
  { label: '', href: '/search' },
  { label: '', href: '/about' },
  { label: '', href: '/article' },
  { label: '', href: '/pdf', hasMenu: true },
]

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--slot4-line)] bg-[rgba(251,248,242,0.88)] backdrop-blur-xl">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[86px] items-center gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--slot4-line)] bg-white lg:hidden"
              aria-label="Toggle navigation"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Link href="/" className="flex items-center gap-4">
              <img src={'/favicon.png'} width={'150px'} height={'105px'} alt='logo'/>
              <span className="editorial-serif text-3xl font-semibold tracking-[-0.05em] text-[var(--slot4-highlight-strong)]">
                {SITE_CONFIG.name}
              </span>
            </Link>
          </div>

          <nav className="ml-8 hidden min-w-0 flex-1 items-center justify-center gap-7 lg:flex">
            {primaryLinks.map((item) => (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--slot4-highlight-strong)] transition hover:text-[var(--slot4-accent-fill)]"
              >
                {item.label}
               </Link>
            ))}
          </nav>
          <form action="/search" className="flex w-full max-w-md items-center gap-3 rounded-full border border-[color:var(--slot4-line)] bg-white px-4 py-3">
            <Search className="h-4 w-4 text-[var(--slot4-soft-muted-text)]" />
            <input
              name="q"
              type="search"
              placeholder="Search releases, topics, companies"
              className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-[var(--slot4-soft-muted-text)]"
            />
          </form>
        
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden items-center gap-5 text-sm text-[var(--slot4-accent-fill)] lg:flex">
              {session ? (
                <>
                   <button type="button" onClick={logout} className="transition hover:text-[var(--slot4-highlight)]">Logout</button>
                </>
              ) : (
                <>
                 </>
              )}
            
            </div>
            <Link href={session ? '/create' : globalContent.nav.actions.primary.href} className="inline-flex rounded-full bg-[#c03679] px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[var(--slot4-accent-fill)]">
              {session ? 'Publish' : globalContent.nav.actions.primary.label}
            </Link>
          </div>
        </div>

       

        {open ? (
          <div className="border-t border-[color:var(--slot4-card-line)] py-4 lg:hidden">
            <div className="grid gap-3">
              {primaryLinks.map((item) => (
                <Link
                  key={`${item.label}-${item.href}-mobile`}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-[1.4rem] border border-[color:var(--slot4-line)] bg-white px-4 py-3 text-sm font-semibold"
                >
                  {item.label}
                </Link>
              ))}
              <form action="/search" className="flex items-center gap-3 rounded-[1.4rem] border border-[color:var(--slot4-line)] bg-white px-4 py-3">
                <Search className="h-4 w-4 text-[var(--slot4-soft-muted-text)]" />
                <input name="q" placeholder="Search archive" className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
              </form>
              {session ? (
                <>
                  <Link href="/create" onClick={() => setOpen(false)} className="rounded-[1.4rem] border border-[color:var(--slot4-line)] bg-white px-4 py-3 text-sm font-semibold">Create</Link>
                  <button type="button" onClick={() => { logout(); setOpen(false) }} className="rounded-[1.4rem] border border-[color:var(--slot4-line)] bg-white px-4 py-3 text-left text-sm font-semibold">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setOpen(false)} className="rounded-[1.4rem] border border-[color:var(--slot4-line)] bg-white px-4 py-3 text-sm font-semibold">Login</Link>
                  <Link href="/contact" onClick={() => setOpen(false)} className="rounded-[1.4rem] border border-[color:var(--slot4-line)] bg-white px-4 py-3 text-sm font-semibold">Support</Link>
                </>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  )
}
