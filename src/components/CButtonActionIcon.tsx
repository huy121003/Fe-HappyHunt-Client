import { Button } from "antd";

interface CButtonActionIconProps {
  icon: string;
  href?: string;
  onClick?: () => void;
}
function CButtonActionIcon({ icon, href, onClick }: CButtonActionIconProps) {
  return (
    <Button
      type="link"
      size="middle"
      shape="circle"
      icon={<i className={`${icon} text-white  text-3xl`}></i>}
      onClick={onClick}
      href={href}
    />
  );
}

export default CButtonActionIcon;
