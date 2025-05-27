import { CLoadingPage } from "@/components";
import useEvaluateFilter from "@/features/evaluates/hooks/useEvaluateFilter";
import EvaluateService from "@/features/evaluates/service";
import { API_KEY } from "@/features/profile/data/constant";
import { API_KEY as API_KEY_EVALUATE } from "@/features/evaluates/data/constant";
import ProfileService from "@/features/profile/service";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Flex, List, Pagination } from "antd";
import EvaluateCard from "@/features/evaluates/components/ui/EvaluateCard";

function EvaluatePage() {
  const location = useLocation();
  const { slugProfile } = useParams();
  const {
    computedFilter,
    pagination,
    handleChangePagination,
    handelChangeIsSeller,
  } = useEvaluateFilter();
  useEffect(() => {
    if (location.pathname.includes("seller")) {
      handelChangeIsSeller("seller");
    } else if (location.pathname.includes("buyer")) {
      handelChangeIsSeller("buyer");
    } else {
      handelChangeIsSeller("all");
    }
  }, [location.pathname]);
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.PROFILE, slugProfile],
    queryFn: async () => {
      const res = await ProfileService.getBySlug(String(slugProfile));
      return res.data;
    },
    enabled: !!slugProfile,
  });

  const { data: evaluate, isLoading: isLoadingEvaluate } = useQuery({
    queryKey: [
      API_KEY_EVALUATE.EVALUATE,
      computedFilter,
      data?._id,
      slugProfile,
    ],
    queryFn: async () => {
      const res = await EvaluateService.getByUserId(
        Number(data?._id),
        computedFilter
      );
      return res.data;
    },
    enabled: !!data?._id,
  });
  if (isLoading || isLoadingEvaluate) return <CLoadingPage />;
  return (
    <Flex vertical gap={16} style={{ width: "100%" }}>
      <List
        className="w-full flex-row gap-4"
        dataSource={evaluate?.documentList}
        renderItem={(item) => <EvaluateCard key={item._id} evaluate={item} />}
      />
      <Flex justify="end" className="w-full" align="center">
        <Pagination
          current={pagination?.current}
          total={evaluate?.totalDocuments}
          onChange={handleChangePagination}
        />
      </Flex>
    </Flex>
  );
}

export default EvaluatePage;
