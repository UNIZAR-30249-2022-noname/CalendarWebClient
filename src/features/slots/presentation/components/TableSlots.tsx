import { Button, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Slots } from "../../domain/models/Slots";

type Props ={
    slots: Slots[]
  }
  



 const TableSlots = ({slots}:Props)=>{
  const history = useHistory();
   
    const [slotsData,setSlots] = useState<Slots[]>([])

    useEffect(()=>{  
      setSlots(slots)
      
  },[]);

    const openSlotInfo = (slot:String)=>{
      let path = `/infoSlot`+"?slot="+slot; 
      history.push(path);


    }

    const openCreateIssue = (slot:String)=>{
      let path = `/createIssue`+"?slot="+slot; 
      history.push(path);


    }

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
             <Button type="primary" onClick={()=>openSlotInfo(record.name)}>
               {"Abrir info"}
             </Button>
             <Button type="primary" onClick={()=>openCreateIssue(record.name)}>
               {"Crear issue"}
             </Button>
             </Space>
            ),
          }
      ];



      

    return(
      <div style={{margin:"10px", width:"800px"}}>
        <Table
        
          dataSource={slots}
          columns={columns} 
         />
         </div>
    )


 }

export default React.memo(TableSlots);