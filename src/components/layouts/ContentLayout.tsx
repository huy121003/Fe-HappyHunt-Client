import React from "react";

interface IProps {
  children: React.ReactNode;
  title?: string | React.ReactNode;
  mb?: number;
}

const ContentLayout: React.FC<IProps> = ({ children, title }) => {
  return (
    <div className="w-screen  flex justify-center items-center overflow-y-auto">
      <div
        className={`container mx-auto px-0 justify-center items-center
    w-screen  lg:w-[calc(100vw-160px)]
    xl:w-[calc(100vw-200px)] 2xl:w-[calc(100vw-240px)] 
    bg-gray-100 
    `}
      >
        <>{title && title}</>
        <div
          className={` flex-1 flex flex-col gap-2 justify-center items-center`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
export default ContentLayout;
