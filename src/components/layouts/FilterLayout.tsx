
import React from 'react';
interface IProps {
  children: React.ReactNode;
}
const FilterLayout: React.FC<IProps> = ({ children }) => {
  return (
    <div
      className={`grid gap-6 w-full pb-6 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] ${((children as Array<unknown>)?.length || 1) < 3 ? 'grid-cols-[repeat(auto-fit,minmax(200px,350px))]' : ''}`}
    >
      {children}
    </div>
  );
};

export default FilterLayout;
