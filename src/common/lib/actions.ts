import { AxiosError, AxiosResponse } from "axios";
import { IGetUserResponse, IGetUserResult } from "../../types";
import { api } from "../api";

const getCurrentUser = async (): Promise<IGetUserResult> => {
  try {
    const { data: responseData }: AxiosResponse<IGetUserResponse> = await api.get("/users/current");

    return {
      response: responseData
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