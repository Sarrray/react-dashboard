import { useState } from "react";
import { useDragContext } from "../contexts/DragContextProvider";
import { getDragStartPos, getDropPos } from "../utils/dragUtils";

export type TDragOffset = { x: number; y: number };

export type TDraggableItem = {
  id: number;
  jsx: JSX.Element;
  position: { x: number; y: number };
  type: "suggest" | "pdf";
  width: number;
  height: number;
};

const useDragHandlers = () => {
  const { isDragging, setIsDragging } = useDragContext();
  const [dragOffset, setDragOffset] = useState<TDragOffset>({ x: 0, y: 0 });
  const [suggestItems, setSuggestItems] = useState<TDraggableItem[]>([]);
  const [addItems, setAddItems] = useState<TDraggableItem[]>([]);

  const handleDragStart = (event: React.DragEvent<HTMLElement>) => {
    const target = event.currentTarget;
    setIsDragging(true);
    const startPos = getDragStartPos(target, event.clientX, event.clientY);
    setDragOffset(startPos);
    console.log(`[handleDragStart]`, startPos, dragOffset);
    event.dataTransfer.setData("text/plain", target.id);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const draggingId = event.dataTransfer.getData("text/plain");
    const dropPos = getDropPos(
      event.currentTarget,
      event.clientX,
      event.clientY,
      dragOffset
    );

    setAddItems((prevItems) => {
      const newItem =
        prevItems.filter((x) => x.id == Number(draggingId))?.[0] ??
        suggestItems.filter((x) => x.id == Number(draggingId))?.[0];

      if (!newItem) {
        return [...addItems];
      }
      return [
        ...addItems.filter((x) => x.id != Number(draggingId)),
        {
          ...newItem,
          position: {
            x: Math.max(0, dropPos.x),
            y: Math.max(0, dropPos.y),
          },
          id:
            prevItems
              .concat(suggestItems)
              .reduce((acc, cur) => Math.max(acc, Number(cur.id)), 0) + 1,
          type: "pdf",
          width: newItem.width,
          height: newItem.height,
        },
      ];
    });
  };

  const NewResizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const { width, height } = entry.contentRect;
      setAddItems((prevItems) => {
        return prevItems.map((x) =>
          x.id == Number(entry.target.id)
            ? { ...x, width: width, height: height }
            : x
        );
      });
    }
  });

  const removeAddItems = () => {
    setAddItems([]);
  };

  return {
    isDragging,
    suggestItems,
    setSuggestItems,
    addItems,
    handleDragStart,
    handleDragOver,
    handleDrop,
    removeAddItems,
    NewResizeObserver,
  };
};

export default useDragHandlers;
