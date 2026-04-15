import styles from './GlobalNav.module.css'

export default function GlobalNav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>

        {/* Left: logo + patient search */}
        <div className={styles.left}>
          <span className={styles.logo}>gloo<span className={styles.logoO}>k</span>o</span>

          <div className={styles.patientDropdown}>
            <span className={styles.dropdownLabel}>Name</span>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="6" cy="6" r="4.5" stroke="#9CA3AF" strokeWidth="1.4"/>
              <path d="M10 10l2.5 2.5" stroke="#9CA3AF" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Enter a patient name"
            />
          </div>
        </div>

        {/* Right: clinic info + user avatar */}
        <div className={styles.right}>
          <div className={styles.clinicInfo}>
            <span className={styles.clinicName}>[Clinic Name]</span>
            <span className={styles.clinicCode}>ProConnect Code: 123456</span>
          </div>
          <div className={styles.avatar}>FL</div>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className={styles.avatarChevron}>
            <path d="M1 1l4 4 4-4" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

      </div>
    </nav>
  )
}
