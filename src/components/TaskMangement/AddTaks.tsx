import { useEffect, useState } from "react";
import Link from "next/link";
import DatePickerOne from "../FormElements/DatePicker/DatePickerOne";
import SelectGroupTwo from "../SelectGroup/SelectGroupTwo";
import { addTaskApi, getTaskApi } from "@/app/API/[taskApi]";
import { useRecoilState } from "recoil";
import { userAtom } from "@/app/atoms/userAtom";
import DatePickerTwo from "../FormElements/DatePicker/DatePickerTwo";
import { BasicResponseFormat, GetTaskData } from "@/types/tasks";
import DangerAlert from "../Alerts/DangerAlert";
import { listAtom } from "@/app/atoms/taskAtom";

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
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
    />
  </svg>
);

const AddTask = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [list, setList] = useRecoilState(listAtom);
  const [isAdding, setIsAdding] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [addingFailed, setAddingFailed] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [status, setStatus] = useState("pending");
  const [startDate, setStartDate] = useState("");
  const [completionDate, setCompletionDate] = useState("");
  const [workCompleted, setWorkCompleted] = useState(0);
  const [remarks, setRemarks] = useState("");
  const [reportType, setReportType] = useState("morning");
  const employeeId = user?.userData?.empid;

  const dropdownOptions = {
    icon: dropdownIcon,
    placeholder: "What is the current status of the task?",
    items: ["To Do", "In Progress", "Done"],
  };
  const handleStartDate = (value: string) => {
    const [start, end] = value.split(" to ");
    setStartDate(start);
    setCompletionDate(end);
  };

  const handleChoosedStatus = (value: string) => {
    if (value === "Done") {
      setStatus("completed");
      setWorkCompleted(100);
    } else if (value === "To Do") {
      setStatus("pending");
      setWorkCompleted(0);
    } else {
      setStatus("in-progress");
    }
  };
  const handleAddTask = async () => {
    try {
      setAddLoading(true);
      const payload = {
        taskname: taskName,
        status,
        startingdate: startDate,
        completiondate: completionDate,
        remark: remarks,
        report_type: reportType,
        percentage: workCompleted,
        empid: employeeId,
        user,
      };
      const response = (await addTaskApi(payload)) as BasicResponseFormat;
      if (response?.data?.status) {
        setIsAdding(false);
        setAddLoading(false);
        setAddingFailed(false);
        // Reset the form
        setTaskName("");
        setStatus("pending");
        setStartDate("");
        setCompletionDate("");
        setRemarks("");
        const payload = { empid: employeeId, user };
        const response = (await getTaskApi(payload)) as GetTaskData;
        const data = response?.data;
        const list = data?.data;
        setList(list);
      } else {
        setAddLoading(false);
        setAddingFailed(true);
      }
    } catch (error) {
      console.log("error", error);
      setAddLoading(false);
    }
  };
  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 10) {
      setReportType("morning");
    } else if (currentHour < 18) {
      setReportType("afternoon");
    } else {
      setReportType("endOfDay");
    }
  }, []);
  return (
    <div className="space-y-4">
      {isAdding ? (
        <div className="space-y-2 bg-white p-3 dark:bg-boxdark-2">
          <div>
            <label className="text-gray-700 block text-sm font-medium">
              Report Type
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            >
              <option value="morning">Morning Report</option>
              <option value="afternoon">Afternoon Report</option>
              <option value="endOfDay">End of the Day Report</option>
            </select>
          </div>
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
            <SelectGroupTwo
              getChoosedStatus={handleChoosedStatus}
              options={dropdownOptions}
            />
          </div>

          <div>
            <label className="text-gray-700 block text-sm font-medium">
              Choose start date and expected completion date
            </label>
            <DatePickerOne handleDatePicker={handleStartDate} />
          </div>
          <div>
            <label className="text-gray-700 block text-sm font-medium">
              Percentage of Work Completed
            </label>
            <div className="relative w-full">
              <input
                type="range"
                min="0"
                max="100"
                value={workCompleted}
                onChange={(e) => setWorkCompleted(parseInt(e.target.value))}
                className="bg-gray-200 dark:bg-gray-700 h-2 w-full cursor-pointer appearance-none rounded-lg"
                style={{
                  background: `linear-gradient(to right, ${
                    workCompleted < 25
                      ? "#ef4444" // Red for < 25%
                      : workCompleted < 75
                        ? "#f59e0b" // Yellow for 25% - 74%
                        : "#10b981" // Green for 75% and above
                  } ${workCompleted}%, #d1d5db ${workCompleted}%)`,
                }}
              />
            </div>
            <span className="text-sm font-medium text-black dark:text-white">
              {workCompleted}%
            </span>
          </div>
          {/* <div>
            <label className="text-gray-700 block text-sm font-medium">
              Expected Completion Date
            </label>
            <div>
              <DatePickerOne handleDatePicker={handleEndDate} />
            </div>
          </div> */}

          <div>
            <label className="text-gray-700 block text-sm font-medium">
              Challenges faced
            </label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Please mention if there were any challenged faced while doing this task."
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          {addingFailed && (
            <DangerAlert
              message1="Task adding failed"
              message2={"Please ensure you have entered valid task details."}
            />
          )}
          <div className="flex space-x-4">
            <button
              onClick={handleAddTask}
              disabled={addLoading}
              className="inline-flex items-center justify-center gap-2.5 rounded-md bg-meta-3 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              {addLoading ? "Saving..." : "Save"}
            </button>
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
