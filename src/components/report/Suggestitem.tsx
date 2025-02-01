import { TDraggableItem } from "../../hooks/useDragHandlers";

type SuggestitemsProps = {
  item: TDraggableItem;
  handleDragStart: (event: React.DragEvent<HTMLElement>) => void;
};

const Suggestitem = ({ item, handleDragStart }: SuggestitemsProps) => {
  return (
    <>
      <div
        id={item.id.toString()}
        style={{
          top: item.position.x,
          left: item.position.y,
          overflow: "hidden",
        }}
        draggable
        onDragStart={(e) => handleDragStart(e)}
      >
        {item.jsx}
      </div>
    </>
  );
};

export default Suggestitem;
