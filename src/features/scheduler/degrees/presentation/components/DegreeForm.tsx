import { Button, Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import React from "react";
import { useContext, useEffect, useState } from "react";
import {
  DegreeInfoContext,
  DegreeSubjectsContext,
  SelectedDegreeContext,
} from "../../../../../core/context/context";
import { notifications } from "../../../../../core/presentation/components/notifications/notifications";
import { degreeAvailableHoursService } from "../../domain/services/AvailableHours.service";
import { degreePropertiesService } from "../../domain/services/DegreeProperties.service";
import AvailableHoursParamsDTO from "../../infraestructure/dto/AvailableHoursParamsDTO";
import { DegreesSelector } from "./DegreesSelector";
import { GroupSelector } from "./GroupSelector";
import { YearSelector } from "./YearSelector";

const DegreeForm = () => {
  const [form] = useForm();
  const contextSubjects = useContext(DegreeSubjectsContext);
  const constextDegrees = useContext(DegreeInfoContext);
  const contextSelectedDegree = useContext(SelectedDegreeContext);
  const { degree, year, group } = contextSelectedDegree.store;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFields();
    fetchDegrees();
    if (degree == null || year == null || group == null) return;
    fetchDegreeSubjects({ degree, year, group });
  }, []);

  useEffect(() => {
    loadFields();
  }, [contextSelectedDegree.store]);

  const loadFields = async () => {
    form.setFieldsValue({
      degree: degree,
      year: year,
      group: group,
    });
  };

  const fetchDegrees = async () => {
    const degrees = await degreePropertiesService.getDegrees();
    if (degrees.isError) {
      notifications.error(`Error al cargar los datos de titulaciones`);
    } else {
      constextDegrees.actions.setDegreeProperties(degrees.value);
    }
  };

  const fetchDegreeSubjects = async (degree: AvailableHoursParamsDTO) => {
    setLoading(true);
    let degreeInfoRes =
      await degreeAvailableHoursService.getDegreeAvailableHours(degree);
    if (degreeInfoRes.isError) {
      notifications.error(`Error al cargar los datos de ${degree.degree}`);
    } else {
      degreePropertiesService.setSelectedDegree(degree);
      contextSubjects.actions.setDegreeSubjects(degreeInfoRes.value);
      contextSelectedDegree.actions.setSelectedDegree(degree);
    }
    setLoading(false);
  };

  const onCorrectForm = () => {
    const { degree, year, group } = form.getFieldsValue();
    fetchDegreeSubjects({
      degree: degree,
      year: year,
      group: group,
    });
  };

  return (
    <Form
      form={form}
      name="Nueva entrada"
      scrollToFirstError
      wrapperCol={{ style: { padding: 5 } }}
      onFinish={onCorrectForm}
      layout="inline"
    >
      <DegreesSelector />
      <YearSelector />
      <GroupSelector />
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Buscar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default React.memo(DegreeForm);
