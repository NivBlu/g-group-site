import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/global.css'

// The page can be embedded in a host document that supplies its own <html>
// (a preview frame, an embed). Without direction the whole RTL layout inverts,
// so assert it rather than relying on the surrounding markup.
if (document.documentElement.dir !== 'rtl') {
  document.documentElement.dir = 'rtl'
  document.documentElement.lang = 'he'
}

const el = document.getElementById('root')
if (!el) throw new Error('#root not found')

createRoot(el).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
