import { Button } from "antd";

interface CButtonActionIconProps {
  icon: string;
  href?: string;
  onClick?: () => void;
  color?: string;
}
function CButtonActionIcon({
  icon,
  href,
  onClick,
  color,
}: CButtonActionIconProps) {
  return (
    <Button
      type="link"
      size="small"
      shape="circle"
      icon={
        <i
          className={`${icon}  text-${color || "white"}
        text-xl`}
        ></i>
      }
      onClick={onClick}
      href={href}
    />
  );
}

export default CButtonActionIcon;
