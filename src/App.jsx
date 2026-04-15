import { useState, useMemo } from 'react'

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

export default function App() {
  const [activeTab, setActiveTab] = useState('Summary')
  const [activeScenarioId, setActiveScenarioId] = useState(scenarios[0]?.id)

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
