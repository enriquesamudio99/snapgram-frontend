import { AxiosError, AxiosResponse } from "axios";
import { api } from "../../common/api";
import { 
  IFollowingPostsResponse, 
  IFollowingPostsResult, 
  ILikePostResponse, 
  ILikePostResult, 
  IPostResponse, 
  IPostResult, 
  ISavePostResponse, 
  ISavePostResult 
} from "../../types";

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

const likePost = async (postId: string) : Promise<ILikePostResult> => {
  try {
    const response: AxiosResponse<ILikePostResponse> = await api.patch(`/posts/like/${postId}`);

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

const unlikePost = async (postId: string) : Promise<ILikePostResult> => {
  try {
    const response: AxiosResponse<ILikePostResponse> = await api.patch(`/posts/unlike/${postId}`);

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

const savePost = async (postId: string) : Promise<ISavePostResult> => {
  try {
    const response: AxiosResponse<ISavePostResponse> = await api.patch(`/posts/save/${postId}`);

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

const unsavePost = async (postId: string) : Promise<ISavePostResult> => {
  try {
    const response: AxiosResponse<ISavePostResponse> = await api.patch(`/posts/unsave/${postId}`);

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

const getFollowingPosts = async () : Promise<IFollowingPostsResult>  => {
  try {
    const response: AxiosResponse<IFollowingPostsResponse> = await api.get('/posts/following');

    return {
      response
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

export {
  createPost,
  likePost,
  unlikePost,
  savePost,
  unsavePost,
  getFollowingPosts
}