import Space from "antd/lib/space";
import Title from "antd/lib/typography/Title";
import { useContext } from "react";
import { DegreeSubjectsContext } from "../../../../../core/context/context";
import { degreePropertiesService } from "../../domain/services/DegreeProperties.service";
import { SubjectBadget } from "./SubjectBadge";

type Props = {
  setDraggedEvent: Function;
};

const LeftDrawer = ({ setDraggedEvent }: Props) => {
  const context = useContext(DegreeSubjectsContext);
  const degreeName = degreePropertiesService.getSelectedDegree().titulacion;

  const subjectList = context.store.map((subject, i) => (
    <SubjectBadget
      setDraggedEvent={setDraggedEvent}
      subjectB={subject}
      key={i}
    />
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
