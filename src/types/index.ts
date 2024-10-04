import { AxiosResponse } from 'axios';
import React from 'react';

export interface IContextType {
  user: IAuthUser;
  setUser: React.Dispatch<React.SetStateAction<IAuthUser>>;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  checking: () => void;
  login: (user: IAuthUser) => void;
  logout: () => void;
};

export interface IAuthUser {
  id: string;
  name: string;
  username: string;
  email: string;
  bio: string;
};

export interface IUser {
  _id: string;
  name: string;
  username: string;
  email: string;
  bio: string;
  followers: string[];
  following: string[];
  posts: string[];
  savedPosts: string[];
  communities: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface ISharedBy {
  user: string;
  sharedAt: Date;
  _id: string;
}

export interface IPostImage {
  public_id: string;
  secure_url: string;
  _id: string;
}

export interface IPost {
  caption: string;
  location: string;
  tags: string[];
  likes: string[];
  originalPost: IPost;
  community: null;
  comments: string[];
  _id: string;
  images: IPostImage[];
  sharedBy: ISharedBy[] | [];
  author: {
    _id: string;
    name: string;
    username: string;
  };
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IGetCurrentUserResponse {
  success: boolean;
  data: IUser;
}

export interface IGetCurrentUserResult {
  response?: AxiosResponse<IGetCurrentUserResponse>;
  error?: {
    message?: string;
    data?: {
      success: boolean;
      error: string;
    };
  };
}

export interface IPostResponse {
  success: boolean;
  post: IPost;
}

export interface IPostResult {
  response?: IPostResponse;
  error?: {
    message?: string;
    data?: {
      success: boolean;
      error: string;
    };
  };
}

export interface IPostsResponse {
  success: boolean;
  posts: IPost[];
  totalPost: number;
  isNext: boolean;
}

export interface IPostsResult {
  response?: IPostsResponse;
  error?: {
    message?: string;
    data?: {
      success: boolean;
      error: string;
    };
  };
}

export interface ILikePostResponse {
  success: boolean;
  post: IPost;
}

export interface ILikePostResult {
  response?: ILikePostResponse;
  error?: {
    message?: string;
    data?: {
      success: boolean;
      error: string;
    };
  };
}

export interface ISavePostResponse {
  success: boolean;
}

export interface ISavePostResult {
  response?: ISavePostResponse;
  error?: {
    message?: string;
    data?: {
      success: boolean;
      error: string;
    };
  };
}

export interface ISharePostResponse {
  success: boolean;
  post: IPost;
}

export interface ISharePostResult {
  response?: ISharePostResponse;
  error?: {
    message?: string;
    data?: {
      success: boolean;
      error: string;
    };
  };
}

export interface IGetPostResponse {
  success: boolean;
  post: IPost;
}

export interface IGetPostResult {
  response?: IGetPostResponse;
  error?: {
    message?: string;
    data?: {
      success: boolean;
      error: string;
    };
  };
}