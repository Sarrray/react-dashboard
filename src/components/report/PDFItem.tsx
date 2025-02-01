import React, { useEffect, useRef } from "react";
import { TDraggableItem } from "../../hooks/useDragHandlers";

type PDFItemProps = {
  item: TDraggableItem;
  completeFlg: boolean;
  handleDragStart: (event: React.DragEvent<HTMLElement>) => void;
  NewResizeObserver: ResizeObserver;
};

const PDFItem = ({
  item,
  completeFlg,
  handleDragStart,
  NewResizeObserver,
}: PDFItemProps) => {
  const divRef = useRef(null);

  useEffect(() => {
    const resizeObserver = NewResizeObserver;

    if (divRef.current) {
      resizeObserver.observe(divRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [NewResizeObserver]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: item.position.y,
          left: item.position.x,
        }}
      >
        {React.cloneElement(item.jsx, {
          id: item.id,
          style: {
            ...item.jsx.props.style,
            resize: completeFlg ? "none" : "both",
            overflow: "hidden",
            width: item.width,
            height: item.height,
          },
          draggable: completeFlg ? "false" : "true",
          onDragStart: (e: React.DragEvent<HTMLDivElement>) =>
            handleDragStart(e),
          ref: divRef,
        })}
      </div>
    </>
  );
};

export default PDFItem;
