import styles from './Tag.module.css'

/**
 * Tag
 * Colored pill badge used in PatientHeader.
 * variant: 'teal' | 'blue' | 'pink' | 'gray'
 */
export default function Tag({ label, variant = 'gray' }) {
  return (
    <span className={`${styles.tag} ${styles[variant]}`}>
      {label}
    </span>
  )
}
