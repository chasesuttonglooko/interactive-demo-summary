import { useState } from 'react'
import ViewToggle from '../ui/ViewToggle'
import styles from './PeriodSelectorBar.module.css'

export default function PeriodSelectorBar({ period }) {
  const [activeView, setActiveView] = useState(period.activeView)

  return (
    <div className={styles.bar}>
      <div className={styles.inner}>

        {/* Left: period selector + navigation */}
        <div className={styles.left}>
          <div className={styles.rangeDropdown}>
            <span>{period.rangeLabel}</span>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div className={styles.navGroup}>
            <button className={styles.navBtn} aria-label="Previous period">
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                <path d="M5 1L1 5l4 4" stroke="#4A5568" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className={styles.navBtn} aria-label="Next period">
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                <path d="M1 1l4 4-4 4" stroke="#4A5568" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className={styles.dateInfo}>
            <span className={styles.dateRange}>{period.displayRange}</span>
            <span className={styles.dateBreadcrumb}>{period.breadcrumb}</span>
          </div>
        </div>

        {/* Center: data warning */}
        {period.warning && (
          <div className={styles.warning}>
            <span className={styles.warningDot} />
            <span className={styles.warningText}>{period.warning}</span>
            {period.warningLink && (
              <a href="#" className={styles.warningLink}>{period.warningLink}</a>
            )}
          </div>
        )}

        {/* Right: BG / CGM toggle */}
        <div className={styles.right}>
          <ViewToggle active={activeView} onChange={setActiveView} />
        </div>

      </div>
    </div>
  )
}
