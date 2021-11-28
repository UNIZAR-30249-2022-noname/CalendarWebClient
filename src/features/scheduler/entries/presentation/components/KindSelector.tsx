import { Form, Radio } from "antd";
import { SubjectKind } from "../../domain/models/Entry";

type Props = {
  check: Function;
};

export const KindSelector = ({ check }: Props) => {
  return (
    <Form.Item
      label="Tipo"
      name="kind"
      required
      rules={[
        {
          required: true,
          message: "Elige un tipo!",
        },
      ]}
    >
      <Radio.Group buttonStyle="solid" onChange={(e) => check(e.target.value)}>
        <Radio.Button value={SubjectKind.theory}>Teoría</Radio.Button>
        <Radio.Button value={SubjectKind.practices}>Práctica</Radio.Button>
        <Radio.Button value={SubjectKind.problems}>Problemas</Radio.Button>
      </Radio.Group>
    </Form.Item>
  );
};
