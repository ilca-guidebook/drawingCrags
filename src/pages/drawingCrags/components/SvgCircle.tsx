import React from 'react';
import { observer } from 'mobx-react-lite';
import { useDrawingCragsStore } from '../store';

type Props = {
  positionY: number;
  positionX: number;
  fill: string;
  pointIndex: number;
  lineId: string;
};

const Circle: React.FC<Props> = props => {
  const { positionX, positionY, fill, lineId, pointIndex } = props;
  const { handlePointPointerDown, currentEditedPoint } = useDrawingCragsStore();

  const isActive =
    currentEditedPoint.lineId === lineId && currentEditedPoint.pointIndex === pointIndex;

  return (
    <circle
      cx={positionX}
      cy={positionY}
      r={4}
      onPointerDown={e => handlePointPointerDown(e, lineId, pointIndex)}
      fill={isActive ? 'blue' : fill}
      onClick={(e: React.MouseEvent) => e.stopPropagation()}
    />
  );
};

export default observer(Circle);
