'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Dictionary } from '@/components/internationalization/types';

interface ProcessSectionProps {
  dictionary: Dictionary;
}

const teamImages = [
  { image: '/img14.jpg', delay: 0 },
  { image: '/img10.jpg', delay: 0.1 },
  { image: '/img11.jpg', delay: 0.2 },
  { image: '/img12.jpg', delay: 0.3 },
];

export function ProcessSection({ dictionary }: ProcessSectionProps) {
  const isArabic = dictionary.common.appName .includes('أسس السلامة');

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-foreground text-background overflow-hidden">
      <div style={{ paddingInline: 'var(--container-padding)' }}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Images Grid */}
          <motion.div
            initial={{ opacity: 0, x: isArabic ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {teamImages.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: item.delay }}
                  className={`relative aspect-square rounded-2xl overflow-hidden ${
                    index === 1 ? 'mt-8' : index === 3 ? 'mt-8' : ''
                  }`}
                >
                  <Image
                    src={item.image}
                    alt="Team member"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-6 start-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-8 py-4 rounded-2xl shadow-2xl"
            >
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">+20</div>
                  <div className="text-xs opacity-80">{isArabic ? 'سنة خبرة' : 'Years'}</div>
                </div>
                <div className="w-px h-10 bg-primary-foreground/30" />
                <div className="text-center">
                  <div className="text-3xl font-bold">+500</div>
                  <div className="text-xs opacity-80">{isArabic ? 'مشروع' : 'Projects'}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: isArabic ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-block text-xs font-medium tracking-wider text-background/70 uppercase mb-4 px-4 py-1.5 border border-background/30 rounded-full">
              {isArabic ? 'فريقنا' : 'Our Team'}
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {isArabic ? 'خبراء متخصصون في خدمتك' : 'Experts Dedicated to Your Safety'}
            </h2>

            <p className="text-background/70 text-lg mb-8 leading-relaxed">
              {isArabic
                ? 'فريقنا من المهندسين والفنيين المعتمدين يمتلك خبرة واسعة في تصميم وتركيب وصيانة أنظمة الحماية من الحريق. نحن ملتزمون بتقديم أعلى مستويات الجودة والسلامة.'
                : 'Our team of certified engineers and technicians has extensive experience in designing, installing, and maintaining fire protection systems. We are committed to delivering the highest levels of quality and safety.'}
            </p>

            {/* Features List */}
            <div className="space-y-4">
              {[
                { ar: 'مهندسون محترفون ذوو خبرة عالية', en: 'Civil Defense Certified Engineers' },
                { ar: 'فنيون مدربون على أعلى المعايير', en: 'Technicians Trained to Highest Standards' },
                { ar: 'دعم فني على مدار الساعة', en: '24/7 Technical Support' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isArabic ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-background/90">{isArabic ? item.ar : item.en}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
