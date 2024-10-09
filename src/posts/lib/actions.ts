import { AxiosError, AxiosResponse } from "axios";
import { api } from "../../common/api";
import {
  IPostsResponse,
  IPostsResult,
  IGetPostResponse,
  IGetPostResult,
  ILikePostResponse,
  ILikePostResult,
  IPostResponse,
  IPostResult,
  ISavePostResponse,
  ISavePostResult,
  ISharePostResponse,
  ISharePostResult,
  IDeletePostResult,
  IDeletePostResponse
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

const updatePost = async (postId: string, data: FormData): Promise<IPostResult> => {
  try {
    const { data: responseData }: AxiosResponse<IPostResponse> = await api.patch(`/posts/${postId}`, data, {
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

const likePost = async (postId: string): Promise<ILikePostResult> => {
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

const unlikePost = async (postId: string): Promise<ILikePostResult> => {
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

const savePost = async (postId: string): Promise<ISavePostResult> => {
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

const unsavePost = async (postId: string): Promise<ISavePostResult> => {
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


const sharePost = async (postId: string): Promise<ISharePostResult> => {
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

const unsharePost = async (postId: string): Promise<ISharePostResult> => {
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

const getFollowingPosts = async (): Promise<IPostsResult> => {
  try {
    const { data: responseData }: AxiosResponse<IPostsResponse> = await api.get('/posts/following');

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

const getSavedPosts = async (): Promise<IPostsResult> => {
  try {
    const { data: responseData }: AxiosResponse<IPostsResponse> = await api.get('/posts/saved');

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

const getPostsByUser = async (userId: string, onlyOriginals: boolean = false) : Promise<IPostsResult> => {
  try {
    const { data: responseData }: AxiosResponse<IPostsResponse> = await api.get(`/posts/user/${userId}`, {
      params: {
        onlyOriginals
      }
    });

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

const getPost = async (postId: string): Promise<IGetPostResult> => {
  try {
    const { data: responseData }: AxiosResponse<IGetPostResponse> = await api.get(`/posts/${postId}`);

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

const getPosts = async (): Promise<IPostsResult> => {
  try {
    const { data: responseData }: AxiosResponse<IPostsResponse> = await api.get("/posts");
 
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

const searchPosts = async (searchQuery: string): Promise<IPostsResult> => {
  try {
    const { data: responseData }: AxiosResponse<IPostsResponse> = await api.get("/posts", {
      params: {
        searchQuery
      }
    });
 
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

const deletePost = async (postId: string): Promise<IDeletePostResult> => {
  try {
    const { data: responseData }: AxiosResponse<IDeletePostResponse> = await api.delete(`/posts/${postId}`);

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
  updatePost,
  likePost,
  unlikePost,
  savePost,
  unsavePost,
  sharePost,
  unsharePost,
  getFollowingPosts,
  getSavedPosts,
  getPostsByUser,
  getPost,
  getPosts,
  searchPosts,
  deletePost
}