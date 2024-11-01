import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { IUser } from '../../types'
import { UpdateProfileValidation } from '../lib/validation';
import { toast } from 'react-toastify';
import { Button, FormInput, FormTextarea, ProfileImageUploader } from '../../common/components';
import { useUpdateProfileMutation } from '../hooks';
import { useAuth } from '../../common/hooks';
import { useState } from 'react';

const UpdateProfileForm = ({ user } : { user: IUser }) => {

  const { setUser } = useAuth();
  const navigate = useNavigate();
  const updateProfileMutation = useUpdateProfileMutation();
  const [removeProfileImg, setRemoveProfileImg] = useState<boolean>(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof UpdateProfileValidation>>({
    resolver: zodResolver(UpdateProfileValidation),
    defaultValues: {
      name: user.name,
      username: user.username,
      email: user.email,
      images: undefined,
      bio: user.bio
    }, 
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof UpdateProfileValidation>) { 
    // Create Form Data
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("bio", values.bio);
    
    if (removeProfileImg) {
      formData.append("removeProfileImg", "true");
    }
    
    if(values.images) {
      formData.append("images", values.images);
    }

    const { response, error } = await updateProfileMutation.mutateAsync({ data: formData, userId: user._id });
    
    if (response) {
      setUser({
        id: response.user._id,
        name: response.user.name,
        username: response.user.username,
        image: response.user.image ? response.user.image.secure_url : null,
        email: response.user.email,
        bio: response.user.bio
      });
      toast.success("Profile updated sucessfully");
      navigate(`/profile/${response.user._id}`);
    }

    if (error) {
      toast.error(error.data?.error);
    } 
  }

  const handleUsernameChange = (value: string) => {
    const formattedValue = value.toLowerCase().replace(/\s+/g, '_');
    form.setValue('username', formattedValue); 
  };

  return (
    <div className="update-profile-form">
      <form className="form" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="form__container">
          <div className="form__groups">
            {user.image?.secure_url && (
              <>
                <div className="update-profile-form__preview-img-container">
                  <img 
                    src={user.image.secure_url} 
                    alt={`${user.name} Profile`} 
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
              name="images"
              render={({ field }) => (
                <ProfileImageUploader
                  label="Add Profile Image"
                  fieldChange={field.onChange}
                  error={form.formState.errors.images?.message}
                />
              )}
            />
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
                  onChange={(e) => {
                    field.onChange(e);
                    handleUsernameChange(e.target.value);
                  }}
                  label="Username"
                  error={form.formState.errors.username?.message}
                />
              )}
            />
            <Controller
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormInput
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={field.value}
                  onChange={field.onChange}
                  label="Email"
                  error={form.formState.errors.email?.message}
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
          </div>
          <Button
            type="submit"
            title="Update Profile"
            isLoading={updateProfileMutation.isPending}
            loadingTitle="Updating Profile..."
          />
        </div>
      </form>
    </div>
  )
}

export default UpdateProfileForm