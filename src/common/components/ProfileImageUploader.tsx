import { useState, useCallback, useEffect } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';

type FileUploaderProps = {
  fieldChange: (file: File | null) => void;
  imageUrl?: string;
  error: string | undefined;
}

const ProfileImageUploader = ({ fieldChange, imageUrl = '', error }: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(imageUrl);

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setFileUrl(url);
      fieldChange(selectedFile);
    }
  }, [fieldChange]);

  const removeFile = () => {
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }
    setFile(null);
    setFileUrl(null);
    fieldChange(null);
  };

  useEffect(() => {
    fieldChange(file);
  }, [file, fieldChange]);

  useEffect(() => {
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileUrl]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpeg', '.jpg', '.svg']
    },
    multiple: false,
  });

  return (
    <>
      <div {...getRootProps()} className="file-uploader">
        <label htmlFor="fileInput" className="file-uploader__label">Add Community Photo</label>
        <input {...getInputProps()} id="fileInput" className="file-uploader__input" />
        <div className="file-uploader__box">
          <img
            src="/assets/icons/file-upload.svg"
            alt="File Upload"
            width={96}
            height={77}
            className="file-uploader__box-img"
          />
          <h3 className="file-uploader__box-title">Drag Photo Here</h3>
          <p className="file-uploader__box-subtitle">SVG, PNG, JPG</p>
          <button type="button" className="file-uploader__box-btn">
            Select from Computer
          </button>
        </div>
      </div>
      {error && <p className="file-uploader__message">{error}</p>}
      {fileUrl && (
        <div className="file-uploader__preview">
          <h2 className="file-uploader__preview-title">Image Preview</h2>
          <div
            className="file-uploader__preview-profile"
          >
            <img
              src={fileUrl}
              alt="Image"
              className="file-uploader__preview-profile-img"
            />
            <button
              type="button"
              onClick={removeFile}
              className="file-uploader__preview-profile-remove"
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileImageUploader;