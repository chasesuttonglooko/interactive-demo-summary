import CardShell from '../ui/CardShell'
import styles from './AGPChart.module.css'

// ============================================================
// AGP Chart — Static SVG Placeholder
// Curves are computed from hardcoded representative data points.
// When real scenario data is added, replace DATA_POINTS with
// scenario-sourced percentile arrays.
// ============================================================

const VB_W = 760
const VB_H = 220
const PAD  = { top: 10, right: 12, bottom: 30, left: 42 }
const CHART_W = VB_W - PAD.left - PAD.right
const CHART_H = VB_H - PAD.top  - PAD.bottom

// Scale helpers
const xS = (hour)    => PAD.left + (hour / 24) * CHART_W
const yS = (glucose) => PAD.top  + CHART_H - (glucose / 400) * CHART_H

// Data: 9 time points (0, 3, 6 … 24h) × 5 percentile bands
// Values represent mg/dL at each time step.
const HOURS = [0, 3, 6, 9, 12, 15, 18, 21, 24]

const CURVES = {
  p10: [62, 53, 50, 78, 93, 88, 92, 83, 66],
  p25: [90, 82, 76, 108, 128, 122, 127, 113, 96],
  p50: [128, 116, 112, 148, 170, 163, 169, 150, 133],
  p75: [174, 162, 155, 198, 216, 210, 219, 198, 180],
  p90: [214, 202, 196, 240, 264, 258, 268, 242, 222],
}

// Catmull-Rom → Bezier cubic path (smooth interpolation through points)
function smoothPath(pts, tension = 0.35) {
  if (!pts.length) return ''
  let d = `M ${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(pts.length - 1, i + 2)]
    const cp1x = p1[0] + (p2[0] - p0[0]) * tension
    const cp1y = p1[1] + (p2[1] - p0[1]) * tension
    const cp2x = p2[0] - (p3[0] - p1[0]) * tension
    const cp2y = p2[1] - (p3[1] - p1[1]) * tension
    d += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`
  }
  return d
}

// Closed polygon for a filled band between two percentile curves
function bandPolygon(lower, upper) {
  const fwd = lower.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')
  const rev = [...upper].reverse().map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')
  return `${fwd} ${rev}`
}

// Build [x,y] arrays from curve data
function buildPts(data) {
  return HOURS.map((h, i) => [xS(h), yS(data[i])])
}

const pts = {
  p10: buildPts(CURVES.p10),
  p25: buildPts(CURVES.p25),
  p50: buildPts(CURVES.p50),
  p75: buildPts(CURVES.p75),
  p90: buildPts(CURVES.p90),
}

// Pre-compute all SVG path/polygon strings (static, no re-render cost)
const PATH_MEDIAN   = smoothPath(pts.p50)
const POLY_10_90    = bandPolygon(pts.p10, pts.p90)
const POLY_25_75    = bandPolygon(pts.p25, pts.p75)

const GRIDLINES     = [100, 200, 300, 400]
const X_LABELS      = [
  { hour: 0,  label: '12 AM' },
  { hour: 6,  label: '6 AM'  },
  { hour: 12, label: '12 PM' },
  { hour: 18, label: '6 PM'  },
  { hour: 24, label: '12 AM' },
]

export default function AGPChart() {
  const targetTop    = yS(180)
  const targetBottom = yS(70)
  const targetHeight = targetBottom - targetTop

  return (
    <CardShell>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <span className={styles.title}>AGP</span>
          <span className={styles.axisLabel}>Glucose (mg/dL)</span>
        </div>
        <a href="#" className={styles.helpLink}>What is AGP?</a>
      </div>

      <div className={styles.chartWrap}>
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className={styles.svg}
          aria-label="Ambulatory Glucose Profile chart"
        >
          {/* Horizontal gridlines */}
          {GRIDLINES.map(g => (
            <line
              key={g}
              x1={PAD.left} y1={yS(g)}
              x2={VB_W - PAD.right} y2={yS(g)}
              stroke="#E8ECF2" strokeWidth="1"
            />
          ))}

          {/* Y-axis labels */}
          {GRIDLINES.map(g => (
            <text
              key={g}
              x={PAD.left - 5} y={yS(g) + 4}
              textAnchor="end"
              fontSize="10" fill="#8A96A3"
              fontFamily="Inter, sans-serif"
            >
              {g}
            </text>
          ))}

          {/* Target range band (70–180 mg/dL) */}
          <rect
            x={PAD.left} y={targetTop}
            width={CHART_W} height={targetHeight}
            fill="#EBF5FB" opacity="0.55"
          />
          <line
            x1={PAD.left} y1={targetTop}
            x2={VB_W - PAD.right} y2={targetTop}
            stroke="#90CDF4" strokeWidth="1" strokeDasharray="5,4"
          />
          <line
            x1={PAD.left} y1={targetBottom}
            x2={VB_W - PAD.right} y2={targetBottom}
            stroke="#90CDF4" strokeWidth="1" strokeDasharray="5,4"
          />

          {/* 10–90% band */}
          <polygon
            points={POLY_10_90}
            fill="#BFDBFE" opacity="0.45"
          />

          {/* 25–75% band */}
          <polygon
            points={POLY_25_75}
            fill="#93C5FD" opacity="0.55"
          />

          {/* Median line */}
          <path
            d={PATH_MEDIAN}
            fill="none"
            stroke="#1D4ED8"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* X-axis tick lines */}
          {X_LABELS.map(({ hour }) => (
            <line
              key={hour}
              x1={xS(hour)} y1={PAD.top + CHART_H}
              x2={xS(hour)} y2={PAD.top + CHART_H + 4}
              stroke="#CBD5E0" strokeWidth="1"
            />
          ))}

          {/* X-axis labels */}
          {X_LABELS.map(({ hour, label }) => (
            <text
              key={hour}
              x={xS(hour)} y={VB_H - 8}
              textAnchor="middle"
              fontSize="10" fill="#8A96A3"
              fontFamily="Inter, sans-serif"
            >
              {label}
            </text>
          ))}

          {/* Vertical dividers at time ticks */}
          {X_LABELS.slice(1, -1).map(({ hour }) => (
            <line
              key={`div-${hour}`}
              x1={xS(hour)} y1={PAD.top}
              x2={xS(hour)} y2={PAD.top + CHART_H}
              stroke="#EDF0F5" strokeWidth="1" strokeDasharray="3,3"
            />
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className={styles.legend}>
        <LegendItem color="#90CDF4" label="Target Range (70–180 mg/dL)" dashed />
        <LegendItem color="#93C5FD" solid label="25–75%" />
        <LegendItem color="#BFDBFE" solid label="10–90%" />
        <LegendItem color="none" dashed label="Lowest – Highest" />
        <LegendItem color="#1D4ED8" line label="Median" />
      </div>
    </CardShell>
  )
}

function LegendItem({ color, label, dashed, solid, line }) {
  return (
    <div className={styles.legendItem}>
      <span
        className={styles.legendSwatch}
        style={{
          background: solid ? color : 'transparent',
          borderBottom: dashed
            ? `2px dashed ${color === 'none' ? '#8A96A3' : color}`
            : line
            ? `2px solid ${color}`
            : undefined,
          width: line || dashed ? 18 : 10,
          height: line || dashed ? 0 : 9,
          borderRadius: solid ? 2 : 0,
          display: 'inline-block',
          marginRight: 5,
          flexShrink: 0,
        }}
      />
      <span className={styles.legendLabel}>{label}</span>
    </div>
  )
}
