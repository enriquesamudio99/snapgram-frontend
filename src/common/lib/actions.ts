import { AxiosError, AxiosResponse } from "axios";
import { IGetCurrentUserResponse, IGetCurrentUserResult } from "../../types";
import { api } from "../api";

const getCurrentUser = async (userId: string): Promise<IGetCurrentUserResult> => {
  console.log("getting user");
  try {
    const response: AxiosResponse<IGetCurrentUserResponse> = await api.get(`/users/${userId}`);

    return {
      response
    }
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof AxiosError) {
      return {
        error: {
          message: error.message,
          data: error.response?.data
        }
      }
    }
    return {
      error: {
        message: "Something wrong"
      }
    }
  }
}

export {
  getCurrentUser
}