import { POSTS_QUERY_KEYS } from "../lib/queryKeys";
import { getPost } from '../lib/actions';
import { useQuery } from "@tanstack/react-query";


const useGetPost = (postId: string) => {
  const getPostQuery = useQuery({
    queryKey: [POSTS_QUERY_KEYS.GET_POST, postId],
    queryFn: () => getPost(postId),
    staleTime: 1000 * 60 * 60,
    enabled: !!postId
  })

  return {
    getPostQuery
  }
}

export {
  useGetPost
};