export interface Task {
  completiondate: string;
  createdAt: string;
  empid: string;
  percentage: number;
  remark: string;
  report_type: string;
  startingdate: string;
  status: string;
  taskname: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface GetTaskResponseFormat {
  status: boolean;
  message: string;
  data: Task[];
}
export interface CommonResponseFormat {
  status: boolean;
  message: string;
}

export type GetTaskData = {
  data: GetTaskResponseFormat;
};

export type BasicResponseFormat = {
  data: CommonResponseFormat;
};
