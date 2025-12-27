'use client';

import Image from 'next/image';
import { Dictionary } from '@/components/internationalization/types';

interface TeamPageProps {
  dictionary: Dictionary;
}

const teamMembers = [
  {
    id: 1,
    name: "Mazin Abdout",
    rankKey: "ceo" as const,
    image: "/img1.jpg"
  },
  {
    id: 2,
    name: "Sami Dirar",
    rankKey: "coo" as const,
    image: "/img2.jpg"
  },
  {
    id: 3,
    name: "William Parker",
    rankKey: "cto" as const,
    image: "/img3.jpg"
  },
  {
    id: 4,
    name: "David Mitchell",
    rankKey: "cfo" as const,
    image: "/img4.jpg"
  }
];

export function TeamPage({ dictionary }: TeamPageProps) {
  const { board } = dictionary.marketing;

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-foreground text-background">
      <div style={{ paddingInline: 'var(--container-padding)' }}>
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{board.title}</h2>
          <p className="text-background/70">
            {board.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="flex flex-col items-center text-center"
            >
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 mb-4 md:mb-6 overflow-hidden rounded-full">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 text-background">{board[member.rankKey]}</h3>
              <p className="text-sm md:text-base text-background/70">{member.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
