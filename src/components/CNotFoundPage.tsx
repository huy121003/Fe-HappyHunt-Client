import { Button, Empty, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';

function CNotFoundPage() {
  const navigate = useNavigate();
  return (
    <Flex
      vertical
      justify="center"
      align="center"
      className="h-[calc(100vh-64px)]"
    >
      <Empty
        description={
          <div>
            <span className="lg:text-2xl text-xl ">
              This page that you are looking for does not exist !!!
            </span>
          </div>
        }
      />
      <Button type="default" className="mt-4" onClick={() => navigate('/')}>
        Back Home
      </Button>
    </Flex>
  );
}

export default CNotFoundPage;
