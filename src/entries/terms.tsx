import { render } from 'solid-js/web'
import { Layout } from '../components/Layout'
import { TermsPage } from '../pages/TermsPage'
import '../styles/main.css'

render(() => (
  <Layout isSubpage={true}>
    <TermsPage />
  </Layout>
), document.getElementById('root')!)
