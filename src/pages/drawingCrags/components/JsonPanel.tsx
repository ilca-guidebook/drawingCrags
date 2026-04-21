import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { useDrawingCragsStore } from '../store';
import { Line } from '../types';

import styles from '../drawingCrags.module.scss';

const DEBOUNCE_MS = 400;

const JsonPanel: React.FC = () => {
  const drawingCragsStore = useDrawingCragsStore();
  const { lines, imageLoaded } = drawingCragsStore;

  const [text, setText] = useState<string>('[]');
  const [error, setError] = useState<string | null>(null);
  const isEditingRef = useRef(false);
  const debounceRef = useRef<number | null>(null);

  const serialized = JSON.stringify(lines, null, 2);

  useEffect(() => {
    if (!isEditingRef.current) {
      setText(serialized);
      setError(null);
    }
  }, [serialized]);

  useEffect(
    () => () => {
      if (debounceRef.current !== null) {
        window.clearTimeout(debounceRef.current);
      }
    },
    [],
  );

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const nextText = e.target.value;
    isEditingRef.current = true;
    setText(nextText);

    if (debounceRef.current !== null) {
      window.clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(() => {
      try {
        const parsed = JSON.parse(nextText);
        if (!Array.isArray(parsed)) {
          throw new Error('JSON must be an array of lines');
        }
        drawingCragsStore.loadLinesData(parsed as Line[]);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
      }
    }, DEBOUNCE_MS);
  };

  const handleFocus = () => {
    isEditingRef.current = true;
  };

  const handleBlur = () => {
    isEditingRef.current = false;
    setText(serialized);
    setError(null);
  };

  return (
    <div className={styles.jsonPanel}>
      <div className={styles.jsonPanelHeader}>Lines JSON (edit or paste)</div>
      {!imageLoaded && (
        <div className={styles.jsonHint}>Upload a crag image first to edit or paste JSON.</div>
      )}
      <textarea
        className={styles.jsonTextarea}
        value={text}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        spellCheck={false}
        disabled={!imageLoaded}
      />
      {error && <div className={styles.jsonError}>Invalid JSON: {error}</div>}
    </div>
  );
};

export default observer(JsonPanel);
