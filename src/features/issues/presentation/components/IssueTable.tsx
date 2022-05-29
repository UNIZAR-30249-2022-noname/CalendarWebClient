import { Button, Space, Table, Tag } from "antd"
import React, { useEffect, useState } from "react";
import { Issue } from "../../domain/models/Issue";

type Props ={
    action: Function
    deleteAction: Function
    actionName:string
    issues:Issue[] 
  }

const IssueTable = ({issues,deleteAction, action,actionName}:Props)=>{


  useEffect(() => {
    //Runs on the first render
    //And any time any dependency value changes
  }, [issues]);

    const columns = [
        {
          title: 'Nombre',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: 'Descripción',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Espacio',
          dataIndex: 'space',
          key: 'space',
        },
        {
          title: 'Tags',
          key: 'tags',
          dataIndex: 'tags',
          render: (tags: string[]) => (
            <>
              {tags.map(tag => {
                return (
                  <Tag color={"default"} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
        },
          {
            title: 'Acciones',
            key: 'key',
            dataIndex: 'key',
            render: (text: any, record: Issue) => (
            <Space size="middle">
             <Button type="primary" onClick={()=>action(record)}>
               {actionName}
             </Button>
             <Button type="primary" danger={true} onClick={()=>{deleteAction(record)}}>
               {"Denegar"}
             </Button>
             
             </Space>
            ),
          }
      ];



    return(
        <div style={{margin:"10px", width:"800px"}}>
          <Table
          
            dataSource={issues}
            columns={columns} 
           />
           </div>
      )
}

export default React.memo(IssueTable);
