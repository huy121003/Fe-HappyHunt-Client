import { Row, Col, Typography, Divider, Flex } from "antd";
import ButtonGitHub from "../../../buttons/ButtonGitHub";
import ButtonFb from "../../../buttons/ButtonFb";
import ButtonLinkedIn from "../../../buttons/ButtonLinkedIn";

const { Text, Link } = Typography;

function Footer() {
  return (
    <div className="bg-black w-full py-6 px-8">
      <Row justify="space-between" gutter={[16, 24]}>
        {/* Contact */}
        <Col xs={24} sm={12} md={6} className="text-center sm:text-left">
          <Text className="text-white font-bold text-lg">Contact</Text>
          <Link
            href="mailto:quanghuy2003.hh@gmail.com"
            className="text-white block mt-4 hover:text-blue-300"
          >
            Email: quanghuy2003.hh@gmail.com
          </Link>
          <Link
            href="tel:0398601186"
            className="text-white block mt-2 hover:text-blue-300"
          >
            Phone: 0398601186
          </Link>
        </Col>

        {/* Help & Support */}
        <Col xs={24} sm={12} md={6} className="text-center sm:text-left">
          <Text className="text-white font-bold text-lg">Help & Support</Text>
          <Link
            href="/faq"
            className="text-white block mt-4 hover:text-blue-300"
          >
            FAQ
          </Link>
          <Link
            href="/support"
            className="text-white block mt-2 hover:text-blue-300"
          >
            Support
          </Link>
        </Col>

        {/* Privacy Policy */}
        <Col xs={24} sm={12} md={6} className="text-center sm:text-left">
          <Text className="text-white font-bold text-lg">Legal</Text>
          <Link
            href="/terms"
            className="text-white block mt-4 hover:text-blue-300"
          >
            Terms & Conditions
          </Link>
          <Link
            href="/privacy"
            className="text-white block mt-2 hover:text-blue-300"
          >
            Privacy Policy
          </Link>
        </Col>

        {/* Social Media */}
        <Col xs={24} sm={12} md={6} className="text-center">
          <Text className="text-white font-bold text-lg">Social Media</Text>
          <Row justify="center" gutter={[16, 8]} className="mt-4">
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

      <Divider className="bg-white opacity-30 my-6" />

      <Flex justify="center">
        <Text className="text-white text-center">
          © {new Date().getFullYear()} All rights reserved. Designed by Quang
          Huy.
        </Text>
      </Flex>
    </div>
  );
}

export default Footer;
