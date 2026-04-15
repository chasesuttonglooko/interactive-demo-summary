import Tag from '../ui/Tag'
import styles from './PatientHeader.module.css'

export default function PatientHeader({ patient }) {
  const { name, dob, mrn, diagnosisType, tags, deviceBadges, lastSync } = patient

  return (
    <div className={styles.header}>
      <div className={styles.inner}>

        {/* Row 1: back + name + actions */}
        <div className={styles.topRow}>
          <div className={styles.nameGroup}>
            <button className={styles.backBtn} aria-label="Back">
              <svg width="7" height="12" viewBox="0 0 7 12" fill="none">
                <path d="M6 1L1 6l5 5" stroke="#4A5568" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h1 className={styles.patientName}>{name}</h1>
            <button className={styles.iconBtn} aria-label="Patient info">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6" stroke="#9CA3AF" strokeWidth="1.3"/>
                <path d="M7 6.5v4M7 4.5v.5" stroke="#9CA3AF" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <div className={styles.actions}>
            {/* Action icon buttons */}
            {[
              <svg key="doc" width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2.5" y="1.5" width="11" height="13" rx="1.5" stroke="#6B7280" strokeWidth="1.3"/><path d="M5 5.5h6M5 8h6M5 10.5h4" stroke="#6B7280" strokeWidth="1.2" strokeLinecap="round"/></svg>,
              <svg key="chart" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 12l3.5-4 3 2.5L12 5l2 2" stroke="#6B7280" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
              <svg key="device" width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="4" y="2" width="8" height="12" rx="2" stroke="#6B7280" strokeWidth="1.3"/><circle cx="8" cy="11" r="1" fill="#6B7280"/></svg>,
              <svg key="more" width="16" height="4" viewBox="0 0 16 4" fill="none"><circle cx="2" cy="2" r="1.5" fill="#6B7280"/><circle cx="8" cy="2" r="1.5" fill="#6B7280"/><circle cx="14" cy="2" r="1.5" fill="#6B7280"/></svg>,
            ].map((icon, i) => (
              <button key={i} className={styles.iconBtn} aria-label="Action">
                {icon}
              </button>
            ))}

            <div className={styles.syncBadge}>
              <span className={styles.syncDot} />
              <span className={styles.syncLabel}>{lastSync}</span>
            </div>

            <button className={styles.iconBtn} aria-label="Power">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v5" stroke="#6B7280" strokeWidth="1.4" strokeLinecap="round"/>
                <path d="M4 3.1A5.5 5.5 0 1 0 10 3.1" stroke="#6B7280" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Row 2: demographics */}
        <div className={styles.demoRow}>
          <span>DOB <strong>{dob}</strong></span>
          <span className={styles.sep}>·</span>
          <span>MRN <strong>{mrn}</strong></span>
          <span className={styles.sep}>·</span>
          <span>Diabetes <strong>{diagnosisType}</strong></span>
        </div>

        {/* Row 3: tags + device badges */}
        <div className={styles.tagRow}>
          {tags.map((tag, i) => (
            <Tag key={i} label={tag.label} variant={tag.variant} />
          ))}
          <span className={styles.divider} />
          {deviceBadges.map((badge) => (
            <span key={badge} className={styles.deviceBadge}>{badge}</span>
          ))}
          <button className={styles.editBtn} aria-label="Edit tags">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M8.5 1.5l2 2-6.5 6.5H2v-2L8.5 1.5z" stroke="#9CA3AF" strokeWidth="1.2" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

      </div>
    </div>
  )
}
