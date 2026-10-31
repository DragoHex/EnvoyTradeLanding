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

    expect(container.textContent).toContain('Initiate Account Creation & Obtain Static IP')
    expect(container.textContent).toContain('Whitelist Static IP & Generate Dhan Access Token')
    expect(container.textContent).toContain('Complete Account Registration in EnvoyTrade Dashboard')
    expect(container.textContent).toContain('web.dhan.co')
    expect(container.textContent).toContain('DhanHQ Trading APIs')
    expect(container.textContent).toContain('Free Tier: Trading APIs')
    expect(container.textContent).toContain('Generate Access Token/API Key')
    expect(container.textContent).toContain('https://mime.envoytrade.in/broker-callback')
    expect(container.textContent).toContain('Daily Automated Session Renewal')

    // Verify chronological order of steps
    const text = container.textContent || ''
    const idxStep1 = text.indexOf('Initiate Account Creation')
    const idxStep2 = text.indexOf('Whitelist Static IP & Generate')
    const idxStep3 = text.indexOf('Complete Account Registration')
    expect(idxStep1).toBeLessThan(idxStep2)
    expect(idxStep2).toBeLessThan(idxStep3)
  })

  it('renders Kotak Neo setup guide when Kotak Neo tab is clicked', () => {
    render(() => <SetupGuidePage />, container)

    // Find Kotak Neo button in selector
    const buttons = Array.from(container.querySelectorAll('button'))
    const kotakBtn = buttons.find((b) => b.textContent?.includes('Kotak Neo'))
    expect(kotakBtn).toBeDefined()

    kotakBtn?.click()

    expect(container.textContent).toContain('Create Developer App & Obtain API Credentials')
    expect(container.textContent).toContain('Whitelist Dedicated Static Egress IP')
    expect(container.textContent).toContain('Add Accounts to EnvoyTrade Dashboard')
    expect(container.textContent).toContain('Configure Copy Groups & Sizing Multipliers')
    expect(container.textContent).toContain('Execute a Test Trade & Live Verification')
    expect(container.textContent).toContain('Daily Automated Session Renewal')
    expect(container.textContent).toContain('trade.kotakneo.com/login')
    expect(container.textContent).toContain('Consumer Key')
    expect(container.textContent).toContain('IPv4 / IPv6')
    expect(container.textContent).toContain('copy the Base32 TOTP secret key')
    expect(container.textContent).toContain('Kotak Neo Client ID (UCC)')
    expect(container.textContent).not.toContain('V45IC')
    expect(container.textContent).not.toContain('100008')
    expect(container.textContent).not.toContain('tradeapi.kotaksecurities.com')

    // Verify chronological order of steps
    const text = container.textContent || ''
    const idxStep1 = text.indexOf('Create Developer App & Obtain API Credentials')
    const idxStep2 = text.indexOf('Whitelist Dedicated Static Egress IP')
    const idxStep3 = text.indexOf('Add Accounts to EnvoyTrade Dashboard')
    const idxStep4 = text.indexOf('Configure Copy Groups & Sizing Multipliers')
    const idxStep5 = text.indexOf('Execute a Test Trade & Live Verification')
    const idxStep6 = text.indexOf('Daily Automated Session Renewal')
    expect(idxStep1).toBeLessThan(idxStep2)
    expect(idxStep2).toBeLessThan(idxStep3)
    expect(idxStep3).toBeLessThan(idxStep4)
    expect(idxStep4).toBeLessThan(idxStep5)
    expect(idxStep5).toBeLessThan(idxStep6)
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

  it('persists and restores Kotak Neo from URL search query on page load', () => {
    window.history.replaceState(null, '', '/setup-guide/?broker=kotak')

    render(() => <SetupGuidePage />, container)

    expect(container.textContent).toContain('trade.kotakneo.com/login')
    expect(container.textContent).toContain('Consumer Key')
    expect(localStorage.getItem(STORAGE_KEY_SETUP_GUIDE_BROKER)).toBe('kotak')
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
