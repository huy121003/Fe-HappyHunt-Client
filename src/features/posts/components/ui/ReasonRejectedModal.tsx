import React from "react";
import { Modal, Image, Tag } from "antd";
import { CloseOutlined } from "@ant-design/icons";
const baseURL = import.meta.env.VITE_PUBLIC_URL;
export interface RejectedImage {
  url: string;
  index: number;
  reasonReject: string[];
}

interface ReasonRejectedModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: RejectedImage[];
}

const ReasonRejectedModal: React.FC<ReasonRejectedModalProps> = ({
  isOpen,
  onClose,
  images = [],
}) => {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={800}
      className="rounded-lg"
      closeIcon={
        <CloseOutlined className="text-gray-500 hover:text-orange-500" />
      }
    >
      <div className="bg-white p-6">
        <div className="flex items-center mb-6">
          <i className="fas fa-exclamation-triangle text-orange-500 text-2xl mr-3"></i>
          <h2 className="text-2xl font-semibold text-gray-800">
            Rejected Images
          </h2>
        </div>

        <div className="space-y-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="relative w-32 h-32">
                  <Image
                    src={
                      image.url.includes("http://") ||
                      image.url.includes("https://")
                        ? image.url
                        : `${baseURL}${image.url}`
                    }
                    alt={`Rejected image ${image.index + 1}`}
                    className="rounded-lg object-cover"
                    width={128}
                    height={128}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Image #{image.index}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {image.reasonReject?.map((reason, idx) => (
                      <Tag
                        key={idx}
                        color="error"
                        className="px-3 py-1 rounded-full text-sm"
                      >
                        {reason}
                      </Tag>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ReasonRejectedModal;
