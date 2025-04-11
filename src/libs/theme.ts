import { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: {
    colorPrimary: "#FF5722",
    colorLink: "#FF5722",
    fontSize: 16,
    wireframe: false,
    colorBgContainer: "#FFFFFF",
    colorText: "#000000",
    colorBorder: "#E0E0E0",
    borderRadius: 8,
  },
  components: {
    Button: {
      colorPrimary: "#FF5722",
      algorithm: true,
      controlHeightLG: 48,
      controlHeight: 40,
      controlHeightSM: 32,
      contentFontSize: 16,
      contentFontSizeLG: 18,
      contentLineHeight: 1.5,
      contentLineHeightLG: 1.4444444444444444,
    },
    Typography: {
      algorithm: true,
      colorText: "#000000",
    },
    Menu: {
      itemHeight: 48,
      colorItemBg: "#FFFFFF",

      colorItemText: "#000000",
      colorItemTextHover: "#FF5722",
      colorItemBgHover: "rgba(255, 87, 34, 0.1)",
    },
    Tabs: {
      cardBg: "#f5f5f5",
      cardGutter: 0,
      colorBorderSecondary: "none",
      margin: 0,
      colorText: "#000000",
      colorPrimary: "#FF5722",
    },
    Segmented: {
      borderRadiusLG: 8,
      colorBgLayout: "#FFFFFF",
    },
    InputNumber: {
      handleWidth: 0,
    },
    Spin: {
      colorPrimary: "#FF5722",
      colorLink: "#FF5722",
      colorText: "#FF5722",
      colorLinkHover: "#FF5722",
      colorLinkActive: "#FF5722",
      fontSize: 24,
    },
    TreeSelect: {
      fontSize: 16,
      colorBgContainer: "#FFFFFF",
      colorText: "#000000",
    },
    Input: {
      colorBgContainer: "#FFFFFF",
      colorBorder: "#E0E0E0",
      colorPrimary: "#FF5722",
      colorText: "#000000",
    },
    Select: {
      colorBgContainer: "#FFFFFF",
      colorBorder: "#E0E0E0",
      colorPrimary: "#FF5722",
      colorText: "#000000",
    },
    Card: {
      borderRadius: 0,
      colorBgContainer: "#FFFFFF",
    },
  },
};

export default theme;
