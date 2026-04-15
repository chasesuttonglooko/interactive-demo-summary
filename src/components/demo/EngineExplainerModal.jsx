import { X, Database, Cpu, GitBranch, Target, MessageSquare } from 'lucide-react'
import styles from './EngineExplainerModal.module.css'

/**
 * EngineExplainerModal — System Architecture Explainer
 *
 * Shows the clinical decision support workflow:
 * 1. Patient + Device Data Ingestion
 * 2. Pattern Detection Engine
 * 3. Panther Framework Mapping
 * 4. Recommendation Generation
 * 5. Explainable Clinical Insights Output
 */
export default function EngineExplainerModal({ onClose }) {
  const steps = [
    {
      icon: Database,
      title: 'Patient + Device Data Ingestion',
      description: 'CGM readings, insulin delivery, pump settings, and patient context are aggregated from connected devices and clinical records.',
    },
    {
      icon: Cpu,
      title: 'Pattern Detection Engine',
      description: 'Time-series analysis identifies clinically significant patterns: hypoglycemia timing, hyperglycemia trends, adherence gaps, and variability metrics.',
    },
    {
      icon: GitBranch,
      title: 'Panther Framework Mapping',
      description: 'Detected patterns are mapped against the Panther clinical decision framework — evidence-based rules developed with endocrinology expertise.',
    },
    {
      icon: Target,
      title: 'Recommendation Generation',
      description: 'Matched rules generate specific, actionable recommendations: therapy adjustments, behavioral guidance, or monitoring priorities.',
    },
    {
      icon: MessageSquare,
      title: 'Explainable Clinical Insights',
      description: 'Recommendations are presented with full reasoning chain — supporting evidence, framework mapping, and clinical rationale — enabling informed decision-making.',
    },
  ]

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h2 className={styles.title}>Clinical Decision Support Workflow</h2>
            <p className={styles.subtitle}>How the Panther-powered engine generates insights</p>
          </div>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Workflow Steps */}
        <div className={styles.content}>
          <div className={styles.workflow}>
            {steps.map((step, index) => (
              <div key={index} className={styles.step}>
                <div className={styles.stepConnector}>
                  <div className={styles.stepNumber}>{index + 1}</div>
                  {index < steps.length - 1 && <div className={styles.stepLine} />}
                </div>
                <div className={styles.stepContent}>
                  <div className={styles.stepIcon}>
                    <step.icon size={18} />
                  </div>
                  <div className={styles.stepText}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDesc}>{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <p className={styles.footerText}>
            This prototype demonstrates the clinical reasoning engine concept.
            Production implementation would integrate with real patient data sources and undergo clinical validation.
          </p>
        </div>
      </div>
    </div>
  )
}
