// ============================================================
// Demo Scenarios — Glooko PANTHER Clinical Prototype
// Each scenario represents a complete patient state that can be
// swapped into the dashboard for demo purposes.
//
// PANTHER 8-Pattern Taxonomy (from PANTHER_REFERENCE.docx §6):
// Hypoglycemia: (1) Fasting/Overnight, (2) Around mealtime,
//               (3) Where low follows high, (4) Around or after exercise
// Hyperglycemia: (1) Fasting/Overnight, (2) Around mealtime,
//                (3) Where high follows low, (4) After correction bolus
// ============================================================

export const scenarios = [
  {
    id: 'scenario-a',
    label: 'Patient A',
    description: 'Fasting/Overnight Hypo + Around Mealtime Hyper',
    patient: {
      name: 'John Smith',
      dob: '04/11/1978',
      mrn: '1827436193',
      diagnosisType: 'Type 1',
      tags: [
        { label: 'Omnipod 5', variant: 'teal' },
        { label: 'L2 Hypo', variant: 'pink' },
      ],
      deviceBadges: ['omnipod5', 'cgm', 'rpm'],
      lastSync: 'Yesterday',
    },
    period: {
      rangeLabel: '1 Week',
      displayRange: 'Thu, Jan 29 – Wed, Feb 04, 2026',
      breadcrumb: '90 days → 1 week',
      warning: 'This period contains 1 day without insulin data.',
      warningLink: 'Learn more',
      activeView: 'CGM',
    },
    glucose: {
      source: 'CGM',
      distribution: [
        { label: 'Very High', sublabel: '>250 mg/dL', pct: 17, colorVar: '--color-glucose-very-high' },
        { label: 'High', sublabel: '>180 mg/dL', pct: 14, colorVar: '--color-glucose-high' },
        { label: 'In Range', sublabel: '70–180 mg/dL', pct: 64, colorVar: '--color-glucose-in-range' },
        { label: 'In Tight Range', sublabel: '70–140 mg/dL', pct: 42, colorVar: '--color-glucose-tight-range', indent: true },
        { label: 'Low', sublabel: '<70 mg/dL', pct: 4, colorVar: '--color-glucose-low' },
        { label: 'Very Low', sublabel: '<54 mg/dL', pct: 1, colorVar: '--color-glucose-very-low' },
      ],
      timeCGMActivePct: 100,
      timeCGMActiveDays: '7 days',
      gmi: 7.3,
      gmiMmol: 56.3,
      average: 168,
      median: 162,
      highest: 342,
      lowest: 58,
      sd: 52,
      cv: 30.9,
    },
    insulin: {
      source: 'Insulin Pump',
      split: [
        { label: 'Basal / Day', pct: 71, units: 35, color: 'var(--color-basal)' },
        { label: 'Bolus / Day', pct: 29, units: 14.6, color: 'var(--color-bolus)' },
      ],
      insulinPerDay: 49.6,
      overridesPct: 6,
      overridesCount: 5,
      increasePct: 3.6,
      increaseCount: 3,
      decreasePct: 2.4,
      decreaseCount: 2,
      bolusPerDay: 6.2,
      bolusTypes: [
        { label: 'Meal', pct: 90.2, units: 13.17, color: 'var(--color-bolus-meal)' },
        { label: 'Correction', pct: 8.1, units: 1.18, color: 'var(--color-bolus-correction)' },
        { label: 'Manual', pct: 1.7, units: 0.25, color: 'var(--color-bolus-manual)' },
      ],
    },
    system: {
      deviceName: 'Omnipod 5 System',
      activeTime: { label: '6d 22h', pct: 99 },
      modes: {
        automated: { pct: 87, timeLabel: '20h 53m avg' },
        activity: { pct: 8, count: 4, timeLabel: '1h 55m avg' },
        manual: { pct: 5, timeLabel: '1h 12m' },
      },
      settings: {
        targetGlucose: { value: 110, unit: 'mg/dL' },
        icRatio: { value: '1:10', unit: 'g/unit' },
        correctionFactor: { value: '1:50', unit: 'mg/dL per unit' },
      },
      podChanges: 3,
      highlightedFields: [],
    },
    lifestyle: {
      diet: { dateRange: 'Jan 29 – Feb 04, 2026', carbsPerDay: 144.7, entriesPerDay: 5.8 },
      activity: null,
      weight: null,
      bloodPressure: null,
    },
    summaryStatus: 'Moderate Control — Optimization Recommended',
    overallSummary:
      'Patient demonstrates moderate glycemic control with two primary optimization opportunities identified. ' +
      'Fasting/overnight hypoglycemia and around-mealtime hyperglycemia are contributing most significantly to ' +
      'sub-target Time in Range performance (64% vs. 70% goal). Strong automated mode adherence (87%) ' +
      'suggests intervention should focus on therapy settings rather than behavioral correction.',
    insights: [
      {
        id: 'overnight-hypo',
        pattern: 'Fasting/Overnight Hypoglycemia',
        severity: 'high',
        icon: 'hypo',
        preview: '2 overnight low events detected; overnight TBR exceeds recommended threshold.',
        evidence: [
          { metric: 'Hypoglycemic events', value: '2 episodes below 70 mg/dL', threshold: 'between 2–4 AM', status: 'exceeded' },
          { metric: 'Overnight Time Below Range', value: '5%', threshold: 'target <4%', status: 'exceeded' },
          { metric: 'PANTHER clinical threshold', value: '<4% overnight TBR' },
        ],
        ruleMatch: { protocol: 'PANTHER OP5', rule: 'Fasting/Overnight Hypoglycemia' },
        action: {
          type: 'Therapy Adjustment',
          setting: 'Target Glucose (Overnight)',
          current: '110 mg/dL',
          suggested: '150 mg/dL',
        },
        rationale: 'Higher overnight target reduces insulin aggressiveness during sleep, lowering nocturnal hypoglycemia risk when symptom response is limited.',
      },
      {
        id: 'mealtime-hyper',
        pattern: 'Around Mealtime Hyperglycemia',
        severity: 'moderate',
        icon: 'hyper',
        preview: 'Recurring glucose spikes 1–3 hrs after lunch and dinner; average peak 215 mg/dL.',
        evidence: [
          { metric: 'Average post-meal peak', value: '215 mg/dL', threshold: 'target <180 mg/dL', status: 'exceeded' },
          { metric: 'Peak timing', value: '1–3 hours post-meal', threshold: 'consistent pattern' },
          { metric: 'Affected meals', value: 'Lunch and dinner', threshold: 'recurring' },
        ],
        ruleMatch: { protocol: 'PANTHER OP5', rule: 'Around Mealtime Hyperglycemia' },
        action: {
          type: 'Therapy Adjustment + Education',
          setting: 'I:C Ratio',
          current: '1:10g',
          suggested: '1:8g',
        },
        rationale: 'Stronger I:C ratio increases meal bolus coverage. Pre-bolusing 10–15 minutes before meals aligns insulin action with glucose rise from food intake.',
      },
    ],
  },

  {
    id: 'scenario-b',
    label: 'Patient B',
    description: 'Fasting/Overnight Hyper + After Correction Bolus Hyper',
    patient: {
      name: 'Sarah Johnson',
      dob: '08/22/1985',
      mrn: '2938471056',
      diagnosisType: 'Type 1',
      tags: [
        { label: 'Omnipod 5', variant: 'teal' },
        { label: 'High A1C', variant: 'orange' },
      ],
      deviceBadges: ['omnipod5', 'cgm'],
      lastSync: 'Today',
    },
    period: {
      rangeLabel: '2 Weeks',
      displayRange: 'Mon, Jan 20 – Sun, Feb 02, 2026',
      breadcrumb: '90 days → 2 weeks',
      warning: null,
      warningLink: null,
      activeView: 'CGM',
    },
    glucose: {
      source: 'CGM',
      distribution: [
        { label: 'Very High', sublabel: '>250 mg/dL', pct: 18, colorVar: '--color-glucose-very-high' },
        { label: 'High', sublabel: '>180 mg/dL', pct: 26, colorVar: '--color-glucose-high' },
        { label: 'In Range', sublabel: '70–180 mg/dL', pct: 54, colorVar: '--color-glucose-in-range' },
        { label: 'In Tight Range', sublabel: '70–140 mg/dL', pct: 32, colorVar: '--color-glucose-tight-range', indent: true },
        { label: 'Low', sublabel: '<70 mg/dL', pct: 2, colorVar: '--color-glucose-low' },
        { label: 'Very Low', sublabel: '<54 mg/dL', pct: 0, colorVar: '--color-glucose-very-low' },
      ],
      timeCGMActivePct: 96,
      timeCGMActiveDays: '13 days',
      gmi: 7.8,
      gmiMmol: 61.7,
      average: 188,
      median: 176,
      highest: 342,
      lowest: 72,
      sd: 58,
      cv: 30.9,
    },
    insulin: {
      source: 'Insulin Pump',
      split: [
        { label: 'Basal / Day', pct: 68, units: 38, color: 'var(--color-basal)' },
        { label: 'Bolus / Day', pct: 32, units: 18.2, color: 'var(--color-bolus)' },
      ],
      insulinPerDay: 56.2,
      overridesPct: 2,
      overridesCount: 2,
      increasePct: 1.2,
      increaseCount: 1,
      decreasePct: 0.8,
      decreaseCount: 1,
      bolusPerDay: 5.4,
      bolusTypes: [
        { label: 'Meal', pct: 85.3, units: 15.53, color: 'var(--color-bolus-meal)' },
        { label: 'Correction', pct: 12.8, units: 2.33, color: 'var(--color-bolus-correction)' },
        { label: 'Manual', pct: 1.9, units: 0.35, color: 'var(--color-bolus-manual)' },
      ],
    },
    system: {
      deviceName: 'Omnipod 5 System',
      activeTime: { label: '13d 18h', pct: 98 },
      modes: {
        automated: { pct: 89, timeLabel: '21h 22m avg' },
        activity: { pct: 6, count: 3, timeLabel: '1h 26m avg' },
        manual: { pct: 5, timeLabel: '1h 12m' },
      },
      settings: {
        targetGlucose: { value: 120, unit: 'mg/dL' },
        icRatio: { value: '1:12', unit: 'g/unit' },
        correctionFactor: { value: '1:60', unit: 'mg/dL per unit' },
      },
      podChanges: 5,
      highlightedFields: ['targetGlucose', 'correctionFactor'],
    },
    lifestyle: {
      diet: { dateRange: 'Jan 20 – Feb 02, 2026', carbsPerDay: 168.3, entriesPerDay: 4.2 },
      activity: null,
      weight: null,
      bloodPressure: null,
    },
    summaryStatus: 'Suboptimal Control — Adjustments Recommended',
    overallSummary:
      'Patient shows elevated overnight glucose and inadequate correction bolus effectiveness. ' +
      'Fasting glucose averaging 165 mg/dL with evident dawn phenomenon, and post-correction glucose often remaining above target. ' +
      'Strong automated mode adherence (89%) suggests therapy settings should be optimized rather than behavioral intervention.',
    insights: [
      {
        id: 'overnight-hyper',
        pattern: 'Fasting/Overnight Hyperglycemia',
        severity: 'high',
        icon: 'hyper',
        preview: 'Overnight TAR 42%; fasting glucose averaging 165 mg/dL with dawn phenomenon.',
        evidence: [
          { metric: 'Overnight Time Above Range', value: '42%', threshold: 'target <25%', status: 'exceeded' },
          { metric: 'Fasting glucose (morning)', value: '165 mg/dL avg', threshold: 'target <130 mg/dL', status: 'exceeded' },
          { metric: 'Dawn phenomenon contribution', value: 'Evident 4–7 AM rise', threshold: 'consistent pattern' },
        ],
        ruleMatch: { protocol: 'PANTHER OP5', rule: 'Fasting/Overnight Hyperglycemia' },
        action: {
          type: 'Therapy Adjustment',
          setting: 'Target Glucose',
          current: '120 mg/dL',
          suggested: '110 mg/dL',
        },
        rationale: 'Lowering overnight target glucose allows the algorithm to deliver more insulin during fasting hours, counteracting dawn phenomenon and reducing elevated morning glucose.',
      },
      {
        id: 'post-correction-hyper',
        pattern: 'After Correction Bolus Hyperglycemia',
        severity: 'moderate',
        icon: 'hyper',
        preview: 'Correction boluses not adequately reducing elevated glucose; glucose often remains >180 mg/dL post-correction.',
        evidence: [
          { metric: 'Correction bolus frequency', value: '2.3 per day', threshold: 'elevated' },
          { metric: 'Post-correction glucose', value: 'Often remains >180 mg/dL', threshold: '2hr post-correction', status: 'exceeded' },
          { metric: 'Current correction factor', value: '1:60', threshold: 'conservative for patient profile' },
        ],
        ruleMatch: { protocol: 'PANTHER OP5', rule: 'After Correction Bolus Hyperglycemia' },
        action: {
          type: 'Therapy Adjustment',
          setting: 'Correction Factor',
          current: '1:60',
          suggested: '1:45',
        },
        rationale: 'Strengthening correction factor from 1:60 to 1:45 increases correction bolus impact, enabling more effective reduction of elevated glucose when corrections are needed.',
      },
    ],
  },

  {
    id: 'scenario-c',
    label: 'Patient C',
    description: 'Where Low Follows High (Overcorrection)',
    patient: {
      name: 'Michael Chen',
      dob: '12/03/1992',
      mrn: '3847561029',
      diagnosisType: 'Type 1',
      tags: [
        { label: 'Omnipod 5', variant: 'teal' },
        { label: 'Hypo Risk', variant: 'pink' },
      ],
      deviceBadges: ['omnipod5', 'cgm'],
      lastSync: 'Today',
    },
    period: {
      rangeLabel: '2 Weeks',
      displayRange: 'Mon, Jan 20 – Sun, Feb 02, 2026',
      breadcrumb: '90 days → 2 weeks',
      warning: null,
      warningLink: null,
      activeView: 'CGM',
    },
    glucose: {
      source: 'CGM',
      distribution: [
        { label: 'Very High', sublabel: '>250 mg/dL', pct: 14, colorVar: '--color-glucose-very-high' },
        { label: 'High', sublabel: '>180 mg/dL', pct: 18, colorVar: '--color-glucose-high' },
        { label: 'In Range', sublabel: '70–180 mg/dL', pct: 60, colorVar: '--color-glucose-in-range' },
        { label: 'In Tight Range', sublabel: '70–140 mg/dL', pct: 42, colorVar: '--color-glucose-tight-range', indent: true },
        { label: 'Low', sublabel: '<70 mg/dL', pct: 6, colorVar: '--color-glucose-low' },
        { label: 'Very Low', sublabel: '<54 mg/dL', pct: 2, colorVar: '--color-glucose-very-low' },
      ],
      timeCGMActivePct: 92,
      timeCGMActiveDays: '13 days',
      gmi: 7.4,
      gmiMmol: 57.4,
      average: 172,
      median: 165,
      highest: 298,
      lowest: 48,
      sd: 62,
      cv: 36.0,
    },
    insulin: {
      source: 'Insulin Pump',
      split: [
        { label: 'Basal / Day', pct: 72, units: 34, color: 'var(--color-basal)' },
        { label: 'Bolus / Day', pct: 28, units: 13.2, color: 'var(--color-bolus)' },
      ],
      insulinPerDay: 47.2,
      overridesPct: 4,
      overridesCount: 4,
      increasePct: 2.1,
      increaseCount: 2,
      decreasePct: 1.9,
      decreaseCount: 2,
      bolusPerDay: 5.6,
      bolusTypes: [
        { label: 'Meal', pct: 82.1, units: 10.84, color: 'var(--color-bolus-meal)' },
        { label: 'Correction', pct: 15.2, units: 2.01, color: 'var(--color-bolus-correction)' },
        { label: 'Manual', pct: 2.7, units: 0.36, color: 'var(--color-bolus-manual)' },
      ],
    },
    system: {
      deviceName: 'Omnipod 5 System',
      activeTime: { label: '12d 22h', pct: 92 },
      modes: {
        automated: { pct: 84, timeLabel: '20h 10m avg' },
        activity: { pct: 6, count: 3, timeLabel: '1h 26m avg' },
        manual: { pct: 10, timeLabel: '2h 24m' },
      },
      settings: {
        targetGlucose: { value: 110, unit: 'mg/dL' },
        icRatio: { value: '1:11', unit: 'g/unit' },
        correctionFactor: { value: '1:45', unit: 'mg/dL per unit' },
      },
      podChanges: 4,
      highlightedFields: ['correctionFactor'],
    },
    lifestyle: {
      diet: { dateRange: 'Jan 20 – Feb 02, 2026', carbsPerDay: 138.5, entriesPerDay: 4.8 },
      activity: null,
      weight: null,
      bloodPressure: null,
    },
    summaryStatus: 'Overcorrection Pattern — Hypoglycemia Risk',
    overallSummary:
      'Patient demonstrates a pattern of hypoglycemia following hyperglycemic episodes, indicating overcorrection. ' +
      'Time Below Range at 8% (including 2% very low) exceeds safety thresholds. ' +
      'Analysis shows hypoglycemic events frequently occur within 3 hours of correction boluses for elevated glucose. ' +
      'Correction factor may be too aggressive, and insulin stacking during repeated corrections is a contributing factor.',
    insights: [
      {
        id: 'low-follows-high',
        pattern: 'Where Low Follows High',
        severity: 'high',
        icon: 'hypo',
        preview: 'Hypoglycemia occurring within 3 hours of correction boluses; overcorrection pattern detected.',
        evidence: [
          { metric: 'Hypoglycemia following correction', value: '5 episodes in 14 days', threshold: 'within 3hr of correction bolus', status: 'exceeded' },
          { metric: 'Pre-hypo glucose', value: 'Avg 238 mg/dL', threshold: 'high glucose preceding low events' },
          { metric: 'Correction bolus stacking', value: '3 instances detected', threshold: 'boluses within 2hr window', status: 'exceeded' },
        ],
        ruleMatch: { protocol: 'PANTHER OP5', rule: 'Where Low Follows High' },
        action: {
          type: 'Therapy Adjustment + Education',
          setting: 'Correction Factor',
          current: '1:45',
          suggested: '1:55',
        },
        rationale: 'Aggressive correction of hyperglycemia leads to overcorrection and subsequent hypoglycemia. Slightly weakening correction factor and educating on insulin stacking (avoiding corrections within 2–3 hours of prior bolus) reduces high-to-low glucose swings.',
      },
    ],
  },

  {
    id: 'scenario-d',
    label: 'Patient D',
    description: 'Exercise-Related Hypoglycemia (Control-IQ)',
    patient: {
      name: 'Emily Rodriguez',
      dob: '05/17/1988',
      mrn: '4958372016',
      diagnosisType: 'Type 1',
      tags: [
        { label: 'Control-IQ', variant: 'blue' },
        { label: 'Active', variant: 'green' },
      ],
      deviceBadges: ['control-iq', 'cgm', 'rpm'],
      lastSync: 'Today',
    },
    period: {
      rangeLabel: '1 Week',
      displayRange: 'Thu, Jan 29 – Wed, Feb 04, 2026',
      breadcrumb: '90 days → 1 week',
      warning: null,
      warningLink: null,
      activeView: 'CGM',
    },
    glucose: {
      source: 'CGM',
      distribution: [
        { label: 'Very High', sublabel: '>250 mg/dL', pct: 6, colorVar: '--color-glucose-very-high' },
        { label: 'High', sublabel: '>180 mg/dL', pct: 16, colorVar: '--color-glucose-high' },
        { label: 'In Range', sublabel: '70–180 mg/dL', pct: 68, colorVar: '--color-glucose-in-range' },
        { label: 'In Tight Range', sublabel: '70–140 mg/dL', pct: 48, colorVar: '--color-glucose-tight-range', indent: true },
        { label: 'Low', sublabel: '<70 mg/dL', pct: 8, colorVar: '--color-glucose-low' },
        { label: 'Very Low', sublabel: '<54 mg/dL', pct: 2, colorVar: '--color-glucose-very-low' },
      ],
      timeCGMActivePct: 98,
      timeCGMActiveDays: '7 days',
      gmi: 7.1,
      gmiMmol: 54.1,
      average: 158,
      median: 152,
      highest: 278,
      lowest: 48,
      sd: 54,
      cv: 34.2,
    },
    insulin: {
      source: 'Insulin Pump',
      split: [
        { label: 'Basal / Day', pct: 58, units: 24, color: 'var(--color-basal)' },
        { label: 'Bolus / Day', pct: 42, units: 17.4, color: 'var(--color-bolus)' },
      ],
      insulinPerDay: 41.4,
      overridesPct: 12,
      overridesCount: 9,
      increasePct: 5.2,
      increaseCount: 4,
      decreasePct: 6.8,
      decreaseCount: 5,
      bolusPerDay: 6.8,
      bolusTypes: [
        { label: 'Meal', pct: 84.2, units: 14.65, color: 'var(--color-bolus-meal)' },
        { label: 'Correction', pct: 12.4, units: 2.16, color: 'var(--color-bolus-correction)' },
        { label: 'Manual', pct: 3.4, units: 0.59, color: 'var(--color-bolus-manual)' },
      ],
    },
    system: {
      deviceName: 'Tandem t:slim X2 with Control-IQ',
      activeTime: { label: '6d 20h', pct: 97 },
      modes: {
        automated: { pct: 82, timeLabel: '19h 41m avg' },
        activity: { pct: 10, count: 8, timeLabel: '2h 24m avg' },
        manual: { pct: 8, timeLabel: '1h 55m' },
      },
      settings: {
        targetGlucose: { value: 110, unit: 'mg/dL' },
        icRatio: { value: '1:9', unit: 'g/unit' },
        correctionFactor: { value: '1:40', unit: 'mg/dL per unit' },
      },
      podChanges: null, // Control-IQ uses cartridges, not pods
      cartridgeChanges: 2,
      highlightedFields: ['activity'],
    },
    lifestyle: {
      diet: { dateRange: 'Jan 29 – Feb 04, 2026', carbsPerDay: 156.2, entriesPerDay: 6.4 },
      activity: { sessionsPerWeek: 5, avgDuration: '45 min', types: ['Running', 'Cycling'] },
      weight: null,
      bloodPressure: null,
    },
    summaryStatus: 'Exercise-Related Hypoglycemia Pattern',
    overallSummary:
      'Patient is physically active with regular exercise but experiencing hypoglycemia during and after activity. ' +
      'Time Below Range at 10% (including 2% very low) exceeds safety thresholds, with events clustering around exercise periods. ' +
      'Control-IQ Exercise Activity feature underutilized during workouts. ' +
      'Late-onset hypoglycemia also observed overnight following exercise days.',
    insights: [
      {
        id: 'exercise-hypo',
        pattern: 'Around or After Exercise Hypoglycemia',
        severity: 'high',
        icon: 'hypo',
        preview: '4 exercise-related hypo events in 7 days; Exercise Activity feature underutilized.',
        evidence: [
          { metric: 'Post-exercise hypoglycemia', value: '4 episodes in 7 days', threshold: 'within 2hr of activity', status: 'exceeded' },
          { metric: 'Exercise Activity usage', value: '38%', threshold: 'target >80% during exercise', status: 'exceeded' },
          { metric: 'Late-onset exercise hypos', value: '2 overnight lows post-exercise day', threshold: 'delayed glycogen effect' },
        ],
        ruleMatch: { protocol: 'PANTHER Control-IQ', rule: 'Around or After Exercise Hypoglycemia' },
        action: {
          type: 'Behavioral + System',
          setting: 'Exercise Preparation',
          current: 'Inconsistent Exercise Activity use',
          suggested: 'Exercise Activity 1hr before + 15g pre-exercise carbs',
        },
        rationale: 'Exercise increases insulin sensitivity for up to 24 hours. Consistent use of Control-IQ Exercise Activity before workouts raises the target glucose to 140–160 mg/dL, reducing insulin delivery during activity. Combined with small pre-exercise carbohydrate intake, this reduces both immediate and delayed exercise-related hypoglycemia.',
      },
    ],
  },
];

export default scenarios;
