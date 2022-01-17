import { makeAutoObservable } from "mobx";
import { WheelEvent, UIEvent, MouseEvent } from "react";
import { Line, Pos } from "../types";
import { v1 as uuid } from "uuid";

export const CONTAINER_HEIGHT = 600;
export const CONTAINER_WIDTH = 1200;

export default class drawingCragsState {
  public imageDimensions: Pos;

  public mode: "lineEditing" | "image";

  public container?: HTMLDivElement;
  public isDragging: boolean;
  public startPanPoz: Pos;
  public panPoz: Pos;
  public scale: number;

  public nameInInput: string;
  public highlightedLineId: string;
  public lines: Line[];
  public currentLineIndex: number;

  public imageLoaded: boolean;

  constructor() {
    makeAutoObservable(this, {});

    this.isDragging = false;
    this.mode = "lineEditing";
    this.imageDimensions = { x: 0, y: 0 };
    this.startPanPoz = { x: 0, y: 0 };
    this.panPoz = { x: 0, y: 0 };
    this.scale = 1;
    this.lines = [];
    this.highlightedLineId = "";
    this.nameInInput = "";

    this.imageLoaded = false;
    this.currentLineIndex = -1;
  }

  public setImageDimensions(pos: Pos) {
    this.imageDimensions = pos;
    this.imageLoaded = true;
  }

  public setIsDragging(isDragging: boolean) {
    if (this.mode === "image") {
      this.isDragging = isDragging;
    }
  }

  public handleMouseEnter = () => {
    if (this.mode === "image") {
      document.getElementsByTagName("body")[0].classList.add("stop-scrolling");
    }
  };

  public handleMouseLeave = () => {
    if (this.mode === "image") {
      document.getElementsByTagName("body")[0].classList.remove("stop-scrolling");
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
    if (this.mode === "image") {
      this.setIsDragging(true);
      this.setStartPanPoz({ x: e.clientX - this.panPoz.x, y: e.clientY - this.panPoz.y });
    }
  };

  public handleMouseUp = (e: MouseEvent) => {
    e.preventDefault();
    if (!this.imageLoaded) return;
    if (this.mode === "image") {
      this.setIsDragging(false);
    }
  };

  public handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    if (!this.imageLoaded) return;
    if (this.mode === "image") {
      if (this.isDragging) {
        this.setPanPoz({
          x: e.clientX - this.startPanPoz.x,
          y: e.clientY - this.startPanPoz.y
        });
      }
    }
  };

  public handleWheel = (e: WheelEvent) => {
    if (!this.imageLoaded) return;
    if (this.mode === "image") {
      const _scale = Math.min(Math.max(0.125, this.scale + e.deltaY * -0.002), 4);
      this.setScale(_scale);
    }
  };
  public handleScroll = (e: UIEvent) => {
    e.preventDefault();
  };

  public loadLinesData = (linesJson: Line[]) => {
    this.lines = linesJson.map(line => {
      return {
        ...line,
        points: line.points.map(point => ({
          x: point.x * CONTAINER_WIDTH,
          y: point.y * CONTAINER_HEIGHT
        }))
      };
    });
  };

  public createNewLine = () => {
    // only create a new line if the old line has points in it
    if (!this.nameInInput) {
      alert("Please enter a name for the line");
      return;
    }

    this.lines.push({ name: this.nameInInput, points: [], id: uuid() });
    this.nameInInput = "";
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
    if (this.mode === "lineEditing") {
      if (this.container) {
        if (this.currentLineIndex < 0) {
          alert("first create a new line with a name");
          return;
        }
        const relativePointPos: Pos = {
          x: e.clientX - this.container.offsetLeft + window.scrollX,
          y: e.clientY - this.container.offsetTop + window.scrollY
        };

        this.lines[this.currentLineIndex].points.push(relativePointPos);
      }
    }
  };
}
