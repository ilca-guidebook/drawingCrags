import React from 'react';
import { observer } from 'mobx-react-lite';

import { useDrawingCragsStore } from '../store';

import { Pos } from '../types';
import Circle from './SvgCircle';

type Props = {
  points: Array<Pos>;
  isSelected: boolean;
  lineId: string;
};

const SELECTED_LINE_COLOR = '#1ad34b';
const DEFAULT_LINE_COLOR = '#6247cb';
const SvgContent: React.FC<Props> = ({ points, isSelected, lineId }) => {
  const { draggedLine } = useDrawingCragsStore();

  const linePoints = (isSelected && draggedLine ? [...points, draggedLine] : points).reduce(
    (acc, point) => `${acc} ${point.x},${point.y}`,
    '',
  );

  const lineColor = isSelected ? SELECTED_LINE_COLOR : DEFAULT_LINE_COLOR;

  const lineBreakpoints = points.map((point, index) => {
    return (
      <Circle
        key={`${point.y}-${point.y}-circle`}
        positionY={point.y}
        positionX={point.x}
        fill={lineColor}
        pointIndex={index}
        lineId={lineId}
      />
    );
  });

  return (
    <>
      <polyline points={linePoints} style={{ stroke: lineColor, fill: 'none', strokeWidth: 3 }} />
      {lineBreakpoints}
    </>
  );
};
export default observer(SvgContent);
