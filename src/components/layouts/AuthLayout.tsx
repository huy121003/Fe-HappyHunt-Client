import { Carousel, Flex, Image } from 'antd';
import CLogo from '../CLogo';
interface AuthLayoutProps {
  children: React.ReactNode;
}
function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Flex
      justify="center"
      align="center"
      className="h-screen w-screen bg-gray-100 flex-wrap md:flex-nowrap overflow-hidden"
    >
      <div className="hidden lg:block w-1/2 ">
        <Carousel autoplay>
          {[
            '/image1.png',
            '/image2.png',
            '/image3.png',
            '/image4.png',
            '/image5.png',
            // '/image6.png',
            '/image7.png',
          ].map((src, index) => (
            <div key={index} className="rounded-lg overflow-hidden">
              <Image src={src} preview={false} className="w-full rounded-lg " />
            </div>
          ))}
        </Carousel>
      </div>
      <Flex vertical className="w-full lg:w-1/3 p-4">
        <CLogo />
        {children}
      </Flex>
    </Flex>
  );
}

export default AuthLayout;
