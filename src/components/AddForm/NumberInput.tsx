interface Props {
  name: string;
  value: string;
  length: number;
  inputChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function NumberInput({ name, value, length, inputChangeHandler }: Props) {
  return (
    <>
      <label className="font-medium text-gray-800 capitalize">{name}</label>
      <input
        pattern="\d*"
        maxLength={length}
        name={name}
        value={value}
        onChange={inputChangeHandler}
        className="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
      />
    </>
  );
}

export default NumberInput;
