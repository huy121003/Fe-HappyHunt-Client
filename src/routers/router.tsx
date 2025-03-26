import { createBrowserRouter, Outlet } from "react-router-dom";
import { ReactNode, Suspense, lazy } from "react";
import { CLoadingPage, CNotFoundPage } from "@/components";
import AppLayout from "@/components/layouts/AppLayout/AppLayout";
import { PostFilterProvider } from "@/features/posts/components/ui/PostFilterProvider ";
import { PostFilterProvider as PostCategoryParentFilterProvider } from "@/features/post-category-parent/components/PostFilterProvider";
import PostManagementLayout from "@/features/posts/layout/PostManagementLayout";
import RedirectPage from "@/pages/private/redirect/RedirectPage";
import AppCategoryLayout from "@/features/post-category-parent/layout/AppCategoryLayout";
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
const PaymentPage = lazy(() => import("@/pages/private/payment/PaymentPage"));
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
    element: <Outlet />,
    children: [
      {
        index: true,
        element: withSuspense(
          <AppLayout>
            <HomePage />
          </AppLayout>,
          <CLoadingPage />
        ),
      },
      {
        path: "payment",
        element: (
          <AppLayout>
            <Outlet />
          </AppLayout>
        ),
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
        path: "profile/:slugProfile",
        element: (
          <AppLayout>
            <Outlet />
          </AppLayout>
        ),
        children: [
          {
            index: true,
            element: withSuspense(<div>Active Post</div>, <CLoadingPage />),
          },
          {
            path: "selling-post",
            element: withSuspense(<div>Active Post</div>, <CLoadingPage />),
          },
          {
            path: "sold-post",
            element: withSuspense(<div>Sell Post</div>, <CLoadingPage />),
          },
        ],
      },
      {
        path: "change-password",
        element: withSuspense(
          <AppLayout>
            <div>Change Password</div>
          </AppLayout>,
          <CLoadingPage />
        ),
      },
      {
        path: "change-profile",
        element: withSuspense(
          <AppLayout>
            <div>Change Profile</div>
          </AppLayout>,
          <CLoadingPage />
        ),
      },
      {
        path: "create-post",
        element: withSuspense(
          <AppLayout>
            <PostCreatePage />
          </AppLayout>,
          <CLoadingPage />
        ),
      },
      {
        path: "update-post/:slugPost",
        element: withSuspense(
          <AppLayout>
            <PostUpdatePage />
          </AppLayout>,
          <CLoadingPage />
        ),
      },
      {
        path: "detail-post/:slugPost",
        element: withSuspense(
          <AppLayout>
            <PostDetailPage key={window.location.pathname} />
          </AppLayout>,
          <CLoadingPage />
        ),
      },
      {
        path: "redirect",
        element: withSuspense(
          <AppLayout>
            <RedirectPage />
          </AppLayout>,
          <CLoadingPage />
        ),
      },
      {
        path: "post-management",
        element: (
          <AppLayout>
            <PostFilterProvider>
              <PostManagementLayout>
                <Outlet />
              </PostManagementLayout>
            </PostFilterProvider>
          </AppLayout>
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
        element: (
          <AppLayout>
            <Outlet />
          </AppLayout>
        ),
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
        element: (
          <AppLayout>
            <Outlet />
          </AppLayout>
        ),
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
            element: withSuspense(
              <PostCategoryParentFilterProvider>
                <AppCategoryLayout>
                  <PostCategoryParentPage />
                </AppCategoryLayout>
              </PostCategoryParentFilterProvider>,
              <CLoadingPage />
            ),
          },

          {
            path: "child-category/:slugChildCategory",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: withSuspense(
                  <div>Child Category</div>,
                  <CLoadingPage />
                ),
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
