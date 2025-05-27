import { useAppSelector } from "@/redux/reduxHook";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  MenuProps,
  Space,
  Typography,
} from "antd";
import { useNavigate } from "react-router-dom";
import ButtonLogout from "../../../../buttons/ButtonLogout";
import { useState } from "react";
import AvtiveVipModal from "@/features/auth/components/ui/AvtiveVipModal";

function ButtonActionProfile() {
  const profile = useAppSelector((state) => state?.auth?.account);
  const [oepn, setOpen] = useState(false);
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
      key: "active-vip",
      label: (
        <Typography.Text onClick={() => setOpen(true)} className="text-black">
          <i className="fa-solid fa-crown" /> Active VIP
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
    <>
      {" "}
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button type="text" style={{ padding: 0 }}>
          <Space align="center">
            <Badge
              size="default"
              count={
                profile.isVip ? (
                  <i className="fa-solid fa-crown text-yellow-500 text-[14px]" />
                ) : null
              }
              offset={[-10, 5]}
            >
              {profile?.avatar ? (
                <Avatar
                  size={40}
                  src={profile?.avatar}
                  alt={profile?.name}
                  className={`
                    ${profile.isVip && "border-2 border-yellow-500"}
                    `}
                />
              ) : (
                <Avatar
                  size={40}
                  icon={<i className="fa-solid fa-user-circle" />}
                  className={`
                    ${profile.isVip && "border-2 border-yellow-500"}
                    `}
                />
              )}
            </Badge>

            <i className="fa-solid fa-chevron-down text-[16px] text-white" />
          </Space>
        </Button>
      </Dropdown>
      <AvtiveVipModal open={oepn} setOpen={setOpen} />
    </>
  );
}

export default ButtonActionProfile;
