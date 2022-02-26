import { observer } from "mobx-react-lite";
import React from "react";

import { useDrawingCragsStore } from "../store";

import { Pos } from "../types";

type Props = {
  points: Array<Pos>;
  selected: boolean;
};

const SELECTED_LINE_COLOR = "#1ad34b";
const DEFAULT_LINE_COLOR = "#6247cb";
const PolylineRenderer: React.FC<Props> = ({ points, selected }) => {
  const { draggedLine } = useDrawingCragsStore();

  const linePoints = (selected && draggedLine ? [...points, draggedLine] : points).reduce(
    (acc, point) => `${acc} ${point.x},${point.y}`,
    ""
  );

  const lineColor = selected ? SELECTED_LINE_COLOR : DEFAULT_LINE_COLOR;

  return (
    <polyline points={linePoints} style={{ stroke: lineColor, fill: "none", strokeWidth: 3 }} />
  );
};
export default observer(PolylineRenderer);
