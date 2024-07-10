"use client";
import { Button, Popconfirm, Table } from "antd";
import type { TableColumnsType } from "antd";
import { IUser } from "../../types/backend";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { PlusOutlined, DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { useEffect, useState } from "react";
import CreateUser from "./create.user";
import { handleDeleteUserAction } from "@//actions";
// import { useRouter } from "next/router";

interface IProps {
  users: IUser[] | [];
  meta: {
    current: number;
    pageSize: number;
    total: number;
  };
}
const UsersTable = (props: IProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState<IUser | undefined>();
  const [action, setAction] = useState("CREATE");
  const { users, meta } = props;
  useEffect(() => {
    if (users) setIsFetching(false);
  }, [users]);
  // const dataSource: IUser[] = [
  //   {
  //     id: 1,
  //     name: "Mike",
  //     email: "a@gmail.com",
  //   },
  //   {
  //     id: 2,
  //     name: "An",
  //     email: "b@gmail.com",
  //   },
  // ];
  // console.log("meta:", meta);
  const columns: TableColumnsType<IUser> = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Actions",
      align: "center",
      render: (text, record, index) => {
        return (
          <>
            <EditTwoTone
              twoToneColor="#f57800"
              style={{ cursor: "pointer", margin: "0 20px" }}
              onClick={() => {
                // setIsUpdateModalOpen(true);
                setIsCreateModalOpen(true);
                setAction("UPDATE");
                setDataUpdate(record);
              }}
            />
            <Popconfirm
              placement="leftTop"
              title={"Xác nhận xóa user"}
              onConfirm={() => handleDeleteUser(record)}
              okText="Xác nhận"
              cancelText="Hủy"
            >
              <span style={{ cursor: "pointer" }}>
                <DeleteTwoTone twoToneColor="#ff44f" />
              </span>
            </Popconfirm>
          </>
        );
      },
    },
  ];
  const handleDeleteUser = async (user: any) => {
    await handleDeleteUserAction(user.id);
  };
  const renderHeader = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Table Users List</span>
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => setIsCreateModalOpen(true)}
        >
          Thêm mới
        </Button>
      </div>
    );
  };
  const onChange = (pagination: any, filter: any, sorter: any, extra: any) => {
    if (pagination && pagination.current) {
      const params = new URLSearchParams(searchParams);
      params.set("page", pagination.current);
      replace(`${pathname}?${params.toString()}`);
      setIsFetching(true);
    }
  };
  return (
    <div>
      <Table
        title={renderHeader}
        loading={isFetching}
        rowKey={"id"}
        bordered
        dataSource={users}
        columns={columns}
        onChange={onChange}
        pagination={{
          ...meta,
          showTotal: (total, range) => {
            return (
              <div>
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
        }}
      />
      <CreateUser
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
        data={dataUpdate}
        action={action}
      />
    </div>
  );
};
export default UsersTable;
