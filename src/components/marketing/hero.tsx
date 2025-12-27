'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dictionary } from '@/components/internationalization/types'
import { QuoteRequestDialog } from './quote-request-dialog'

interface HeroProps {
  dictionary: Dictionary
}

export function Hero({ dictionary }: HeroProps) {
  const { hero } = dictionary.marketing
  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false)

  return (
    <section className="relative min-h-screen pb-64 lg:pb-80">
      {/* Image Background */}
      <div className="absolute inset-0">
        <Image
          src="/img9.jpg"
          alt="Fire protection services"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center pt-24 lg:pt-32" style={{ paddingInline: 'var(--container-padding)' }}>
        <div className="max-w-lg">
          {/* Badge */}
          <span className="inline-block text-xs font-semibold tracking-wider text-white/80 uppercase mb-4">
            {hero.badge}
          </span>

          {/* Title - 3 lines on mobile, 2 lines on desktop */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-4 sm:mb-6">
            {/* Mobile: 3 lines */}
            <span className="block sm:hidden">{hero.titleMobileLine1}</span>
            <span className="block sm:hidden">{hero.titleMobileLine2}</span>
            <span className="block sm:hidden">{hero.titleMobileLine3}</span>
            {/* Desktop: 2 lines */}
            <span className="hidden sm:block">{hero.titleLine1}</span>
            <span className="hidden sm:block whitespace-nowrap">{hero.titleLine2}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed">
            {hero.subtitle}
          </p>

          {/* Quote Request Button */}
          <Button
            size="lg"
            onClick={() => setIsQuoteDialogOpen(true)}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold h-11 sm:h-12 px-6 sm:px-8 gap-2 rounded-full text-sm sm:text-base"
          >
            <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
            {hero.quoteButton}
          </Button>
        </div>
      </div>

      {/* Quote Request Dialog */}
      <QuoteRequestDialog
        open={isQuoteDialogOpen}
        onOpenChange={setIsQuoteDialogOpen}
        dictionary={dictionary}
      />
    </section>
  )
}
