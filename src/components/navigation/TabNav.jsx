import { useState } from 'react'
import styles from './TabNav.module.css'

const TABS = ['Summary', 'Graphs', 'Logbook', 'History', 'Devices']

export default function TabNav({ activeTab = 'Summary', onChange }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <nav className={styles.nav}>
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
              onClick={() => onChange?.(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
