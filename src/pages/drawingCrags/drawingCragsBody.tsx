import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { useDrawingCragsStore } from './store';

import Image from './components/Image';
import PolylineContainer from './components/SvgContainer';
import Header from './components/Header';

import styles from './drawingCrags.module.scss';
import ActionBar from './components/ActionBar';

const DrawingCragsBody: React.FC = () => {
  const drawingCragsStore = useDrawingCragsStore();

  const container = React.useRef<HTMLDivElement>(null);
  const { imageDimensions, panPoz, scale } = drawingCragsStore;
  const [image, setImage] = useState<string>();

  const imageStyle: Record<string, string> = {};

  const svgStyle: Record<string, string> = {};

  useEffect(() => {
    if (container.current) {
      drawingCragsStore.setContainer(container.current);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [container]);

  if (imageDimensions.x) {
    imageStyle['width'] = `${imageDimensions.x * scale}px`;
    imageStyle['height'] = `${imageDimensions.y * scale}px`;
    // imageStyle["transform"] = `scale(${scale})`;
    svgStyle['transform'] = `scale(${scale})`;
    svgStyle['width'] = `${imageDimensions.x * scale}px`;
    svgStyle['height'] = `${imageDimensions.y * scale}px`;
  }
  if (panPoz.x) {
    imageStyle['left'] = `${panPoz.x}px`;
    svgStyle['left'] = `${panPoz.x}px`;
  }
  if (panPoz.y) {
    imageStyle['top'] = `${panPoz.y}px`;
    svgStyle['top'] = `${panPoz.y}px`;
  }

  useEffect(() => {
    document.addEventListener('keydown', drawingCragsStore.onKeyDown);

    return () => {
      document.removeEventListener('keydown', drawingCragsStore.onKeyDown);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.drawingCrags}>
      <Header />
      <ActionBar onImageChange={setImage} />
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
        style={svgStyle}
      >
        <Image image={image} imageStyle={imageStyle} />
        <PolylineContainer svgStyle={svgStyle} />
      </div>
    </div>
  );
};
export default observer(DrawingCragsBody);
