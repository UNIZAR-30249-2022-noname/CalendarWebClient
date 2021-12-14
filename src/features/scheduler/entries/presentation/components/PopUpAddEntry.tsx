import { Modal, Form, Button, Row, Col } from "antd";
import Title from "antd/lib/typography/Title";
import { values } from "cypress/types/lodash";
import React, { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { SubjectKind } from "../../domain/models/Entry";
import { entryForm } from "../../domain/services/EntryForm.service";
import { KindSelector } from "./KindSelector";
import { ProblemsGroupSelector } from "./ProblemsGroupSelector";
import { RoomSelector } from "./RoomSelector";
import { SubjectSelector } from "./SubjectSelector";
import { TimeSelector } from "./TimeSelector";
import { WeekSelector } from "./WeekSelector";

type Props = {
  event: any;
  visible: boolean;
  onCancel: (e: unknown) => void;
  onOk: (e: unknown) => void;
};

const PopupAddEntry = ({ event, visible, onCancel, onOk }: Props) => {
  const [problemSelectorDisabled, setProblemSelectorDisabled] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(entryForm.loadData(event));
    checkProblemSelector(event.kind);
  }, [visible]);

  /**
   * Check if [kind] is of type 'theory' to disable problem group selector
   */
  const checkProblemSelector = (kind: SubjectKind) => {
    setProblemSelectorDisabled(entryForm.checkIfProblemsDisabled(kind));
  };

  /**
   * Create a new entry when form is valid
   */
  const onCorrectForm = () => {
    const values = form.getFieldsValue();
    entryForm.createEntry(event, values, onOk);
    form.resetFields();
  };

  const onCreateSeminar = () => {
    const values = form.getFieldsValue();
    values.kind = SubjectKind.seminar;
    entryForm.createEntry(event, values, onOk);
    form.resetFields();
  };

  return (
    <Modal
      visible={visible}
      onCancel={(e) => {
        onCancel(e);
        form.resetFields();
      }}
    >
      <Form
        form={form}
        name="Nueva entrada"
        scrollToFirstError
        onFinish={onCorrectForm}
      >
        <SubjectSelector />
        <Row gutter={20}>
          <Col flex="auto">
            <WeekSelector />
          </Col>
          <Col flex={1}>
            <RoomSelector />
          </Col>
        </Row>
        <TimeSelector />
        <KindSelector check={checkProblemSelector} />
        <ProblemsGroupSelector disabled={problemSelectorDisabled} />
        <Form.Item>
          <Row justify="space-between">
            <Button
              type="link"
              onClick={onCreateSeminar}
              size="large"
              style={{ padding: 0 }}
            >
              Crear seminario
            </Button>
            <Button type="primary" htmlType="submit" size="large">
              Crear
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
};

/** - Modal props - **/

Modal.defaultProps = {
  title: <Title level={3}>Crear entrada</Title>,
  footer: null,
  style: {
    top: 10,
    left: 10,
    position: "absolute",
    minWidth: 275,
  } as CSSProperties,
  width: "23%",
  maskStyle: { backgroundColor: "#E3E3F377" } as CSSProperties,
  destroyOnClose: true,
};

export default React.memo(PopupAddEntry);
