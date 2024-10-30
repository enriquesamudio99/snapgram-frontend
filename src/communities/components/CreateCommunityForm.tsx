import { useNavigate } from "react-router-dom";
import { Controller, useForm } from 'react-hook-form';
import { CreateCommunityValidation } from "../../communities/lib/validation";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, FormInput, FormSelect, FormTextarea, ProfileImageUploader } from "../../common/components";
import { toast } from "react-toastify";
import { useCommunityMutation } from "../hooks";

const CreateCommunityForm = () => {

  const navigate = useNavigate();
  const communityMutation = useCommunityMutation();

  // 1. Define your form.
  const form = useForm<z.infer<typeof CreateCommunityValidation>>({
    resolver: zodResolver(CreateCommunityValidation),
    defaultValues: {
      name: '',
      username: '',
      images: undefined,
      bio: '',
      communityType: "Public"
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof CreateCommunityValidation>) {
    
    // Create Form Data
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("username", values.username);
    formData.append("bio", values.bio);
    formData.append("communityType", values.communityType);
    
    if(values.images) {
      formData.append("images", values.images);
    }

    const { response, error } = await communityMutation.mutateAsync(formData);
    
    if (response) {
      toast.success("Community created sucessfully");
      navigate("/communities");
    }

    if (error) {
      toast.error(error.data?.error);
    }
  }

  return (
    <div className="create-post-form">
      <form className="form" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="form__container">
          <div className="form__groups">
            <Controller
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormInput
                  id="name"
                  type="text"
                  placeholder="Football Community"
                  value={field.value}
                  onChange={field.onChange}
                  label="Name"
                  error={form.formState.errors.name?.message}
                />
              )}
            />
            <Controller
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormInput
                  id="username"
                  type="text"
                  placeholder="footballcommunity"
                  value={field.value}
                  onChange={field.onChange}
                  label="Username"
                  error={form.formState.errors.username?.message}
                />
              )}
            />
            <Controller
              control={form.control}
              name="images"
              render={({ field }) => (
                <ProfileImageUploader
                  label="Add Community Image"
                  fieldChange={field.onChange}
                  error={form.formState.errors.images?.message}
                />
              )}
            />
            <Controller
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormTextarea
                  id="bio"
                  placeholder="My Community Bio"
                  value={field.value}
                  onChange={field.onChange}
                  label="Bio"
                  error={form.formState.errors.bio?.message}
                />
              )}
            />
            <Controller
              control={form.control}
              name="communityType"
              render={({ field }) => (
                <FormSelect 
                  id="communityType"
                  label="Select Community Type"
                  value={field.value}
                  onChange={field.onChange}
                  error={form.formState.errors.communityType?.message}
                />
              )}
            />
          </div>
          <Button
            type="submit"
            title="Create Community"
            isLoading={communityMutation.isPending}
            loadingTitle="Creating Community..."
          />
        </div>
      </form>
    </div>
  )
}

export default CreateCommunityForm