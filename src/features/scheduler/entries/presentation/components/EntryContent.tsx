import { Space, Tag } from "antd";
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
          <Text style={{ color: "#046ccc", fontWeight: "bold" }}>[T]</Text>
          <Space direction="vertical" size={2}>
            <Tag
              style={{
                fontSize: 14,
                whiteSpace: "break-spaces",
              }}
            >
              {event.title}
              {"\n"}(Aula {event.room})
            </Tag>
          </Space>
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
        <Space direction="vertical" size={2}>
          <Tag
            color={color}
            style={{ fontSize: 14, whiteSpace: "break-spaces" }}
          >
            {event.title}
            {"\n"}(Aula {event.room})
          </Tag>
        </Space>
      );
    case SubjectKind.problems:
      return (
        <Space direction="horizontal">
          <Text style={{ color: "purple", fontWeight: "bold" }}>[P]</Text>
          <Space direction="vertical" size={2}>
            <Tag
              style={{
                fontSize: 14,
                whiteSpace: "break-spaces",
                display: "inline-block",
              }}
            >
              {event.title}
              {"\n"}(Aula {event.room}) (Gr. {event.group})
            </Tag>
          </Space>
        </Space>
      );
  }
};
