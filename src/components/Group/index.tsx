import { ListItem, YearGroupData } from "../Grid";

interface Props {
    groupList: YearGroupData;
    onDragStart: (event: React.DragEvent<HTMLDivElement>, tileId: number) => void;
    onDropNew: (event: React.DragEvent<HTMLDivElement>, onDropYear: string) => void;
} 

function Group({ groupList, onDropNew, onDragStart}: Props) {
  return (
    <div className="grid grid-flow-col gap-4 auto-cols-[minmax(0,_2fr)] p-24">
      {Object.entries(groupList).map(
        (entry: [string, ListItem[]], index: number) => {
          return (
            <div
              key={`yearGroup${index}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                onDropNew(e, entry[0]);
              }}
            >
              <div className="bg-black text-white p-4 rounded-md text-center">
                {entry[0]}
              </div>

              {entry[1].map((item: ListItem, id: number) => {
                return (
                  <div
                    key={`yearGroupItem${index}${id}`}
                    onDragStart={(e) => onDragStart(e, id)}
                    draggable
                    className={`tile-${entry[0]}-${id} bg-white my-4 rounded-md p-8 cursor-move border-b-4 border-black text-center`}
                  >
                    {item.date}-{item.month}-{item.message}
                  </div>
                );
              })}
            </div>
          );
        }
      )}
    </div>
  );
}

export default Group;
