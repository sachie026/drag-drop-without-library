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
  const [selectedGroupList, setSelectedGroupList] = useState<YearGroupData>({});
  const [listType, setListType] = useState(0);
  const [allMessages, setAllMessages] = useState<Message[]>([...InputList]);
  const [showModal, setShowModal] = useState(false);

  const updateListType = useCallback(
    (value: number) => {
      setListType(value);
      setSelectedGroupList(value === 0 ? initialGroupList : sortedGroupList);
    },
    [initialGroupList, sortedGroupList]
  );

  const convertToGroupList = useCallback(() => {
    // This method is required when we add the new message or for the first time rendering
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
    const tileId = parseInt(event.dataTransfer.getData("tileId"));
    const targetYear = event.dataTransfer.getData("yearGroup");

    if (onDropYear !== targetYear) {
      // Prevent tile to move to another group
      return;
    }

    const eventTarget = event.target as HTMLDivElement;
    const toAddIndex = parseInt(eventTarget.className.split("-")[2]);

    const prevDataList = [...selectedGroupList[onDropYear]];

    const elementToInsert = prevDataList.splice(tileId, 1)[0];
    prevDataList.splice(toAddIndex, 0, elementToInsert);

    const tempList = { ...selectedGroupList };
    tempList[onDropYear] = [...prevDataList];

    setSelectedGroupList({
      ...tempList,
    });
  };

  const handleSelectedListOnAdd = (messageData: Message) => {
    // This method is required to add to the current visible list
    const splitDate = messageData.date.split("-");
    const onDropYear = splitDate[0];
    const prevDataList = onDropYear in selectedGroupList ? [...selectedGroupList[onDropYear]] : [];
    const tempList = { ...selectedGroupList };

    if(onDropYear in tempList) {
      tempList[onDropYear] = [
        ...prevDataList,
        { date: splitDate[2], month: splitDate[1], message: messageData.message },
      ];
    }
    else{
      tempList[onDropYear] = [
        ...prevDataList,
        { date: splitDate[2], month: splitDate[1], message: messageData.message },
      ];
    }

    setSelectedGroupList({
      ...tempList,
    });
  };

  const onAddMessageHandler = (messageData: Message) => {
    setAllMessages([...allMessages, messageData]);
    convertToGroupList();
    handleSelectedListOnAdd(messageData);
  };

  const modalVisibilityHandler = (value: boolean) => {
    setShowModal(value);
  };

  useEffect(() => {
    // When the page loads, we need to call this method to have the inital and sorted ordered list
    convertToGroupList();
  }, [convertToGroupList, listType]);

  return (
    <div className="bg-gray-100">
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
        groupList={selectedGroupList}
        onDragStart={onDragStart}
        onDropNew={onDropNew}
      />
    </div>
  );
}

export default Grid;
