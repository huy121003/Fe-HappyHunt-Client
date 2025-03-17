import React from "react";
import { IPost } from "../../data/interface";
import { useQuery } from "@tanstack/react-query";
import { API_KEY as API_KEY_EVALUATE } from "@/features/evaluates/data/constant";
import {
  API_KEY as API_KEY_POST,
  EPostStatus,
} from "@/features/posts/data/constant";
import EvaluateService from "@/features/evaluates/service";
import { Card, Flex, Image, Spin, Typography } from "antd";
import TimeAgo from "@/components/TimeAgo";
import CButton from "@/components/buttons/CButton";
import { useNavigate } from "react-router-dom";

import PostService from "../../service";
import { useAppSelector } from "@/redux/reduxHook";

interface InfoUserProps {
  record: IPost;
}

const InfoUser: React.FC<InfoUserProps> = ({ record }) => {
  const naviagte = useNavigate();
  const account = useAppSelector((state) => state.auth?.account);
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY_EVALUATE.EVALUATE_COUNT],
    queryFn: () => EvaluateService.countEvaluate(record.createdBy._id),
    select: (response) => response.data,
  });
  const { data: dataCountSold, isLoading: isLoadingCountSold } = useQuery({
    queryKey: [API_KEY_POST.POST_COUNT_SOLD, record.createdBy._id],
    queryFn: () => PostService.countSold(record.createdBy._id),
    select: (response) => response.data,
  });

  return (
    <Spin spinning={isLoading || isLoadingCountSold}>
      <Flex gap={10} vertical>
        <Card className="p-4 bg-gray-50 rounded-2xl shadow-lg  border border-gray-300">
          <Flex vertical gap={20}>
            {/* Tên sản phẩm */}
            <Typography.Title level={2} className="text-gray-800 ">
              {record.name}
            </Typography.Title>
            {/* Giá sản phẩm */}
            <div className="p-3 flex justify-center items-center bg-gray-200 rounded-lg shadow-sm">
              <Typography.Title
                level={2}
                style={{ color: "#FF4500" }}
                className="text-orange-500 text-lg font-semibold "
              >
                {record.price.toLocaleString()} VND
              </Typography.Title>
            </div>
            {/* Địa chỉ */}
            <p className="flex items-center text-gray-700 mt-3 text-xl">
              <i className="fas fa-map-marker-alt text-red-500 mr-2"></i>
              {record.address.ward.name} - {record.address.district.name} -{" "}
              {record.address.province.name}
            </p>
            {/* Thời gian đăng */}
            <p className="flex items-center text-gray-700 mt-2 text-xl">
              <i className="fas fa-clock text-blue-500 mr-2"></i>
              <TimeAgo date={record.createdAt} />
            </p>
            {record?.createdBy?._id === account?._id &&
              (record.status === EPostStatus.SELLING ||
                record.status === EPostStatus.REJECTED) && (
                <CButton
                  type="default"
                  icon={<i className="fas fa-edit"></i>}
                  onClick={() => naviagte(`/update-post/${record.slug}`)}
                >
                  Update Post
                </CButton>
              )}
            {record?.createdBy?._id !== account?._id &&
              record.status === EPostStatus.SELLING && (
                <CButton
                  danger
                  icon={<i className="fas fa-exclamation-triangle"></i>}
                  onClick={() => naviagte(`/report/${record.slug}`)}
                >
                  Report this post
                </CButton>
              )}

            <CButton
              type="primary"
              icon={<i className="fas fa-map-marker-alt"></i>}
              onClick={() => {
                window.open(
                  `https://www.google.com/maps/search/?api=1&query= ${record.address.specificAddress},
                ${record.address.ward.name},${record.address.district.name},${record.address.province.name}`
                );
              }}
            >
              Open Google Map
            </CButton>
          </Flex>
        </Card>
        <Card className="p-4 bg-gray-50 rounded-2xl shadow-lg gap-6 border border-gray-300">
          <Flex vertical gap={24}>
            <Flex gap={12}>
              <Image
                src={record.createdBy.avatar}
                width={90}
                height={90}
                className="rounded-full border border-gray-300"
              />
              <Flex vertical>
                <Typography.Title
                  level={4}
                  className="text-gray-800 cursor-pointer"
                >
                  {record.createdBy.name}
                </Typography.Title>
                <Flex className="items-center gap-4 cursor-pointer">
                  <Typography.Text className="text-gray-600 flex items-center">
                    <i className="fas fa-star text-yellow-500 mr-2"></i>
                    {data?.averageStar || 0}
                  </Typography.Text>
                  <Typography.Text className="text-gray-600 flex items-center">
                    <i className="fas fa-comment text-blue-500 mr-2"></i>
                    {data?.count ? `${data?.count} evaluate` : "No evaluate"}
                  </Typography.Text>
                </Flex>
                <Flex className="items-center gap-4 cursor-pointer">
                  <Typography.Text className="text-gray-600 flex items-center">
                    <i className="fas fa-shopping-cart text-blue-500 mr-2"></i>
                    {dataCountSold?.selling || 0} selling
                  </Typography.Text>
                  <span className="text-gray-500"> | </span>
                  <Typography.Text className="text-gray-600 flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                    {dataCountSold?.sold || 0} sold
                  </Typography.Text>
                </Flex>
              </Flex>
            </Flex>

            {account?._id !== record.createdBy._id &&
              record.status === EPostStatus.SELLING && (
                <>
                  <CButton
                    type="default"
                    icon={<i className="fas fa-phone text-gray-600"></i>}
                    className="text-gray-700 border-gray-400 hover:bg-gray-200 transition duration-200"
                    onClick={() =>
                      window.open(`tel:${record.createdBy.phoneNumber}`)
                    }
                  >
                    Call {record.createdBy.phoneNumber}
                  </CButton>
                  <CButton
                    type="primary"
                    icon={<i className="fas fa-message "></i>}
                    className="hover:bg-blue-600 transition duration-200"
                    // onClick={() => navigate(`/chat/${record.createdBy._id}`)}
                  >
                    Chat with seller
                  </CButton>
                </>
              )}
            <CButton
              type="default"
              icon={<i className="fas fa-user-plus"></i>}
              className="text-gray-700 border-gray-400 hover:bg-gray-200 transition duration-200"
              // onClick={() => navigate(`/profile/${record.createdBy._id}`)}
            >
              View profile
            </CButton>
          </Flex>
        </Card>
      </Flex>
    </Spin>
  );
};

export default InfoUser;
