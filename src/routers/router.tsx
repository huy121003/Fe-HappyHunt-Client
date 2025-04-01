import { createBrowserRouter, Outlet } from "react-router-dom";
import { ReactNode, Suspense, lazy } from "react";
import { CLoadingPage, CNotFoundPage } from "@/components";
import AppLayout from "@/components/layouts/AppLayout/AppLayout";
import { PostFilterProvider } from "@/features/posts/components/ui/PostFilterProvider ";
import PostManagementLayout from "@/features/posts/layout/PostManagementLayout";
import RedirectPage from "@/pages/private/redirect/RedirectPage";
import ProfilePage from "@/pages/private/profile/ProfilePage";
import ProfileUpdateLayout from "@/features/profile/layout/ProfileUpdateLayout";

//import RoleProtectedRoute from "@/components/layouts/RoleProtectedRoute";
const withSuspense = (
  node: ReactNode,
  fallback: NonNullable<ReactNode> | null = null
) => {
  return <Suspense fallback={fallback}>{node}</Suspense>;
};
const LoginPage = lazy(() => import("@/pages/public/login/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/public/register/RegisterPage"));
const ForgotPasswordPage = lazy(
  () => import("@/pages/public/forgot-password/ForgotPasswordPage")
);
const HomePage = lazy(() => import("@/pages/private/home/HomePage"));
const PostCreatePage = lazy(
  () => import("@/pages/private/posts/create/PostCreatePage")
);
const PostPage = lazy(() => import("@/pages/private/posts/PostPage"));
const PostUpdatePage = lazy(
  () => import("@/pages/private/posts/update/PostUpdatePage")
);
const PostDetailPage = lazy(
  () => import("@/pages/private/posts/detail/PostDetailPage")
);
const PostCategoryParentPage = lazy(
  () => import("@/pages/private/post-category-parent/PostCategoryParentPage")
);
const PostCategoryPage = lazy(
  () => import("@/pages/private/post-category/PostCategoryPage")
);
const SearchPostPage = lazy(
  () => import("@/pages/private/search-post/SearchPostPage")
);
const PaymentPage = lazy(() => import("@/pages/private/payment/PaymentPage"));
const ChangePasswordPage = lazy(
  () => import("@/pages/private/change-password/ChangePasswordPage")
);
const ChangeProfile = lazy(
  () => import("@/pages/private/change-profile/ChangeProfile")
);

const router = createBrowserRouter([
  {
    path: "*",
    element: withSuspense(<CNotFoundPage />, <CLoadingPage />),
  },
  {
    path: "/login",
    element: withSuspense(<LoginPage />, <CLoadingPage />),
  },

  {
    path: "/register",
    element: withSuspense(<RegisterPage />, <CLoadingPage />),
  },
  {
    path: "/forgot-password",
    element: withSuspense(<ForgotPasswordPage />, <CLoadingPage />),
  },
  {
    path: "/",
    element: (
      <AppLayout>
        <Outlet />
      </AppLayout>
    ),
    children: [
      {
        index: true,
        element: withSuspense(<HomePage />, <CLoadingPage />),
      },
      {
        path: "search",
        element: withSuspense(<SearchPostPage />, <CLoadingPage />),
      },
      {
        path: "payment",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: withSuspense(<PaymentPage />, <CLoadingPage />),
          },
          {
            path: "success",
            element: withSuspense(<div>Payment Success</div>, <CLoadingPage />),
          },
          {
            path: "cancel",
            element: withSuspense(<div>Payment Cancel</div>, <CLoadingPage />),
          },
        ],
      },
      {
        path: "profile",
        element: <Outlet />,
        children: [
          {
            path: ":slugProfile",
            element: withSuspense(<ProfilePage />, <CLoadingPage />),
          },
          {
            path: "me",
            element: (
              <ProfileUpdateLayout>
                <Outlet />
              </ProfileUpdateLayout>
            ),
            children: [
              {
                path: "change-password",
                element: withSuspense(<ChangePasswordPage />, <CLoadingPage />),
              },
              {
                path: "change-profile",
                element: withSuspense(<ChangeProfile />, <CLoadingPage />),
              },
            ],
          },
        ],
      },

      {
        path: "create-post",
        element: withSuspense(<PostCreatePage />, <CLoadingPage />),
      },
      {
        path: "update-post/:slugPost",
        element: withSuspense(<PostUpdatePage />, <CLoadingPage />),
      },
      {
        path: "detail-post/:slugPost",
        element: withSuspense(
          <PostDetailPage key={window.location.pathname} />,
          <CLoadingPage />
        ),
      },
      {
        path: "redirect",
        element: withSuspense(<RedirectPage />, <CLoadingPage />),
      },
      {
        path: "post-management",
        element: (
          <PostFilterProvider>
            <PostManagementLayout>
              <Outlet />
            </PostManagementLayout>
          </PostFilterProvider>
        ),
        children: [
          {
            index: true,
            element: withSuspense(<PostPage />, <CLoadingPage />),
          },
          {
            path: ":status",
            element: withSuspense(<PostPage />, <CLoadingPage />),
          },
        ],
      },
      {
        path: "post/:slugPost",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: withSuspense(<div>Post Detail</div>, <CLoadingPage />),
          },
          {
            path: "edit",
            element: withSuspense(<div>Edit Post</div>, <CLoadingPage />),
          },
        ],
      },
      {
        path: "messages",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: withSuspense(<div>Messages</div>, <CLoadingPage />),
          },
          {
            path: ":slugChat",
            element: withSuspense(<div>Chat</div>, <CLoadingPage />),
          },
        ],
      },
      {
        path: "category/:slugCategory",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: withSuspense(<PostCategoryParentPage />, <CLoadingPage />),
          },

          {
            path: "child-category/:slugChildCategory",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: withSuspense(<PostCategoryPage />, <CLoadingPage />),
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
