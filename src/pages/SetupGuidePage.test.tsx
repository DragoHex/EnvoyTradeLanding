import { describe, it, expect, beforeEach } from 'vitest'
import { render } from 'solid-js/web'
import { SetupGuidePage } from './SetupGuidePage'

describe('SetupGuidePage', () => {
  let container: HTMLDivElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
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
})
