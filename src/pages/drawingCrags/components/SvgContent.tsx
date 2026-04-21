import React from 'react';
import { observer } from 'mobx-react-lite';

import { useDrawingCragsStore } from '../store';

import { Pos } from '../types';
import Circle from './SvgCircle';

type Props = {
  points: Array<Pos>;
  isSelected: boolean;
  lineId: string;
  renderedImageDims: Pos;
};

const SELECTED_LINE_COLOR = '#1ad34b';
const DEFAULT_LINE_COLOR = '#6247cb';

const SvgContent: React.FC<Props> = ({ points, isSelected, lineId, renderedImageDims }) => {
  const { draggedLine } = useDrawingCragsStore();

  const renderedPoints = (isSelected && draggedLine ? [...points, draggedLine] : points).map(
    point => ({
      x: point.x * renderedImageDims.x,
      y: point.y * renderedImageDims.y,
    }),
  );

  const linePoints = renderedPoints.reduce(
    (acc, point) => `${acc} ${point.x},${point.y}`,
    '',
  );

  const lineColor = isSelected ? SELECTED_LINE_COLOR : DEFAULT_LINE_COLOR;

  const lineBreakpoints = points.map((point, index) => {
    const px = point.x * renderedImageDims.x;
    const py = point.y * renderedImageDims.y;
    return (
      <Circle
        key={`${index}-circle`}
        positionY={py}
        positionX={px}
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
