import axiosInstance from "@/lib/instances";
interface Payload {
  user: {
    token: string;
  };
}
const commonEndPoint = "worklog";

export const taskCommonPostRequest = async (
  apiEndPoint: string,
  payload: Payload,
) => {
  const endPoint = commonEndPoint + apiEndPoint;
  const token = payload?.user?.token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axiosInstance.post(
      endPoint,
      payload,

      {
        headers,
      },
    );
    return response;
  } catch (error) {
    console.log(error);
    // handleCatchError(error);
    return error;
  }
};

export const POST_API_ENDPOINTS = {
  addTask: "/addtask",
  getTask: "/tasks",
};

//API CALL FUNCTIONS STARTS HERE>>>>>>>>>>>>>>>>>...

//POST APIS
export const addTaskApi = async (payload: Payload) => {
  //API FOR ADDING A TASK
  const response = await taskCommonPostRequest(
    POST_API_ENDPOINTS.addTask,
    payload,
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
  return response;
};

export const getTaskApi = async (payload: Payload) => {
  //API FOR ADDING A TASK
  const response = await taskCommonPostRequest(
    POST_API_ENDPOINTS.getTask,
    payload,
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
  return response;
};
