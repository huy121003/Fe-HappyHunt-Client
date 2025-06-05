import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Collapse,
  Space,
  Radio,
  Flex,
  Button,
  Drawer,
} from "antd";
import {
  FilterOutlined,
  DollarOutlined,
  GlobalOutlined,
  TagsOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { IAttribute } from "@/features/categories/data/interface";
import { Type } from "@/features/categories/data/constants";
import SelectProvince from "@/features/provinces/components/form/SelectProvince";
import SelectDictrict from "@/features/districts/components/form/SelectDictrict";
import CSelect from "@/components/form/CSelect";
import CPriceRange from "@/components/ui/CPriceRange";
import { ISearchPost } from "@/features/posts/data/interface";
import { motion } from "framer-motion";

const { Text } = Typography;
const { Panel } = Collapse;

interface IProps {
  attributes: IAttribute[];
  childrenLength: number;
  handleSelectAttribute: (attribute: { name: string; value: string }) => void;
  handleMinPriceChange: (value: number) => void;
  handleMaxPriceChange: (value: number) => void;
  handleSelectProvince: (value: number) => void;
  handleSelectDistrict: (value: number) => void;
  computtedFilter: ISearchPost;
}

const PostFilter: React.FC<IProps> = ({
  attributes,
  childrenLength,
  handleSelectAttribute,
  handleMinPriceChange,
  handleMaxPriceChange,
  handleSelectProvince,
  handleSelectDistrict,
  computtedFilter,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderAttributeInput = (attribute: IAttribute) => {
    switch (attribute.type) {
      case Type.SELECT:
      case Type.YEAR:
        return (
          <CSelect
            placeholder={`Select ${attribute.name}`}
            allowClear
            showSearch
            className="w-full !rounded-lg"
            options={
              attribute?.values?.map((value) => ({
                label: value,
                value: value,
              })) || []
            }
            onChange={(value) =>
              handleSelectAttribute({
                name: attribute.name,
                value,
              })
            }
          />
        );
      case Type.BOOLEAN:
        return (
          <Radio.Group
            defaultValue="all"
            className="w-full flex flex-col space-y-2"
            options={[
              { label: "All", value: "all" },
              { label: "True", value: "true" },
              { label: "False", value: "false" },
            ]}
            onChange={(e) => {
              handleSelectAttribute({
                name: attribute.name,
                value: e.target.value,
              });
            }}
          />
        );
      case Type.RADIO:
        return (
          <Radio.Group
            defaultValue="all"
            className="w-full flex flex-col gap-3"
            onChange={(e) => {
              handleSelectAttribute({
                name: attribute.name,
                value: e.target.value,
              });
            }}
          >
            <Radio value="all">
              <Text className="text-gray-600">All</Text>
            </Radio>
            {attribute?.values?.map((value) => (
              <Radio key={value} value={value}>
                <Text className="text-gray-600">{value}</Text>
              </Radio>
            ))}
          </Radio.Group>
        );
      default:
        return null;
    }
  };

  const FilterContent = (
    <Collapse
      defaultActiveKey={["price", "location"]}
      ghost
      expandIconPosition="end"
      expandIcon={({ isActive }) => (
        <DownOutlined rotate={isActive ? 180 : 0} className="text-gray-400" />
      )}
      className="filter-collapse"
    >
      {/* Price Range Filter */}
      <Panel
        header={
          <Text
            strong
            className="text-black font-medium flex items-center text-base"
          >
            <DollarOutlined className="mr-3 text-orange-500 text-lg" />
            Price Range
          </Text>
        }
        key="price"
        className="filter-panel"
      >
        <div className="px-6 pb-6">
          <CPriceRange
            min={0}
            max={1000000000}
            onMaxChange={handleMaxPriceChange}
            onMinChange={handleMinPriceChange}
          />
        </div>
      </Panel>

      {/* Location Filter */}
      <Panel
        header={
          <Text
            strong
            className="text-black font-medium flex items-center text-base"
          >
            <GlobalOutlined className="mr-3 text-orange-500 text-lg" />
            Location
          </Text>
        }
        key="location"
        className="filter-panel"
      >
        <Space direction="vertical" className="w-full px-6 pb-6" size="middle">
          <SelectProvince
            placeholder="Select Province"
            onChange={(value) => handleSelectProvince(value)}
            showSearch
            allowClear
            className="!rounded-lg"
            style={{ width: "100%" }}
          />
          <SelectDictrict
            disabled={!computtedFilter.province}
            province={computtedFilter.province}
            placeholder="Select District"
            onChange={(value) => handleSelectDistrict(value)}
            showSearch
            allowClear
            className="!rounded-lg"
            style={{ width: "100%" }}
          />
        </Space>
      </Panel>

      {/* Attributes Filter */}
      {childrenLength === 0 &&
        attributes
          .filter((attribute) => attribute.isFilter)
          .map((attribute, index) => (
            <Panel
              header={
                <Text
                  strong
                  className="text-black font-medium flex items-center text-base"
                >
                  <TagsOutlined className="mr-3 text-orange-500 text-lg" />
                  {attribute.name}
                </Text>
              }
              key={`attribute-${index}`}
              className="filter-panel"
            >
              <div className="px-6 pb-6">{renderAttributeInput(attribute)}</div>
            </Panel>
          ))}
    </Collapse>
  );

  return isMobile ? (
    <>
      <Button
        icon={<FilterOutlined />}
        onClick={() => setOpenDrawer(true)}
        className="mb-4"
        type="primary"
      />

      <Drawer
        title="Filters"
        placement="left"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        width={300}
      >
        {FilterContent}
      </Drawer>
    </>
  ) : (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        size="small"
        className="w-[300px] mx-auto !border-0 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
        bodyStyle={{ padding: 0 }}
        headStyle={{
          backgroundColor: "white",
          borderBottom: "1px solid #f0f0f0",
          padding: "16px 20px",
        }}
        title={
          <Flex align="center" justify="space-between" className="px-2">
            <Text
              strong
              className="text-black font-medium flex items-center text-lg"
            >
              <FilterOutlined className="mr-3 text-orange-500 text-xl" />
              Filters
            </Text>
          </Flex>
        }
      >
        {FilterContent}
      </Card>
    </motion.div>
  );
};

export default PostFilter;
