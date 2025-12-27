'use client'
import Image from 'next/image'
import { motion } from 'framer-motion';
import { Dictionary } from '@/components/internationalization/types';

const clients = [
  { name: 'Al Othaim Mall', src: '/marketing/sponser/othaim.png' },
  { name: 'Movenpick Hotels', src: '/marketing/sponser/movenpick.png' },
]

interface NumberSectionProps {
  dictionary: Dictionary;
}

export function NumberSection({ dictionary }: NumberSectionProps) {
  const { clients: clientsText } = dictionary.marketing;

  return (
    <div className="relative">
      {/* Background Image Section with Mask */}
      <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] bg-[url('/img14.jpg')] bg-cover bg-center bg-scroll md:bg-fixed">
        <div className="absolute inset-0 bg-black/50">
          <div className="h-full flex flex-col justify-end pb-10 sm:pb-12 md:pb-16" style={{ paddingInline: 'var(--container-padding)' }}>
            <span className="text-2xl sm:text-3xl md:text-4xl font-black text-background mb-2">{clientsText.title}</span>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-background/80">{clientsText.subtitle}</h1>
          </div>
        </div>
      </div>

      {/* Clients Section */}
      <div className="bg-background text-foreground -mt-1 py-12 sm:py-16">
        <div style={{ paddingInline: 'var(--container-padding)' }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-wrap justify-center items-center gap-12 md:gap-20"
          >
            {clients.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center justify-center p-4"
              >
                <Image
                  src={client.src}
                  alt={client.name}
                  width={200}
                  height={100}
                  className="h-16 sm:h-20 lg:h-24 w-auto max-w-[180px] sm:max-w-[220px] object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300 dark:invert dark:opacity-80 dark:hover:opacity-100"
                  unoptimized
                  draggable={false}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
