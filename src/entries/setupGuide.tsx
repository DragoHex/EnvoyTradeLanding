import { render } from 'solid-js/web'
import { Layout } from '../components/Layout'
import { SetupGuidePage } from '../pages/SetupGuidePage'
import '../styles/main.css'

render(() => (
  <Layout isSubpage={true}>
    <SetupGuidePage />
  </Layout>
), document.getElementById('root')!)
