import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 1000, // 5 phút
      retry: 0, // Thử lại 3 lần nếu lỗi
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
      refetchOnWindowFocus: true, // Không refetch khi chuyển tab
      refetchOnReconnect: true, // Refetch khi kết nối mạng lại
    },
    mutations: {
      retry: 0, // Thử lại 2 lần khi gọi API bị lỗi
    },
  },
});

export default queryClient;
