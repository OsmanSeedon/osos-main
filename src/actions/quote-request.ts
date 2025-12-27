'use server'

import { db } from '@/lib/db'

interface QuoteRequestData {
  companyName: string
  contactName: string
  email: string
  phone: string
  city: string
  facilityType: string
  area?: string
  serviceType: string
  message?: string
}

function generateRequestNumber(): string {
  const prefix = 'QR'
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}

export async function submitQuoteRequest(data: QuoteRequestData) {
  try {
    const requestNumber = generateRequestNumber()

    await db.quoteRequest.create({
      data: {
        requestNumber,
        companyName: data.companyName,
        contactName: data.contactName,
        email: data.email,
        phone: data.phone,
        city: data.city,
        facilityType: data.facilityType,
        area: data.area || null,
        serviceType: data.serviceType,
        message: data.message || null,
      },
    })

    return { success: true, requestNumber }
  } catch (error) {
    console.error('Failed to submit quote request:', error)
    return { success: false, error: 'Failed to submit quote request' }
  }
}
