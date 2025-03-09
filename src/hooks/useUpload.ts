import { useState } from "react";
import { message, UploadFile } from "antd";

const useUpload = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // Xử lý khi chọn file
  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  // Kiểm tra kích thước ảnh trước khi upload (≤ 2MB)
  const beforeUpload = (file) => {
    const isLt2M = file.size / 1024 / 1024 <= 2;
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
      return false;
    }
    return true;
  };

  return { fileList, handleChange, beforeUpload, setFileList };
};

export default useUpload;
