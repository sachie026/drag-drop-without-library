import React from "react";

interface Props {
  name: string;
  value: string;
  length: number;
  inputChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function NumberInput({ name, value, length, inputChangeHandler }: Props) {
  return (
    <div className="grid grid-flow-col content-center justify-center">
      <label className="font-thin text-center text-gray-600 capitalize">
        {name}
      </label>
      <input
        pattern="\d*"
        maxLength={length}
        name={name}
        value={value}
        onChange={inputChangeHandler}
        className="w-2/3 outline-none text-sm rounded bg-gray-100 ml-4 pl-2 py-1"
      />
    </div>
  );
}

export default React.memo(NumberInput);
