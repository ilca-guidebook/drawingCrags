import React, { ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { v1 as uuid } from 'uuid';

import { useDrawingCragsStore } from '../store';

import { Line } from '../types';
import LineEditor from './LineEditor';
import styles from '../drawingCrags.module.scss';

const downloadObjectAsJson = (exportObj: Record<string, any>) => {
  const dataStr =
    'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj, undefined, 2));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', uuid() + '.json');
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

type Props = {
  onImageChange: Function;
};

const ActionBar: React.FC<Props> = ({ onImageChange }) => {
  const drawingCragsStore = useDrawingCragsStore();

  const { imageDimensions } = drawingCragsStore;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);

      // reset
      drawingCragsStore.setImageDimensions({ x: 0, y: 0 });
      drawingCragsStore.setScale(1);

      onImageChange(imageUrl);
    }
  };

  const handleImportData = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = e => {
        if (e.target?.result) {
          drawingCragsStore.loadLinesData(JSON.parse(e.target.result as string) as Line[]);
        }
      };
    }
  };
  const handleExportData = async () => {
    drawingCragsStore.lines.forEach(line => {
      // smaller y is higher
      // if this case is true it means the first point is lower than the last point, so reverse
      if (line.points[0].y < line.points[line.points.length - 1].y) {
        line.points = line.points.reverse();
      }
    });
    downloadObjectAsJson(
      drawingCragsStore.lines
        .sort((lineA, lineB) => lineA.points[0].x - lineB.points[0].x)
        .map(line => {
          return {
            ...line,
            points: line.points.map(point => ({
              x: point.x / imageDimensions.x,
              y: point.y / imageDimensions.y,
            })),
          };
        }),
    );
  };

  return (
    <div>
      <div className={styles.btnContainer}>
        <div>
          {drawingCragsStore.imageLoaded && (
            <>
              <div className={styles.btn} onClick={drawingCragsStore.createNewLine}>
                + New Line
              </div>
              <div className={styles.lineName}>
                <input
                  type="text"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    drawingCragsStore.updateLineNewName(e.target.value)
                  }
                  value={drawingCragsStore.nameInInput}
                />
              </div>
            </>
          )}
        </div>
        <div>
          <label className={styles.fileUpload}>
            <input type="file" multiple accept="image/*" onChange={handleImageChange} />
            Upload Crag Image
          </label>
          <label className={styles.fileUpload}>
            <input type="file" onChange={handleImportData} />
            Import Lines Data
          </label>
          <div className={styles.btn + ' ' + styles.last} onClick={handleExportData}>
            Export Lines Data
          </div>
        </div>
      </div>
      <LineEditor />
    </div>
  );
};

export default observer(ActionBar);
