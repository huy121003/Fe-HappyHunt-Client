import { FormInstance, Image, Upload } from "antd";
import { useMemo, useState } from "react";
import { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

import { postMessageHandler } from "@/components/mesage/ToastMessage";

export const isFileSizeValid = (file: File, maxSizeInMB: number): boolean => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  console.log(file, file.size);
  return file.size <= maxSizeInBytes;
};

export const isFileAllowed = (
  file: File,
  accept: UploadProps["accept"]
): boolean => {
  if (!accept) return true; // If no accept attribute, allow all files

  const acceptTypes = accept
    .split(",")
    .map((type) => type.trim().toLowerCase());
  const fileType = file.type.toLowerCase();
  const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();

  return acceptTypes.some((accepted) => {
    if (accepted.startsWith(".")) {
      // Check by extension
      return accepted === fileExtension;
    } else if (accepted.includes("/")) {
      // Check by MIME type
      return (
        fileType === accepted || fileType.startsWith(accepted.replace("/*", ""))
      );
    }
    return false;
  });
};

const isDuplicateImage = (
  file: RcFile,
  currentFileList: UploadFile[]
): boolean => {
  return currentFileList.some((existingFile) => {
    if (existingFile.originFileObj) {
      return (
        existingFile.originFileObj.name === file.name &&
        existingFile.originFileObj.size === file.size
      );
    }
    return false;
  });
};

const useUpload = (form: FormInstance) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const onChange = ({ fileList }) => {
    const updatedFileList = fileList.map((file) => ({
      ...file,
      originFileObj: file.originFileObj || file, // Lấy file đã cắt
      url: file.url || URL.createObjectURL(file.originFileObj || file), // Hiển thị ảnh đã cắt
    }));

    setFileList(updatedFileList);
    form.setFieldsValue({ image: updatedFileList });
  };

  const handleBeforeUpload = (
    accept: UploadProps["accept"],
    size: number = 1
  ) => {
    return (file: RcFile) => {
      const isAcceptedType = isFileAllowed(file, accept);
      const isAcceptedSize = isFileSizeValid(file, size);
      const isDuplicate = isDuplicateImage(file, fileList);

      if (!isAcceptedType) {
        postMessageHandler({
          type: "error",
          text: "Please upload a valid file type",
        });
        return Upload.LIST_IGNORE;
      }

      if (!isAcceptedSize) {
        postMessageHandler({
          type: "error",
          text: "File size must be less than 2MB",
        });
        return Upload.LIST_IGNORE;
      }

      if (isDuplicate) {
        postMessageHandler({
          type: "error",
          text: "This image has already been uploaded",
        });
        return Upload.LIST_IGNORE;
      }

      return true;
    };
  };

  const PreviewPlaceholder = useMemo(() => {
    return (
      previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )
    );
  }, [previewImage, previewOpen]);

  return {
    handleBeforeUpload,
    PreviewPlaceholder,
    fileList,
    onChange,
    setFileList,
  };
};

export default useUpload;
