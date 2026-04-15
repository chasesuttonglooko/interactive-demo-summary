/**
 * DonutChart
 * Pure SVG donut chart. No external dependencies.
 *
 * Props:
 *   segments  — Array<{ label: string, pct: number, color: string }>
 *   size      — diameter in px (default: 90)
 *   thickness — stroke width (default: 18)
 *   tooltip   — which segment index to show tooltip on (default: null)
 */

import { useState } from 'react'
import styles from './DonutChart.module.css'

// Convert polar angle to cartesian coordinates
function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = (angleDeg - 90) * (Math.PI / 180)
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  }
}

// Build SVG arc path for a donut segment
function arcPath(cx, cy, outerR, innerR, startDeg, endDeg) {
  // Clamp to avoid full-circle degenerate case
  const clampedEnd = Math.min(endDeg, startDeg + 359.99)
  const outerStart = polarToCartesian(cx, cy, outerR, clampedEnd)
  const outerEnd   = polarToCartesian(cx, cy, outerR, startDeg)
  const innerStart = polarToCartesian(cx, cy, innerR, clampedEnd)
  const innerEnd   = polarToCartesian(cx, cy, innerR, startDeg)
  const largeArc   = clampedEnd - startDeg > 180 ? 1 : 0

  return [
    `M ${outerStart.x.toFixed(2)} ${outerStart.y.toFixed(2)}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 0 ${outerEnd.x.toFixed(2)} ${outerEnd.y.toFixed(2)}`,
    `L ${innerEnd.x.toFixed(2)} ${innerEnd.y.toFixed(2)}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 1 ${innerStart.x.toFixed(2)} ${innerStart.y.toFixed(2)}`,
    'Z',
  ].join(' ')
}

export default function DonutChart({ segments = [], size = 90, thickness = 18 }) {
  const [hovered, setHovered] = useState(null)

  const cx = size / 2
  const cy = size / 2
  const outerR = (size / 2) - 2
  const innerR = outerR - thickness

  // Compute cumulative angles
  const total = segments.reduce((sum, s) => sum + s.pct, 0)
  let cursor = 0
  const arcs = segments.map((seg, i) => {
    const startDeg = (cursor / total) * 360
    cursor += seg.pct
    const endDeg = (cursor / total) * 360
    return { ...seg, startDeg, endDeg, i }
  })

  // Center label: first segment dominant value
  const primary = segments[0]

  return (
    <div className={styles.wrapper} style={{ width: size, height: size }}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        overflow="visible"
      >
        {arcs.map((arc) => (
          <path
            key={arc.i}
            d={arcPath(cx, cy, outerR, innerR, arc.startDeg, arc.endDeg)}
            fill={arc.color}
            opacity={hovered !== null && hovered !== arc.i ? 0.65 : 1}
            onMouseEnter={() => setHovered(arc.i)}
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: 'default', transition: 'opacity 0.12s' }}
          />
        ))}

        {/* Center label */}
        {primary && (
          <>
            <text
              x={cx}
              y={cy - 4}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill="#1A202C"
              fontFamily="Inter, sans-serif"
            >
              {primary.pct}%
            </text>
            <text
              x={cx}
              y={cy + 9}
              textAnchor="middle"
              fontSize="9"
              fill="#8A96A3"
              fontFamily="Inter, sans-serif"
            >
              {primary.label?.split(' ')[0]}
            </text>
          </>
        )}
      </svg>

      {/* Tooltip on hover */}
      {hovered !== null && (
        <div className={styles.tooltip}>
          <span className={styles.tooltipDot} style={{ background: arcs[hovered].color }} />
          <strong>{arcs[hovered].label}:</strong> {arcs[hovered].pct}%
        </div>
      )}
    </div>
  )
}
