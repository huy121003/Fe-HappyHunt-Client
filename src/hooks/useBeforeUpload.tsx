import { postMessageHandler } from '@/components/ToastMessage';
import { Upload } from 'antd';

const imageConfig = {
  category: {
    maxSize: 1,
    validate: (w: number, h: number) => w !== h,
    error: 'Image must not be square!',
  },
  avatar: {
    maxSize: 1,
    validate: (w: number, h: number) => w !== h,
    error: 'Image must not be square!',
  },
  banner: {
    maxSize: 2,
    validate: (w: number, h: number) => w > 1000 && h > 300,
    error:
      'Image must have a minimum width of 1000px and a minimum height of 300px!',
  },
  post: {
    maxSize: 2,
    validate: (w: number, h: number) => w > 300 && h > 300,
    error: 'Image must have a minimum width and height of 300px!',
  },
};

const validateFile = (file: File, type: keyof typeof imageConfig) => {
  const config = imageConfig[type];

  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    postMessageHandler({ type: 'error', text: 'Please upload JPG/PNG file!' });
    // Clear file input
    clearFileInput();
    return false;
  }

  if (file.size / 1024 / 1024 > config.maxSize) {
    postMessageHandler({
      type: 'error',
      text: `Image must be smaller than ${config.maxSize}MB!`,
    });
    return false;
  }

  return new Promise<boolean>((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      if (config.validate(img.width, img.height)) {
        postMessageHandler({ type: 'error', text: config.error });
        resolve(false);
      } else {
        resolve(true);
      }
    };
  });
};

// ✅ Validate danh sách ảnh
const beforeUploadList = async (
  fileList: File[],
  type: keyof typeof imageConfig
) => {
  const validFiles: File[] = [];

  for (const file of fileList) {
    const isValid = await validateFile(file, type);
    if (isValid) validFiles.push(file);
  }

  return validFiles.length ? validFiles : Upload.LIST_IGNORE;
};

const useBeforeUpload = () => ({
  beforeUploadCategory: (file: File) => validateFile(file, 'category'),
  beforeUploadAvatar: (file: File) => validateFile(file, 'avatar'),
  beforeUploadBanner: (file: File) => validateFile(file, 'banner'),
  beforeUploadPost: (file: File) => validateFile(file, 'post'),
  beforeUploadList,
});

export default useBeforeUpload;

function clearFileInput() {
  const fileInput = document.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement;
  if (fileInput) {
    fileInput.value = '';
  }
}
