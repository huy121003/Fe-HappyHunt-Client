import { createBrowserRouter, Outlet } from "react-router-dom";
import { ReactNode, Suspense, lazy } from "react";
import { CLoadingPage, CNotFoundPage } from "@/components";
import AppLayout from "@/components/layouts/AppLayout/AppLayout";
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
const CreatPostPage = lazy(
  () => import("@/pages/private/create-post/CreateNewPost")
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
        element: withSuspense(<CreatPostPage />, <CLoadingPage />),
      },
      {
        path: "post-management",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: withSuspense(
              <div>Post ActiveActive</div>,
              <CLoadingPage />
            ),
          },
          {
            path: "active",
            element: withSuspense(<div>Post Active</div>, <CLoadingPage />),
          },
          {
            path: "expired",
            element: withSuspense(<div>Post Expired</div>, <CLoadingPage />),
          },
          {
            path: "pending",
            element: withSuspense(<div>Post Pending</div>, <CLoadingPage />),
          },
          {
            path: "reject",
            element: withSuspense(<div>Post Reject</div>, <CLoadingPage />),
          },
          {
            path: "hidden",
            element: withSuspense(<div>Post Hidden</div>, <CLoadingPage />),
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
