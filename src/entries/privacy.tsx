import { render } from 'solid-js/web'
import { Layout } from '../components/Layout'
import { PrivacyPage } from '../pages/PrivacyPage'
import '../styles/main.css'

render(() => (
  <Layout isSubpage={true}>
    <PrivacyPage />
  </Layout>
), document.getElementById('root')!)
