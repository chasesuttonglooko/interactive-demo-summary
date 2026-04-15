import styles from './ModeBar.module.css'

/**
 * ModeBar
 * Segmented horizontal bar showing mode time proportions.
 * segments: Array<{ pct: number, color: string, label?: string }>
 */
export default function ModeBar({ segments = [] }) {
  return (
    <div className={styles.bar}>
      {segments.map((seg, i) => (
        <div
          key={i}
          className={styles.segment}
          style={{ width: `${seg.pct}%`, background: seg.color }}
          title={seg.label ? `${seg.label}: ${seg.pct}%` : `${seg.pct}%`}
        />
      ))}
    </div>
  )
}
