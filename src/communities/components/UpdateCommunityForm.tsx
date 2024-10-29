import { useNavigate } from "react-router-dom";
import { Controller, useForm } from 'react-hook-form';
import { UpdateCommunityValidation } from "../../communities/lib/validation";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, FormInput, FormSelect, FormTextarea, ProfileImageUploader } from "../../common/components";
import { toast } from "react-toastify";
import { useUpdateCommunityMutation } from "../hooks";
import { ICommunity } from "../../types";
import { useState } from "react";

const UpdateCommunityForm = ({ community } : { community: ICommunity }) => {

  const navigate = useNavigate();
  const updateCommunityMutation = useUpdateCommunityMutation();
  const [removeProfileImg, setRemoveProfileImg] = useState<boolean>(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof UpdateCommunityValidation>>({
    resolver: zodResolver(UpdateCommunityValidation),
    defaultValues: {
      name: community.name,
      username: community.username,
      images: undefined,
      bio: community.bio,
      communityType: community.communityType
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof UpdateCommunityValidation>) {

    // Create Form Data
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("username", values.username);
    formData.append("bio", values.bio);
    formData.append("communityType", values.communityType);

    if (removeProfileImg) {
      formData.append("removeProfileImg", "true");
    }
    
    if(values.images) {
      formData.append("images", values.images);
    }

    const { response, error } = await updateCommunityMutation.mutateAsync({ data: formData, communityId: community._id });
    
    if (response) {
      toast.success("Community updated sucessfully");
      navigate(`/community/${community._id}`);
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
          {community.image?.secure_url && (
              <>
                <div className="update-profile-form__preview-img-container">
                  <img 
                    src={community.image.secure_url} 
                    alt={`${community.name} Profile`} 
                    className={`update-profile-form__preview-img ${removeProfileImg ? "update-profile-form__preview-img--remove" : ""}`}
                  />
                  <button 
                    type="button"
                    onClick={() => setRemoveProfileImg(prevState => !prevState)}
                    className={`update-profile-form__preview-btn ${removeProfileImg ? "update-profile-form__preview-btn--revert" : ""}`}
                  >
                    {removeProfileImg ? "Revert Profile Image" : "Remove Profile Image"}
                  </button> 
                </div>
                <p className="update-profile-form__message">If you add a new photo it will be replaced</p>
              </>
            )}
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
            title="Update Community"
            isLoading={updateCommunityMutation.isPending}
            loadingTitle="Updating Community..."
          />
        </div>
      </form>
    </div>
  )
}

export default UpdateCommunityForm;