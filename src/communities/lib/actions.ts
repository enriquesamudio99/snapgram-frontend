import { api } from "../../common/api";
import { AxiosError, AxiosResponse } from "axios";
import { IAcceptMemberResponse, IAcceptMemberResult, ICommunitiesResponse, ICommunitiesResult, ICommunityResponse, ICommunityResult, IDeleteCommunityResponse, IDeleteCommunityResult, IDeleteMemberResponse, IDeleteMemberResult, IDeleteRequestCommunityResponse, IDeleteRequestCommunityResult, IDenyMemberResponse, IDenyMemberResult, IGetUsersResponse, IGetUsersResult, IJoinCommunityResponse, IJoinCommunityResult, ILeaveCommunityResponse, ILeaveCommunityResult, IPostsResponse, IPostsResult, IRequestCommunityResponse, IRequestCommunityResult, IUpdateCommunityResponse, IUpdateCommunityResult,  } from "../../types";

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

const getCommunity = async (communityId: string | null): Promise<ICommunityResult> => {
  try {
    const { data: responseData }: AxiosResponse<ICommunityResponse> = await api.get(`/communities/${communityId}`);

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

const updateCommunity = async ({ data, communityId } : { data: FormData, communityId: string }): Promise<IUpdateCommunityResult> => {
  try {
    const { data: responseData }: AxiosResponse<IUpdateCommunityResponse> = await api.patch(`/communities/${communityId}`, data, {
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

const joinCommunity = async (communityId: string): Promise<IJoinCommunityResult> => {
  try {
    const { data: responseData }: AxiosResponse<IJoinCommunityResponse> = await api.patch(`/communities/join/${communityId}`); 

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

const leaveCommunity = async (communityId: string): Promise<ILeaveCommunityResult> => {
  try {
    const { data: responseData }: AxiosResponse<ILeaveCommunityResponse> = await api.patch(`/communities/leave/${communityId}`); 

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

const requestCommunityMembership = async (communityId: string): Promise<IRequestCommunityResult> => {
  try {
    const { data: responseData }: AxiosResponse<IRequestCommunityResponse> = await api.patch(`/communities/request/${communityId}`); 

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

const deleteRequestCommunityMembership = async (communityId: string): Promise<IDeleteRequestCommunityResult> => {
  try {
    const { data: responseData }: AxiosResponse<IDeleteRequestCommunityResponse> = await api.patch(`/communities/delete-request/${communityId}`); 

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

const getPostsByCommunity = async (communityId: string): Promise<IPostsResult> => {
  try {
    const { data: responseData }: AxiosResponse<IPostsResponse> = await api.get(`/posts/community/${communityId}`);
 
    return {
      response: responseData
    }
  } catch (error) {
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

const getMembersByCommunity = async (communityId: string): Promise<IGetUsersResult> => {
  try {
    const { data: responseData }: AxiosResponse<IGetUsersResponse> = await api.get(`/communities/members/${communityId}`);
 
    return {
      response: responseData
    }
  } catch (error) {
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

const getRequestsByCommunity = async (communityId: string): Promise<IGetUsersResult> => {
  try {
    const { data: responseData }: AxiosResponse<IGetUsersResponse> = await api.get(`/communities/requests/${communityId}`);
 
    return {
      response: responseData
    }
  } catch (error) {
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

const acceptMember = async ({ communityId, userId } : {communityId: string, userId: string }): Promise<IAcceptMemberResult> => {
  try {
    const { data: responseData }: AxiosResponse<IAcceptMemberResponse> = await api.patch(`/communities/accept-membership/${communityId}/${userId}`);
 
    return {
      response: responseData
    }
  } catch (error) {
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

const denyMember = async ({ communityId, userId } : {communityId: string, userId: string }): Promise<IDenyMemberResult> => {
  try {
    const { data: responseData }: AxiosResponse<IDenyMemberResponse> = await api.patch(`/communities/deny-membership/${communityId}/${userId}`);
 
    return {
      response: responseData
    }
  } catch (error) {
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

const deleteMember = async ({ communityId, memberId } : {communityId: string | undefined, memberId: string }): Promise<IDeleteMemberResult> => {
  try {
    const { data: responseData }: AxiosResponse<IDeleteMemberResponse> = await api.patch(`/communities/delete-member/${communityId}/${memberId}`);
 
    return {
      response: responseData
    }
  } catch (error) {
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

const deleteCommunity = async (communityId: string): Promise<IDeleteCommunityResult> => {
  try {
    const { data: responseData }: AxiosResponse<IDeleteCommunityResponse> = await api.delete(`/communities/${communityId}`);
 
    return {
      response: responseData
    }
  } catch (error) {
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
  getCommunity,
  createCommunity,
  updateCommunity,
  joinCommunity,
  leaveCommunity,
  requestCommunityMembership,
  deleteRequestCommunityMembership,
  getPostsByCommunity,
  getMembersByCommunity,
  getRequestsByCommunity,
  acceptMember,
  denyMember,
  deleteMember,
  deleteCommunity
}