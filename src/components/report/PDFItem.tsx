import React, { useEffect, useRef } from "react";
import { DraggableItemType } from "./Report";

type PDFItemProps = {
  item: DraggableItemType;
  completeFlg: boolean;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, id: number) => void;
  handleResize: (id: number, width: number, height: number) => void;
};

const PDFItem = ({
  item,
  completeFlg,
  handleDragStart,
  handleResize,
}: PDFItemProps) => {
  const divRef = useRef(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        handleResize(item.id, width, height);
      }
    });

    if (divRef.current) {
      resizeObserver.observe(divRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

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
          style: {
            ...item.jsx.props.style,
            resize: completeFlg ? "none" : "both",
            overflow: "hidden",
            width: item.width,
            height: item.height,
          },
          draggable: completeFlg ? "false" : "true",
          onDragStart: (e: React.DragEvent<HTMLDivElement>) =>
            handleDragStart(e, item.id),
          ref: divRef,
        })}
      </div>
    </>
  );
};

export default PDFItem;
