import { useState } from 'react'
import { AlertTriangle, TrendingDown, Activity, CheckCircle2, ChevronDown, ChevronRight, Database, GitBranch, Lightbulb, Target } from 'lucide-react'
import CardShell from '../ui/CardShell'
import styles from './InsightsPatternsCard.module.css'

/**
 * InsightsPatternsCard — Clinical Reasoning Engine
 *
 * Structure:
 * 1. Overall Clinical Summary — high-level synthesized overview
 * 2. Pattern Cards (collapsed) — pattern + severity + brief preview
 * 3. Deep Dive (expanded) — full reasoning chain
 *
 * Props:
 *   overallSummary    — string, synthesized clinical overview
 *   insights          — array of insight objects with reasoning chain
 *   highlightedFields — array of field keys to visually accent (from scenario)
 */
export default function InsightsPatternsCard({ summaryStatus = '', overallSummary = '', insights = [], highlightedFields = [] }) {
  const isHighlighted = (key) => highlightedFields.includes(key)

  if (!insights.length && !overallSummary) {
    return (
      <CardShell className={styles.card}>
        <div className={styles.emptyState}>
          <CheckCircle2 className={styles.emptyIcon} />
          <span className={styles.emptyText}>No actionable patterns identified</span>
          <span className={styles.emptySubtext}>Glucose management appears stable for this period</span>
        </div>
      </CardShell>
    )
  }

  return (
    <CardShell className={styles.card} noPadding>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h2 className={styles.title}>Clinical Insights</h2>
          <span className={styles.poweredBy}>Powered by Panther Framework</span>
        </div>
        {insights.length > 0 && (
          <span className={styles.badge}>{insights.length} Clinical Pattern{insights.length !== 1 ? 's' : ''} Identified</span>
        )}
      </div>

      {/* Overall Clinical Summary */}
      {overallSummary && (
        <div className={styles.summarySection}>
          {summaryStatus && (
            <div className={styles.summaryStatus}>{summaryStatus}</div>
          )}
          <p className={styles.summaryText}>{overallSummary}</p>
        </div>
      )}

      {/* Pattern Cards */}
      {insights.length > 0 && (
        <div className={styles.patternsSection}>
          <div className={styles.patternsList}>
            {insights.map((insight) => (
              <PatternCard
                key={insight.id}
                insight={insight}
                isHighlighted={isHighlighted(insight.id)}
              />
            ))}
          </div>
        </div>
      )}
    </CardShell>
  )
}

/**
 * PatternCard — collapsible pattern with expand/collapse
 */
function PatternCard({ insight, isHighlighted }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { pattern, severity, icon, preview, evidence, ruleMatch, action, rationale } = insight

  const IconComponent = getPatternIcon(icon)
  const ChevronIcon = isExpanded ? ChevronDown : ChevronRight

  return (
    <div className={`${styles.patternCard} ${styles[severity]} ${isHighlighted ? styles.highlighted : ''}`}>
      {/* Collapsed Header — always visible */}
      <button
        className={styles.patternHeader}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <div className={styles.patternLeft}>
          <span className={`${styles.severityDot} ${styles[`dot${capitalize(severity)}`]}`} />
          <span className={`${styles.patternIcon} ${styles[`icon${capitalize(severity)}`]}`}>
            <IconComponent size={16} />
          </span>
          <div className={styles.patternInfo}>
            <span className={styles.patternName}>{pattern}</span>
            <span className={styles.patternPreview}>{preview}</span>
          </div>
        </div>
        <div className={styles.patternRight}>
          <span className={`${styles.severityBadge} ${styles[`badge${capitalize(severity)}`]}`}>
            {getSeverityLabel(severity)}
          </span>
          <span className={styles.expandIcon}>
            <ChevronIcon size={18} />
          </span>
        </div>
      </button>

      {/* Expanded Deep Dive */}
      {isExpanded && (
        <div className={styles.deepDive}>
          {/* Supporting Evidence */}
          <div className={styles.deepDiveSection}>
            <div className={styles.sectionHeader}>
              <Database size={14} className={styles.sectionIcon} />
              <span className={styles.sectionLabel}>Supporting Evidence</span>
            </div>
            <ul className={styles.evidenceList}>
              {evidence.map((item, idx) => (
                <li key={idx} className={styles.evidenceItem}>
                  <span className={styles.evidenceBullet} />
                  <span className={styles.evidenceText}>
                    {item.metric}: <strong className={item.status === 'exceeded' ? styles.exceeded : ''}>{item.value}</strong>
                    {item.threshold && <span className={styles.evidenceThreshold}> ({item.threshold})</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Panther Framework */}
          <div className={styles.deepDiveSection}>
            <div className={styles.sectionHeader}>
              <GitBranch size={14} className={styles.sectionIcon} />
              <span className={styles.sectionLabel}>Panther Framework</span>
            </div>
            <div className={styles.frameworkBlock}>
              <span className={styles.frameworkRule}>{ruleMatch.rule}</span>
            </div>
          </div>

          {/* Recommended Action */}
          <div className={styles.deepDiveSection}>
            <div className={styles.sectionHeader}>
              <Target size={14} className={styles.sectionIcon} />
              <span className={styles.sectionLabel}>Recommended Action</span>
              <span className={styles.actionTypeBadge}>{action.type}</span>
            </div>
            <div className={styles.actionBlock}>
              {action.setting && <span className={styles.actionSetting}>{action.setting}</span>}
              {action.current && action.suggested && (
                <div className={styles.actionChange}>
                  <span className={styles.actionCurrent}>{action.current}</span>
                  <span className={styles.actionArrow}>→</span>
                  <span className={styles.actionSuggested}>{action.suggested}</span>
                </div>
              )}
            </div>
          </div>

          {/* Clinical Rationale */}
          <div className={styles.deepDiveSection}>
            <div className={styles.sectionHeader}>
              <Lightbulb size={14} className={styles.sectionIcon} />
              <span className={styles.sectionLabel}>Clinical Rationale</span>
            </div>
            <p className={styles.rationaleText}>{rationale}</p>
          </div>
        </div>
      )}
    </div>
  )
}

function getPatternIcon(iconType) {
  switch (iconType) {
    case 'hypo': return TrendingDown
    case 'hyper': return AlertTriangle
    case 'adherence': return Activity
    case 'system': return Activity
    default: return AlertTriangle
  }
}

function getSeverityLabel(severity) {
  switch (severity) {
    case 'high': return 'High Priority'
    case 'moderate': return 'Moderate'
    case 'low': return 'Low'
    default: return 'Review'
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
