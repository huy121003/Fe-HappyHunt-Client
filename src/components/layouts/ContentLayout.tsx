import React from "react";

interface IProps {
  children: React.ReactNode;
  title?: string | React.ReactNode;
  mb?: number;
}

const ContentLayout: React.FC<IProps> = ({ children, title }) => {
  return (
    <div className="w-screen   flex justify-center items-center overflow-y-auto">
      <div
        className={`container mx-auto px-0 justify-center items-center
    w-screen  lg:w-[calc(100vw-100px)]
    xl:w-[calc(100vw-140px)] 2xl:w-[calc(100vw-180)] 

    `}
      >
        <div className="flex-1 flex flex-col h-[calc(100vh/10)] justify-center items-start">
          {title && title}
        </div>
        <div
          className={` flex-1 flex flex-col gap-2 justify-center items-center w-full`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
export default ContentLayout;
