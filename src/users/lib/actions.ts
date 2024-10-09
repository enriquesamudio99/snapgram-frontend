import { AxiosError, AxiosResponse } from "axios";
import { 
  IFollowUserResponse, 
  IFollowUserResult, 
  IGetUserResponse, 
  IGetUserResult, 
  IGetUsersResponse, 
  IGetUsersResult, 
  IUnfollowUserResponse, 
  IUnfollowUserResult
} from "../../types";
import { api } from "../../common/api";

const getUsers = async () : Promise<IGetUsersResult> => {
  try {
    const { data: responseData }: AxiosResponse<IGetUsersResponse> = await api.get("/users");

    return {
      response: responseData
    }
  } catch (error) {
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

const getUser = async (userId: string): Promise<IGetUserResult> => {
  try {
    const { data: responseData }: AxiosResponse<IGetUserResponse> = await api.get(`/users/${userId}`);

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

const followUser = async (userId: string): Promise<IFollowUserResult> => {
  try {
    const { data: responseData }: AxiosResponse<IFollowUserResponse> = await api.patch(`/users/follow/${userId}`);

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

const unfollowUser = async (userId: string): Promise<IUnfollowUserResult> => {
  try {
    const { data: responseData }: AxiosResponse<IUnfollowUserResponse> = await api.patch(`/users/unfollow/${userId}`);

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
  getUsers,
  getUser,
  followUser,
  unfollowUser
}