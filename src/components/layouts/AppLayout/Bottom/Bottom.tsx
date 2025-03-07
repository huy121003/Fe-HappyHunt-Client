import { Row, Col, Typography, Divider, Flex } from "antd";
import ButtonGitHub from "../../../buttons/ButtonGitHub";
import ButtonFb from "../../../buttons/ButtonFb";
import ButtionLinkedIn from "../../../buttons/ButtionLinkedIn";

const { Text } = Typography;

function Bottom() {
  return (
    <div className="bg-black w-full py-4 px-8">
      <Row justify="space-between" align="middle">
        {/* Contact */}
        <Col span={6} className="text-center">
          <Text className="text-white font-bold">Contact</Text>
        </Col>

        {/* Help & Support */}
        <Col span={6} className="text-center">
          <Text className="text-white font-bold">Help & Support</Text>
        </Col>

        {/* Privacy Policy */}
        <Col span={6} className="text-center">
          <Text className="text-white font-bold">Privacy Policy</Text>
        </Col>

        {/* Social Media */}
        <Col span={6} className="text-center">
          <Text className="text-white font-bold">Social Media</Text>
          <Row justify="center" gutter={[8, 8]}>
            <Col>
              <ButtionLinkedIn />
            </Col>
            <Col>
              <ButtonGitHub />
            </Col>
            <Col>
              <ButtonFb />
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider className="border-white" />
      <Flex justify="center">
        <Typography.Text className="text-white text-center">
          © 2025 All rights reserved. Designed by Quang Huy.
        </Typography.Text>
      </Flex>
    </div>
  );
}

export default Bottom;
