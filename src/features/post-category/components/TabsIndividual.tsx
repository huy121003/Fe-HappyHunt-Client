import { Tabs } from "antd";
import React from "react";
interface Props {
  handleSelectIsIndividual: (value: string) => void;
}
const TabsIndividual: React.FC<Props> = ({ handleSelectIsIndividual }) => {
  return (
    <Tabs
      onChange={handleSelectIsIndividual}
      className="custom-tabs"
      type="card"
      items={[
        {
          label: <span className="text-lg font-semibold ">All Post</span>,
          key: "all",
        },
        {
          label: <span className="text-lg font-semibold">Individual</span>,
          key: "true",
        },
        {
          label: <span className="text-lg font-semibold">Professional</span>,
          key: "false",
        },
      ]}
      tabBarStyle={{
        marginBottom: 10,
        color: "#4B5563",
      }}
    />
  );
};

export default TabsIndividual;
