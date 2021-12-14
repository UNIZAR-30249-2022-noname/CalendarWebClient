import { Form, Input } from "antd";

export const Description = () => {
  return (
    <Form.Item
      label="Descripción"
      name="desc"
      rules={[
        {
          pattern: /^[A-Za-z0-9 ]*$/i,
          message: "Evita caracteres extraños",
        },
      ]}
    >
      <Input allowClear placeholder="Descripción adicional..." maxLength={30} />
    </Form.Item>
  );
};
