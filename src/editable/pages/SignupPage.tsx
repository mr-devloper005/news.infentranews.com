import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="editorial-shell bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[var(--editable-container)] gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div className="flex flex-col justify-center rounded-[2.8rem] bg-white p-7 shadow-[0_18px_45px_rgba(98,43,20,0.04)] sm:p-12 lg:p-16">
            <p className="editorial-kicker text-[11px] font-black text-[var(--slot4-accent-fill)]">Create account</p>
            <h1 className="editorial-serif mt-3 text-4xl font-semibold">{pagesContent.auth.signup.formTitle}</h1>
            <EditableLocalSignupForm />
            <p className="mt-5 border-t border-[color:var(--slot4-card-line)] pt-5 text-sm text-[var(--slot4-muted-text)]">Already have an account? <Link href="/login" className="font-black text-[var(--slot4-accent-fill)] underline-offset-4 hover:underline">{pagesContent.auth.signup.loginCta}</Link></p>
          </div>
          <div className="flex flex-col justify-center rounded-[2.8rem] bg-[var(--slot4-dark-bg)] p-8 text-white sm:p-12 lg:p-16">
            <p className="editorial-kicker text-[11px] font-black text-[var(--slot4-accent-soft)]">{pagesContent.auth.signup.badge}</p>
            <h2 className="editorial-serif mt-5 max-w-xl text-5xl font-semibold leading-[0.94] tracking-[-0.06em] sm:text-7xl">{pagesContent.auth.signup.title}</h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-white/70">{pagesContent.auth.signup.description}</p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
