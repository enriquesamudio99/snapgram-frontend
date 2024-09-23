import { AxiosError, AxiosResponse } from "axios";
import { api } from "../../common/api";
import { IPostResponse, IPostResult } from "../../types";

const createPost = async (data: FormData): Promise<IPostResult> => {
  try {
    const response: AxiosResponse<IPostResponse> = await api.post('/posts', data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

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
  createPost
}