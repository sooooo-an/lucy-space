import { uploadImage } from "@/services/upload";
import { useState } from "react";

export default function usePreview() {
  const [preview, setPreview] = useState("");

  const handlePreview = (selectedFile: File | string | undefined) => {
    if (!selectedFile) return;

    if (selectedFile instanceof File) {
      uploadImage(selectedFile).then((url) => {
        setPreview(url);
      });
    }

    if (typeof selectedFile === "string") {
      setPreview(selectedFile);
    }
  };

  const removePreview = () => {
    URL.revokeObjectURL(preview);
    setPreview("");
  };

  return { handlePreview, removePreview, preview };
}
