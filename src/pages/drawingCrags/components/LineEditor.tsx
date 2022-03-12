import React, { ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { useDrawingCragsStore } from '../store';

import styles from '../drawingCrags.module.scss';

const LineEditor: React.FC = () => {
  const drawingCragsStore = useDrawingCragsStore();

  const handleLineNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    drawingCragsStore.editExistingLineName(e.target.value);
  };

  const handleDeleteLastPoint = () => {
    drawingCragsStore.deleteLastPoint();
  };

  const handleDeleteLine = () => {
    drawingCragsStore.deleteLine();
  };

  const handleLineSelectedChange = (e: ChangeEvent<HTMLSelectElement>) => {
    drawingCragsStore.updateSelectedLine(e.target.value);
  };

  if (!drawingCragsStore.lines.length) {
    return null;
  }

  const selectedLine = drawingCragsStore.lines[drawingCragsStore.currentLineIndex];

  return (
    <div className={styles.lineEditor}>
      {selectedLine && (
        <>
          <div className={styles.btn} onClick={handleDeleteLastPoint}>
            Delete last point
          </div>
          <div className={styles.btn} onClick={handleDeleteLine}>
            Delete Line
          </div>
          <div style={{ display: 'inline-block' }}>
            <span style={{ paddingRight: '6px' }}>Edit Line Name:</span>
            <input type="text" onChange={handleLineNameChange} value={selectedLine?.name} />
          </div>
        </>
      )}
      <div style={{ display: 'inline-block', marginLeft: '6px' }}>
        {drawingCragsStore.lines.length > 0 && (
          <>
            Select line to edit:
            <select
              name="linesSelector"
              onChange={handleLineSelectedChange}
              value={selectedLine?.name}
            >
              <option key="select-line" value="">
                ---------
              </option>
              {drawingCragsStore.lines.map(line => (
                <option key={line.id} value={line.name}>
                  {line.name}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
    </div>
  );
};
export default observer(LineEditor);
