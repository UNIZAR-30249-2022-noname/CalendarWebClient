import Badge from "antd/lib/badge";
import Button from "antd/lib/button";
import Row from "antd/lib/grid/row";
import Tag from "antd/lib/tag";
import Text from "antd/lib/typography/Text";
import { SubjectKind } from "../../../entries/domain/models/Entry";
import { SubjectAvailableHours } from "../../domain/models/SubjectAvailableHours";
import { degreeAvailableHoursService } from "../../domain/services/AvailableHours.service";

type Props = {
  setDraggedEvent: Function;
  subjectB: SubjectAvailableHours;
  key: number;
};

export const SubjectBadget = ({ setDraggedEvent, subjectB, key }: Props) => {
  const { subject, kind, hours } = subjectB;
  return (
    <div
      draggable
      key={key}
      onDragStart={() =>
        setDraggedEvent({
          title: subject,
          kind,
        })
      }
    >
      <Badge showZero count={hours.remaining}>
        <Button
          type="primary"
          style={{
            height: "auto",
            backgroundColor: degreeAvailableHoursService.getSubjectColor(kind),
            padding: 5,
            width: 190,
            maxHeight: 150,
          }}
        >
          <Text style={{ whiteSpace: "normal" }}>{subject}</Text>
          <br />
          <Row justify="end">{getSubjectTag(kind)}</Row>
        </Button>
      </Badge>
    </div>
  );
};

const getSubjectTag = (kind: SubjectKind) => {
  switch (kind) {
    case SubjectKind.theory:
      return <Tag color="blue">Teo.</Tag>;
    case SubjectKind.practices:
      return <Tag color="magenta">Prac.</Tag>;
    case SubjectKind.problems:
      return <Tag color="green">Prob.</Tag>;
  }
};
