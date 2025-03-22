import CButtonActionIcon from "@/components/buttons/CButtonActionIcon";
import { Tooltip } from "antd";
function ButtonGitHub() {
  return (
    <Tooltip title="GitHub">
      <CButtonActionIcon
        icon="fa-brands fa-github"
        href="https://github.com/huy121003"
      />
    </Tooltip>
  );
}

export default ButtonGitHub;
