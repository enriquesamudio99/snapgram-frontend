import { api } from "../../common/api";
import { AxiosError, AxiosResponse } from "axios";
import { ICommunitiesResponse, ICommunitiesResult, ICommunityResponse, ICommunityResult,  } from "../../types";

const getCommunities = async (): Promise<ICommunitiesResult> => {
  try {
    const { data: responseData }: AxiosResponse<ICommunitiesResponse> = await api.get('/communities');

    return {
      response: responseData
    }
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof AxiosError) {
      const { message, response } = error;
      return {
        error: {
          message,
          data: response?.data
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

const createCommunity = async (data: FormData): Promise<ICommunityResult> => {
  try {
    const { data: responseData }: AxiosResponse<ICommunityResponse> = await api.post('/communities', data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }); 

    return {
      response: responseData
    }
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof AxiosError) {
      const { message, response } = error;
      return {
        error: {
          message,
          data: response?.data
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
  getCommunities,
  createCommunity
}