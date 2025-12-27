'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, Send } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Dictionary } from '@/components/internationalization/types'
import { submitQuoteRequest } from '@/actions/quote-request'
import { toast } from 'sonner'

const quoteRequestSchema = z.object({
  companyName: z.string().min(2),
  contactName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(9),
  city: z.string().min(1),
  facilityType: z.string().min(1),
  area: z.string().optional(),
  serviceType: z.string().min(1),
  message: z.string().optional(),
})

type QuoteRequestFormData = z.infer<typeof quoteRequestSchema>

interface QuoteRequestDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  dictionary: Dictionary
}

export function QuoteRequestDialog({
  open,
  onOpenChange,
  dictionary,
}: QuoteRequestDialogProps) {
  const { quoteRequest } = dictionary.marketing
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<QuoteRequestFormData>({
    resolver: zodResolver(quoteRequestSchema),
  })

  const onSubmit = async (data: QuoteRequestFormData) => {
    setIsSubmitting(true)
    try {
      const result = await submitQuoteRequest(data)
      if (result.success) {
        toast.success(quoteRequest.success)
        reset()
        onOpenChange(false)
      } else {
        toast.error(quoteRequest.error)
      }
    } catch {
      toast.error(quoteRequest.error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const cityOptions = Object.entries(quoteRequest.cities)
  const facilityTypeOptions = Object.entries(quoteRequest.facilityTypes)
  const serviceTypeOptions = Object.entries(quoteRequest.serviceTypes)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {quoteRequest.title}
          </DialogTitle>
          <DialogDescription>{quoteRequest.subtitle}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Company Name */}
            <div className="space-y-2">
              <Label htmlFor="companyName">{quoteRequest.companyName} *</Label>
              <Input
                id="companyName"
                placeholder={quoteRequest.companyNamePlaceholder}
                {...register('companyName')}
                className={errors.companyName ? 'border-destructive' : ''}
              />
            </div>

            {/* Contact Name */}
            <div className="space-y-2">
              <Label htmlFor="contactName">{quoteRequest.contactName} *</Label>
              <Input
                id="contactName"
                placeholder={quoteRequest.contactNamePlaceholder}
                {...register('contactName')}
                className={errors.contactName ? 'border-destructive' : ''}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">{quoteRequest.email} *</Label>
              <Input
                id="email"
                type="email"
                placeholder={quoteRequest.emailPlaceholder}
                {...register('email')}
                className={errors.email ? 'border-destructive' : ''}
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">{quoteRequest.phone} *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder={quoteRequest.phonePlaceholder}
                {...register('phone')}
                className={errors.phone ? 'border-destructive' : ''}
              />
            </div>

            {/* City */}
            <div className="space-y-2">
              <Label>{quoteRequest.city} *</Label>
              <Select onValueChange={(value) => setValue('city', value)}>
                <SelectTrigger
                  className={`w-full ${errors.city ? 'border-destructive' : ''}`}
                >
                  <SelectValue placeholder={quoteRequest.cityPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {cityOptions.map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Facility Type */}
            <div className="space-y-2">
              <Label>{quoteRequest.facilityType} *</Label>
              <Select onValueChange={(value) => setValue('facilityType', value)}>
                <SelectTrigger
                  className={`w-full ${errors.facilityType ? 'border-destructive' : ''}`}
                >
                  <SelectValue
                    placeholder={quoteRequest.facilityTypePlaceholder}
                  />
                </SelectTrigger>
                <SelectContent>
                  {facilityTypeOptions.map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Area */}
            <div className="space-y-2">
              <Label htmlFor="area">{quoteRequest.area}</Label>
              <Input
                id="area"
                type="number"
                placeholder={quoteRequest.areaPlaceholder}
                {...register('area')}
              />
            </div>

            {/* Service Type */}
            <div className="space-y-2">
              <Label>{quoteRequest.serviceType} *</Label>
              <Select onValueChange={(value) => setValue('serviceType', value)}>
                <SelectTrigger
                  className={`w-full ${errors.serviceType ? 'border-destructive' : ''}`}
                >
                  <SelectValue
                    placeholder={quoteRequest.serviceTypePlaceholder}
                  />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypeOptions.map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">{quoteRequest.message}</Label>
            <Textarea
              id="message"
              placeholder={quoteRequest.messagePlaceholder}
              rows={3}
              {...register('message')}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin me-2" />
                {quoteRequest.submitting}
              </>
            ) : (
              <>
                <Send className="w-4 h-4 me-2" />
                {quoteRequest.submit}
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
