import React from "react";
import { ListItem } from "../Grid";
import { MONTHS } from "../../assets/data";

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
      className={`tile-${group}-${tileId} bg-white my-4 rounded-md p-8 cursor-move border-1px border-b-4 text-center`}
    >
      <div className="mb-6">
        <label className="text-2xl font-bold mr-2 text-gray-300">
          {MONTHS[parseInt(item.month)]}
        </label>
        <label className="text-sm font-normal">{item.date}</label>
      </div>
      <label className={`text-large text-green-300`}>{item.message}</label>
    </div>
  );
}

export default React.memo(Tile);
