import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from '../lib/actions';
import { USERS_QUERY_KEYS } from "../lib/queryKeys";

const useUpdateProfileMutation = () => {

  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: ({ data, userId } : { data: FormData, userId: string }) => updateProfile({ data, userId }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [USERS_QUERY_KEYS.GET_USER, data.response?.user._id]
      }) 
    }
  });

  return updateProfileMutation;
}

export {
  useUpdateProfileMutation
};