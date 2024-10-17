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
  community: null | {
    image: {
      public_id: string;
      secure_url: string;
      _id: string;
    };
    name: string;
    _id: string;
  };
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

export interface IGetUsersResponse {
  success: boolean;
  users: IUser[];
  totalUsers: number,
  nextPage: number | null;
  hasNextPage: boolean;
}

export interface IGetUsersResult {
  response?: IGetUsersResponse;
  error?: {
    message?: string;
    data?: {
      success: boolean;
      error: string;
    };
  };
}

export interface IGetUserResponse {
  success: boolean;
  user: IUser;
}

export interface IGetUserResult {
  response?: IGetUserResponse;
  error?: {
    message?: string;
    data?: {
      success: boolean;
      error: string;
    };
  };
}

export interface IFollowUserResponse {
  success: boolean;
  userId: string;
  followingId: string;
}

export interface IFollowUserResult {
  response?: IFollowUserResponse;
  error?: {
    message?: string;
    data?: {
      success: boolean;
      error: string;
    };
  };
}

export interface IUnfollowUserResponse {
  success: boolean;
  userId: string;
  unfollowingId: string;
}

export interface IUnfollowUserResult {
  response?: IUnfollowUserResponse;
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

export interface IDeletePostResponse {
  success: boolean;
  post: IPost;
}

export interface IDeletePostResult {
  response?: IDeletePostResponse;
  error?: {
    message?: string;
    data?: {
      success: boolean;
      error: string;
    };
  };
}

export interface ICommunity {
  image: {
    public_id: string;
    secure_url: string;
  };
  name: string;
  username: string;
  bio: string;
  posts: string[];
  members: string[];
  membersRequests: string[];
  communityType: string;
  _id: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface ICommunityResponse {
  success: boolean;
  community: ICommunity;
}

export interface ICommunityResult {
  response?: ICommunityResponse;
  error?: {
    message?: string;
    data?: {
      success: boolean;
      error: string;
    };
  };
}

export interface ICommunitiesResponse {
  success: boolean;
  communities: ICommunity[];
  totalCommunities: number;
  nextPage: number | null;
  hasNextPage: boolean;
}

export interface ICommunitiesResult {
  response?: ICommunitiesResponse;
  error?: {
    message?: string;
    data?: {
      success: boolean;
      error: string;
    };
  };
}

export interface IJoinCommunityResponse {
  success: boolean;
  communityId: string;
}

export interface IJoinCommunityResult {
  response?: IJoinCommunityResponse;
  error?: {
    message?: string;
    data?: {
      success: boolean;
      error: string;
    };
  };
}

export interface ILeaveCommunityResponse {
  success: boolean;
  communityId: string;
}

export interface ILeaveCommunityResult {
  response?: ILeaveCommunityResponse;
  error?: {
    message?: string;
    data?: {
      success: boolean;
      error: string;
    };
  };
}

export interface IRequestCommunityResponse {
  success: boolean;
  communityId: string;
}

export interface IRequestCommunityResult {
  response?: IRequestCommunityResponse;
  error?: {
    message?: string;
    data?: {
      success: boolean;
      error: string;
    };
  };
}

export interface IDeleteRequestCommunityResponse {
  success: boolean;
  communityId: string;
}

export interface IDeleteRequestCommunityResult {
  response?: IDeleteRequestCommunityResponse;
  error?: {
    message?: string;
    data?: {
      success: boolean;
      error: string;
    };
  };
}

export interface IAcceptMemberResponse {
  success: boolean;
  communityId: string;
}

export interface IAcceptMemberResult {
  response?: IAcceptMemberResponse;
  error?: {
    message?: string;
    data?: {
      success: boolean;
      error: string;
    };
  };
}

export interface IDenyMemberResponse {
  success: boolean;
  communityId: string;
}

export interface IDenyMemberResult {
  response?: IDenyMemberResponse;
  error?: {
    message?: string;
    data?: {
      success: boolean;
      error: string;
    };
  };
}

export interface IDeleteMemberResponse {
  success: boolean;
  communityId: string;
}

export interface IDeleteMemberResult {
  response?: IDeleteMemberResponse;
  error?: {
    message?: string;
    data?: {
      success: boolean;
      error: string;
    };
  };
}