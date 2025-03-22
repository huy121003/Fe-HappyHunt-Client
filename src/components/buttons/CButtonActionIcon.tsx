import { Button, Tooltip } from "antd";

interface CButtonActionIconProps {
  icon: string;
  href?: string;
  onClick?: () => void;
  color?: string;
  title?: string;
}
function CButtonActionIcon({
  icon,
  href,
  onClick,
  color,
  title,
}: CButtonActionIconProps) {
  return (
    <Tooltip title={title || "a"}>
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
    </Tooltip>
  );
}

export default CButtonActionIcon;
