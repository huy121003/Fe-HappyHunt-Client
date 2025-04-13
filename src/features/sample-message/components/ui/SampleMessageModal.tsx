import { useMutation, useQuery } from "@tanstack/react-query";
import { Modal } from "antd";
import { useState } from "react";
import { API_KEY } from "../../data/constant";
import SampleMessageService from "../../service";
import SampleMessageForm from "../form/SampleMessageForm";
import SampleMessageList from "./SampleMessageList";
import { ISampleMessage } from "../../data/interface";
import useSampleMessageState from "../../hooks/useSampleMessageState";
interface SampleMessageMOdalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
function SampleMessageMOdal({ isOpen, setIsOpen }: SampleMessageMOdalProps) {
  const [showForm, setShowForm] = useState(false);

  const [record, setRecord] = useState<ISampleMessage | null>(null);
  const { onSuccess } = useSampleMessageState();
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.SAMPLE_MESSAGE],
    queryFn: async () => {
      const response = await SampleMessageService.getAll();
      return response.data;
    },
  });
  const { mutate: deleteSampleMessage } = useMutation({
    mutationFn: async (id: number) => {
      return SampleMessageService.delete(id);
    },
    onSuccess: () => onSuccess("Sample message deleted successfully"),
  });
  const handleDelete = (record: ISampleMessage) => {
    deleteSampleMessage(record._id);
  };
  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      footer={null}
      loading={isLoading}
      centered
      title={"Sample Message"}
    >
      {showForm ? (
        <SampleMessageForm setIsOpen={setShowForm} record={record} />
      ) : (
        <SampleMessageList
          setIsOpen={setShowForm}
          data={data || []}
          setRecord={setRecord}
          handleDelete={handleDelete}
        />
      )}
    </Modal>
  );
}

export default SampleMessageMOdal;
