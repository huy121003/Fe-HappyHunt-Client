import Bottom from "@/components/layouts/AppLayout/Bottom/Bottom";
import BannerCarousel from "@/features/banners/components/BannerCarousel";

function HomePage() {
  return (
    <div className="overflow-y-auto h-[calc(100vh-100px)] flex-1">
      <BannerCarousel />
      <BannerCarousel />
      <BannerCarousel />
      <Bottom />
    </div>
  );
}

export default HomePage;
