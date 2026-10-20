import { render } from 'solid-js/web'
import { Layout } from '../components/Layout'
import { ContactPage } from '../pages/ContactPage'
import '../styles/main.css'

render(() => (
  <Layout isSubpage={true}>
    <ContactPage />
  </Layout>
), document.getElementById('root')!)
