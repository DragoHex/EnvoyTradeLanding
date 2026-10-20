import { render } from 'solid-js/web'
import { Layout } from '../components/Layout'
import { RiskDisclosurePage } from '../pages/RiskDisclosurePage'
import '../styles/main.css'

render(() => (
  <Layout isSubpage={true}>
    <RiskDisclosurePage />
  </Layout>
), document.getElementById('root')!)
