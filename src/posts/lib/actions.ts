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
  ISavePostResult, 
  ISharePostResponse, 
  ISharePostResult
} from "../../types";

const createPost = async (data: FormData): Promise<IPostResult> => {
  try {
    const { data: responseData }: AxiosResponse<IPostResponse> = await api.post('/posts', data, {
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

const likePost = async (postId: string) : Promise<ILikePostResult> => {
  try {
    const { data: responseData }: AxiosResponse<ILikePostResponse> = await api.patch(`/posts/like/${postId}`);

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

const unlikePost = async (postId: string) : Promise<ILikePostResult> => {
  try {
    const { data: responseData }: AxiosResponse<ILikePostResponse> = await api.patch(`/posts/unlike/${postId}`);

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

const savePost = async (postId: string) : Promise<ISavePostResult> => {
  try {
    const { data: responseData }: AxiosResponse<ISavePostResponse> = await api.patch(`/posts/save/${postId}`);

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

const unsavePost = async (postId: string) : Promise<ISavePostResult> => {
  try {
    const { data: responseData }: AxiosResponse<ISavePostResponse> = await api.patch(`/posts/unsave/${postId}`);

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


const sharePost = async (postId: string) : Promise<ISharePostResult> => {
  try {
    const { data: responseData }: AxiosResponse<ISharePostResponse> = await api.post(`/posts/share/${postId}`);

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

const unsharePost = async (postId: string) : Promise<ISharePostResult> => {
  try {
    const { data: responseData }: AxiosResponse<ISharePostResponse> = await api.post(`/posts/unshare/${postId}`);

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

const getFollowingPosts = async () : Promise<IFollowingPostsResult>  => {
  try {
    const { data: responseData }: AxiosResponse<IFollowingPostsResponse> = await api.get('/posts/following');

    return {
      response: responseData
    }
  } catch (error) {
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
  createPost,
  likePost,
  unlikePost,
  savePost,
  unsavePost,
  sharePost,
  unsharePost,
  getFollowingPosts
}