import type { JSX } from 'solid-js'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

export interface LayoutProps {
  children: JSX.Element
  isSubpage?: boolean
}

export function Layout(props: LayoutProps) {
  const isSub = () => props.isSubpage ?? false

  return (
    <div class="min-h-screen flex flex-col bg-brand-dark text-brand-light">
      <Navbar isSubpage={isSub()} />
      <main class="flex-grow pt-16">
        {props.children}
      </main>
      <Footer isSubpage={isSub()} />
    </div>
  )
}
