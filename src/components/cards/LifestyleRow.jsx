import CardShell from '../ui/CardShell'
import styles from './LifestyleRow.module.css'

function EmptyState({ label }) {
  return (
    <div className={styles.emptyState}>
      No {label.toLowerCase()} data available
    </div>
  )
}

export default function LifestyleRow({ lifestyle }) {
  const { diet, activity, weight, bloodPressure } = lifestyle

  return (
    <CardShell noPadding>
      <div className={styles.grid}>

        {/* Diet */}
        <div className={styles.col}>
          <span className={styles.colTitle}>Diet</span>
          {diet ? (
            <>
              <span className={styles.dateRange}>{diet.dateRange}</span>
              <div className={styles.dietStats}>
                <div className={styles.dietStat}>
                  <span className={styles.dietValue}>{diet.carbsPerDay}<span className={styles.dietUnit}>g</span></span>
                  <span className={styles.dietLabel}>Carbs / Day</span>
                </div>
                <div className={styles.dietStat}>
                  <span className={styles.dietValue}>{diet.entriesPerDay}</span>
                  <span className={styles.dietLabel}>Entries / Day</span>
                </div>
              </div>
            </>
          ) : (
            <EmptyState label="diet" />
          )}
        </div>

        <div className={styles.sep} />

        {/* Activity */}
        <div className={styles.col}>
          <span className={styles.colTitle}>Activity</span>
          {activity ? (
            <span>{activity}</span>
          ) : (
            <EmptyState label="activity" />
          )}
        </div>

        <div className={styles.sep} />

        {/* Weight */}
        <div className={styles.col}>
          <span className={styles.colTitle}>Weight</span>
          {weight ? (
            <span>{weight}</span>
          ) : (
            <EmptyState label="weight" />
          )}
        </div>

        <div className={styles.sep} />

        {/* Blood Pressure */}
        <div className={styles.col}>
          <span className={styles.colTitle}>Blood Pressure</span>
          {bloodPressure ? (
            <span>{bloodPressure}</span>
          ) : (
            <EmptyState label="blood pressure" />
          )}
        </div>

      </div>
    </CardShell>
  )
}
