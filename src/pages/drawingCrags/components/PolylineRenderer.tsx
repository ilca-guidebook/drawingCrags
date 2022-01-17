import { observer } from "mobx-react-lite";
import React from "react";

import { Line } from "../types";

type Props = {
  line: Line;
  selected: boolean;
};

const SELECTED_LINE_COLOR = "#1ad34b";
const DEFAULT_LINE_COLOR = "#6247cb";
const PolylineRenderer: React.FC<Props> = ({ line, selected }) => {
  const linePoints = line.points.reduce((acc, point) => `${acc} ${point.x},${point.y}`, "");

  const lineColor = selected ? SELECTED_LINE_COLOR : DEFAULT_LINE_COLOR;
  if (line.points.length) {
    return (
      <polyline points={linePoints} style={{ stroke: lineColor, fill: "none", strokeWidth: 3 }} />
    );
  } else return null;
};
export default observer(PolylineRenderer);
