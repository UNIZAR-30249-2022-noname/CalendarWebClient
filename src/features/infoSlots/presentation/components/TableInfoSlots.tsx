import { HourglassTwoTone } from "@ant-design/icons";
import { Button, Table, Tag } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { InfoSlotsKey } from "../../domain/models/InfoSlots";

type Props = {
  infoSlots: InfoSlotsKey[];
};

const TableInfoSlots = ({ infoSlots }: Props) => {
  const columns = [
    {
      title: "Hora",
      dataIndex: "hour",
      key: "hour",
    },
    {
      title: "Ocupación",
      dataIndex: "occupied",
      key: "occupied",
      render: (occupied: boolean) => {
        let color = occupied ? "red" : "green";
        let word = occupied ? "Ocupado" : "Libre";
        return <Tag color={color}>{word}</Tag>;
      },
    },
    {
      title: "Reservante",
      dataIndex: "person",
      key: "person",
    },
  ];

  const [rows, setRows] = useState<React.Key[]>([""]);

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: InfoSlotsKey[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setRows(selectedRowKeys);
    },
    getCheckboxProps: (record: InfoSlotsKey) => ({
      disabled: record.occupied, // Column configuration not to be checked
      name: HourglassTwoTone.toString(),
    }),
  };

  const [clickedButton, setClickedButton] = useState("");

  const reserveHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const button: HTMLButtonElement = event.currentTarget;
    setClickedButton("HOLA");
  };

  const [selectionType] = useState<"checkbox">("checkbox");
  return (
    <div style={{ margin: "10px", width: "800px" }}>
      <Table
        pagination={{ pageSize: 7 }}
        dataSource={infoSlots}
        columns={columns}
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
      />
      <div style={{ flexDirection: "row" }}>
        <Button type="primary" onClick={reserveHandler}>
          Reservar selección
        </Button>
        <Link to="/slots" id="mainLogo" style={{ cursor: "pointer" }}>
          <Button type="primary" danger style={{ marginLeft: "1%" }}>
            Cancelar
          </Button>
        </Link>
        <h1>
          {clickedButton !== ""
            ? `You have clicked "${rows}"`
            : "No button clicked yet"}
        </h1>
      </div>
    </div>
  );
};

export default React.memo(TableInfoSlots);
