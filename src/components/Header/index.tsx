import React from "react";

interface Props {
  updateListType: (value: number) => void;
  modalVisibilityHandler: (value: boolean) => void;
}

const BUTTON_CLASSES = "cursor-pointer px-4 py-1 mr-4 rounded-md text-sm cursor-pointer border-x border-y border-gray-300 hover:bg-gray-100";

function Header({ updateListType, modalVisibilityHandler }: Props) {
  return (
    <div className="flex flex-row max-sm:flex-col px-24 pt-8 pb-8 bg-white content-center justify-center">
      <div className="flex-1 content-center font-thin">
        <button
          className={BUTTON_CLASSES}
          onClick={() => updateListType(0)}
        >
          Inital Order
        </button>
        <button
          className={BUTTON_CLASSES}
          onClick={() => updateListType(1)}
        >
          Sorted Order
        </button>
      </div>
      <div className="max-sm:mt-4">
        <button
          className="cursor-pointer font-thin px-4 py-2 rounded-md text-white text-sm bg-blue-500 hover:bg-blue-600"
          onClick={() => modalVisibilityHandler(true)}
        >
          Add new message
        </button>
      </div>
    </div>
  );
}

export default React.memo(Header);
