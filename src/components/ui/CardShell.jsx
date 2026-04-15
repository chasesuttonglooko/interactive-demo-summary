import styles from './CardShell.module.css'

/**
 * CardShell
 * Base wrapper for all content cards. Provides consistent border,
 * background, radius, and padding. All stat cards compose from this.
 *
 * Props:
 *   className  — additional class(es) to merge onto the root element
 *   noPadding  — omit default inner padding (for cards managing their own)
 *   children
 */
export default function CardShell({ children, className = '', noPadding = false }) {
  return (
    <div className={`${styles.card} ${noPadding ? styles.noPadding : ''} ${className}`}>
      {children}
    </div>
  )
}
