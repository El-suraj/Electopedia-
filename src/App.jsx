import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import Layout from './components/Layout'
import InstallPrompt from './components/InstallPrompt'
import Home from './pages/Home'
import Learn from './pages/Learn'
import Topic from './pages/Topic'
import Settings from './pages/Settings'
import { Analytics } from "@vercel/analytics/react"

// ─── Scroll to top on route change ────────────────────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

// ─── App routes ───────────────────────────────────────────────────────────────
function AppRoutes() {
  return (
    <Layout>
      <ScrollToTop />
      <div className="page-enter">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/topic/:id" element={<Topic />} />
          <Route path="/settings" element={<Settings />} />
          {/* Catch-all → Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      <Analytics />
    </Layout>
  )
}

// ─── Root app ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppRoutes />
        <InstallPrompt />
      </BrowserRouter>
    </LanguageProvider>
  )
}
