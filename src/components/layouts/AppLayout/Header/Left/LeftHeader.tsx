import { Flex, Image, Tooltip, Typography } from "antd";
import { useNavigate } from "react-router-dom";

function LeftHeader() {
  const navigate = useNavigate();
  return (
    <Tooltip title="Home">
      <Flex
        align="center"
        justify="center"
        className="cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        <Image
          src="/logo.png"
          preview={false}
          width={30}
          className="md:hidden"
        />
        <Typography.Title
          level={5}
          style={{ color: "#ea580c" }}
          className="hidden md:block"
        >
          HAPPY
        </Typography.Title>
        <Typography.Title
          level={5}
          style={{ color: "#fff" }}
          className="hidden md:block"
        >
          HUNT
        </Typography.Title>
      </Flex>
    </Tooltip>
  );
}

export default LeftHeader;
