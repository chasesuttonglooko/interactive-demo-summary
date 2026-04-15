import { useState, useMemo, useEffect } from 'react'

// Layout
import GlobalNav       from './components/layout/GlobalNav'
import PatientHeader   from './components/layout/PatientHeader'

// Navigation
import TabNav            from './components/navigation/TabNav'
import PeriodSelectorBar from './components/navigation/PeriodSelectorBar'

// Cards
import InsightsPatternsCard from './components/cards/InsightsPatternsCard'
import GlucoseCard          from './components/cards/GlucoseCard'
import InsulinCard          from './components/cards/InsulinCard'
import SystemCard           from './components/cards/SystemCard'
import AGPChart             from './components/cards/AGPChart'
import LifestyleRow         from './components/cards/LifestyleRow'
import CareProgramsSection  from './components/cards/CareProgramsSection'

// Demo Controls
import PrototypeSidebar from './components/demo/PrototypeSidebar'

// Scenario data
import { scenarios } from './data/scenarios'
import { mockCarePrograms } from './data/mockPatient'

import styles from './App.module.css'

const PASSWORD = 'pantherglooko'

function PasswordGate({ onSuccess }) {
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input === PASSWORD) {
      sessionStorage.setItem('authed', 'true')
      onSuccess()
    } else {
      setError(true)
      setInput('')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1a1d23 0%, #12151a 100%)',
    }}>
      <form onSubmit={handleSubmit} style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '320px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#e4e7eb', fontSize: '20px', fontWeight: 600, margin: 0 }}>
            Interactive Prototype
          </h1>
          <h2 style={{ color: '#a5b4fc', fontSize: '14px', fontWeight: 500, margin: '4px 0 0' }}>
            Initial Decision Support
          </h2>
          <p style={{ color: '#6b7280', fontSize: '13px', marginTop: '8px' }}>
            Enter password to continue
          </p>
        </div>
        <input
          type="password"
          value={input}
          onChange={(e) => { setInput(e.target.value); setError(false) }}
          placeholder="Password"
          autoFocus
          style={{
            padding: '12px 16px',
            fontSize: '14px',
            background: 'rgba(255,255,255,0.05)',
            border: error ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            color: '#e4e7eb',
            outline: 'none',
          }}
        />
        {error && (
          <p style={{ color: '#ef4444', fontSize: '12px', margin: '-12px 0 0', textAlign: 'center' }}>
            Incorrect password
          </p>
        )}
        <button type="submit" style={{
          padding: '12px',
          fontSize: '14px',
          fontWeight: 600,
          background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
          border: 'none',
          borderRadius: '8px',
          color: 'white',
          cursor: 'pointer',
        }}>
          Enter
        </button>
      </form>
    </div>
  )
}

export default function App() {
  const [isAuthed, setIsAuthed] = useState(() => sessionStorage.getItem('authed') === 'true')
  const [activeTab, setActiveTab] = useState('Summary')
  const [activeScenarioId, setActiveScenarioId] = useState(scenarios[0]?.id)

  if (!isAuthed) {
    return <PasswordGate onSuccess={() => setIsAuthed(true)} />
  }

  // Get the active scenario data
  const scenario = useMemo(() => {
    return scenarios.find((s) => s.id === activeScenarioId) || scenarios[0]
  }, [activeScenarioId])

  return (
    <div className={styles.app}>
      <div className={styles.mainArea}>
        <GlobalNav />
        <PatientHeader patient={scenario.patient} />
        <TabNav activeTab={activeTab} onChange={setActiveTab} />

        <main className={styles.main}>
          <div className={styles.content}>

            {activeTab === 'Summary' && (
              <>
                <PeriodSelectorBar period={scenario.period} />

                <div className={styles.pageBody}>

                  {/* Full-width clinical insights */}
                  <InsightsPatternsCard
                    summaryStatus={scenario.summaryStatus}
                    overallSummary={scenario.overallSummary}
                    insights={scenario.insights}
                  />

                  {/* Three-column stats row */}
                  <div className={styles.statsRow}>
                    <GlucoseCard glucose={scenario.glucose} />
                    <InsulinCard insulin={scenario.insulin} />
                    <SystemCard  system={scenario.system}   />
                  </div>

                  {/* Full-width AGP chart */}
                  <AGPChart />

                  {/* Four-column lifestyle row */}
                  <LifestyleRow lifestyle={scenario.lifestyle} />

                  {/* Care programs */}
                  <CareProgramsSection programs={mockCarePrograms} />

                </div>
              </>
            )}

            {activeTab !== 'Summary' && (
              <div className={styles.tabPlaceholder}>
                <span className={styles.tabPlaceholderText}>
                  {activeTab} — coming soon
                </span>
              </div>
            )}

          </div>
        </main>
      </div>

      {/* Demo Control Sidebar */}
      <PrototypeSidebar
        scenarios={scenarios}
        activeScenario={activeScenarioId}
        onScenarioChange={setActiveScenarioId}
      />
    </div>
  )
}
