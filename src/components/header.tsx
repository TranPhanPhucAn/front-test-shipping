"use client";
import React, { useState } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import Link from "next/link";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: <Link href={"/"}>Home Page</Link>,
    key: "homepage",
    icon: <UserOutlined />,
  },
  {
    label: <Link href={"/users"}>Manage Users</Link>,
    key: "users",
    icon: <UserOutlined />,
  },
  {
    label: <Link href={"/routes"}>Manage Routes</Link>,
    key: "routes",
    icon: <AppstoreOutlined />,
    // disabled: true,
  },
];

const Header: React.FC = () => {
  const [current, setCurrent] = useState("homepage");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
