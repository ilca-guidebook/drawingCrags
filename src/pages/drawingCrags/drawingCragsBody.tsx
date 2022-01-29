import React, { ChangeEvent, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { v1 as uuid } from "uuid";

import { useDrawingCragsStore } from "./store";

import Image from "./components/Image";
import PolylineContainer from "./components/PolylineContainer";

import styles from "./drawingCrags.module.scss";
import { CONTAINER_HEIGHT, CONTAINER_WIDTH } from "./store/drawingCragsState";
import { Line } from "./types";
import LineEditor from "./components/LineEditor";

const downloadObjectAsJson = (exportObj: Record<string, any>) => {
  const dataStr =
    "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj, undefined, 2));
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", uuid() + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

const DrawingCragsBody: React.FC = () => {
  const drawingCragsStore = useDrawingCragsStore();

  const container = React.useRef<HTMLDivElement>(null);
  const { imageDimensions, panPoz, scale } = drawingCragsStore;
  const [image, setImage] = useState<string>();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);

      // reset
      drawingCragsStore.setImageDimensions({ x: 0, y: 0 });
      drawingCragsStore.setScale(1);

      setImage(imageUrl);
    }
  };

  const handleImportData = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = e => {
        if (e.target?.result) {
          drawingCragsStore.loadLinesData(JSON.parse(e.target.result as string) as Line[]);
        }
      };
    }
  };
  const handleExportData = async () => {
    downloadObjectAsJson(
      drawingCragsStore.lines
        .sort((lineA, lineB) => lineA.points[0].x - lineB.points[0].x)
        .map(line => {
          return {
            ...line,
            points: line.points.map(point => ({
              x: point.x / CONTAINER_WIDTH,
              y: point.y / CONTAINER_HEIGHT
            }))
          };
        })
    );
  };

  const imageStyle: Record<string, string> = {};

  const svgStyle: Record<string, string> = {};

  useEffect(() => {
    if (container.current) {
      drawingCragsStore.setContainer(container.current);
    }
  }, [container]);

  if (imageDimensions.x) {
    imageStyle["width"] = `${imageDimensions.x * scale}px`;
    imageStyle["height"] = `${imageDimensions.y * scale}px`;
    // imageStyle["transform"] = `scale(${scale})`;
    svgStyle["transform"] = `scale(${scale})`;
    svgStyle["width"] = `${imageDimensions.x * scale}px`;
    svgStyle["height"] = `${imageDimensions.y * scale}px`;
  }
  if (panPoz.x) {
    imageStyle["left"] = `${panPoz.x}px`;
    svgStyle["left"] = `${panPoz.x}px`;
  }
  if (panPoz.y) {
    imageStyle["top"] = `${panPoz.y}px`;
    svgStyle["top"] = `${panPoz.y}px`;
  }

  const handleDrawLineCLick = () => {
    drawingCragsStore.createNewLine();
  };

  const handleLineNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    drawingCragsStore.updateLineNewName(e.target.value);
  };

  return (
    <div className={styles.drawingCrags}>
      <h2>Drawing Crags</h2>
      <div>
        <div>Welcome to the drawing crags app!</div>
        <div>
          To use the app:
          <ul>
            <li>Upload click on the upload crag image button to upload an image</li>
            <li>Give a name to a line and create a new line</li>
            <li>Start clicking on the image to draw the line points</li>
            <li>Export the result file using the Export Lines Data button</li>
          </ul>
        </div>
        <div style={{ fontSize: "90%", color: "#727272" }}>
          * You can also upload a previously generated file using the Import Lines Data button and
          edit Lines
          <br />
          Play around with the system a bit, we're sure you'll figure things out :)
        </div>
        <br />
      </div>
      <div>
        <div className={styles.btnContainer}>
          <div>
            {drawingCragsStore.imageLoaded && (
              <>
                <div className={styles.btn} onClick={handleDrawLineCLick}>
                  + New Line
                </div>
                <div className={styles.lineName}>
                  <input
                    type="text"
                    onChange={handleLineNameChange}
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
            <div className={styles.btn + " " + styles.last} onClick={handleExportData}>
              Export Lines Data
            </div>
          </div>
        </div>
        <LineEditor />
      </div>
      <div
        ref={container}
        className={styles.imageContainer}
        onMouseEnter={drawingCragsStore.handleMouseEnter}
        onMouseLeave={drawingCragsStore.handleMouseLeave}
        onMouseDown={drawingCragsStore.handleMouseDown}
        onMouseUp={drawingCragsStore.handleMouseUp}
        onClick={drawingCragsStore.handleClick}
        onMouseMove={drawingCragsStore.handleMouseMove}
        onWheel={drawingCragsStore.handleWheel}
        onScroll={drawingCragsStore.handleScroll}
      >
        <Image image={image} imageStyle={imageStyle} />
        <PolylineContainer svgStyle={svgStyle} />
      </div>
    </div>
  );
};
export default observer(DrawingCragsBody);
