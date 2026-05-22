import { useEffect } from 'react'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { site } from './content/site'

function DocumentMeta({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = title
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', description)
  }, [title, description])

  return null
}

function App() {
  return (
    <Layout>
      <DocumentMeta title={`${site.name} · Portfolio`} description={site.tagline} />
      <HomePage />
    </Layout>
  )
}

export default App
