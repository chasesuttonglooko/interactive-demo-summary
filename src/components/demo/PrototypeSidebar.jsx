import { useState } from 'react'
import { Beaker, ChevronRight, Info, Users } from 'lucide-react'
import EngineExplainerModal from './EngineExplainerModal'
import styles from './PrototypeSidebar.module.css'

/**
 * PrototypeSidebar — Demo Control Panel
 *
 * Provides:
 * - Scenario selector for switching patient data
 * - Engine explainer modal access
 *
 * Props:
 *   scenarios       — array of scenario objects
 *   activeScenario  — currently selected scenario id
 *   onScenarioChange — callback when scenario is selected
 */
export default function PrototypeSidebar({ scenarios = [], activeScenario, onScenarioChange }) {
  const [showExplainer, setShowExplainer] = useState(false)

  return (
    <>
      <aside className={styles.sidebar}>
        {/* Header */}
        <div className={styles.header}>
          <Beaker size={16} className={styles.headerIcon} />
          <span className={styles.headerTitle}>Prototype Controls</span>
        </div>

        {/* Scenario Selector */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <Users size={14} className={styles.sectionIcon} />
            <span className={styles.sectionTitle}>Scenario Selector</span>
          </div>
          <div className={styles.scenarioList}>
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                className={`${styles.scenarioItem} ${activeScenario === scenario.id ? styles.active : ''}`}
                onClick={() => onScenarioChange(scenario.id)}
              >
                <div className={styles.scenarioContent}>
                  <span className={styles.scenarioLabel}>{scenario.label}</span>
                  <span className={styles.scenarioDesc}>{scenario.description}</span>
                </div>
                <ChevronRight size={14} className={styles.scenarioChevron} />
              </button>
            ))}
          </div>
        </div>

        {/* Engine Explainer */}
        <div className={styles.section}>
          <button
            className={styles.explainerButton}
            onClick={() => setShowExplainer(true)}
          >
            <Info size={16} className={styles.explainerIcon} />
            <span className={styles.explainerText}>How This Works</span>
          </button>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <span className={styles.footerText}>Demo Environment</span>
          <span className={styles.footerVersion}>v0.1.0</span>
        </div>
      </aside>

      {/* Explainer Modal */}
      {showExplainer && (
        <EngineExplainerModal onClose={() => setShowExplainer(false)} />
      )}
    </>
  )
}
