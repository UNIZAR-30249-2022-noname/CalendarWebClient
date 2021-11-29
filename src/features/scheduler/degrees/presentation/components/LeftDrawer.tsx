import { Badge, Button, Space } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import { useContext } from "react";
import { DegreeSubjectsContext } from "../../../../../core/context/context";
import { degreeAvailableHoursService } from "../../domain/services/AvailableHours.service";
import { degreePropertiesService } from "../../domain/services/DegreeProperties.service";

type Props = {
  setDraggedEvent: Function;
};

const LeftDrawer = ({ setDraggedEvent }: Props) => {
  const context = useContext(DegreeSubjectsContext);
  const degreeName = degreePropertiesService.getSelectedDegree().titulacion;

  const subjectList = context.store.map((subject, i) => (
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
          type="primary"
          style={{
            height: "auto",
            backgroundColor: degreeAvailableHoursService.getSubjectColor(
              subject.kind
            ),
            width: 190,
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
      <Title level={4} ellipsis={{ rows: 2 }}>
        {degreeName ?? ""}
      </Title>
      {subjectList}
    </Space>
  );
};

export default LeftDrawer;
