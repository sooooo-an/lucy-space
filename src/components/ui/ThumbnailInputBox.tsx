import React from "react";
import Avatar from "../ui/Avatar";
import CloseIcon from "../ui/icons/CloseIcon";
import UploadIcon from "../ui/icons/UploadIcon";

type Props = {
  preview: string;
  handlePreview: (file: File) => void;
  removePreview: () => void;
};

export default function ThumbnailInputBox({
  preview,
  handlePreview,
  removePreview,
}: Props) {
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    handlePreview(e.target.files[0]);
  };

  return (
    <>
      {preview ? (
        <div className="relative">
          <Avatar image={preview} alt="thumbnail" size="lg" />
          <button
            onClick={removePreview}
            className="absolute -right-[5px] -top-[5px] text-gray-600"
          >
            <CloseIcon />
          </button>
        </div>
      ) : (
        <label
          htmlFor="thumbnail"
          className="flex items-center justify-center text-3xl rounded-lg w-20 h-20 bg-gray-900/40 hover:bg-gray-900/60"
        >
          <UploadIcon />
          <input
            type="file"
            hidden
            id="thumbnail"
            onChange={onFileChange}
            accept="image/*"
          />
        </label>
      )}
      <span className="text-gray-600 text-xs pt-3">
        업로드하지 않으면 주인장이 미리 설정한 썸네일로 설정됩니당 👻
      </span>
    </>
  );
}
