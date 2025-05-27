import { Tabs } from "antd";
import React from "react";
import { motion } from "framer-motion";

interface Props {
  handleSelectIsIndividual: (value: string) => void;
}

const TabsIndividual: React.FC<Props> = ({ handleSelectIsIndividual }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Tabs
        onChange={handleSelectIsIndividual}
        className="custom-tabs"
        type="card"
        items={[
          {
            label: (
              <motion.span
                className="text-base font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                All Post
              </motion.span>
            ),
            key: "all",
          },
          {
            label: (
              <motion.span
                className="text-base font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Individual
              </motion.span>
            ),
            key: "true",
          },
          {
            label: (
              <motion.span
                className="text-base font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Professional
              </motion.span>
            ),
            key: "false",
          },
        ]}
        tabBarStyle={{
          marginBottom: 10,
          color: "#4B5563",
        }}
        style={{
          backgroundColor: "white",
          padding: "8px",
          borderRadius: "12px",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        }}
        tabBarGutter={8}
        animated
      />
    </motion.div>
  );
};

export default TabsIndividual;
