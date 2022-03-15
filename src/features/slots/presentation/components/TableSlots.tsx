import { Button, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { Slots } from "../../domain/models/Slots";

type Props ={
    slots: Slots[]
  }
  



 const TableSlots = ({slots}:Props)=>{
    const [slotsData,setSlots] = useState<Slots[]>([])

    useEffect(()=>{  
      setSlots(slots)
      
  },[]);

    const columns = [
        {
          title: 'Nombre',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Edificio',
          dataIndex: 'building',
          key: 'building',
        },
        {
          title: 'Tipo',
          dataIndex: 'kind',
          key: 'kind',
        },
        {
            title: 'Aforo',
            dataIndex: 'capacity',
            key: 'capacity',
          },
          {
            title: 'Acciones',
            key: 'key',
            dataIndex: 'key',
            render: (text: any, record: any) => (
            <Space size="middle">
             <Button type="primary" onClick={()=> console.log(record)}>
               {"Ver en mapa"}
             </Button>
             <Button type="primary" onClick={()=> console.log(record)}>
               {"Abrir info"}
             </Button>
             </Space>
            ),
          }
      ];





    return(
        <Table
        style={{margin:"10px", width:"50%"}}
          dataSource={slots}
          columns={columns} 
         />
    )


 }

export default React.memo(TableSlots);