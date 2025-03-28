import Bottom from "@/components/layouts/AppLayout/Bottom/Bottom";
import BannerCarousel from "@/features/banners/components/BannerCarousel";
import CatgoryForYou from "@/features/categories/components/CatgoryForYou";
import PostSuggestionList from "@/features/post-suggestions/components/ui/PostSuggestionList";

function HomePage() {
  return (
    <div className="overflow-y-auto h-[calc(100vh-100px)] flex-1 overflow-x-hidden">
      <BannerCarousel />
      <CatgoryForYou />
      <PostSuggestionList />
      <Bottom />
    </div>
  );
}

export default HomePage;
