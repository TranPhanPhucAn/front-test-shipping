import { handleCreateUserAction, handleUpdateUserAction } from "@//actions";
import { Modal, Input, Form, Row, Col, message } from "antd";
import { IUser } from "../../types/backend";
import { useEffect } from "react";
interface IProps {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (v: boolean) => void;
  data?: IUser;
  action: string;
}

const CreateUser = (props: IProps) => {
  const { isCreateModalOpen, setIsCreateModalOpen, data, action } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      name: data ? data.name : "",
      email: data ? data.email : "",
    });
  }, [data, form]);
  const handleCloseCreateModal = () => {
    form.resetFields();
    setIsCreateModalOpen(false);
  };
  const onFinish = async (values: any) => {
    // console.log("Success: ", values);
    let res: any;
    if (action === "CREATE") {
      res = await handleCreateUserAction(values);
    } else {
      res = await handleUpdateUserAction({ id: data?.id, ...values });
    }
    console.log("check res:", res);
    if (res?.id) {
      handleCloseCreateModal();
      if (action === "CREATE") {
        message.success("Create succeed!");
      } else {
        message.success("Update succeed!");
      }
    }
  };
  return (
    <Modal
      title={action === "CREATE" ? "Add new user" : "Update user"}
      open={isCreateModalOpen}
      onOk={() => form.submit()}
      onCancel={() => handleCloseCreateModal()}
      maskClosable={false}
    >
      <Form name="basic" onFinish={onFinish} layout="vertical" form={form}>
        <Row gutter={[15, 15]}>
          <Col span={24} md={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input value={data ? data.name : ""} />
            </Form.Item>
          </Col>
          <Col span={24} md={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input type="email" value={data ? data.email : ""} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export default CreateUser;
