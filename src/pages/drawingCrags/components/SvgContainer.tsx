import { observer } from 'mobx-react-lite';
import React from 'react';

import { useDrawingCragsStore } from '../store';

import SvgContent from './SvgContent';

import styles from '../drawingCrags.module.scss';

const PolylineContainer: React.FC = () => {
  const {
    lines,
    currentLineIndex,
    renderedImageDims,
    handleSvgPointerMove,
    handleSvgPointerUp,
  } = useDrawingCragsStore();

  if (!renderedImageDims.x || !renderedImageDims.y) {
    return null;
  }

  const selectedLineId = lines[currentLineIndex]?.id;

  return (
    <svg
      className={styles.svgContainer}
      width={renderedImageDims.x}
      height={renderedImageDims.y}
      onPointerUp={handleSvgPointerUp}
      onPointerMove={handleSvgPointerMove}
    >
      {lines
        .filter(({ points }) => points.length)
        .map(({ id, points }) => (
          <SvgContent
            key={id}
            points={points}
            isSelected={selectedLineId === id}
            lineId={id}
            renderedImageDims={renderedImageDims}
          />
        ))}
    </svg>
  );
};
export default observer(PolylineContainer);
