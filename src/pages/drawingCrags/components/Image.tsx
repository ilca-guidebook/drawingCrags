import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent } from 'react';

import styles from '../drawingCrags.module.scss';

import { useDrawingCragsStore } from '../store';
import { CONTAINER_HEIGHT, CONTAINER_WIDTH } from '../store/drawingCragsState';

type Props = {
  image: string | undefined;
  imageStyle: Record<string, string>;
};

const Image: React.FC<Props> = ({ image, imageStyle }) => {
  const store = useDrawingCragsStore();
  const handleImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const t = e.target as HTMLImageElement;
    const ratio = CONTAINER_HEIGHT / CONTAINER_WIDTH;
    const imageRatio = t.height / t.width;

    let height = 0;
    let width = 0;
    // wider than container
    if (imageRatio < ratio) {
      width = CONTAINER_WIDTH;
      height = t.height * (CONTAINER_WIDTH / t.width);
    } else {
      height = CONTAINER_HEIGHT;
      width = t.width * (CONTAINER_HEIGHT / t.height);
    }
    store.setImageDimensions({ x: width, y: height });
  };

  if (image) {
    return (
      <img
        className={styles.cragImage}
        style={imageStyle}
        src={image}
        alt=""
        onLoad={handleImageLoad}
      />
    );
  } else {
    return null;
  }
};

export default observer(Image);
