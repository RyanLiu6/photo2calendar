import { useState } from "react";
import classNames from "classnames";

import { textStyle, hoverColour } from "@ryanliu6/xi/styles";

interface ImageUploadProps {
  onUpload: (file: File) => Promise<void>;
  isLoading?: boolean;
}

const ImageUpload = ({ onUpload, isLoading = false }: ImageUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files?.[0]) {
      await handleUpload(files[0]);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files?.[0]) {
      await handleUpload(files[0]);
    }
  };

  const handleUpload = async (file: File) => {
    try {
      setUploading(true);
      await onUpload(file);
    } finally {
      setUploading(false);
    }
  };

  const isDisabled = isLoading || uploading;

  return (
    <div
      className={classNames(
        "flex flex-col items-center justify-center w-full",
        "border-2 border-dashed rounded-lg cursor-pointer",
        "bg-violet-50/50 dark:bg-slate-400",
        hoverColour,
        "transition-all duration-150 ease-in-out",
        {
          "border-slate-300 dark:border-slate-700": !dragActive,
          "border-slate-400 dark:border-slate-600": dragActive,
          "opacity-50 cursor-not-allowed": isDisabled
        }
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className="hidden"
        onChange={handleChange}
        accept="image/*"
        disabled={isDisabled}
      />

      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <img className="w-10 h-10 mb-3 opacity-75 dark:opacity-50" src="/upload.svg" alt="upload icon" />
        <p className={classNames("mb-2 text-sm", textStyle)}>
          <span className="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p className={classNames("text-xs", textStyle, "opacity-75")}>PNG, JPG, or JPEG (MAX. 10MB)</p>
      </div>

      {isDisabled && (
        <div className={classNames("absolute inset-0 flex items-center justify-center bg-violet-50/50 dark:bg-slate-800", "bg-opacity-50")}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-600 dark:border-slate-400" />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
