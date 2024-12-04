import { DragEvent, useCallback, useEffect, useState } from "react";
import { DEFAULT_FORM_DATA, InputList, Message } from "../../assets/data";
import { isNumber, sortBasedOnMutlipleFields } from "../../utils/helper";
import AddForm from "../AddForm";
import Group from "../Group";

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
  const [messageFormData, setMessageFormData] = useState({
    ...DEFAULT_FORM_DATA,
  });
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

  const onAddMessageHandler = (messageData: Message) => {
    setAllMessages([...allMessages, messageData]);
    convertToGroupList();
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
      <button className="cursor-pointer" onClick={() => updateListType(0)}>
        Inital Order
      </button>
      <button className="cursor-pointer" onClick={() => updateListType(1)}>
        Sorted Order
      </button>
      <button
        className="cursor-pointer"
        onClick={() => modalVisibilityHandler(true)}
      >
        Add new message
      </button>

      <Group
        groupList={listType === 0 ? initialGroupList : sortedGroupList}
        onDragStart={onDragStart}
        onDropNew={onDropNew}
      />
    </div>
  );
}

export default Grid;
