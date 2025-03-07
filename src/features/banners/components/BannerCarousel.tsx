import { useQuery } from "@tanstack/react-query";
import { API_KEY } from "../data/constants";
import BannerService from "../service";
import { Carousel, Spin } from "antd";

function BannerCarousel() {
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.BANNER],
    queryFn: async () => {
      const response = await BannerService.getAll();
      return response.data;
    },
  });
  return (
    <Spin spinning={isLoading}>
      <Carousel autoplay>
        {data?.map((item) => (
          <div key={item._id}>
            <img
              src={item.image}
              alt={item.image}
              className=" h-[600px]  w-full  object-cover"
            />
          </div>
        ))}
      </Carousel>
    </Spin>
  );
}

export default BannerCarousel;
