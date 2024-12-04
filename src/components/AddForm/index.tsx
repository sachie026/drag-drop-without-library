import { useState } from "react";
import { DEFAULT_FORM_DATA, Message } from "../../assets/data";
import { isNumber } from "../../utils/helper";
import NumberInput from "./NumberInput";

interface Props {
  onSubmit: (data: Message) => void;
  hideModal: () => void;
}

function AddForm({ onSubmit, hideModal }: Props) {
  const [messageFormData, setMessageFormData] = useState({
    ...DEFAULT_FORM_DATA,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { year, month, date, message } = messageFormData;

  const addMessage = () => {
    if (!year || !date || !month || !message) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (parseInt(date) > 31) {
      setErrorMessage("Enter valid date.");
      return;
    }
    if (parseInt(month) > 12) {
      setErrorMessage("Enter valid month.");
      return;
    }

    if (parseInt(year) > 2024) {
      setErrorMessage("Enter valid date year.");
      return;
    }

    setErrorMessage(null);
    const newMessage = {
      date: `${year}-${month}-${date}`,
      message,
    };

    onSubmit(newMessage);
    setMessageFormData({ ...DEFAULT_FORM_DATA });
    hideModal();
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = event.target.value;
    const targetName = event.target.name;
    if (
      targetName !== "message" &&
      !isNumber(targetValue) &&
      targetValue !== ""
    ) {
      return;
    }

    setMessageFormData((prev) => ({
      ...prev,
      ...{
        [event.target.name]: event.target.value,
      },
    }));
  };

  return (
    <div className="fixed z-10 overflow-y-auto top-0 w-full left-0 ">
      <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-900 opacity-75" />
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div
          className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="mb-8">
              <label className="text-lg font-bold text-gray-800">
                Add message details
              </label>
            </div>

            <NumberInput
              name="date"
              length={2}
              value={messageFormData.date}
              inputChangeHandler={inputChangeHandler}
            />
            <NumberInput
              name="month"
              length={2}
              value={messageFormData.month}
              inputChangeHandler={inputChangeHandler}
            />
            <NumberInput
              name="year"
              length={4}
              value={messageFormData.year}
              inputChangeHandler={inputChangeHandler}
            />
            <label className="font-medium text-gray-800">message</label>
            <input
              name="message"
              value={messageFormData.message}
              onChange={inputChangeHandler}
              className="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
            />
            {errorMessage ? (
              <label className="text-red-500">{errorMessage}</label>
            ) : null}
          </div>
          <div className="bg-gray-200 px-4 py-3 text-right">
            <button
              type="button"
              className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
              onClick={hideModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className="py-2 px-4 bg-blue-500 text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500"
              onClick={addMessage}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddForm;
