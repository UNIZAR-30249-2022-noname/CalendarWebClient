import { Row, Space, Tag } from "antd";
import Text from "antd/lib/typography/Text";
import dateFormat from "dateformat";
import React, { useEffect } from "react";
import Entry, { SubjectKind, Time, Week } from "../../domain/models/Entry";
import { EntryScheduler } from "../../domain/models/EntryScheduler";

type Props = {
  entry: EntryScheduler;
  removeEvent: Function;
};

const EntryContent = ({ entry, removeEvent }: Props) => {
  const ButtonDelete = (event: Entry) => {
    return (
      <button
        id="delete-entry-button"
        onClick={function (e) {
          e.stopPropagation();
          removeEvent(entry, event);
        }}
        style={{ cursor: "pointer" }}
      >
        x
      </button>
    );
  };

  return (
    <Space direction="vertical" size={2}>
      {entry.events.map((event) => {
        switch (event.kind) {
          case SubjectKind.theory:
            return (
              <div>
                <Row justify="space-between" align="middle" wrap={false}>
                  <Text
                    style={{
                      color: "#046ccc",
                      fontWeight: "bold",
                      paddingRight: 5,
                    }}
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
                    {event.subject}
                    {event.desc && ` - ${event.desc}`} (Aula {event.room})
                  </Tag>
                  {ButtonDelete(event)}
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
                <Row justify="space-between" align="middle" wrap={false}>
                  <Tag
                    color={color}
                    style={{
                      fontSize: 14,
                      whiteSpace: "break-spaces",
                      wordBreak: "break-all",
                    }}
                  >
                    {event.subject}
                    {event.desc && ` - ${event.desc}`} (Aula {event.room})
                  </Tag>
                  {ButtonDelete(event)}
                </Row>
              </div>
            );
          case SubjectKind.problems:
            return (
              <div>
                <Row justify="space-between" align="middle" wrap={false}>
                  <Text
                    style={{
                      color: "purple",
                      fontWeight: "bold",
                      paddingRight: 5,
                    }}
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
                    {event.subject}
                    {event.desc && ` - ${event.desc}`} (Aula {event.room}) (Gr.{" "}
                    {event.group})
                  </Tag>
                  {ButtonDelete(event)}
                </Row>
              </div>
            );
          case SubjectKind.seminar:
            // Seminar hours
            return (
              <div>
                <Row justify="space-between" align="middle" wrap={false}>
                  <Text style={{ color: "white" }}>Seminario</Text>
                  {ButtonDelete(event)}
                </Row>
              </div>
            );
        }
      })}
    </Space>
  );
};

export default EntryContent;
