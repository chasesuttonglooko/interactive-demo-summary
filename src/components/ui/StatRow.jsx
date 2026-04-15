import styles from './StatRow.module.css'

/**
 * StatRow
 * A single horizontal row: label (left) + value (right).
 * Used in SystemCard settings section, InsulinCard stats list, etc.
 *
 * Props:
 *   label       — left-side text
 *   value       — right-side text (bold)
 *   sublabel    — optional smaller text below the label
 *   indent      — indent the row (for sub-items)
 *   highlighted — apply scenario-driven visual accent
 *   muted       — render value in muted style
 */
export default function StatRow({
  label,
  value,
  sublabel,
  indent = false,
  highlighted = false,
  muted = false,
}) {
  return (
    <div
      className={`
        ${styles.row}
        ${indent ? styles.indent : ''}
        ${highlighted ? styles.highlighted : ''}
      `.trim()}
    >
      <span className={styles.label}>
        {label}
        {sublabel && <span className={styles.sublabel}>{sublabel}</span>}
      </span>
      <span className={`${styles.value} ${muted ? styles.muted : ''}`}>
        {value}
      </span>
    </div>
  )
}
