interface Props {
  updateListType: (value: number) => void;
  modalVisibilityHandler: (value: boolean) => void;
}

function Header({ updateListType, modalVisibilityHandler }: Props) {
  return (
    <div className="flex flex-row px-24 pt-8 pb-8 bg-white content-center justify-center">
      <div className="flex-1 content-center">
        <button
          className="cursor-pointer px-1 pc-2 mr-4 text-sm cursor-pointer border-b-2 border-blue-300"
          onClick={() => updateListType(0)}
        >
          Inital Order
        </button>
        <button
          className="cursor-pointer px-1 pc-2 mr-4 cursor-pointer text-sm border-b-2 border-blue-300"
          onClick={() => updateListType(1)}
        >
          Sorted Order
        </button>
      </div>
      <div>
        <button
          className="cursor-pointer px-2 py-2 rounded-md text-white text-sm bg-blue-500"
          onClick={() => modalVisibilityHandler(true)}
        >
          Add new message
        </button>
      </div>
    </div>
  );
}

export default Header;
