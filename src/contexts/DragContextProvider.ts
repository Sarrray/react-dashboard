import { createContext, useContext } from "react";

type TDragContex = {
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
};

const DragContext = createContext<TDragContex | undefined>(undefined);

export const useDragContext = () => {
  const context = useContext(DragContext);

  if (!context) {
    throw new Error("useDragContext error");
  }

  return context;
};

export { DragContext, useContext };
