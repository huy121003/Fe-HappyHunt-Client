import { useState } from "react";
import { INotificationItem } from "../data/interface";
import { Dropdown, Menu } from "antd";
import CButtonActionIcon from "@/components/buttons/CButtonActionIcon";
import NotificationCard from "./NotificationCard";
import CButton from "@/components/buttons/CButton";

interface NotificationDropDownProps {
  notifications: INotificationItem[];
  loadMore: () => void;
  total: number;
  onOpen?: () => void;
}
function NotificationDropDown({
  notifications,
  loadMore,
  total,
  onOpen,
}: NotificationDropDownProps) {
  const [open, setOpen] = useState(false);

  const handleMenuClick = (e: any) => {
    if (e.key === "Show More") {
      e.stopPropagation();
      loadMore();
      return;
    }
  };

  const menu = (
    <Menu
      className="w-[400px] max-h-[calc(100vh-300px)] overflow-y-auto bg-white shadow-lg rounded-md"
      onClick={handleMenuClick}
    >
      {notifications?.map((notification) => (
        <Menu.Item key={notification._id} className="!p-0">
          <NotificationCard notification={notification} />
        </Menu.Item>
      ))}
      {total > notifications.length && (
        <Menu.Item key="Show More" className="text-center">
          <CButton type="dashed" onClick={loadMore} className="w-full">
            Show More
          </CButton>
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      trigger={["click"]}
      open={open}
      onOpenChange={(visible) => {
        setOpen(visible);
        if (visible && onOpen) {
          onOpen();
        }
      }}
      overlayClassName="custom-dropdown"
    >
      <CButtonActionIcon icon="fas fa-bell" title="Notification" />
    </Dropdown>
  );
}

export default NotificationDropDown;
