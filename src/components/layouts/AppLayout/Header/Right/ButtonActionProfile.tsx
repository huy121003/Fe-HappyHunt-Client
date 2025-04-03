import { useAppSelector } from "@/redux/reduxHook";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Flex,
  Image,
  MenuProps,
  Space,
  Typography,
} from "antd";
import { useNavigate } from "react-router-dom";
import ButtonLogout from "../../../../buttons/ButtonLogout";

function ButtonActionProfile() {
  const profile = useAppSelector((state) => state?.auth?.account);
  const navigate = useNavigate();
  const items: MenuProps["items"] = [
    {
      key: "profile",
      label: (
        <Typography.Text
          onClick={() => {
            navigate(`/profile/${profile?.slug}`);
          }}
        >
          <UserOutlined /> Profile
        </Typography.Text>
      ),
    },
    {
      key: "favorite-post",
      label: (
        <Typography.Text
          onClick={() => navigate(`profile/me/favorite-post`)}
          className="text-black"
        >
          <i className="fas fa-heart" /> Favorite Posts
        </Typography.Text>
      ),
    },
    {
      key: "change-password",
      label: (
        <Typography.Text
          className="text-black"
          onClick={() => navigate("profile/me/change-password")}
        >
          <LockOutlined /> Change Password
        </Typography.Text>
      ),
    },
    {
      key: "logout",
      label: <ButtonLogout />,
    },
  ];
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <Button type="text" style={{ padding: 0 }}>
        <Space align="center">
          {profile?.avatar ? (
            <Avatar size={40} src={profile?.avatar} alt={profile?.name} />
          ) : (
            <Avatar
              size={40}
              icon={<i className="fa-solid fa-user-circle" />}
            />
          )}

          <i className="fa-solid fa-chevron-down text-[16px] text-white" />
        </Space>
      </Button>
    </Dropdown>
  );
}

export default ButtonActionProfile;
