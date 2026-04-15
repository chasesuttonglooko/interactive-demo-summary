// ============================================================
// Mock Patient Data — Glooko OP5 Clinical Prototype
// All values are placeholder-grade. Scenario wiring happens later.
// Structure mirrors the scenario JSON schema so props can be
// swapped in without component changes.
// ============================================================

export const mockPatient = {
  name: 'John Smith',
  dob: '04/11/1978',
  mrn: '1827436193',
  diagnosisType: 'Type 1',
  tags: [
    { label: 'Omnipod5', variant: 'teal' },
    { label: 'Omnipod5', variant: 'teal' },
    { label: 'L2 Hypo', variant: 'pink' },
    { label: '+1', variant: 'gray' },
  ],
  deviceBadges: ['omnipod5', 'cgm', 'rpm'],
  lastSync: 'Yesterday',
};

export const mockPeriod = {
  rangeLabel: '1 Week',
  displayRange: 'Thu, Jan 29 – Wed, Feb 04, 2026',
  breadcrumb: '90 days → 1 week',
  warning: 'This period contains 1 day without insulin data.',
  warningLink: 'Learn more',
  activeView: 'CGM', // 'BG' | 'CGM'
};

export const mockGlucose = {
  source: 'CGM',
  distribution: [
    { label: 'Very High',      sublabel: '>250 mg/dL',    pct: 21, colorVar: '--color-glucose-very-high' },
    { label: 'High',           sublabel: '>180 mg/dL',    pct: 14, colorVar: '--color-glucose-high' },
    { label: 'In Range',       sublabel: '70–180 mg/dL',  pct: 59, colorVar: '--color-glucose-in-range' },
    { label: 'In Tight Range', sublabel: '70–140 mg/dL',  pct: 38, colorVar: '--color-glucose-tight-range', indent: true },
    { label: 'Low',            sublabel: '<70 mg/dL',     pct: 5,  colorVar: '--color-glucose-low' },
    { label: 'Very Low',       sublabel: '<54 mg/dL',     pct: 1,  colorVar: '--color-glucose-very-low' },
  ],
  timeCGMActivePct: 100,
  timeCGMActiveDays: '1 day',
  gmi: 7.6,
  gmiMmol: 59.2,
  average: 178,
  median: 170,
  highest: 362,
  lowest: 54,
  sd: 57,
  cv: 31.9,
};

export const mockInsulin = {
  source: 'Insulin Pump',
  split: [
    { label: 'Basal / Day', pct: 71, units: 35,   color: 'var(--color-basal)' },
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
    { label: 'Meal',       pct: 90.2, units: 13.17, color: 'var(--color-bolus-meal)' },
    { label: 'Correction', pct: 8.1,  units: 1.18,  color: 'var(--color-bolus-correction)' },
    { label: 'Manual',     pct: 1.7,  units: 0.25,  color: 'var(--color-bolus-manual)' },
  ],
};

// ============================================================
// Omnipod 5 System Card
// This shape is the canonical source of truth for SystemCard props.
// ============================================================
export const mockSystem = {
  deviceName: 'Omnipod 5 System',
  activeTime: {
    label: '6d 22h',
    pct: 99, // percentage of period with system active
  },
  modes: {
    automated: {
      pct: 77,
      timeLabel: '18h avg',
    },
    activity: {
      pct: 12,
      count: 6,
      timeLabel: '2h 53m avg',
    },
    manual: {
      pct: 11,
      timeLabel: '2h 38m',
    },
  },
  settings: {
    targetGlucose: { value: 110, unit: 'mg/dL' },
    icRatio:        { value: '1:10', unit: 'g/unit' },
    correctionFactor: { value: '1:50', unit: 'mg/dL per unit' },
  },
  podChanges: 3,
  // Highlight slots — populated by scenario wiring later.
  // Each string is a field key that should receive a visual accent.
  highlightedFields: [],
};

export const mockLifestyle = {
  diet: {
    dateRange: 'Jan 29 – Feb 04, 2026',
    carbsPerDay: 144.7,
    entriesPerDay: 5.8,
  },
  activity:      null,
  weight:        null,
  bloodPressure: null,
};

export const mockCarePrograms = [
  {
    id: 'cp1',
    name: 'Name of program',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis dui eget velit faucibus efficitur in arcu nibh. Nunc in arcu ante lobortis consectetur nec lacinia lacus. Duis ut semper urna.',
    manageLink: '#',
  },
];

// ============================================================
// Clinical Insights — Collapsible Reasoning Engine
// Structure: Overall Summary + Pattern Cards (collapsed/expanded)
// ============================================================

export const mockSummaryStatus = 'Moderate Control — Optimization Recommended';

export const mockOverallSummary =
  'Patient demonstrates moderate glycemic control with two primary optimization opportunities identified. ' +
  'Overnight hypoglycemia and post-prandial hyperglycemia are contributing most significantly to ' +
  'sub-target Time in Range performance (59% vs. 70% goal). Strong automated mode adherence (77%) ' +
  'suggests intervention should focus on therapy settings rather than behavioral correction.';

export const mockInsights = [
  {
    id: 'overnight-hypo',
    pattern: 'Overnight Hypoglycemia',
    severity: 'high',
    icon: 'hypo',
    preview: '2 overnight low events detected; overnight TBR exceeds recommended threshold.',
    evidence: [
      { metric: 'Hypoglycemic events', value: '2 episodes below 70 mg/dL', threshold: 'between 2–4 AM', status: 'exceeded' },
      { metric: 'Overnight Time Below Range', value: '6%', threshold: 'target <4%', status: 'exceeded' },
      { metric: 'Panther clinical threshold', value: '<4% overnight TBR' },
    ],
    ruleMatch: {
      protocol: 'Panther OP5',
      rule: 'Fasting / Overnight Hypoglycemia',
    },
    action: {
      type: 'Therapy Adjustment',
      setting: 'Target Glucose (Overnight)',
      current: '110 mg/dL',
      suggested: '150 mg/dL',
      recommendation: 'Adjust overnight Target Glucose from 110 → 150 mg/dL',
    },
    rationale: 'Higher overnight target reduces insulin aggressiveness during sleep, lowering nocturnal hypoglycemia risk when symptom response is limited.',
  },
  {
    id: 'postmeal-hyper',
    pattern: 'Post-Meal Hyperglycemia',
    severity: 'moderate',
    icon: 'hyper',
    preview: 'Recurring glucose spikes 1–3 hrs after lunch and dinner; average peak 215 mg/dL.',
    evidence: [
      { metric: 'Average post-meal peak', value: '215 mg/dL', threshold: 'target <180 mg/dL', status: 'exceeded' },
      { metric: 'Peak timing', value: '1–3 hours post-meal', threshold: 'consistent pattern' },
      { metric: 'Affected meals', value: 'Lunch and dinner', threshold: 'recurring' },
    ],
    ruleMatch: {
      protocol: 'Panther OP5',
      rule: 'Post-Meal Hyperglycemia',
    },
    action: {
      type: 'Therapy Adjustment + Education',
      setting: 'I:C Ratio',
      current: '1:10g',
      suggested: '1:8g',
      recommendation: 'Strengthen I:C Ratio from 1:10g → 1:8g. Pre-bolus 10–15 min before meals.',
    },
    rationale: 'Stronger I:C ratio increases meal bolus coverage. Pre-bolusing aligns insulin action with glucose rise from food intake.',
  },
];
