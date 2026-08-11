import { CONTACT, DEAL } from '../config'
import { num } from './format'

export type Lead = {
  name: string
  phone: string
  email: string
  units: string
  note: string
}

export type Errors = Partial<Record<keyof Lead | 'consent', string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validate(lead: Lead, consent: boolean): Errors {
  const errors: Errors = {}

  if (lead.name.trim().length < 2) errors.name = 'נא למלא שם מלא'

  const digits = lead.phone.replace(/\D/g, '')
  if (digits.length < 9 || digits.length > 15) errors.phone = 'נא למלא מספר טלפון תקין'

  if (lead.email.trim() && !EMAIL_RE.test(lead.email.trim()))
    errors.email = 'כתובת אימייל לא תקינה'

  if (!consent) errors.consent = 'נא לאשר יצירת קשר'

  return errors
}

const unitsLabel = (units: string) => {
  if (units === '0') return 'עוד לא החלטתי'
  const n = Number(units)
  const total = n * DEAL.pricePerUnit
  return `${n} יחידות · ${num(total)} ₪`
}

/** A prefilled WhatsApp thread — the fallback when no form endpoint is configured. */
export function whatsappUrl(lead?: Lead) {
  const lines = lead
    ? [
        'פנייה מהאתר — G-Group · מע״ר בן צבי',
        `שם: ${lead.name}`,
        `טלפון: ${lead.phone}`,
        ...(lead.email ? [`אימייל: ${lead.email}`] : []),
        `כמות מבוקשת: ${unitsLabel(lead.units)}`,
        ...(lead.note ? [`הערה: ${lead.note}`] : []),
      ]
    : [
        'היי, הגעתי מהאתר של G-Group — מע״ר בן צבי.',
        'מעניין אותי מידע על יחידות קרקע.',
        'אשמח לקבל את המצגת המלאה ואת מסמכי העסקה.',
      ]

  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`
}

export const telUrl = () => `tel:${CONTACT.phone.replace(/[^\d+]/g, '')}`

/**
 * Posts the lead to the configured endpoint. With no endpoint set — or if the
 * request fails — falls back to opening WhatsApp so a lead is never lost.
 */
export async function submitLead(lead: Lead): Promise<void> {
  const payload = {
    ...lead,
    source: 'G-Group — מע״ר בן צבי landing',
    page: typeof location !== 'undefined' ? location.href : '',
  }

  if (!CONTACT.formEndpoint) {
    window.open(whatsappUrl(lead), '_blank', 'noopener')
    return
  }

  try {
    const res = await fetch(CONTACT.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error(`bad status ${res.status}`)
  } catch {
    window.open(whatsappUrl(lead), '_blank', 'noopener')
  }
}
