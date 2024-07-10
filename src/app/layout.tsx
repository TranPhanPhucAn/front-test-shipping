import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/header";
import { AntdRegistry } from "../lib/antd.registry";
// import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Col, Divider, Row } from "antd";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shipping Route App",
  description: "Shipping Route Management web application",
};

interface ContainerProps {
  children: React.ReactNode;
}
const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <Row justify="center" className="container">
      <Col xs={24} sm={22} md={20} lg={18} xl={16} xxl={14}>
        {children}
      </Col>
    </Row>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <Container>
            <Header />
            {children}
          </Container>
        </AntdRegistry>
      </body>
    </html>
  );
}
