import Bottom from "@/components/layouts/AppLayout/Bottom/Bottom";
import BannerCarousel from "@/features/banners/components/BannerCarousel";
import CatgoryForYou from "@/features/categories/components/CatgoryForYou";

function HomePage() {
  return (
    <div className="overflow-y-auto h-[calc(100vh-100px)] flex-1 overflow-x-hidden">
      <BannerCarousel />
      <CatgoryForYou />
      <Bottom />
    </div>
  );
}

export default HomePage;
