import { HourglassTwoTone } from "@ant-design/icons";
import { Button, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { InfoSlots } from "../../domain/models/InfoSlots";

const TableInfoSlots = () => {
  const slots: InfoSlots[] = [
    {
      key: 8,
      hour: 8,
      occupied: false,
    },
    {
      key: 9,
      hour: 9,
      occupied: true,
      person: "Urriku",
    },
    {
      key: 10,
      hour: 10,
      occupied: false,
    },
    {
      key: 11,
      hour: 11,
      occupied: false,
    },
    {
      key: 12,
      hour: 12,
      occupied: true,
      person: "Urriku",
    },
    {
      key: 13,
      hour: 13,
      occupied: false,
    },
    {
      key: 14,
      hour: 14,
      occupied: false,
    },
    {
      key: 15,
      hour: 15,
      occupied: true,
      person: "Urriku",
    },
    {
      key: 16,
      hour: 16,
      occupied: false,
    },
    {
      key: 17,
      hour: 17,
      occupied: false,
    },
    {
      key: 18,
      hour: 18,
      occupied: true,
      person: "Urriku",
    },
    {
      key: 19,
      hour: 19,
      occupied: false,
    },
    {
      key: 20,
      hour: 20,
      occupied: false,
    },
  ];
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

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: InfoSlots[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: InfoSlots) => ({
      disabled: record.occupied, // Column configuration not to be checked
      name: HourglassTwoTone.toString(),
    }),
  };

  const [selectionType] = useState<"checkbox">("checkbox");
  return (
    <div style={{ margin: "10px", width: "800px" }}>
      <Table
        pagination={{ pageSize: 7 }}
        dataSource={slots}
        columns={columns}
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
      />
      <div style={{ flexDirection: "row" }}>
        <Button type="primary">Reservar selección</Button>
        <Button type="primary" danger style={{ marginLeft: "1%" }}>
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default React.memo(TableInfoSlots);
