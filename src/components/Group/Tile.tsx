import { ListItem } from "../Grid";

interface Props {
  item: ListItem;
  group: string;
  tileId: number;
  onDragStart: (event: React.DragEvent<HTMLDivElement>, tileId: number) => void;
}

function Tile({ item, group, tileId, onDragStart }: Props) {
  return (
    <div
      onDragStart={(event) => onDragStart(event, tileId)}
      draggable
      className={`tile-${group}-${tileId} bg-white my-4 rounded-md p-8 cursor-move border-b-4 border-black text-center`}
    >
      {item.date}-{item.month}-{item.message}
    </div>
  );
}

export default Tile;
