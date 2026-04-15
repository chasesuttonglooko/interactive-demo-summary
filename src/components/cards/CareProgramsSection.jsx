import CardShell from '../ui/CardShell'
import styles from './CareProgramsSection.module.css'

export default function CareProgramsSection({ programs = [] }) {
  return (
    <div className={styles.section}>
      <span className={styles.sectionTitle}>Care Programs</span>

      <div className={styles.grid}>
        {/* Program cards */}
        <div className={styles.cards}>
          {programs.map((prog) => (
            <CardShell key={prog.id} className={styles.programCard}>
              <a href={prog.manageLink} className={styles.programName}>
                {prog.name}
              </a>
              <p className={styles.programDesc}>{prog.description}</p>
              <a href={prog.manageLink} className={styles.manageLink}>
                Manage Care Programs
              </a>
            </CardShell>
          ))}
        </div>

        {/* Add program */}
        <div className={styles.addWrap}>
          <button className={styles.addBtn}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
            Add Care Program
          </button>
        </div>
      </div>
    </div>
  )
}
