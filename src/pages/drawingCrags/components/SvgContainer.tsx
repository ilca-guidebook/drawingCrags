import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';

import { useDrawingCragsStore } from '../store';

import SvgContent from './SvgContent';

import styles from '../drawingCrags.module.scss';

type Props = {
  svgStyle: Record<string, string>;
};

const PolylineContainer: React.FC<Props> = ({ svgStyle }) => {
  const {
    lines,
    currentLineIndex,
    handleSvgPointerMove,
    handleSvgPointerUp,
  } = useDrawingCragsStore();

  const selectedLineId = lines[currentLineIndex]?.id;
  return (
    <svg
      className={styles.svgContainer}
      style={svgStyle}
      onPointerUp={handleSvgPointerUp}
      onPointerMove={handleSvgPointerMove}
    >
      {lines
        .filter(({ points }) => points.length)
        .map(({ id, points }) => {
          return (
            <SvgContent key={id} points={points} isSelected={selectedLineId === id} lineId={id} />
          );
        })}
    </svg>
  );
};
export default observer(PolylineContainer);
