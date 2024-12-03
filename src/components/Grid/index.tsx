import { DragEvent, useCallback, useEffect, useState } from "react";
import { DEFAULT_FORM_DATA, InputList, Message } from "../../assets/data";
import { isNumber, sortBasedOnMutlipleFields } from "../../utils/helper";

export type ListItem = {
  date: string;
  month: string;
  message: string;
};

type YearGroupData = Record<string, ListItem[]>;

function Grid() {
  const [initialGroupList, setInitialGroupList] = useState<YearGroupData>({});
  const [sortedGroupList, setSortedGroupList] = useState<YearGroupData>({});
  const [listType, setListType] = useState(0);
  const [allMessages, setAllMessages] = useState<Message[]>([...InputList]);
  const [messageFormData, setMessageFormData] = useState({
    ...DEFAULT_FORM_DATA,
  });

  const convertToGroupList = useCallback(() => {
    const yearWiseObj: YearGroupData = {};
    allMessages.forEach((msgItem: Message) => {
      const dateArr = msgItem.date.split("-");
      const year = dateArr[0];
      const date = dateArr[2];
      const month = dateArr[1];
      const message = msgItem.message;

      const dataObj = {
        date,
        year,
        month,
        message,
      };

      yearWiseObj[year] = [
        ...(year in yearWiseObj ? [...yearWiseObj[year]] : []),
        {
          ...dataObj,
        },
      ];
    });

    setInitialGroupList({ ...yearWiseObj });
    const objToSort = { ...yearWiseObj };

    Object.keys(objToSort).map((yearValue: string) => {
      const llist = objToSort[yearValue];
      const sortedLL = [...sortBasedOnMutlipleFields(llist)];
      objToSort[yearValue] = [...sortedLL];
    });

    setSortedGroupList({ ...objToSort });
  }, [allMessages]);

  const updateListType = (value: number) => {
    setListType(value);
  };

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    tileId: number
  ) => {
    const target = event.target as HTMLDivElement;
    const yearGroup = parseInt(target.className.split("-")[1]);
    event.dataTransfer.setData("tileId", tileId.toString());
    event.dataTransfer.setData("yearGroup", yearGroup.toString());
  };

  const onDropNew = (event: DragEvent<HTMLDivElement>, onDropYear: string) => {
    const id = parseInt(event.dataTransfer.getData("tileId"));
    const targetYear = event.dataTransfer.getData("yearGroup");

    if (onDropYear !== targetYear) {
      // Prevent tile to move to another group
      return;
    }

    const eventTarget = event.target as HTMLDivElement;
    const toAddIndex = parseInt(eventTarget.className.split("-")[2]);

    const prevDataList =
      listType === 0
        ? [...initialGroupList[onDropYear]]
        : [...sortedGroupList[onDropYear]];

    const elementToInsert = prevDataList.splice(id, 1)[0];
    prevDataList.splice(toAddIndex, 0, elementToInsert);

    const tempList =
      listType === 0 ? { ...initialGroupList } : { ...sortedGroupList };
    tempList[onDropYear] = [...prevDataList];

    if (listType === 0) {
      setInitialGroupList({
        ...tempList,
      });
    } else {
      setSortedGroupList({
        ...tempList,
      });
    }
  };

  const addMessage = () => {
    if (
      !messageFormData.year ||
      !messageFormData.date ||
      !messageFormData.month ||
      !messageFormData.message
    ) {
      return;
    }
    const newMessage = {
      date: `${messageFormData.year}-${messageFormData.month}-${messageFormData.date}`,
      message: messageFormData.message,
    };

    setAllMessages([...allMessages, newMessage]);
    setMessageFormData({ ...DEFAULT_FORM_DATA });
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name !== "message" && !isNumber(event.target.value)) {
      return;
    }
    setMessageFormData((prev) => ({
      ...prev,
      ...{
        [event.target.name]: event.target.value,
      },
    }));
  };

  useEffect(() => {
    convertToGroupList();
  }, [convertToGroupList]);

  return (
    <div className="drag-drop-container">
      <div>
        <input
          pattern="\d*"
          maxLength={2}
          name="date"
          value={messageFormData.date}
          onChange={inputChangeHandler}
        />

        <input
          pattern="\d*"
          maxLength={2}
          name="month"
          value={messageFormData.month}
          onChange={inputChangeHandler}
        />

        <input
          pattern="\d*"
          maxLength={4}
          name="year"
          value={messageFormData.year}
          onChange={inputChangeHandler}
        />

        <input
          name="message"
          value={messageFormData.message}
          onChange={inputChangeHandler}
        />

        <input type="text" />
        <button onClick={addMessage}>Add</button>
      </div>

      <div onClick={() => updateListType(0)}>Inital Order</div>
      <div onClick={() => updateListType(1)}>Sorted Order</div>

      <div className="grid grid-flow-col gap-4 auto-cols-[minmax(0,_2fr)] p-24">
        {Object.entries(
          listType === 0 ? initialGroupList : sortedGroupList
        ).map((entry: [string, ListItem[]], index: number) => {
          return (
            <div
              key={`yearGroup${index}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                onDropNew(e, entry[0]);
              }}
            >
              <div className="bg-black text-white p-4 rounded-md">{entry[0]}</div>

              {entry[1].map((item: ListItem, id: number) => {
                return (
                  <div
                    key={`yearGroupItem${index}${id}`}
                    onDragStart={(e) => onDragStart(e, id)}
                    draggable
                    className={`tile-${entry[0]}-${id} bg-gray-100 my-4 rounded-md p-8`}
                  >
                    {item.date}
                    {item.message}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Grid;
