import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent } from 'react';

import styles from '../drawingCrags.module.scss';

import { useDrawingCragsStore } from '../store';

type Props = {
  image: string | undefined;
};

const Image: React.FC<Props> = ({ image }) => {
  const store = useDrawingCragsStore();

  const handleImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const t = e.target as HTMLImageElement;
    if (t.naturalWidth && t.naturalHeight) {
      store.setNaturalRatio(t.naturalWidth / t.naturalHeight);
    }
  };

  if (!image) {
    return null;
  }

  return <img className={styles.cragImage} src={image} alt="" onLoad={handleImageLoad} />;
};

export default observer(Image);
