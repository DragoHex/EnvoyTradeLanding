import { render } from 'solid-js/web'
import { Layout } from '../components/Layout'
import { RefundPage } from '../pages/RefundPage'
import '../styles/main.css'

render(() => (
  <Layout isSubpage={true}>
    <RefundPage />
  </Layout>
), document.getElementById('root')!)
