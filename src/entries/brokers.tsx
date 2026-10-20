import { render } from 'solid-js/web'
import { Layout } from '../components/Layout'
import { BrokersPage } from '../pages/BrokersPage'
import '../styles/main.css'

render(() => (
  <Layout>
    <BrokersPage />
  </Layout>
), document.getElementById('root')!)
