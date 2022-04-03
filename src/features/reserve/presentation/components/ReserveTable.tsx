import { Button, Space, Table, Tag } from "antd"
import React, { useEffect, useState } from "react";
import { Time } from "../../../scheduler/entries/domain/models/Entry";
import { Reserve } from "../../domain/models/Reserve";

const IssueTable = ()=>{


const fakeData:Reserve[] = [
  {
    event:"Prog 1",
    scheduled:[{ hour:8,min:0   },{ hour:9,min:0   }],
    owner:"Luigi",
    slot:"A0.01",
    day:"21/1/10"
  },
  {
    event:"Prog 1",
    scheduled:[{ hour:8,min:0   },{ hour:9,min:0   }],
    owner:"Luigi",
    slot:"A0.01",
    day:"21/1/10"
  },
  {
    event:"Prog 1",
    scheduled:[{ hour:8,min:0   },{ hour:9,min:0   }],
    owner:"Luigi",
    slot:"A0.01",
    day:"21/1/10"
  },
  {
    event:"Prog 1",
    scheduled:[{ hour:8,min:0   },{ hour:9,min:0   }],
    owner:"Luigi",
    slot:"A0.01",
    day:"21/1/10"
  },
]

  const [books,setBook]= useState<Reserve[]>(fakeData)


  useEffect(() => {
    //Runs on the first render
    //And any time any dependency value changes
  }, []);


  const cancelBook=(book : Reserve)=>{
    console.log(book)

  }

    const columns = [
        {
          title: 'Evento',
          dataIndex: 'event',
          key: 'event',
        },
        {
          title: 'Horario',
          dataIndex: 'scheduled',
          key: 'scheduled',
          render:(scheduled:Time[]) => (
            <div>
              {scheduled[0].hour+":"+scheduled[0].min +" - "+scheduled[1].hour+":"+scheduled[1].min}
              </div>
          ),
        },
        {
          title: 'Fecha',
          dataIndex: 'day',
          key: 'day',
        },
        {
          title: 'Espacio',
          dataIndex: 'slot',
          key: 'slot',
        },
        {
          title: 'Acciones',
          key: 'key',
          dataIndex: 'key',
          render: (text: any, record: Reserve) => (
          <Space size="middle">
            <Button type="primary" danger={true} onClick={()=>cancelBook(record)}>
              Cancelar reserva
            </Button>
             
            </Space>
          ),
        }
      ];



    return(
        <div style={{margin:"10px", width:"800px"}}>
          <Table
          
            dataSource={books}
            columns={columns} 
           />
           </div>
      )
}

export default React.memo(IssueTable);
