import { Modal, Form, Button, Row, Col } from "antd";
import Title from "antd/lib/typography/Title";
import React, { CSSProperties, useContext } from "react";
import { useEffect, useState } from "react";
import { SubjectKind, substractTime, Time } from "../../domain/models/Entry";
import { EntryScheduler } from "../../domain/models/EntryScheduler";
import Text from "antd/lib/typography/Text";
import { entryForm } from "../../domain/services/EntryForm.service";
import { Description } from "./Description";
import { KindSelector } from "./KindSelector";
import { ProblemsGroupSelector } from "./ProblemsGroupSelector";
import { RoomSelector } from "./RoomSelector";
import { SubjectSelector } from "./SubjectSelector";
import { TimeSelector } from "./TimeSelector";
import { WeekSelector } from "./WeekSelector";
import { DegreeSubjectsContext } from "../../../../../core/context/context";
import moment from "moment";

type Props = {
  event?: EntryScheduler;
  visible: boolean;
  onCancel: (e: unknown) => void;
  onOk: (e: EntryScheduler, edit: boolean) => void;
  edit: boolean;
};

const PopupAddEntry = ({ event, visible, onCancel, onOk, edit }: Props) => {
  const [problemSelectorDisabled, setProblemSelectorDisabled] = useState(true);
  const [weekSelectorDisabled, setWeekSelectorDisabled] = useState(true);
  const [hour, setHour] = useState("");
  const [form] = Form.useForm();
  const contextSubjects = useContext(DegreeSubjectsContext);

  useEffect(() => {
    if (!event) return;
    form.setFieldsValue(entryForm.loadData(event));
    checkProblemSelector(event.events[0]?.kind);
  }, [visible]);

  /**
   * Check if [kind] is of type 'theory' to disable problem group selector
   */
  const checkProblemSelector = (kind: SubjectKind) => {
    setProblemSelectorDisabled(entryForm.checkIfProblemsDisabled(kind));
    setWeekSelectorDisabled(entryForm.checkIfNotPractices(kind));
  };

  /**
   * Create a new entry when form is valid
   */
  const onCorrectForm = () => {
   
    const values = form.getFieldsValue();
    
    const start:Time={
      hour: values.time[0].hours(),
      min: values.time[0].minutes(),
    }
    const end:Time={
      hour: values.time[1].hours(),
      min: values.time[1].minutes(),
    }
    const time:Time = substractTime(start,end)
    
    contextSubjects.actions.updateSubject(values.subject,time,values.kind)
    entryForm.createEntry(event!, values, onOk, edit);
    form.resetFields();;
  };

  const onCreateSeminar = () => {
    const values = form.getFieldsValue();
    values.kind = SubjectKind.seminar;
    entryForm.createEntry(event!, values, onOk, edit);
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
            <WeekSelector disabled={weekSelectorDisabled} />
          </Col>
          <Col flex={1}>
            <RoomSelector hour={hour} />
          </Col>
        </Row>
        <TimeSelector setHour={setHour} />
        <Text>Hour: {hour}</Text>
        <KindSelector check={checkProblemSelector} />
        <ProblemsGroupSelector disabled={problemSelectorDisabled} />
        <Description />
        {edit ? (
          <Form.Item>
            <Row justify="end">
              <Button type="primary" htmlType="submit" size="large">
                Editar
              </Button>
            </Row>
          </Form.Item>
        ) : (
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
        )}
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
