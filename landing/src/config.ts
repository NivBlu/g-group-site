/* ============================================================
   ▼  ערכו כאן — פרטי קשר ונתוני העסקה  ▼
   כל המספרים באתר נגזרים מהקובץ הזה בלבד.
   ============================================================ */

export const CONTACT = {
  /** מספר וואטסאפ בפורמט בינלאומי, ללא + וללא מקפים. לדוגמה: '972501234567' */
  whatsapp: '972500000000',
  /** מספר לחיוג ולתצוגה */
  phone: '+972-50-000-0000',
  /**
   * כתובת לשליחת הטופס (Formspree / Make / Zapier — כל endpoint שמקבל POST).
   * כל עוד הערך ריק — הטופס נפתח בוואטסאפ עם הפרטים מוכנים לשליחה.
   */
  formEndpoint: '',
} as const

export const DEAL = {
  /** ₪ ליחידת קרקע */
  pricePerUnit: 690_000,
  /** מ"ר קרקע ליחידה */
  landPerUnit: 16,
  /** רח"ק — מכפיל זכויות הבנייה לפי תא/5500 */
  far: 14,
  /** מרכיב המגורים מתוך שטחי הבנייה */
  residentialShare: 0.5,
  /** טווח גודל הדירה הנגזר, למ"ר */
  apartmentRange: [100, 120] as const,
  /** מלאי להצגה בפס ההתקדמות */
  unitsTotal: 60,
  unitsLeft: 14,
} as const

export const PLACE = {
  block: '6987',
  plan: 'תא/5500',
  planDeposited: '04.01.2026',
  zone: '707 ג׳ — מע״ר בן צבי',
  city: 'תל אביב-יפו',
} as const

/** רח"ק של מתחם ייחוס, להמחשת פרופורציה */
export const BENCHMARK = {
  name: 'גינדי TLV — החשמונאים',
  far: 7.6,
  detail: '40 דונם · 2,665 יח״ד · 305,100 מ״ר בנוי',
} as const

/* ---- נגזרות ---- */
export const derived = {
  rightsPerUnit: DEAL.landPerUnit * DEAL.far,
  residentialPerUnit: DEAL.landPerUnit * DEAL.far * DEAL.residentialShare,
  get pricePerResidentialSqm() {
    return DEAL.pricePerUnit / this.residentialPerUnit
  },
}
