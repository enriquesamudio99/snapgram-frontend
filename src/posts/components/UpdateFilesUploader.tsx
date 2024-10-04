import { useState, useCallback, useEffect } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';

type FileUploaderProps = {
  fieldChange: (files: File[]) => void;
  imagesUrl?: string[];
  error: string | undefined;
  maxFiles: number;
  setMaxFiles: React.Dispatch<React.SetStateAction<number>>;
}

const UpdateFilesUploader = ({ fieldChange, imagesUrl = [], error, maxFiles, setMaxFiles }: FileUploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [filesUrls, setFilesUrls] = useState<string[]>(imagesUrl);

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    if (acceptedFiles.length > maxFiles) {
      toast.error(`You can no longer upload images.`);
      return;
    }

    setMaxFiles(maxFiles - acceptedFiles.length);

    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles, ...acceptedFiles];
      const urls = updatedFiles.map((file) => URL.createObjectURL(file));
      setFilesUrls(urls);
      return updatedFiles;
    });
  }, [maxFiles, setMaxFiles]);

  const removeFile = (index : number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedUrls = filesUrls?.filter((_, i) => i !== index);

    URL.revokeObjectURL(filesUrls[index]);

    setFiles(updatedFiles);
    setFilesUrls(updatedUrls);
 
    setMaxFiles((prev) => prev + 1);
    
    fieldChange(updatedFiles);
  };

  useEffect(() => {
    fieldChange(files);
  }, [files, fieldChange]);

  useEffect(() => {
    return () => {
      filesUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [filesUrls]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpeg', '.jpg', '.svg']
    }
  });

  return (
    <>
      <div
        {...getRootProps()}
        className="file-uploader"
      >
        <label htmlFor="fileInput" className="file-uploader__label">Add Photos</label>
        <input
          {...getInputProps()}
          id="fileInput"
          className="file-uploader__input"
        />
        <div className="file-uploader__box">
          <img
            src="/assets/icons/file-upload.svg"
            alt="File Upload"
            width={96}
            height={77}
            className="file-uploader__box-img"
          />
          <h3 className="file-uploader__box-title">Drag Photos Here</h3>
          <p className="file-uploader__box-subtitle">SVG, PNG, JPG</p>
          <button
            type="button"
            className="file-uploader__box-btn"
          >
            Select from Computer
          </button>
        </div>
      </div>
      {error && <p className="file-uploader__message">{error}</p>}
      {filesUrls && filesUrls.length > 0 && (
        <div className="file-uploader__preview">
          <h2 className="file-uploader__preview-title">Images Preview</h2>
          <Swiper 
            slidesPerView="auto"
            grabCursor={true}
            spaceBetween={16}
            className="file-uploader__preview-swiper"
          >
            {filesUrls.map((url, index) => (
              <SwiperSlide 
                key={index}
                className="file-uploader__preview-swiper-slide"
                style={{ position: "relative" }}
              >
                <img
                  src={url}
                  alt="Image"
                  className="file-uploader__preview-swiper-slide-img"
                />
                <button 
                  type="button" 
                  onClick={() => removeFile(index)} 
                  className="file-uploader__preview-swiper-slide-remove"
                >
                  Remove
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  )
}

export default UpdateFilesUploader