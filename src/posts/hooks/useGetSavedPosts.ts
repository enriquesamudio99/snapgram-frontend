import { QUERY_KEYS } from "../lib/queryKeys";
import { getSavedPosts } from '../lib/actions';
import { useQuery } from "@tanstack/react-query";

const useGetSavedPosts = () => {
  
  const savedPostsQuery = useQuery({
    queryKey: [QUERY_KEYS.GET_SAVED_POSTS],
    queryFn: () => getSavedPosts(),
    staleTime: 1000 * 60 * 60
  })

  return {
    savedPostsQuery
  }
}

export {
  useGetSavedPosts
};