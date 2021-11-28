import { Row, Space } from "antd";
import Text from "antd/lib/typography/Text";
import { SubjectKind, Week } from "../../domain/models/Entry";

type Props = {
  event: any;
};

export const EntryContent = ({ event }: Props) => {
  switch (event.kind as SubjectKind) {
    case SubjectKind.theory:
      return (
        <Space direction="horizontal">
          <Text style={{ color: "green", fontWeight: "bold" }}>[T]</Text>
          <div>
            <Text>{event.title} </Text>
            <Text>(Aula {event.room})</Text>
          </div>
        </Space>
      );
    case SubjectKind.practices:
      let color = "green";
      switch (event.week as Week) {
        case Week.A:
          color = "blue";
          break;
        case Week.B:
          color = "red";
          break;
      }
      return (
        <div>
          <Text style={{ color: color }}>{event.title} </Text>
          <Text style={{ color: color }}>(Aula {event.room})</Text>
        </div>
      );
    case SubjectKind.problems:
      return (
        <Space direction="horizontal">
          <Text style={{ color: "purple", fontWeight: "bold" }}>[P]</Text>
          <div>
            <Text>{event.title} </Text>
            <Text>(Aula {event.room})</Text>
          </div>
        </Space>
      );
  }
};
