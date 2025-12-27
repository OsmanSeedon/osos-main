"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Flame, Shield, Droplets, Wrench, Award, MessageSquare, FileText, BookOpen, Scale, HelpCircle, MapPin, BadgeCheck, Receipt, Headphones } from "lucide-react"

import { cn } from "@/lib/utils"
import { useLocale } from "@/components/internationalization"
import type { Dictionary } from "@/components/internationalization"

interface MainNavProps {
  dictionary: Dictionary
  className?: string
}

interface NavDropdownProps {
  title: string
  items: Array<{
    title: string
    description: string
    href: string
    icon: React.ReactNode
  }>
}

function NavDropdown({ title, items }: NavDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 150)
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="flex items-center gap-1.5 text-foreground transition-colors hover:text-muted-foreground text-base font-medium"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <ChevronDown className={cn("w-5 h-5 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute top-full start-0 pt-3 z-50">
          <div className="bg-popover border rounded-xl shadow-xl p-3 min-w-[320px]">
            <div className="grid gap-1">
              {items.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-accent transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-base text-foreground">{item.title}</div>
                    <div className="text-sm text-muted-foreground line-clamp-1">{item.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function MainNav({ dictionary, className }: MainNavProps) {
  const { locale } = useLocale()
  const t = dictionary.header

  const protectionSystemsItems = React.useMemo(() => [
    {
      title: t.protectionSystems.items.fireAlarm.title,
      description: t.protectionSystems.items.fireAlarm.description,
      href: `/${locale}#services`,
      icon: <Flame className="w-5 h-5" />
    },
    {
      title: t.protectionSystems.items.suppression.title,
      description: t.protectionSystems.items.suppression.description,
      href: `/${locale}#services`,
      icon: <Shield className="w-5 h-5" />
    },
    {
      title: t.protectionSystems.items.sprinkler.title,
      description: t.protectionSystems.items.sprinkler.description,
      href: `/${locale}#services`,
      icon: <Droplets className="w-5 h-5" />
    },
    {
      title: t.protectionSystems.items.maintenance.title,
      description: t.protectionSystems.items.maintenance.description,
      href: `/${locale}#services`,
      icon: <Wrench className="w-5 h-5" />
    },
    {
      title: t.protectionSystems.items.civilDefense.title,
      description: t.protectionSystems.items.civilDefense.description,
      href: `/${locale}#services`,
      icon: <Award className="w-5 h-5" />
    },
    {
      title: t.protectionSystems.items.consultation.title,
      description: t.protectionSystems.items.consultation.description,
      href: `/${locale}#services`,
      icon: <MessageSquare className="w-5 h-5" />
    },
  ], [t, locale])

  const knowledgeCenterItems = React.useMemo(() => [
    {
      title: t.knowledgeCenter.items.articles.title,
      description: t.knowledgeCenter.items.articles.description,
      href: `/${locale}/blog`,
      icon: <FileText className="w-5 h-5" />
    },
    {
      title: t.knowledgeCenter.items.guides.title,
      description: t.knowledgeCenter.items.guides.description,
      href: `/${locale}/blog`,
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      title: t.knowledgeCenter.items.regulations.title,
      description: t.knowledgeCenter.items.regulations.description,
      href: `/${locale}/blog`,
      icon: <Scale className="w-5 h-5" />
    },
    {
      title: t.knowledgeCenter.items.faq.title,
      description: t.knowledgeCenter.items.faq.description,
      href: `/${locale}#faq`,
      icon: <HelpCircle className="w-5 h-5" />
    },
  ], [t, locale])

  const customerPortalItems = React.useMemo(() => [
    {
      title: t.customerPortal.items.trackProject.title,
      description: t.customerPortal.items.trackProject.description,
      href: `/${locale}/track`,
      icon: <MapPin className="w-5 h-5" />
    },
    {
      title: t.customerPortal.items.certificates.title,
      description: t.customerPortal.items.certificates.description,
      href: `/${locale}/dashboard/certificates`,
      icon: <BadgeCheck className="w-5 h-5" />
    },
    {
      title: t.customerPortal.items.invoices.title,
      description: t.customerPortal.items.invoices.description,
      href: `/${locale}/dashboard/invoices`,
      icon: <Receipt className="w-5 h-5" />
    },
    {
      title: t.customerPortal.items.support.title,
      description: t.customerPortal.items.support.description,
      href: `/${locale}/dashboard`,
      icon: <Headphones className="w-5 h-5" />
    },
  ], [t, locale])

  return (
    <div className={cn("flex items-center gap-12", className)}>
      <Link href={`/${locale}`} className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt={dictionary.common.appName}
          width={72}
          height={72}
          className="w-12 h-12 xl:w-14 xl:h-14"
        />
        <span className="font-bold text-2xl text-foreground">
          {dictionary.common.appName}
        </span>
      </Link>
      <nav className="flex items-center gap-6 xl:gap-8">
        <Link
          href={`/${locale}#about`}
          className="text-foreground transition-colors hover:text-muted-foreground text-base font-medium"
        >
          <span>{t.about}</span>
        </Link>

        <NavDropdown
          title={t.protectionSystems.title}
          items={protectionSystemsItems}
        />

        <NavDropdown
          title={t.knowledgeCenter.title}
          items={knowledgeCenterItems}
        />

        <NavDropdown
          title={t.customerPortal.title}
          items={customerPortalItems}
        />
      </nav>
    </div>
  )
}
