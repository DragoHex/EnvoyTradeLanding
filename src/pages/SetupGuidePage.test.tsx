import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render } from 'solid-js/web'
import { SetupGuidePage, STORAGE_KEY_SETUP_GUIDE_BROKER } from './SetupGuidePage'

describe('SetupGuidePage', () => {
  let container: HTMLDivElement

  beforeEach(() => {
    localStorage.clear()
    window.history.replaceState(null, '', '/setup-guide/')
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('renders top level description without step numbers', () => {
    render(() => <SetupGuidePage />, container)
    expect(container.textContent).not.toMatch(/\b[0-9]+-step\b/i)
    expect(container.textContent).toContain('step-by-step guide')
  })

  it('renders broker selectables for brokers with logos and names', () => {
    render(() => <SetupGuidePage />, container)
    expect(container.textContent).toContain('Zerodha Kite')
    expect(container.textContent).toContain('Dhan')
    expect(container.textContent).toContain('Angel One')
    expect(container.textContent).toContain('FYERS')
    expect(container.textContent).toContain('Upstox')
  })

  it('renders Zerodha Kite with updated callback URL by default', () => {
    render(() => <SetupGuidePage />, container)
    expect(container.textContent).toContain('https://mime.envoytrade.in/broker-callback')
    expect(container.textContent).toContain('developers.kite.trade')
  })

  it('renders Dhan setup guide when Dhan tab is clicked', () => {
    render(() => <SetupGuidePage />, container)
    
    // Find Dhan button in selector
    const buttons = Array.from(container.querySelectorAll('button'))
    const dhanBtn = buttons.find((b) => b.textContent?.includes('Dhan'))
    expect(dhanBtn).toBeDefined()
    
    dhanBtn?.click()

    expect(container.textContent).toContain('web.dhan.co')
    expect(container.textContent).toContain('DhanHQ Trading APIs')
    expect(container.textContent).toContain('Free Tier: Trading APIs')
    expect(container.textContent).toContain('Generate Access Token/API Key')
    expect(container.textContent).toContain('https://mime.envoytrade.in/broker-callback')
    expect(container.textContent).toContain('Daily Automated Session Renewal')
  })

  it('renders theme-matched Coming Soon view when an unreleased broker tab is clicked', () => {
    render(() => <SetupGuidePage />, container)

    const buttons = Array.from(container.querySelectorAll('button'))
    const angelBtn = buttons.find((b) => b.textContent?.includes('Angel One'))
    expect(angelBtn).toBeDefined()

    angelBtn?.click()

    expect(container.textContent).toContain('Angel One')
    expect(container.textContent).toMatch(/Coming Soon|Integration in Progress/i)
    expect(container.textContent).toContain('Register Interest')
    expect(container.textContent).not.toContain('Request Early Access')
    expect(container.textContent).not.toContain('View Zerodha Guide')
    expect(container.textContent).not.toContain('View Dhan Guide')
  })

  it('persists selected broker to localStorage and URL query param when clicked', () => {
    render(() => <SetupGuidePage />, container)

    const buttons = Array.from(container.querySelectorAll('button'))
    const dhanBtn = buttons.find((b) => b.textContent?.includes('Dhan'))
    dhanBtn?.click()

    expect(localStorage.getItem(STORAGE_KEY_SETUP_GUIDE_BROKER)).toBe('dhan')
    expect(window.location.search).toContain('broker=dhan')
  })

  it('persists and restores selected broker from localStorage on page load (refresh scenario)', () => {
    localStorage.setItem(STORAGE_KEY_SETUP_GUIDE_BROKER, 'dhan')

    render(() => <SetupGuidePage />, container)

    expect(container.textContent).toContain('web.dhan.co')
    expect(container.textContent).toContain('DhanHQ Trading APIs')
    expect(window.location.search).toContain('broker=dhan')
  })

  it('persists and restores selected broker from URL search query on page load', () => {
    window.history.replaceState(null, '', '/setup-guide/?broker=dhan')

    render(() => <SetupGuidePage />, container)

    expect(container.textContent).toContain('web.dhan.co')
    expect(localStorage.getItem(STORAGE_KEY_SETUP_GUIDE_BROKER)).toBe('dhan')
  })

  it('persists and restores selected broker from URL hash on page load', () => {
    window.history.replaceState(null, '', '/setup-guide/#angelone')

    render(() => <SetupGuidePage />, container)

    expect(container.textContent).toContain('Angel One Setup Guide')
    expect(container.textContent).toContain('Coming Soon')
    expect(localStorage.getItem(STORAGE_KEY_SETUP_GUIDE_BROKER)).toBe('angelone')
  })

  it('safely falls back to Zerodha Kite when an unknown broker is in localStorage or URL', () => {
    localStorage.setItem(STORAGE_KEY_SETUP_GUIDE_BROKER, 'unknown_broker')
    window.history.replaceState(null, '', '/setup-guide/?broker=invalid')

    render(() => <SetupGuidePage />, container)

    expect(container.textContent).toContain('developers.kite.trade')
  })
})
