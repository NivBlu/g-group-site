import { useId, useState } from 'react'
import type { FormEvent } from 'react'
import { CONTACT, DEAL } from '../config'
import { num, units as unitsLabel } from '../lib/format'
import { submitLead, telUrl, validate, whatsappUrl } from '../lib/lead'
import type { Errors, Lead } from '../lib/lead'
import { Button } from './ui/Button'
import { Reveal } from './ui/Reveal'
import { SectionHead } from './ui/SectionHead'
import s from './LeadForm.module.css'

const EMPTY: Lead = { name: '', phone: '', email: '', units: '1', note: '' }

const DELIVERABLES = [
  'מצגת הפרויקט המלאה',
  'מסמכי ההסכם ונסח רישום מקרקעין',
  'שיחת הסבר אישית עם נציג',
]

const UNIT_OPTIONS = [1, 2, 3, 5]

export function LeadForm() {
  const [lead, setLead] = useState<Lead>(EMPTY)
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState<Errors>({})
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const id = useId()

  const set = (key: keyof Lead) => (value: string) => setLead((l) => ({ ...l, [key]: value }))

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const found = validate(lead, consent)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const first = document.querySelector<HTMLElement>(`.${s.invalid} input, .${s.invalid} select`)
      first?.focus()
      return
    }
    setSending(true)
    await submitLead(lead)
    setSending(false)
    setDone(true)
  }

  const field = (
    key: keyof Lead,
    label: React.ReactNode,
    props: React.InputHTMLAttributes<HTMLInputElement> = {},
  ) => {
    const value = lead[key]
    const cls = [s.field, value ? s.filled : '', errors[key] ? s.invalid : '']
      .filter(Boolean)
      .join(' ')
    return (
      <div className={cls}>
        <input
          id={`${id}-${key}`}
          className={s.input}
          value={value}
          onChange={(e) => set(key)(e.target.value)}
          aria-invalid={Boolean(errors[key])}
          aria-describedby={errors[key] ? `${id}-${key}-err` : undefined}
          {...props}
        />
        <label className={s.label} htmlFor={`${id}-${key}`}>
          {label}
        </label>
        {errors[key] ? (
          <span className={s.error} id={`${id}-${key}-err`}>
            {errors[key]}
          </span>
        ) : null}
      </div>
    )
  }

  return (
    <section className={s.section} id="lead">
      <div className={s.wrap}>
        <SectionHead
          index="10"
          label="צרו קשר"
          onDark
          title={<>נשלח לכם את כל החומר — ותחליטו בעצמכם.</>}
        />

        <div className={s.split}>
          <Reveal>
            <p className={s.blurb}>
              השאירו פרטים ונחזור אליכם עם המצגת המלאה, מסמכי העסקה, נסחי הרישום ותחשיב מותאם
              ליחידה שלכם. ללא התחייבות.
            </p>

            <ul className={s.deliver}>
              {DELIVERABLES.map((d) => (
                <li key={d}>
                  <span className={s.bullet} aria-hidden="true" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>

            <div className={s.direct}>
              <a
                className={s.directBtn}
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 12a8 8 0 1 1-3.2-6.4L20 4l-1.2 3.6A7.9 7.9 0 0 1 20 12Z" />
                  <path d="M8.6 9.4c.3 1.9 2.1 3.7 4 4l1.1-1.1 1.9.8-.4 1.6c-2.9.5-6.4-3-5.9-5.9l1.6-.4.8 1.9-1.1 1.1Z" />
                </svg>
                <span>וואטסאפ</span>
              </a>
              <a className={s.directBtn} href={telUrl()}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 4h3.5l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L16 14l4 1.5V19a2 2 0 0 1-2.2 2A16 16 0 0 1 3 6.2 2 2 0 0 1 5 4Z" />
                </svg>
                <span className={s.tel}>{CONTACT.phone}</span>
              </a>
            </div>
          </Reveal>

          <Reveal i={1}>
            <form className={s.form} onSubmit={onSubmit} noValidate>
              {field('name', 'שם מלא', { autoComplete: 'name', required: true })}
              {field('phone', 'טלפון נייד', {
                type: 'tel',
                inputMode: 'tel',
                autoComplete: 'tel',
                required: true,
              })}
              {field(
                'email',
                <>
                  אימייל <i>(לא חובה)</i>
                </>,
                { type: 'email', autoComplete: 'email' },
              )}

              <div className={`${s.field} ${s.static}`}>
                <select
                  id={`${id}-units`}
                  className={s.select}
                  value={lead.units}
                  onChange={(e) => set('units')(e.target.value)}
                >
                  {UNIT_OPTIONS.map((n) => (
                    <option key={n} value={n}>
                      {unitsLabel(n)} · {num(n * DEAL.pricePerUnit)} ₪
                    </option>
                  ))}
                  <option value="0">עוד לא החלטתי — רוצה לשמוע</option>
                </select>
                <label className={s.label} htmlFor={`${id}-units`}>
                  כמה יחידות מעניינות אתכם?
                </label>
              </div>

              <div className={`${s.field} ${lead.note ? s.filled : ''}`}>
                <textarea
                  id={`${id}-note`}
                  className={s.textarea}
                  rows={2}
                  value={lead.note}
                  onChange={(e) => set('note')(e.target.value)}
                />
                <label className={s.label} htmlFor={`${id}-note`}>
                  הערה <i>(לא חובה)</i>
                </label>
              </div>

              <label className={s.consent}>
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  aria-invalid={Boolean(errors.consent)}
                />
                <span className={s.box} aria-hidden="true" />
                <span className={s.consentText}>
                  אני מאשר/ת שייצרו איתי קשר בטלפון, בוואטסאפ ובדוא״ל בנוגע לפנייה זו.
                </span>
              </label>
              {errors.consent ? <span className={s.error}>{errors.consent}</span> : null}

              <div className={s.submit}>
                <Button type="submit" variant="brass" size="lg" block disabled={sending}>
                  {sending ? 'שולח…' : 'שלחו לי את הפרטים'}
                </Button>
              </div>

              {!CONTACT.formEndpoint ? (
                <p className={s.formNote}>
                  בלחיצה תיפתח שיחת וואטסאפ עם הפרטים שמילאתם, מוכנה לשליחה.
                </p>
              ) : null}

              {done ? (
                <div className={s.success} role="status">
                  <span className={s.successMark} aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <h3 className={s.successTitle}>הפרטים נקלטו</h3>
                  <p className={s.successBody}>
                    נחזור אליכם בהקדם עם המצגת המלאה ומסמכי העסקה.
                  </p>
                </div>
              ) : null}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
