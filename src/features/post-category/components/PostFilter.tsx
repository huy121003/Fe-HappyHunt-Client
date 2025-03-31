import React from "react";
import { Card, Typography, Collapse, Space, Radio } from "antd";
import {
  FilterOutlined,
  DollarOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { IAttribute } from "@/features/categories/data/interface";
import { Type } from "@/features/categories/data/constants";
import SelectProvince from "@/features/provinces/components/form/SelectProvince";
import SelectDictrict from "@/features/districts/components/form/SelectDictrict";
import CSelect from "@/components/form/CSelect";
import CPriceRange from "@/components/ui/CPriceRange";
import { ISearchPost } from "@/features/posts/data/interface";

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
  const renderAttributeInput = (attribute: IAttribute) => {
    switch (attribute.type) {
      case Type.SELECT:
      case Type.YEAR:
        return (
          <CSelect
            placeholder={`Select ${attribute.name}`}
            allowClear
            showSearch
            className="w-full"
            options={[
              ...(attribute?.values?.map((value) => ({
                label: value,
                value: value,
              })) || []),
            ]}
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
            defaultValue={"all"}
            className="w-full flex flex-col"
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
            className="w-full flex flex-col gap-2"
            onChange={(e) => {
              handleSelectAttribute({
                name: attribute.name,
                value: e.target.value,
              });
            }}
          >
            <Radio value="all">All</Radio>
            {attribute?.values?.map((value) => (
              <Radio key={value} value={value}>
                {value}
              </Radio>
            ))}
          </Radio.Group>
        );
      default:
        return null;
    }
  };

  return (
    <Card
      size="small"
      className="w-full max-w-[300px] mx-auto !border-0 shadow-sm rounded-lg bg-white"
    >
      <Collapse
        defaultActiveKey={[
          "price",
          "seller",
          "location",
          "attribute-0",
          "attribute-1",
        ]}
        ghost
        expandIconPosition="end"
      >
        {/* Price Range Filter */}
        <Panel
          header={
            <Text
              strong
              className="text-gray-600 font-medium flex items-center"
            >
              <DollarOutlined className="mr-2 text-[#ff6b00]" />
              Price Range
            </Text>
          }
          key="price"
        >
          <CPriceRange
            min={0}
            max={100000000}
            onMaxChange={handleMaxPriceChange}
            onMinChange={handleMinPriceChange}
          />
        </Panel>

        {/* Location Filter */}
        <Panel
          header={
            <Text
              strong
              className="text-gray-600 font-medium flex items-center"
            >
              <GlobalOutlined className="mr-2 text-[#ff6b00]" />
              Location
            </Text>
          }
          key="location"
        >
          <Space direction="vertical" className="w-full" size="middle">
            <SelectProvince
              placeholder="Select Province"
              onChange={(value) => handleSelectProvince(value)}
              showSearch
              allowClear
              style={{ width: "100%" }}
            />
            <SelectDictrict
              disabled={!computtedFilter.province}
              province={computtedFilter.province}
              placeholder="Select District"
              onChange={(value) => handleSelectDistrict(value)}
              showSearch
              allowClear
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
                    className="text-gray-600 font-medium flex items-center"
                  >
                    <FilterOutlined className="mr-2 text-[#ff6b00]" />
                    {attribute.name}
                  </Text>
                }
                key={`attribute-${index}`}
              >
                {renderAttributeInput(attribute)}
              </Panel>
            ))}
      </Collapse>
    </Card>
  );
};

export default PostFilter;
