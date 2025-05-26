import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Flex, Modal } from "antd";
import React from "react";
import { API_KEY } from "../../data/constant";
import {
  CheckCircleTwoTone,
  CrownTwoTone,
  ExclamationCircleTwoTone,
} from "@ant-design/icons";
import AuthService from "../../service";
import CButton from "@/components/buttons/CButton";
import useAuthState from "../../hooks/useAuthState";

interface AvtiveVipModalProps {
  open?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const AvtiveVipModal: React.FC<AvtiveVipModalProps> = ({ open, setOpen }) => {
  const { onSuccess } = useAuthState();
  const client = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.GET_VIP_STATUS],
    queryFn: async () => {
      const res = await AuthService.getVipStatus();
      return res.data;
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const res = await AuthService.activeVip();
      return res.data;
    },
    onSuccess: () =>
      onSuccess(
        "VIP membership activated successfully! Enjoy your benefits.",
        () => {
          setOpen(false);
          client.invalidateQueries({ queryKey: [API_KEY.GET_ACCOUNT_INFO] });
          window.location.reload();
        }
      ),
  });
  const handleActiveVip = () => {
    mutate();
  };

  return (
    <Modal
      title={
        <Flex align="center" gap={8}>
          <CrownTwoTone twoToneColor="#faad14" style={{ fontSize: 28 }} />
          <span style={{ fontWeight: 600, fontSize: 20 }}>VIP Membership</span>
        </Flex>
      }
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      centered
      closeIcon={false}
      bodyStyle={{
        padding: "32px 24px",
        borderRadius: 16,
        background: "#fffbe6",
      }}
      width={400}
      loading={isLoading}
    >
      {data?.isVip ? (
        <Flex vertical align="center" gap={16}>
          <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 48 }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>
              You are a VIP member!
            </div>
            <div>
              Your VIP status will expire on{" "}
              <span style={{ fontWeight: 500, color: "#faad14" }}>
                {new Date(data?.dateVipExpired).toLocaleDateString()}
              </span>
              .
            </div>
            <div style={{ marginTop: 8 }}>
              <span style={{ color: "#52c41a", fontWeight: 500 }}>
                Enjoy viewing up to 60 posts at once.
              </span>
            </div>
          </div>
          <CButton onClick={() => setOpen(false)} type="primary">
            Close
          </CButton>
        </Flex>
      ) : (
        <Flex vertical align="center" gap={16}>
          <ExclamationCircleTwoTone
            twoToneColor="#faad14"
            style={{ fontSize: 48 }}
          />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>
              Become a VIP Member
            </div>
            <div>
              <span style={{ color: "#fa541c", fontWeight: 500 }}>
                Unlock up to 60 posts at once
              </span>{" "}
              (instead of 20).
            </div>
            <div style={{ marginTop: 8 }}>
              <span style={{ color: "#faad14" }}>Only 100.000 VND</span> for 1
              month of VIP access.
            </div>
          </div>
          <Flex justify="center" style={{ width: "100%" }}>
            <CButton
              type="primary"
              onClick={handleActiveVip}
              loading={isPending}
              disabled={isPending}
              style={{ minWidth: 140 }}
            >
              Activate VIP
            </CButton>
          </Flex>
        </Flex>
      )}
    </Modal>
  );
};

export default AvtiveVipModal;
