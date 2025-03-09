import { Row, Col, Typography, Divider, Flex } from "antd";
import ButtonGitHub from "../../../buttons/ButtonGitHub";
import ButtonFb from "../../../buttons/ButtonFb";
import ButtonLinkedIn from "../../../buttons/ButtonLinkedIn";

const { Text } = Typography;

function Bottom() {
  return (
    <div className="bg-black w-full py-4 px-8">
      <Row justify="space-between" gutter={[16, 16]}>
        {/* Contact */}
        <Col xs={24} sm={12} md={6} className="text-center">
          <Text className="text-white font-bold">Contact</Text>
          <Text className="text-white block mt-4">
            Email: quanghuy2003.hh@gmail.com
          </Text>
          <Text className="text-white block mt-2">Phone: 0398601186</Text>
        </Col>

        {/* Help & Support */}
        <Col xs={24} sm={12} md={6} className="text-center">
          <Text className="text-white font-bold">Help & Support</Text>
          <Text className="text-white block mt-4">FAQ</Text>
          <Text className="text-white block mt-2">Support</Text>
        </Col>

        {/* Privacy Policy */}
        <Col xs={24} sm={12} md={6} className="text-center">
          <Text className="text-white font-bold">Privacy Policy</Text>
          <Text className="text-white block mt-4">Terms & Conditions</Text>
          <Text className="text-white block mt-2">Privacy Policy</Text>
        </Col>

        {/* Social Media */}
        <Col xs={24} sm={12} md={6} className="text-center">
          <Text className="text-white font-bold">Social Media</Text>
          <Row justify="center" gutter={[8, 8]} className="mt-4">
            <Col>
              <ButtonLinkedIn />
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

      <Divider className="bg-white opacity-30 my-4" />

      <Flex justify="center">
        <Text className="text-white text-center">
          © 2025 All rights reserved. Designed by Quang Huy.
        </Text>
      </Flex>
    </div>
  );
}

export default Bottom;
