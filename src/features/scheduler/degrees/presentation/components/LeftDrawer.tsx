import { Badge, Button, Space } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import { FC } from "react";
import { SubjectAvailableHours } from "../../domain/models/SubjectAvailableHours";
import { degreeAvailableHoursService } from "../../domain/services/AvailableHours.service";

type Props = {
  degreeInfo: { name: string; subjects: SubjectAvailableHours[] };
  setDraggedEvent: Function;
};

export const LeftDrawer = ({ degreeInfo, setDraggedEvent }: Props) => {
  const subjectList = degreeInfo.subjects.map((subject, i) => (
    // FIXME: add event to Scheduler state
    <div
      draggable
      key={i}
      onDragStart={() =>
        setDraggedEvent({
          title: subject.subject,
          kind: subject.kind,
        })
      }
    >
      <Badge key={i} showZero count={subject.hours.remaining}>
        <Button
          block
          type="primary"
          style={{
            height: "auto",
            backgroundColor: degreeAvailableHoursService.getSubjectColor(
              subject.kind
            ),
            maxHeight: 150,
          }}
        >
          <Text style={{ whiteSpace: "normal" }}>{subject.subject}</Text>
        </Button>
      </Badge>
    </div>
  ));

  return (
    <Space
      direction="vertical"
      style={{
        height: "100%",
        backgroundColor: "#E6E7EA",
        width: "100%",
        padding: 15,
      }}
    >
      <Title level={4}>{degreeInfo.name}</Title>
      {subjectList}
    </Space>
  );
};
