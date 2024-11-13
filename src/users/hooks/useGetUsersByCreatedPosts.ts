import { getUsersByCreatedPosts } from '../lib/actions';
import { useQuery } from "@tanstack/react-query";
import { USERS_QUERY_KEYS } from '../lib/queryKeys';


const useGetUsersByCreatedPosts = () => {
  const getUsersByCreatedPostsQuery = useQuery({
    queryKey: [USERS_QUERY_KEYS.GET_USERS_BY_CREATED_POSTS],
    queryFn: () => getUsersByCreatedPosts(),
    staleTime: 1000 * 60 * 60
  });

  return {
    getUsersByCreatedPostsQuery
  }
}

export {
  useGetUsersByCreatedPosts
};