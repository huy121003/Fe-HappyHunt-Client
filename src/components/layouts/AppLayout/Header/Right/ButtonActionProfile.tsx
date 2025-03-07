import { useAppSelector } from "@/redux/reduxHook";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Flex, Image, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";
import ButtonLogout from "../../../../buttons/ButtonLogout";

function ButtonActionProfile() {
  const profile = useAppSelector((state) => state?.auth?.account);
  const navigate = useNavigate();
  const items: MenuProps["items"] = [
    {
      key: "profile",
      label: (
        <Button
          icon={<UserOutlined />}
          type="link"
          onClick={() => navigate("/profile")}
        >
          Profile
        </Button>
      ),
    },
    {
      key: "change-password",
      label: (
        <Button
          icon={<LockOutlined />}
          type="link"
          onClick={() => navigate("/change-password")}
        >
          Change Password
        </Button>
      ),
    },
    {
      key: "logout",
      label: <ButtonLogout />,
    },
  ];
  return (
    <>
      <Dropdown menu={{ items }} trigger={["hover"]}>
        <Button type="link">
          <Flex align="center" gap={8}>
            {profile?.avatar ? (
              <>
                <Image
                  width={40}
                  height={40}
                  src={profile?.avatar}
                  alt={profile?.name}
                  style={{ borderRadius: "50%" }}
                  preview={false}
                />
                <i
                  className="fa-solid fa-chevron-down
                text-[20px] text-white"
                />
              </>
            ) : (
              <i className="fa-solid fa-user-circle text-[40px] text-black" />
            )}
          </Flex>
        </Button>
      </Dropdown>
    </>
  );
}

export default ButtonActionProfile;
