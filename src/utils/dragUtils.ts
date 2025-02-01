import { TDraggableItem, TDragOffset } from "../hooks/useDragHandlers";

// ドラッグ時の要素内でのマウス位置を返す
export const getDragStartPos = (
  dragItem: HTMLElement,
  cursorX: number,
  cursorY: number
): TDragOffset => {
  const rect = dragItem.getBoundingClientRect();

  console.log("getDragStartPos", cursorX - rect.left, cursorY - rect.top);
  return {
    x: cursorX - rect.left,
    y: cursorY - rect.top,
  };
};

// ドロップ時の位置を返す（ドラッグ開始時のオフセットを考慮）
export const getDropPos = (
  dragItem: HTMLElement,
  cursorX: number,
  cursorY: number,
  dragStartPos: TDragOffset
): TDragOffset => {
  const rect = dragItem.getBoundingClientRect();

  console.log("dragStartPos");

  return {
    x: cursorX - rect.left - dragStartPos.x,
    y: cursorY - rect.top - dragStartPos.y,
  };
};

export const ItemResize = () => {};

export const removeAddItems = (
  setAddItems: (addItems: TDraggableItem[]) => void
) => {
  setAddItems([]);
};
