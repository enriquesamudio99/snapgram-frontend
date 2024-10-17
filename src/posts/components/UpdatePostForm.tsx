import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { Button, FormInput } from '../../common/components';
import { UpdatePostValidation } from '../lib/validation';
import { UpdateFilesUploader } from './';
import { useUpdatePostMutation } from '../hooks';
import { IPost } from '../../types';
import { Swiper, SwiperSlide } from 'swiper/react';

const UpdatePostForm = ({ post, communityId }: { post: IPost, communityId?: string | null }) => {

  const MAX_FILES_NUMBER = 10;

  const navigate = useNavigate();
  const updatePostMutation = useUpdatePostMutation(post._id);
  const [maxFiles, setMaxFiles] = useState<number>(MAX_FILES_NUMBER - post.images.length);
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof UpdatePostValidation>>({
    resolver: zodResolver(UpdatePostValidation),
    defaultValues: {
      caption: post.caption,
      location: post.location,
      images: [],
      tags: post.tags.join(",")
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof UpdatePostValidation>) {
    
    if (maxFiles === MAX_FILES_NUMBER) {
      toast.error("You must have at least one image");
      return;
    }

    // Create Form Data
    const formData = new FormData();
    formData.append("caption", values.caption);
    formData.append("location", values.location);
    if (values.images.length > 0) {
      for (let i = 0; i < values.images.length; i++) {
        formData.append("images", values.images[i]);
      }
    }

    if (values.tags !== "") {
      formData.append("tags", values.tags); 
    }

    // Images to remove
    if (imagesToRemove.length > 0) {
      for (let i = 0; i < imagesToRemove.length; i++) {
        formData.append(`imagesToRemove[${i}]`, imagesToRemove[i]);
      }
    }

    const { response, error } = await updatePostMutation.mutateAsync(formData);

    if (response) {
      if (communityId) {
        toast.success("Community post updated sucessfully");
        navigate(`/community/${communityId}`);
      } else {
        toast.success("Post updated sucessfully");
        navigate("/");
      }
    }

    if (error) {
      toast.error(error.data?.error);
    }
  }

  const handleRemoveImages = (publicId: string) => {
    post.images = post.images.filter(image => image.public_id !== publicId);
    setImagesToRemove(prevImages => [...prevImages, publicId]);
    setMaxFiles(prevValue => prevValue + 1);
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
                <UpdateFilesUploader
                  fieldChange={field.onChange}
                  error={form.formState.errors.images?.message}
                  maxFiles={maxFiles}
                  setMaxFiles={setMaxFiles}
                />
              )}
            />
            {post.images.length > 0 && (
              <div className="file-uploader__preview">
                <h2 className="file-uploader__preview-title">Current Post Images</h2>
                <Swiper
                  slidesPerView="auto"
                  grabCursor={true}
                  spaceBetween={16}
                  className="file-uploader__preview-swiper"
                >
                  {post.images.map((image, index) => (
                    <SwiperSlide
                      key={index}
                      className="file-uploader__preview-swiper-slide"
                      style={{ position: "relative" }}
                    >
                      <img
                        src={image.secure_url}
                        alt="Image"
                        className="file-uploader__preview-swiper-slide-img"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImages(image.public_id)}
                        className="file-uploader__preview-swiper-slide-remove"
                      >
                        Remove
                      </button>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
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
            title="Update Post"
            isLoading={updatePostMutation.isPending}
            loadingTitle="Updating Post..."
          />
        </div>
      </form>
    </div>
  )
}

export default UpdatePostForm;