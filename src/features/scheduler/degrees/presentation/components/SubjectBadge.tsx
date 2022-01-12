import { Space } from "antd";
import Badge from "antd/lib/badge";
import Button from "antd/lib/button";
import Row from "antd/lib/grid/row";
import Tag from "antd/lib/tag";
import Text from "antd/lib/typography/Text";
import { SubjectKind } from "../../../entries/domain/models/Entry";
import { SubjectAvailableHours } from "../../domain/models/SubjectAvailableHours";

type Props = {
  setDraggedEvent: Function;
  subjectB: SubjectAvailableHours;
};

export const SubjectBadget = ({ setDraggedEvent, subjectB }: Props) => {
  const { subject, hours } = subjectB;
  return (
    <Button
      type="primary"
      style={{
        height: "auto",
        backgroundColor: "#f9f9f9",
        padding: 5,
        width: 190,
        maxHeight: 150,
      }}
    >
      <Text style={{ whiteSpace: "normal" }}>{subject}</Text>
      <br />
      <Row justify="space-between">
        <div
          draggable
          onDragStart={() =>
            setDraggedEvent({
              title: subject,
              kind: SubjectKind.theory,
            })
          }
        >
          <Tag color="blue" style={{ paddingBottom: 5 }}>
            <Space direction="vertical" size={1}>
              <Text>Teo.</Text>
              <Badge count={hours.remaining} />
            </Space>
          </Tag>
        </div>
        <div
          draggable
          onDragStart={() =>
            setDraggedEvent({
              title: subject,
              kind: SubjectKind.practices,
            })
          }
        >
          <Tag color="magenta" style={{ paddingBottom: 5 }}>
            <Space direction="vertical" size={1}>
              <Text>Prac.</Text>
              <Badge count={hours.remaining} />
            </Space>
          </Tag>
        </div>
        <div
          draggable
          onDragStart={() =>
            setDraggedEvent({
              title: subject,
              kind: SubjectKind.problems,
            })
          }
        >
          <Tag color="green" style={{ paddingBottom: 5 }}>
            <Space direction="vertical" size={1}>
              <Text>Prob.</Text>
              <Badge count={hours.remaining} />
            </Space>
          </Tag>
        </div>
      </Row>
    </Button>
  );
};
