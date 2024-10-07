import { QUERY_KEYS } from "../lib/queryKeys";
import { getPosts } from '../lib/actions';
import { useQuery } from "@tanstack/react-query";

const useGetPosts = () => {
  const getPostsQuery = useQuery({
    queryKey: [QUERY_KEYS.GET_POSTS],
    queryFn: () => getPosts(),
    staleTime: 1000 * 60 * 60
  })

  return {
    getPostsQuery
  }
}

export {
  useGetPosts
};