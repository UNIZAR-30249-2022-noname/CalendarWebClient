import { Button, Space, Table } from "antd";
import { LatLng } from "leaflet";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../../core/context/context";
import { Slots } from "../../domain/models/Slots";

type Props = {
  slots: Slots[];
  date: string;
  onClickMap: any;
};

const TableSlots = ({ slots, date, onClickMap }: Props) => {
  const history = useHistory();
  const privileges=useContext(UserContext).usr.privileges
  const isAllowed =  privileges!=="logged" && privileges!=="none"
  const [slotsData, setSlots] = useState<Slots[]>([]);

  useEffect(() => {
    setSlots(slots);
  }, []);

  const openSlotInfo = (slot: String) => {
    let path = `/infoSlot` + "?slot=" + slot + "&date=" + date;
    history.push(path);
  };

  const openCreateIssue = (slot: String, id:String) => {
    let path = `/createIssue` + "?slot=" + slot+"&id=" + id;;
    history.push(path);
  };

  const openInfoButton = (record: any) => {
    if (record.capacity > 0) {
      return (
        <Button type="primary" onClick={() => openSlotInfo(record.id)}>
          {"Abrir info"}
        </Button>
      );
    } else {
      return (
        <Button type="primary" disabled>
          {"No reservable"}
        </Button>
      );
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      hidden: true,
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Edificio",
      dataIndex: "building",
      key: "building",
    },
    {
      title: "Tipo",
      dataIndex: "kind",
      key: "kind",
    },
    {
      title: "Aforo",
      dataIndex: "capacity",
      key: "capacity",
    },
    {
      title: "Acciones",
      key: "key",
      dataIndex: "key",
      render: (text: any, record: Slots) => (
        <Space size="middle">
          <Button
            type="primary"
            //TODO Cambiar por coordenadas del servidor
            onClick={() => onClickMap(new LatLng(41.683, -0.8886))}
          >
            {"Ver en mapa"}
          </Button>
          {openInfoButton(record)}
          <Button  disabled={!isAllowed}  type="primary" onClick={() => openCreateIssue(record.name, record.id)}>
            {"Crear issue"}
          </Button>
        </Space>
      ),
    },
  ].filter((item) => !item.hidden);

  return (
    <div style={{ margin: "10px", width: "800px" }}>
      <Table dataSource={slots} columns={columns} />
    </div>
  );
};

export default React.memo(TableSlots);
