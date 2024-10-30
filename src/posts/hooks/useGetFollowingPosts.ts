import { POSTS_QUERY_KEYS } from "../lib/queryKeys";
import { getFollowingPosts } from '../lib/actions';
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetFollowingPosts = () => {
  
  const followingPostsQuery = useInfiniteQuery({
    queryKey: [POSTS_QUERY_KEYS.GET_FOLLOWING_POSTS],
    queryFn: ({ pageParam }) => getFollowingPosts(pageParam),
    staleTime: 1000 * 60 * 60,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.response?.hasNextPage ? lastPage.response.nextPage : null;
    }
  });

  return {
    followingPostsQuery
  }
}

export {
  useGetFollowingPosts
};