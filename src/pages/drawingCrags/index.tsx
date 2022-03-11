import DrawingCragsBody from './drawingCragsBody';
import { DrawingCragsStoreProvider } from './store';
import DrawingCragsState from './store/drawingCragsState';

const drawingCragsState = new DrawingCragsState();

const DrawingCrags: React.FC = () => {
  return (
    <DrawingCragsStoreProvider value={drawingCragsState}>
      <DrawingCragsBody />
    </DrawingCragsStoreProvider>
  );
};
export default DrawingCrags;
