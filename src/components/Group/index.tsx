import { ListItem, YearGroupData } from "../Grid";
import Tile from "./Tile";

interface Props {
  groupList: YearGroupData;
  onDragStart: (event: React.DragEvent<HTMLDivElement>, tileId: number) => void;
  onDropNew: (
    event: React.DragEvent<HTMLDivElement>,
    onDropYear: string
  ) => void;
}

function Group({ groupList, onDropNew, onDragStart }: Props) {
  const allEntries = Object.entries(groupList);
  const showGroupRows = allEntries.length > 6;

  return (
    <div
      className={`grid ${
        showGroupRows ? "grid-flow-row" : "grid-flow-col"
      } gap-4 auto-cols-[minmax(0,_2fr)] p-24 pt-12`}
    >
      {Object.keys(groupList).length === 0 ? (
        <label>
          <b>Note:</b> Click Initial Order or Sorted Order to render the list
        </label>
      ) : null}
      {allEntries.map((entry: [string, ListItem[]], index: number) => {
        return (
          <div
            key={`yearGroup${index}`}
            onDragOver={(event: React.DragEvent<HTMLDivElement>) =>
              event.preventDefault()
            }
            onDrop={(event: React.DragEvent<HTMLDivElement>) => {
              onDropNew(event, entry[0]);
            }}
          >
            <div className="bg-black text-white p-2 rounded-md text-center content-center h-10">
              {entry[0]}
            </div>

            <div
              className={`grid gap-4 ${
                showGroupRows ? "grid-flow-col" : "grid-flow-row"
              }`}
            >
              {entry[1].map((item: ListItem, id: number) => {
                return (
                  <Tile
                    key={`yearGroupItem${index}${id}`}
                    onDragStart={onDragStart}
                    item={item}
                    tileId={id}
                    group={entry[0]}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Group;
