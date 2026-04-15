import CardShell from '../ui/CardShell'
import ModeBar from '../ui/ModeBar'
import StatRow from '../ui/StatRow'
import styles from './SystemCard.module.css'

/**
 * SystemCard — Omnipod 5 System
 *
 * Designed to accept a `system` prop matching the mockSystem data shape.
 * When scenario wiring is added, pass the scenario's omnipod5 data here.
 *
 * The `highlightedFields` array (from scenario ui.highlightedFields) drives
 * the visual accent on individual rows — no hardcoded visual logic needed.
 */
export default function SystemCard({ system }) {
  const { deviceName, activeTime, modes, settings, podChanges, highlightedFields = [] } = system

  const isHighlighted = (key) => highlightedFields.includes(key)

  // Mode bar segments: automated (blue) | activity (orange) | manual (gray)
  // Activity mode is a sub-state of automated, displayed as its own segment
  // so the bar clearly shows the three operational zones.
  const automatedOnly = modes.automated.pct - modes.activity.pct
  const modeBarSegments = [
    { pct: automatedOnly,         color: 'var(--color-mode-auto)',     label: 'Automated' },
    { pct: modes.activity.pct,    color: 'var(--color-mode-activity)', label: 'Activity' },
    { pct: modes.manual.pct,      color: 'var(--color-mode-manual)',   label: 'Manual' },
  ]

  return (
    <CardShell>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.title}>{deviceName}</span>
      </div>

      {/* System active time */}
      <div className={styles.activeTimeRow}>
        <span className={styles.activeTimeLabel}>System active time</span>
        <span className={styles.activeTimeValue}>{activeTime.label}</span>
      </div>

      {/* Mode bar */}
      <div className={styles.modeBarWrap}>
        <ModeBar segments={modeBarSegments} />
      </div>

      {/* Mode rows */}
      <div className={styles.modeList}>
        {/* Automated mode on */}
        <div className={`${styles.modeRow} ${isHighlighted('automatedModePct') ? styles.highlighted : ''}`}>
          <span className={styles.modeIndicator} style={{ background: 'var(--color-mode-auto)' }} />
          <span className={styles.modeLabel}>Automated</span>
          <span className={styles.modeValue}>
            <strong>{modes.automated.pct}%</strong>
            <span className={styles.modeTime}> ({modes.automated.timeLabel})</span>
          </span>
        </div>

        {/* Activity mode — sub-row */}
        <div className={`${styles.modeRow} ${styles.modeSubRow} ${isHighlighted('activityModePct') ? styles.highlighted : ''}`}>
          <span className={styles.modeIndicator} style={{ background: 'var(--color-mode-activity)' }} />
          <span className={styles.modeLabel}>Activity</span>
          <span className={styles.modeValue}>
            <strong>{modes.activity.pct}%</strong>
            <span className={styles.modeTime}> ({modes.activity.timeLabel})</span>
          </span>
        </div>

        {/* Manual mode off */}
        <div className={`${styles.modeRow} ${isHighlighted('manualModePct') ? styles.highlighted : ''}`}>
          <span className={styles.modeIndicator} style={{ background: 'var(--color-mode-manual)' }} />
          <span className={styles.modeLabel}>Manual</span>
          <span className={styles.modeValue}>
            <strong>{modes.manual.pct}%</strong>
            <span className={styles.modeTime}> ({modes.manual.timeLabel})</span>
          </span>
        </div>
      </div>

      <div className={styles.divider} />

      {/* Settings */}
      <div className={styles.settingsList}>
        <StatRow
          label="Target Glucose"
          value={`${settings.targetGlucose.value} ${settings.targetGlucose.unit}`}
          highlighted={isHighlighted('targetGlucose')}
        />
        <StatRow
          label="I:C Ratio"
          sublabel={settings.icRatio.unit}
          value={settings.icRatio.value}
          highlighted={isHighlighted('icRatio')}
        />
        <StatRow
          label="Correction Factor"
          sublabel={settings.correctionFactor.unit}
          value={settings.correctionFactor.value}
          highlighted={isHighlighted('correctionFactor')}
        />
      </div>

      <div className={styles.divider} />

      {/* Pod changes */}
      <StatRow
        label="Pod changes"
        value={String(podChanges)}
        highlighted={isHighlighted('podChanges')}
      />
    </CardShell>
  )
}
