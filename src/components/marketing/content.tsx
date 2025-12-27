import { Dictionary } from '@/components/internationalization/types'
import type { Locale } from '@/components/internationalization/config'
import { SiteHeader } from '@/components/template/site-header'
import { Hero } from './hero'
import { Partners } from './partners'
import { Services } from './services'
import { AllInOne } from './all-in-one'
import { NumberSection } from './number'
import { ProcessSection } from './process'
import { Insights } from './insights'
import { Faq } from './faq'
import { Footer } from './footer'
import { Chatbot } from '@/components/chatbot'

interface MarketingContentProps {
  dictionary: Dictionary
  lang: string
}

export async function MarketingContent({ dictionary, lang }: MarketingContentProps) {
  return (
    <>
      <SiteHeader dictionary={dictionary} />
      <main className="min-h-screen">
        <Hero dictionary={dictionary} />
        <Partners />
        <Services dictionary={dictionary} />
        <AllInOne dictionary={dictionary} />
        <NumberSection dictionary={dictionary} />
        <ProcessSection dictionary={dictionary} />
        <Insights dictionary={dictionary} lang={lang} />
        <Faq dictionary={dictionary} lang={lang} />
      </main>
      <Footer dictionary={dictionary} lang={lang} />
      <Chatbot lang={lang as Locale} />
    </>
  )
}
