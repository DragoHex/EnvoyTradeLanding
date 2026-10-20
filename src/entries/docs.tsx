import { render } from 'solid-js/web'
import { Layout } from '../components/Layout'
import { DocsPage } from '../pages/DocsPage'
import '../styles/main.css'

render(() => (
  <Layout isSubpage={true}>
    <DocsPage />
  </Layout>
), document.getElementById('root')!)
