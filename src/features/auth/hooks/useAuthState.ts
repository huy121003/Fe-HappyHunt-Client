import { postMessageHandler } from '@/components/ToastMessage';
import { AxiosError } from 'axios';
import { ICommonResponse } from '@/interfaces';

const useAuthState = () => {
  const onSuccess = (
    successMessage: string,
    onSuccessCallback?: () => void
  ) => {
    postMessageHandler({
      type: 'success',
      text: successMessage,
    });

    if (onSuccessCallback) {
      onSuccessCallback();
    }
  };
  const onError = (error: AxiosError<ICommonResponse<null>>) => {
    postMessageHandler({
      type: 'error',
      text: error.message,
    });
  };
  return { onSuccess, onError };
};
export default useAuthState;
