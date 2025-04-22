import NotificationDropDown from "@/features/notitfication/components/NotificationDropDown";
import useNotificationFilter from "@/features/notitfication/hooks/useNotificationFilter";
import { useEffect, useState } from "react";
import { useSocketProvider } from "@/hooks/useSocketProvider";
import { INotificationItem } from "@/features/notitfication/data/interface";
import { useSocketListenerWithResponse } from "@/hooks/useSocketListenerWithResponse";
import { IPage } from "@/interfaces";
import { Badge } from "antd";
import { useAppSelector } from "@/redux/reduxHook";

function ButtonNoti() {
  const { computedFilter } = useNotificationFilter();
  const [notRead, setNotRead] = useState(0);
  const [total, setTotal] = useState(0);
  const [notifications, setNotifications] = useState<INotificationItem[]>([]);
  const socket = useSocketProvider();
  const account = useAppSelector((state) => state.auth.account);

  // Listen for notification count updates

  useEffect(() => {
    if (socket) {
      setNotifications([]);
      socket.emit("get_notifications", computedFilter);
      socket.emit("not_read_notification", account._id);
    }
    return () => {
      socket?.off("get_notifications");
      socket?.off("not_read_notification");
    };
  }, [socket, account._id]);
  useSocketListenerWithResponse("not_read_notification", (data: number) => {
    setNotRead(data);
  });
  useSocketListenerWithResponse(
    "notifications",
    (data: IPage<INotificationItem[]>) => {
      setNotifications((prev) => [...prev, ...data.documentList]);
      setTotal(data.totalDocuments);
    }
  );
  useSocketListenerWithResponse(
    "notification_read",
    (data: INotificationItem) => {
      setNotifications(
        notifications.map((notification) =>
          notification._id === data._id
            ? { ...notification, read: true }
            : notification
        )
      );
    }
  );
  useSocketListenerWithResponse(
    "notification_created",
    (data: INotificationItem) => {
      setNotifications([data, ...notifications]);
    }
  );

  const loadMore = () => {
    if (total === notifications.length) return;
    socket?.emit("get_notifications", {
      ...computedFilter,
      page: Math.ceil(notifications.length / (computedFilter.size ?? 10)) + 1,
    });
  };

  return (
    <Badge count={notRead} color="red" size="small" className="z-50">
      <NotificationDropDown
        notifications={notifications}
        total={total}
        loadMore={loadMore}
        onOpen={() => {
          socket?.emit("not_read_notification", account._id);
        }}
      />
    </Badge>
  );
}

export default ButtonNoti;
