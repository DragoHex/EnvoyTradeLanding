import { render } from 'solid-js/web'
import { Layout } from '../components/Layout'
import { BrokersPage } from '../pages/BrokersPage'
import '../styles/main.css'

render(() => (
  <Layout isSubpage={true}>
    <BrokersPage />
  </Layout>
), document.getElementById('root')!)
