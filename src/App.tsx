import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AboutPage } from './pages/AboutPage'
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
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            element={
              <>
                <DocumentMeta
                  title={`${site.name} · Portfolio`}
                  description={site.tagline}
                />
                <HomePage />
              </>
            }
          />
          <Route
            path="about"
            element={
              <>
                <DocumentMeta
                  title={`About · ${site.name}`}
                  description={`About ${site.name} and how to get in touch.`}
                />
                <AboutPage />
              </>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
