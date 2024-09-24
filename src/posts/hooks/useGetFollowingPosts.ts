import { QUERY_KEYS } from "../lib/queryKeys";
import { getFollowingPosts } from '../lib/actions';
import { useQuery } from "@tanstack/react-query";


const useGetFollowingPosts = () => {
  const followingPostsQuery = useQuery({
    queryKey: [QUERY_KEYS.GET_FOLLOWING_POSTS],
    queryFn: () => getFollowingPosts(),
    staleTime: 1000 * 60 * 60
  })

  return {
    followingPostsQuery
  }
}

export {
  useGetFollowingPosts
};