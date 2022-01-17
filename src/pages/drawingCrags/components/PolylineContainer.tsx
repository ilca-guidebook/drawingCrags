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
      {drawingCragsStore.lines.map(line => (
        <PolylineRenderer key={line.id} line={line} selected={selectedLineId === line.id} />
      ))}
    </svg>
  );
};
export default observer(PolylineContainer);
