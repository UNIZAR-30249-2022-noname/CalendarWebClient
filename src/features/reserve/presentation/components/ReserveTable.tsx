import { Button, message, Space, Table, Tag } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../core/context/context";
import { Time } from "../../../scheduler/entries/domain/models/Entry";
import { Reserve } from "../../domain/models/Reserve";
import { ReserveService } from "../../domain/services/Reserve.service";

const IssueTable = () => {
  const [books, setBook] = useState<Reserve[]>([]);
  const contextUser = useContext(UserContext).usr.name;
  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const loadData = async () => {
    const key = "update";
    message.loading({ content: "Actualizando datos...", key });
    const reserves = await ReserveService.getPerUser(contextUser);
    if (reserves.isError) message.error("Error al obtener las reservas");
    else {
      await delay(500);
      message.success({ content: "Datos actualizados", key, duration: 1 });
      setBook(reserves.value);
    }
  };

  useEffect(() => {
    //Runs on the first render
    //And any time any dependency value changes
    loadData();
  }, []);

  const cancelBook = async (book: Reserve) => {
    console.log(book);
    const succes = await ReserveService.cancel(book.key!);
    if (succes.isError) {
      message.error("Error al cancelar la reserva");
    } else {
      message.success({ content: "Datos actualizados", duration: 1 });
      setBook(books.filter((value) => value.key != book.key));
    }
  };

  const columns = [
    {
      title: "Evento",
      dataIndex: "event",
      key: "event",
    },
    {
      title: "Horario",
      dataIndex: "scheduled",
      key: "scheduled",
      render: (scheduled: Time[]) => (
        <div>
          {scheduled[0].hour +
            ":" +
            scheduled[0].min +
            " - " +
            scheduled[1].hour +
            ":" +
            scheduled[1].min}
        </div>
      ),
    },
    {
      title: "Fecha",
      dataIndex: "day",
      key: "day",
    },
    {
      title: "Espacio",
      dataIndex: "slot",
      key: "slot",
    },
    {
      title: "Acciones",
      key: "key",
      dataIndex: "key",
      render: (text: any, record: Reserve) => (
        <Space size="middle">
          <Button
            type="primary"
            danger={true}
            onClick={() => cancelBook(record)}
          >
            Cancelar reserva
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ margin: "10px", width: "800px" }}>
      <Table dataSource={books} columns={columns} />
    </div>
  );
};

export default React.memo(IssueTable);
