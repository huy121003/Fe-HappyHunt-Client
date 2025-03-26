import { Card, Flex, Radio, Typography } from "antd";
import { usePostFilterContext } from "./PostFilterProvider";
import { IAttribute } from "@/features/categories/data/interface";
import CSelect from "@/components/form/CSelect";
interface IProps {
  attributes: IAttribute[];
  childrenLength: number;
}
import { Type } from "@/features/categories/data/constants";
import CPriceRange from "@/components/ui/CPriceRange";
import SelectProvince from "@/features/provinces/components/form/SelectProvince";
import SelectDictrict from "@/features/districts/components/form/SelectDictrict";

function PostFilter({ attributes, childrenLength }: IProps) {
  const {
    handleSelectAttribute,
    handleMinPriceChange,
    handleMaxPriceChange,
    handleSelectIsIndividual,
    handleSelectProvince,
    handleSelectDistrict,
    computtedFilter,
  } = usePostFilterContext();
  return (
    <Card className=" shadow-lg  bg-white border-t-2 border-t-flame-orange">
      <Flex vertical>
        <Typography.Title level={5} className="!text-[#ff4d00] !mb-6 !text-xl">
          Filters
        </Typography.Title>
        <Flex vertical gap={16}>
          {childrenLength === 0 &&
            attributes
              .filter((attribute) => attribute.isFilter)
              .map((attribute) => (
                <div key={attribute.name} className="w-full">
                  <Typography.Text strong className="text-gray-800 mb-2 block">
                    {attribute.name}
                  </Typography.Text>
                  <div className="mt-2">
                    {(() => {
                      switch (attribute.type) {
                        case Type.SELECT:
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
                                handleSelectAttribute(attribute, value)
                              }
                            />
                          );
                        case Type.YEAR:
                          return (
                            <CSelect
                              placeholder={`Select ${attribute.name}`}
                              className="w-full"
                              options={attribute?.values?.map((value) => ({
                                label: value,
                                value: value,
                              }))}
                              onChange={(value) =>
                                handleSelectAttribute(attribute, value)
                              }
                              allowClear
                              showSearch
                            />
                          );
                        case Type.BOOLEAN:
                          return (
                            <Radio.Group
                              defaultValue={"All"}
                              className="w-full flex"
                              options={[
                                { label: "All", value: "all" },
                                { label: "True", value: "true" },
                                { label: "False", value: "false" },
                              ]}
                              onChange={(e) =>
                                handleSelectAttribute(attribute, e.target.value)
                              }
                            />
                          );
                        case Type.RADIO:
                          return (
                            <Radio.Group
                              className="w-full flex flex-wrap gap-2"
                              options={[
                                { label: "All", value: "all" },
                                ...(attribute?.values?.map((value) => ({
                                  label: value,
                                  value: value,
                                })) || []),
                              ]}
                              onChange={(e) =>
                                handleSelectAttribute(attribute, e.target.value)
                              }
                            />
                          );

                        default:
                          return null;
                      }
                    })()}
                  </div>
                </div>
              ))}

          <div className="w-full">
            <Typography.Text strong className="text-gray-800 mb-2 block">
              Price Range
            </Typography.Text>
            <CPriceRange
              min={0}
              max={100000000}
              onMaxChange={handleMaxPriceChange}
              onMinChange={handleMinPriceChange}
            />
          </div>

          <div className="w-full">
            <Typography.Text strong className="text-gray-800 mb-2 block">
              Seller Type
            </Typography.Text>
            <Radio.Group
              defaultValue={"All"}
              className="w-full flex flex-wrap gap-2"
              options={[
                { label: "All", value: "all" },
                { label: "Professional", value: "false" },
                { label: "Individual", value: "true" },
              ]}
              onChange={(e) => handleSelectIsIndividual(e.target.value)}
            />
          </div>

          <div className="w-full">
            <Typography.Text strong className="text-gray-800 mb-2 block">
              Location
            </Typography.Text>
            <Flex vertical gap={8}>
              <SelectProvince
                placeholder="Select Province"
                onChange={(value) => handleSelectProvince(value)}
                showSearch
                allowClear
                className="w-full"
              />

              <SelectDictrict
                disabled={!computtedFilter.province}
                province={computtedFilter.province}
                placeholder="Select District"
                onChange={(value) => handleSelectDistrict(value)}
                showSearch
                allowClear
                className="w-full"
              />
            </Flex>
          </div>
        </Flex>
      </Flex>
    </Card>
  );
}

export default PostFilter;
