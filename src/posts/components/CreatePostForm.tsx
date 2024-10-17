import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { Button, FormInput } from '../../common/components';
import { CreatePostValidation } from '../lib/validation';
import { FilesUploader } from './';
import { useCommunityPostMutation, usePostMutation } from '../hooks';

const CreatePostForm = ({ communityId = null }: { communityId?: string | null }) => {
  const navigate = useNavigate();
  const postMutation = usePostMutation();
  const communityPostMutation = useCommunityPostMutation(communityId);

  // 1. Define your form.
  const form = useForm<z.infer<typeof CreatePostValidation>>({
    resolver: zodResolver(CreatePostValidation),
    defaultValues: {
      caption: '',
      location: '',
      images: [],
      tags: ''
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof CreatePostValidation>) {
    // Create Form Data
    const formData = new FormData();
    formData.append("caption", values.caption);
    formData.append("location", values.location);

    for (let i = 0; i < values.images.length; i++) {
      formData.append("images", values.images[i]);
    }

    if (values.tags !== "") {
      formData.append("tags", values.tags);
    }

    if (communityId) { 
      const { response, error } = await communityPostMutation.mutateAsync(formData);

      if (response) {
        toast.success("Community post created sucessfully");
        navigate(`/community/${communityId}`);
      }

      if (error) {
        toast.error(error.data?.error);
      }
    } else {
      const { response, error } = await postMutation.mutateAsync(formData);

      if (response) {
        toast.success("Post created sucessfully");
        navigate("/explore");
      }

      if (error) {
        toast.error(error.data?.error);
      }
    }

  }

  return (
    <div className="create-post-form">
      <form className="form" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="form__container">
          <div className="form__groups">
            <Controller
              control={form.control}
              name="caption"
              render={({ field }) => (
                <FormInput
                  id="caption"
                  type="text"
                  placeholder="Anything"
                  value={field.value}
                  onChange={field.onChange}
                  label="Caption"
                  error={form.formState.errors.caption?.message}
                />
              )}
            />
            <Controller
              control={form.control}
              name="images"
              render={({ field }) => (
                <FilesUploader
                  fieldChange={field.onChange}
                  error={form.formState.errors.images?.message}
                />
              )}
            />
            <Controller
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormInput
                  id="location"
                  type="text"
                  placeholder="Somewhere"
                  value={field.value}
                  onChange={field.onChange}
                  label="Location"
                  error={form.formState.errors.location?.message}
                />
              )}
            />
            <Controller
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormInput
                  id="tags"
                  type="text"
                  placeholder="Tech,React"
                  value={field.value}
                  onChange={field.onChange}
                  label="Tags (Separated by comma)"
                  error={form.formState.errors.tags?.message}
                />
              )}
            />
          </div>
          <Button
            type="submit"
            title="Create Post"
            isLoading={communityId ? communityPostMutation.isPending : postMutation.isPending}
            loadingTitle="Creating Post..."
          />
        </div>
      </form>
    </div>
  )
}

export default CreatePostForm;