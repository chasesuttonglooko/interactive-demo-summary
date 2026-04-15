import CardShell from '../ui/CardShell'
import DonutChart from '../ui/DonutChart'
import styles from './InsulinCard.module.css'

export default function InsulinCard({ insulin }) {
  const {
    source, split, insulinPerDay, overridesPct, overridesCount,
    increasePct, increaseCount, decreasePct, decreaseCount,
    bolusPerDay, bolusTypes,
  } = insulin

  return (
    <CardShell>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <span className={styles.title}>Insulin</span>
          <button className={styles.infoBtn} aria-label="Insulin info">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle cx="6.5" cy="6.5" r="5.5" stroke="#9CA3AF" strokeWidth="1.2"/>
              <path d="M6.5 6v3.5M6.5 4v.5" stroke="#9CA3AF" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <span className={styles.source}>From {source}</span>
      </div>

      {/* Basal / Bolus donut + legend */}
      <div className={styles.splitSection}>
        <DonutChart segments={split} size={84} thickness={16} />
        <div className={styles.splitLegend}>
          {split.map((s) => (
            <div key={s.label} className={styles.legendRow}>
              <span className={styles.legendDot} style={{ background: s.color }} />
              <span className={styles.legendLabel}>{s.label}</span>
              <span className={styles.legendPct}>{s.pct}%</span>
              <span className={styles.legendUnits}>({s.units} units)</span>
            </div>
          ))}
        </div>
      </div>

      {/* Insulin stats */}
      <div className={styles.statsList}>
        <div className={styles.statsRow}>
          <span className={styles.statsLabel}>Insulin / Day</span>
          <span className={styles.statsValue}>{insulinPerDay} units</span>
        </div>
        <div className={styles.statsRow}>
          <span className={styles.statsLabel}>Overrides (%)</span>
          <span className={styles.statsValue}>{overridesPct}% ({overridesCount} boluses)</span>
        </div>
        <div className={`${styles.statsRow} ${styles.statsIndent}`}>
          <span className={styles.statsLabel}>Increase</span>
          <span className={styles.statsValue}>{increasePct}% ({increaseCount} boluses)</span>
        </div>
        <div className={`${styles.statsRow} ${styles.statsIndent}`}>
          <span className={styles.statsLabel}>Decrease</span>
          <span className={styles.statsValue}>{decreasePct}% ({decreaseCount} boluses)</span>
        </div>
        <div className={styles.statsRow}>
          <span className={styles.statsLabel}># Bolus / Day</span>
          <span className={styles.statsValue}>{bolusPerDay}</span>
        </div>
      </div>

      <div className={styles.divider} />

      {/* Bolus type breakdown */}
      <div className={styles.splitSection}>
        <DonutChart segments={bolusTypes} size={84} thickness={16} />
        <div className={styles.splitLegend}>
          {bolusTypes.map((s) => (
            <div key={s.label} className={styles.legendRow}>
              <span className={styles.legendDot} style={{ background: s.color }} />
              <span className={styles.legendLabel}>{s.label}</span>
              <span className={styles.legendPct}>{s.pct}%</span>
              <span className={styles.legendUnits}>({s.units} units)</span>
            </div>
          ))}
        </div>
      </div>
    </CardShell>
  )
}
