import styles from './ViewToggle.module.css'

/**
 * ViewToggle
 * Two-button toggle for BG / CGM view selection.
 * active: 'BG' | 'CGM'
 * onChange: (value) => void
 */
export default function ViewToggle({ active = 'CGM', onChange }) {
  const options = ['BG', 'CGM']
  return (
    <div className={styles.toggle}>
      {options.map(opt => (
        <button
          key={opt}
          className={`${styles.btn} ${active === opt ? styles.active : ''}`}
          onClick={() => onChange?.(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}
