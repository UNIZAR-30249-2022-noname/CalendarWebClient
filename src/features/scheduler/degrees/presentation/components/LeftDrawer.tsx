import { Spin } from "antd";
import Space from "antd/lib/space";
import Title from "antd/lib/typography/Title";
import { useContext, useEffect, useState } from "react";
import { DegreeSubjectsContext } from "../../../../../core/context/context";
import { degreePropertiesService } from "../../domain/services/DegreeProperties.service";
import { SubjectBadget } from "./SubjectBadge";

type Props = {
  setDraggedEvent: Function;
};

const LeftDrawer = ({ setDraggedEvent }: Props) => {
  const subjectListStore = useContext(DegreeSubjectsContext).store;
  const degreeName = degreePropertiesService.getSelectedDegree().degree;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (subjectListStore.length === 0) setLoading(degreeName != null);
    else setLoading(false);
  }, [subjectListStore]);

  const subjectList = subjectListStore.map((subject, i) => (
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
        padding: 15,
      }}
    >
      <Title level={4} ellipsis={{ rows: 2 }}>
        {degreeName ?? ""}
      </Title>
      <Spin size="large" spinning={loading}>
        <Space size={20} direction="vertical">
          {subjectList}
        </Space>
      </Spin>
    </Space>
  );
};

export default LeftDrawer;
