import { render } from 'solid-js/web'
import { Layout } from '../components/Layout'
import { HomePage } from '../pages/HomePage'
import '../styles/main.css'

render(() => (
  <Layout isSubpage={false}>
    <HomePage />
  </Layout>
), document.getElementById('root')!)
