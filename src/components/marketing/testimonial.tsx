'use client'

import Image from 'next/image'
import { Dictionary } from '@/components/internationalization/types'

interface TestimonialProps {
  dictionary: Dictionary
}

export function Testimonial({ dictionary }: TestimonialProps) {
  const { testimonial } = dictionary.marketing

  return (
    <section className="py-16 bg-background">
      <div style={{ paddingInline: 'var(--container-padding)' }}>
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Quote Box */}
          <div className="bg-primary rounded-2xl p-8 lg:p-10">
            <div className="flex items-start gap-4 mb-6">
              <span className="text-primary-foreground font-bold text-lg px-3 py-1 bg-white/20 rounded">
                {dictionary.common.appName}
              </span>
            </div>

            <blockquote className="text-lg sm:text-xl text-primary-foreground/90 leading-relaxed mb-6">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary font-semibold">
                {testimonial.author.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-primary-foreground">{testimonial.author}</p>
                <p className="text-sm text-primary-foreground/70">{testimonial.role}</p>
              </div>
            </div>
          </div>

          {/* Port Image */}
          <div className="relative h-[300px] lg:h-[400px] rounded-2xl overflow-hidden">
            <Image
              src="/img15.jpg"
              alt="Cargo port with shipping containers"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
