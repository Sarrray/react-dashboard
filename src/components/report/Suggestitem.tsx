import { DraggableItemType } from "./Report";

type SuggestitemsProps = {
  item: DraggableItemType;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, id: number) => void;
};

const Suggestitem = ({ item, handleDragStart }: SuggestitemsProps) => {
  return (
    <>
      <div
        key={item.id}
        style={{
          top: item.position.x,
          left: item.position.y,
          overflow: "hidden",
        }}
        draggable
        onDragStart={(e) => handleDragStart(e, item.id)}
      >
        {item.jsx}
      </div>
    </>
  );
};

export default Suggestitem;
