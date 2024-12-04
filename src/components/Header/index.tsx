interface Props {
  updateListType: (value: number) => void;
  modalVisibilityHandler: (value: boolean) => void;
}

function Header({ updateListType, modalVisibilityHandler }: Props) {
  return (
    <div className="bg-gray-200">
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
    </div>
  );
}

export default Header;
