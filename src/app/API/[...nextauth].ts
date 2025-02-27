import axiosInstance from "@/lib/instances";

const commonEndPoint = "worklog";

export const authCommonPostRequest = async (
  apiEndPoint: string,
  payload: object,
) => {
  const endPoint = commonEndPoint + apiEndPoint;
  const headers = {
    "Content-Type": "application/json",
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
  signUp: "/signup",
  signIn: "/login",
};

//API CALL FUNCTIONS STARTS HERE>>>>>>>>>>>>>>>>>...

//POST APIS
export const signupUserApi = async (payload: object) => {
  //API FOR SIGNING UP A USER
  const response = await authCommonPostRequest(
    POST_API_ENDPOINTS.signUp,
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
export const signInUserApi = async (payload: object) => {
  //API FOR SIGNING IN A USER
  const response = await authCommonPostRequest(
    POST_API_ENDPOINTS.signIn,
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
