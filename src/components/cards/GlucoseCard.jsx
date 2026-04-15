import CardShell from '../ui/CardShell'
import styles from './GlucoseCard.module.css'

function DistributionRow({ item }) {
  return (
    <div className={`${styles.distRow} ${item.indent ? styles.distIndent : ''}`}>
      <span
        className={styles.distSwatch}
        style={{ background: `var(${item.colorVar})` }}
      />
      <span className={styles.distLabel}>
        {item.label}
        <span className={styles.distSublabel}> {item.sublabel}</span>
      </span>
      <span className={styles.distPct}>{item.pct}%</span>
    </div>
  )
}

export default function GlucoseCard({ glucose }) {
  const { source, distribution, timeCGMActivePct, timeCGMActiveDays,
          gmi, gmiMmol, average, median, highest, lowest, sd, cv } = glucose

  return (
    <CardShell>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.title}>Glucose</span>
        <span className={styles.source}>From {source}</span>
      </div>

      {/* Distribution list */}
      <div className={styles.distribution}>
        {distribution.map((item, i) => (
          <DistributionRow key={i} item={item} />
        ))}
      </div>

      {/* CGM active */}
      <div className={styles.cgmActive}>
        <span className={styles.cgmLabel}>% Time CGM active</span>
        <span className={styles.cgmValue}>
          <strong>{timeCGMActivePct}%</strong>
          <span className={styles.cgmDays}> ({timeCGMActiveDays})</span>
        </span>
      </div>

      <div className={styles.divider} />

      {/* Stats grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>GMI</span>
          <span className={styles.statValue}>{gmi}%</span>
          <span className={styles.statSub}>({gmiMmol} mmol/mol)</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Median</span>
          <span className={styles.statValue}>{median} <span className={styles.unit}>mg/dL</span></span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Average</span>
          <span className={styles.statValue}>{average} <span className={styles.unit}>mg/dL</span></span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Highest</span>
          <span className={styles.statValue}>{highest} <span className={styles.unit}>mg/dL</span></span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>SD</span>
          <span className={styles.statValue}>{sd} <span className={styles.unit}>mg/dL</span></span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Lowest</span>
          <span className={styles.statValue}>{lowest} <span className={styles.unit}>mg/dL</span></span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>CV</span>
          <span className={styles.statValue}>{cv}%</span>
        </div>
      </div>
    </CardShell>
  )
}
