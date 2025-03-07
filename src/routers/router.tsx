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
    ],
  },
]);
export default router;
