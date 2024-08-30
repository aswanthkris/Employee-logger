import { useState } from "react";
import Link from "next/link";
import DatePickerOne from "../FormElements/DatePicker/DatePickerOne";
import SelectGroupTwo from "../SelectGroup/SelectGroupTwo";

const dropdownIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
    />
  </svg>
);

const AddTask = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [status, setStatus] = useState("To-do");
  const [startDate, setStartDate] = useState("");
  const [completionDate, setCompletionDate] = useState("");
  const [remarks, setRemarks] = useState("");

  const dropdownOptions = {
    icon: dropdownIcon,
    placeholder: "What is the current status of the task?",
    items: ["To Do", "In Progress", "Done"],
  };
  const handleAddTask = () => {
    if (taskName.trim() && startDate && completionDate) {
      // Handle task addition logic here (e.g., API call)
      console.log({
        taskName,
        status,
        startDate,
        completionDate,
        remarks,
      });
      // Reset the form
      setTaskName("");
      setStatus("To-do");
      setStartDate("");
      setCompletionDate("");
      setRemarks("");
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-4">
      {isAdding ? (
        <div className="space-y-2 bg-white p-3 dark:bg-boxdark-2">
          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Task Name
            </label>
            <input
              type="text"
              placeholder="What needs to be done?"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div>
            <label className="text-gray-700 block text-sm font-medium">
              Status
            </label>
            <SelectGroupTwo options={dropdownOptions} />
          </div>

          <div>
            <label className="text-gray-700 block text-sm font-medium">
              Start Date
            </label>
            <DatePickerOne />
          </div>

          <div>
            <label className="text-gray-700 block text-sm font-medium">
              Expected Completion Date
            </label>
            <div>
              <DatePickerOne />
            </div>
          </div>

          <div>
            <label className="text-gray-700 block text-sm font-medium">
              Remarks
            </label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter any remarks"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="flex space-x-4">
            <Link
              href="#"
              onClick={handleAddTask}
              className="inline-flex items-center justify-center gap-2.5 rounded-md bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Save
            </Link>
            <button
              onClick={() => setIsAdding(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <Link
          href="#"
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center justify-center gap-2.5 rounded-md bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </span>
          Add task
        </Link>
      )}
    </div>
  );
};

export default AddTask;
