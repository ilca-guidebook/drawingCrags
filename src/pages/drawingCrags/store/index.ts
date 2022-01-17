import { createContext, useContext } from "react";
import DrawingCragsState from "./drawingCragsState";

const drawingCragsState = new DrawingCragsState();
export const drawingCragsStoreContext = createContext<DrawingCragsState>(drawingCragsState);
export const DrawingCragsStoreProvider = drawingCragsStoreContext.Provider;

export const useDrawingCragsStore = () => useContext(drawingCragsStoreContext);
