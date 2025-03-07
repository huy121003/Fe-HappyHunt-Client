import { Flex, Spin } from 'antd';

function CLoadingPage() {
  return (
    <Flex justify="center" align="center" style={{ height: '100vh' }}>
      <Spin
        size="large"
        style={{
          fontSize: 24,
          color: '#dd4904',
        }}
      />
    </Flex>
  );
}

export default CLoadingPage;
