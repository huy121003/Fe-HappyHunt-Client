import { postMessageHandler } from '@/components/ToastMessage';
import { ICommonResponse } from '@/interfaces';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_KEY } from '../data/constant';

const useUserState = () => {
  const client = useQueryClient();
  const navigate = useNavigate();
  const onSuccess = (
    successMessage: string,
    onSuccessCallback?: () => void
  ) => {
    postMessageHandler({
      type: 'success',
      text: successMessage,
    });
    client.invalidateQueries({ queryKey: [API_KEY.USER] });
    client.invalidateQueries({ queryKey: [API_KEY.USER_DETAIL] });
    navigate('/user_reports/users');
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
export default useUserState;
