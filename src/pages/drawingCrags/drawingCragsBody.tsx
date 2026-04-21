import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { useDrawingCragsStore } from './store';

import Image from './components/Image';
import PolylineContainer from './components/SvgContainer';
import Header from './components/Header';
import JsonPanel from './components/JsonPanel';

import styles from './drawingCrags.module.scss';
import ActionBar from './components/ActionBar';

const DrawingCragsBody: React.FC = () => {
  const drawingCragsStore = useDrawingCragsStore();
  const { naturalRatio } = drawingCragsStore;

  const container = React.useRef<HTMLDivElement>(null);
  const [image, setImage] = useState<string>();

  useEffect(() => {
    if (container.current) {
      drawingCragsStore.setContainer(container.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [container]);

  useEffect(() => {
    const el = container.current;
    if (!el) return;

    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      if (!naturalRatio || !width || !height) {
        drawingCragsStore.setRenderedImageDims({ x: 0, y: 0 });
        return;
      }
      const byHeight = { x: height * naturalRatio, y: height };
      const byWidth = { x: width, y: width / naturalRatio };
      const fit = byHeight.x <= width ? byHeight : byWidth;
      drawingCragsStore.setRenderedImageDims(fit);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [naturalRatio, drawingCragsStore]);

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
      <div className={styles.mainArea}>
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
          <Image image={image} />
          <PolylineContainer />
        </div>
        <JsonPanel />
      </div>
    </div>
  );
};
export default observer(DrawingCragsBody);
