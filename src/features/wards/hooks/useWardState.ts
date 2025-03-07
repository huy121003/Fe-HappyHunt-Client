import { postMessageHandler } from '@/components/ToastMessage';
import { ICommonResponse } from '@/interfaces';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_KEY } from '../data/constant';

const useWardState = () => {
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
    client.invalidateQueries({ queryKey: [API_KEY.WARD] });
    client.invalidateQueries({ queryKey: [API_KEY.WARD_DETAIL] });
    navigate('/addresses/wards');
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
export default useWardState;
