import { AxiosResponse } from 'axios';
import React from 'react';

export interface IContextType {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  checking: () => void;
  login: (user: IUser) => void;
  logout: () => void;
};

export interface IUser {
  id: string;
  name: string;
  username: string;
  email: string;
  bio: string;
};

export interface IPostResponse {
  success: boolean;
  data: {
    caption: string;
    location: string;
    tags: string[];
    likes: string[];
    originalPost: null;
    community: null;
    comments: string[];
    _id: string;
    images: [{
      public_id: string;
      secure_url: string;
      _id: string;
    }];
    sharedBy: string[];
    author: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  };
}

export interface IPostResult {
  response?: AxiosResponse<IPostResponse>;
  error?: {
    message?: string;
    data?: {
      success: boolean;
      error: string;
    };
  };
}