import { makeAutoObservable } from 'mobx';
import { WheelEvent, UIEvent, MouseEvent } from 'react';
import { Line, Pos } from '../types';
import { v1 as uuid } from 'uuid';

enum MODES {
  INITIAL = 'initial',
  IMAGE = 'image',
  LINE_EDITING = 'lineEditing',
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export default class drawingCragsState {
  public naturalRatio: number;
  public renderedImageDims: Pos;

  public mode: MODES;

  public container?: HTMLDivElement;
  public isDragging: boolean;
  public startPanPoz: Pos;
  public panPoz: Pos;
  public draggedLine: Pos | null;
  public scale: number;

  public nameInInput: string;
  public highlightedLineId: string;
  public lines: Line[];
  public currentLineIndex: number;

  public imageLoaded: boolean;

  public isEditingLine: boolean;

  public currentEditedPoint: {
    active: boolean;
    lineId: string;
    pointIndex: number;
  };

  constructor() {
    makeAutoObservable(this, {});

    this.isDragging = false;
    this.mode = MODES.INITIAL;
    this.naturalRatio = 0;
    this.renderedImageDims = { x: 0, y: 0 };
    this.startPanPoz = { x: 0, y: 0 };
    this.panPoz = { x: 0, y: 0 };
    this.draggedLine = null;
    this.scale = 1;
    this.lines = [];
    this.highlightedLineId = '';
    this.nameInInput = '';

    this.imageLoaded = false;
    this.isEditingLine = false;
    this.currentLineIndex = -1;

    this.currentEditedPoint = {
      active: false,
      lineId: '',
      pointIndex: 0,
    };
  }

  public setNaturalRatio(ratio: number) {
    this.naturalRatio = ratio;
    this.imageLoaded = true;
  }

  public setRenderedImageDims(dims: Pos) {
    this.renderedImageDims = dims;
  }

  public setIsDragging(isDragging: boolean) {
    if (this.mode === MODES.IMAGE) {
      this.isDragging = isDragging;
    }
  }

  public handleMouseEnter = () => {
    if (this.mode === MODES.IMAGE) {
      document.getElementsByTagName('body')[0].classList.add('stop-scrolling');
    }
  };

  public handleMouseLeave = () => {
    if (this.mode === MODES.IMAGE) {
      document.getElementsByTagName('body')[0].classList.remove('stop-scrolling');
      this.setIsDragging(false);
    }
  };

  public setContainer = (container: HTMLDivElement) => {
    this.container = container;
  };

  public setStartPanPoz = (panPos: Pos) => {
    this.startPanPoz = panPos;
  };

  public setPanPoz = (panPos: Pos) => {
    this.panPoz = panPos;
  };

  public setScale = (scale: number) => {
    this.scale = scale;
  };

  public handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    if (!this.imageLoaded) return;

    if (this.mode === MODES.IMAGE) {
      this.setIsDragging(true);
      this.setStartPanPoz({ x: e.clientX - this.panPoz.x, y: e.clientY - this.panPoz.y });
    }
  };

  public handleMouseUp = (e: MouseEvent) => {
    e.preventDefault();
    if (!this.imageLoaded) return;

    if (this.mode === MODES.IMAGE) {
      this.setIsDragging(false);
    }
  };

