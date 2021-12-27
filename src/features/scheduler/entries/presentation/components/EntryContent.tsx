import { Row, Space, Tag } from "antd";
import Text from "antd/lib/typography/Text";
import dateFormat from "dateformat";
import React from "react";
import { SubjectKind, Week } from "../../domain/models/Entry";

type Props = {
  event: any;
  removeEvent: Function;
};

const EntryContent = ({ event, removeEvent }: Props) => {
  const ButtonDelete = () => {
    return (
      <button
        id="delete-entry-button"
        onClick={function (e) {
          e.stopPropagation();
          removeEvent(event);
        }}
        style={{ cursor: "pointer" }}
      >
        x
      </button>
    );
  };

  switch (event.kind as SubjectKind) {
    case SubjectKind.theory:
      return (
        <div>
          <span>
            {dateFormat(event.start, "H:MM") +
              " - " +
              dateFormat(event.end, "H:MM")}
          </span>
          <Row justify="space-between" align="middle" wrap={false}>
            <Text
              style={{ color: "#046ccc", fontWeight: "bold", paddingRight: 5 }}
            >
              [T]{" "}
            </Text>
            <Tag
              style={{
                fontSize: 14,
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
              }}
            >
              {event.title}
              {event.desc && ` - ${event.desc}`} (Aula {event.room})
            </Tag>
            {ButtonDelete()}
          </Row>
        </div>
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
          <span>
            {dateFormat(event.start, "H:MM") +
              " - " +
              dateFormat(event.end, "H:MM")}
          </span>
          <Row justify="space-between" align="middle" wrap={false}>
            <Tag
              color={color}
              style={{
                fontSize: 14,
                whiteSpace: "break-spaces",
                wordBreak: "break-all",
              }}
            >
              {event.title}
              {event.desc && ` - ${event.desc}`} (Aula {event.room})
            </Tag>
            {ButtonDelete()}
          </Row>
        </div>
      );
    case SubjectKind.problems:
      return (
        <div>
          <span>
            {dateFormat(event.start, "H:MM") +
              " - " +
              dateFormat(event.end, "H:MM")}
          </span>
          <Row justify="space-between" align="middle" wrap={false}>
            <Text
              style={{ color: "purple", fontWeight: "bold", paddingRight: 5 }}
            >
              [P]
            </Text>
            <Tag
              style={{
                fontSize: 14,
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
              }}
            >
              {event.title}
              {event.desc && ` - ${event.desc}`} (Aula {event.room}) (Gr.{" "}
              {event.group})
            </Tag>
            {ButtonDelete()}
          </Row>
        </div>
      );
    case SubjectKind.seminar:
      // Seminar hours
      return (
        <div>
          <Text style={{ fontSize: 5 }}>
            {dateFormat(event.start, "H:MM") +
              " - " +
              dateFormat(event.end, "H:MM")}
          </Text>
          <Row justify="space-between" align="middle" wrap={false}>
            <Text style={{ color: "white" }}>Seminario</Text>
            {ButtonDelete()}
          </Row>
        </div>
      );
  }
};

export default EntryContent;
