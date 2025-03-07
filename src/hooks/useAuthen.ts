import { useAppSelector } from "@/redux/reduxHook";

export const useAuthen = () => {
  const isAuthen = useAppSelector((state) => state.auth.isAuthenticated);
  return isAuthen ? true : false;
};
