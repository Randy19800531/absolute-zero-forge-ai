
import React from 'react';

interface ConnectionLineProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
}

const ConnectionLine = ({ from, to }: ConnectionLineProps) => {
  // Calculate control points for a smooth curve
  const controlPoint1 = { x: from.x + 50, y: from.y };
  const controlPoint2 = { x: to.x - 50, y: to.y };

  const pathData = `M ${from.x} ${from.y} C ${controlPoint1.x} ${controlPoint1.y}, ${controlPoint2.x} ${controlPoint2.y}, ${to.x} ${to.y}`;

  return (
    <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill="#6B7280"
          />
        </marker>
      </defs>
      <path
        d={pathData}
        stroke="#6B7280"
        strokeWidth="2"
        fill="none"
        markerEnd="url(#arrowhead)"
      />
    </svg>
  );
};

export default ConnectionLine;
