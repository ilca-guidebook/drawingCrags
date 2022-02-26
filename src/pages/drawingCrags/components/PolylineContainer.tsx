import { observer } from "mobx-react-lite";
import React from "react";

import { useDrawingCragsStore } from "../store";

import PolylineRenderer from "./PolylineRenderer";

import styles from "../drawingCrags.module.scss";

type Props = {
  svgStyle: Record<string, string>;
};

const PolylineContainer: React.FC<Props> = ({ svgStyle }) => {
  const drawingCragsStore = useDrawingCragsStore();

  const selectedLineId = drawingCragsStore.lines[drawingCragsStore.currentLineIndex]?.id;
  return (
    <svg className={styles.svgContainer} style={svgStyle}>
      {drawingCragsStore.lines
        .filter(({ points }) => points.length)
        .map(({ id, points }) => {
          return <PolylineRenderer key={id} points={points} selected={selectedLineId === id} />;
        })}
    </svg>
  );
};
export default observer(PolylineContainer);
