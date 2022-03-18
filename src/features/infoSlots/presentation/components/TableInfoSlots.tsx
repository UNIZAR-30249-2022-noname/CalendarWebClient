import { Button, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { InfoSlots } from "../../domain/models/InfoSlots";

const TableInfoSlots = () => {
  const slots: InfoSlots[] = [
    {
      hour: 8,
      occupied: false,
    },
    {
      hour: 9,
      occupied: true,
      person: "Urriku",
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
    }),
  };
  const [selectionType] = useState<"checkbox">("checkbox");
  return (
    <div style={{ margin: "10px", width: "800px" }}>
      <Table
        dataSource={slots}
        columns={columns}
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
      />
    </div>
  );
};

export default React.memo(TableInfoSlots);