  public handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    if (!this.imageLoaded) return;
    if (this.mode === MODES.IMAGE) {
      if (this.isDragging) {
        this.setPanPoz({
          x: e.clientX - this.startPanPoz.x,
          y: e.clientY - this.startPanPoz.y,
        });
      }
    } else if (this.mode === MODES.LINE_EDITING && this.renderedImageDims.x) {
      this.draggedLine = this.pointerToNormalized(e.clientX, e.clientY);
    }
  };

  public handleWheel = (e: WheelEvent) => {
    if (!this.imageLoaded) return;
    if (this.mode === MODES.IMAGE) {
      const _scale = Math.min(Math.max(0.125, this.scale + e.deltaY * -0.002), 4);
      this.setScale(_scale);
    }
  };
  public handleScroll = (e: UIEvent) => {
    e.preventDefault();
  };

  public loadLinesData = (linesJson: Line[]) => {
    this.lines = linesJson;
  };

  public createNewLine = () => {
    // only create a new line if the old line has points in it
    if (!this.nameInInput) {
      alert('Please enter a name for the line');
      return;
    }

    this.lines.push({ name: this.nameInInput, points: [], id: uuid() });
    this.nameInInput = '';
    this.currentLineIndex = this.lines.length - 1;
  };

  public deleteLastPoint = () => {
    if (this.lines[this.currentLineIndex] && this.lines[this.currentLineIndex].points.length > 0) {
      this.lines[this.currentLineIndex].points.pop();
    }
  };

  public deleteLine = () => {
    if (this.lines[this.currentLineIndex]) {
      this.lines.splice(this.currentLineIndex, 1);
      this.currentLineIndex--;
    }
  };

  public updateSelectedLine = (selectedLineName: string) => {
    this.currentLineIndex = this.lines.findIndex(line => line.name === selectedLineName);
  };

  public updateLineNewName = (newName: string) => {
    this.nameInInput = newName;
  };

  public editExistingLineName = (newName: string) => {
    this.lines[this.currentLineIndex].name = newName;
  };

  public handleClick = (e: MouseEvent) => {
    if ((this.mode === MODES.INITIAL || this.mode === MODES.LINE_EDITING) && this.renderedImageDims.x) {
      this.mode = MODES.LINE_EDITING;

      if (this.currentLineIndex < 0) {
        alert('first create a new line with a name');
        return;
      }

      this.lines[this.currentLineIndex].points.push(
        this.pointerToNormalized(e.clientX, e.clientY),
      );
    }
  };

  public setLinePoint = (lineId: string, pointIndex: number, newPosition: Pos) => {
    const lineIndex = this.lines.findIndex(line => line.id === lineId);

    if (lineIndex !== -1) {
      this.lines[lineIndex].points[pointIndex] = newPosition;
    }
  };

  public onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.mode === MODES.LINE_EDITING) {
      this.mode = MODES.INITIAL;
      this.draggedLine = null;
    }
  };

  public handlePointPointerDown = (
    e: React.PointerEvent<SVGCircleElement>,
    lineId: string,
    pointIndex: number,
  ) => {
    const el = e.currentTarget;
    el.setPointerCapture(e.pointerId);
    this.currentEditedPoint = {
      active: true,
      lineId,
      pointIndex,
    };
  };

  public handleSvgPointerMove = (e: React.PointerEvent) => {
    const { active, lineId, pointIndex } = this.currentEditedPoint;

    if (active) {
      const bbox = e.currentTarget.getBoundingClientRect();
      if (!bbox.width || !bbox.height) return;
      this.setLinePoint(lineId, pointIndex, {
        x: clamp01((e.clientX - bbox.left) / bbox.width),
        y: clamp01((e.clientY - bbox.top) / bbox.height),
      });
    }
  };

  public handleSvgPointerUp = (e: React.PointerEvent) => {
    if (this.currentEditedPoint.active) {
      this.currentEditedPoint = {
        active: false,
        lineId: '',
        pointIndex: 0,
      };
    }
  };

  private pointerToNormalized(clientX: number, clientY: number): Pos {
    if (!this.container || !this.renderedImageDims.x || !this.renderedImageDims.y) {
      return { x: 0, y: 0 };
    }
    const containerRect = this.container.getBoundingClientRect();
    // Image content is bottom-left anchored inside the container.
    const imageLeft = containerRect.left;
    const imageBottom = containerRect.bottom;
    const imageTop = imageBottom - this.renderedImageDims.y;
    return {
      x: clamp01((clientX - imageLeft) / this.renderedImageDims.x),
      y: clamp01((clientY - imageTop) / this.renderedImageDims.y),
    };
  }
}
