import { createBrowserRouter, Outlet } from "react-router-dom";
import { ReactNode, Suspense, lazy } from "react";
import { CLoadingPage, CNotFoundPage } from "@/components";
import AppLayout from "@/components/layouts/AppLayout/AppLayout";
import { PostFilterProvider } from "@/features/posts/components/ui/PostFilterProvider ";

import PostManagementLayout from "@/features/posts/layout/PostManagementLayout";
import RedirectPage from "@/pages/private/redirect/RedirectPage";
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
        path: "profile/:slugProfile",
        element: <Outlet />,
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
        element: withSuspense(<div>Change Password</div>, <CLoadingPage />),
      },
      {
        path: "change-profile",
        element: withSuspense(<div>Change Profile</div>, <CLoadingPage />),
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
            element: withSuspense(<div>Category</div>, <CLoadingPage />),
          },
          {
            path: "post/:slugPost",
            element: withSuspense(<div>Post Detail</div>, <CLoadingPage />),
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
              {
                path: "post/:slugPost",
                element: withSuspense(<div>Post Detail</div>, <CLoadingPage />),
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
