import { useCallback, useEffect, useState } from "react";
import { InputList, Message } from "../../assets/data";
import { sortBasedOnMutlipleFields } from "../../utils/helper";
import AddForm from "../AddForm";
import Group from "../Group";
import Header from "../Header";

export type ListItem = {
  date: string;
  month: string;
  message: string;
};

export type YearGroupData = Record<string, ListItem[]>;

function Grid() {
  const [initialGroupList, setInitialGroupList] = useState<YearGroupData>({});
  const [sortedGroupList, setSortedGroupList] = useState<YearGroupData>({});
  const [listType, setListType] = useState(0);
  const [allMessages, setAllMessages] = useState<Message[]>([...InputList]);
  const [showModal, setShowModal] = useState(false);

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

  const onDropNew = (
    event: React.DragEvent<HTMLDivElement>,
    onDropYear: string
  ) => {
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

  const onAddMessageHandler = (messageData: Message) => {
    setAllMessages([...allMessages, messageData]);
    convertToGroupList();
  };

  const modalVisibilityHandler = (value: boolean) => {
    setShowModal(value);
  };

  useEffect(() => {
    convertToGroupList();
  }, [convertToGroupList]);

  return (
    <div className="bg-gray-200">
      {showModal ? (
        <AddForm
          onSubmit={onAddMessageHandler}
          hideModal={() => modalVisibilityHandler(false)}
        />
      ) : null}
      <Header
        updateListType={updateListType}
        modalVisibilityHandler={modalVisibilityHandler}
      />
      <Group
        groupList={listType === 0 ? initialGroupList : sortedGroupList}
        onDragStart={onDragStart}
        onDropNew={onDropNew}
      />
    </div>
  );
}

export default Grid;
