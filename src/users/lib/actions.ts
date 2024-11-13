import { AxiosError, AxiosResponse } from "axios";
import { 
  IFollowUserResponse, 
  IFollowUserResult, 
  IGetUserResponse, 
  IGetUserResult, 
  IGetUsersResponse, 
  IGetUsersResult, 
  IUnfollowUserResponse, 
  IUnfollowUserResult,
  IUpdateProfileResponse,
  IUpdateProfileResult
} from "../../types";
import { api } from "../../common/api";

const getUsers = async (pageParam: number) : Promise<IGetUsersResult> => {
  try {
    const { data: responseData }: AxiosResponse<IGetUsersResponse> = await api.get("/users", {
      params: {
        page: pageParam
      }
    });
    
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

const getUsersByCreatedPosts = async () : Promise<IGetUsersResult> => {
  try {
    const { data: responseData }: AxiosResponse<IGetUsersResponse> = await api.get("/users/created-posts");
    
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

const searchUsers = async ({ searchTerm, pageParam } : { searchTerm: string; pageParam: number; }) : Promise<IGetUsersResult> => {
  try {
    const { data: responseData }: AxiosResponse<IGetUsersResponse> = await api.get("/users", {
      params: {
        searchTerm,
        page: pageParam
      }
    });
    
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

const updateProfile = async ({ data, userId } : { data: FormData, userId: string }) : Promise<IUpdateProfileResult> => {
  try {
    const { data: responseData }: AxiosResponse<IUpdateProfileResponse> = await api.patch(`/auth/update/${userId}`, data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })

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
  getUsersByCreatedPosts,
  searchUsers,
  getUser,
  followUser,
  unfollowUser,
  updateProfile
}