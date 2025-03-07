import { Flex, Typography } from "antd";
import { useNavigate } from "react-router-dom";

function AuthAction() {
  const navigate = useNavigate();

  return (
    <Flex gap={4} align="center" justify="center">
      <Typography.Text
        className="text-white cursor-pointer transition-colors hover:text-yellow-400"
        onClick={() => navigate("/login")}
      >
        SIGN IN
      </Typography.Text>
      <Typography.Text className="text-white px-2">|</Typography.Text>
      <Typography.Text
        className="text-white cursor-pointer transition-colors hover:text-yellow-400"
        onClick={() => navigate("/register")}
      >
        SIGN UP
      </Typography.Text>
    </Flex>
  );
}

export default AuthAction;
