import React from 'react';

const Cell = ({ fill, x, y, width, height }) => {
  return (
    <g>
      <defs>
        <linearGradient id={`gradient-${fill}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fill} stopOpacity={0.8}/>
          <stop offset="100%" stopColor={fill} stopOpacity={0.4}/>
        </linearGradient>
      </defs>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={`url(#gradient-${fill})`}
        rx={4}
      />
    </g>
  );
};

export default Cell;