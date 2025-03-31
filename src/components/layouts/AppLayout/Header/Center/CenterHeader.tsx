import { useState } from "react";
import CSearch from "@/components/form/CSearch";
import { Dropdown, Menu, Flex, Spin } from "antd";
import ButtonCate from "../../../../buttons/ButtonCate";
import { useNavigate, useParams } from "react-router-dom";
import useSearchFilter from "@/features/history-search/hooks/useSearchFilter";
import useSearchState from "@/features/history-search/hooks/useSearchState";
import { useMutation, useQuery } from "@tanstack/react-query";
import { API_KEY } from "@/features/history-search/data/constant";
import SearchHistoryService from "@/features/history-search/service";
import { CloseOutlined } from "@ant-design/icons";
function CenterHeader() {
  const navigate = useNavigate();
  const { computtedFilter } = useSearchFilter();
  const { onSuccess } = useSearchState();

  const { slugCategory, slugChildCategory } = useParams();

  const [open, setOpen] = useState(false);

  const handleSearch = (value: string) => {
    if (!value.trim()) return;

    handleCreate(value.trim());

    if (slugCategory && slugChildCategory) {
      navigate(
        `/category/${slugCategory}/child-category/${slugChildCategory}?q=${value}`
      );
    } else if (slugCategory) {
      navigate(`/category/${slugCategory}?q=${value}`);
    } else {
      navigate(`/search?q=${value}`);
    }

    setOpen(false);
  };
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.SEARCH_HISTORY, computtedFilter],
    queryFn: async () => {
      const res = await SearchHistoryService.getAll(computtedFilter);
      return res.data.documentList;
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (keyword: string) => {
      const res = await SearchHistoryService.create({ keyword });
      return res.data;
    },
    onSuccess: () => {
      onSuccess();
    },
  });

  const { mutate: deleteMutate, isPending: isDeleteLoading } = useMutation({
    mutationFn: async (id: number) => {
      const res = await SearchHistoryService.remove(Number(id));
      return res.data;
    },
    onSuccess: () => {
      onSuccess();
    },
  });
  const handleDelete = (id: number) => {
    deleteMutate(Number(id));
  };
  const handleCreate = (keyword: string) => {
    mutate(keyword);
  };

  return (
    <Flex align="center" justify="center" className="flex-1">
      <ButtonCate />

      <Dropdown
        open={open}
        onOpenChange={setOpen}
        overlay={
          <Menu>
            {isLoading || isPending || isDeleteLoading ? (
              <div className="w-full flex items-center justify-center ">
                <Spin />
              </div>
            ) : (
              data?.map((item) => (
                <Menu.Item key={item._id}>
                  <div
                    className="w-full flex items-center justify-between cursor-pointer"
                    onClick={() => handleSearch(item.keyword)}
                  >
                    <span>{item.keyword}</span>
                    <CloseOutlined
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(Number(item._id));
                      }}
                    />
                  </div>
                </Menu.Item>
              ))
            )}
          </Menu>
        }
        trigger={["click"]}
      >
        <div
          className="w-full flex items-center justify-center cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <CSearch
            onSearch={handleSearch}
            placeholder="Search"
            className="w-full"
          />
        </div>
      </Dropdown>
    </Flex>
  );
}

export default CenterHeader;
