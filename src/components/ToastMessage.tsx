import { Flex, notification } from 'antd';
import { useEffect } from 'react';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';

type TNotificationType = 'success' | 'warning' | 'error';

export type TMessage = {
  type: TNotificationType;
  text?: string;
  key?: string;
};

export type TMessageEvent = MessageEvent<{
  source: string;
  payload: TMessage;
}>;

export const MSG_SOURCE = 'toast-message';

export function postMessageHandler(params: TMessage) {
  const message = {
    source: MSG_SOURCE,
    payload: params,
  };

  window.postMessage(message, window.origin);
}

function ToastMessage() {
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const handleMessage = (event: TMessageEvent) => {
      const { data } = event;
      if (event.origin === window.origin && data.source === MSG_SOURCE) {
        api[data.payload.type]({
          duration: 3,
          style: { width: 'auto', maxWidth: 'none' },
          message: (
            <Flex align="center" gap={10}>
              <Title
                level={5}
                type={
                  data.payload.type === 'error' ? 'danger' : data.payload.type
                }
                style={{ margin: 0 }}
                className="m-0 break-keep"
              >
                {data.payload.type.toUpperCase()}!
              </Title>
              <Text className="break-keep" style={{ whiteSpace: 'nowrap' }}>
                {data.payload.text || ''}
              </Text>
            </Flex>
          ),
        });
      }
    };
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [api]);

  return <div>{contextHolder}</div>;
}

export default ToastMessage;
