import { Tabs } from "antd";
import Text from "antd/lib/typography/Text";
import { useEffect, useState } from "react";
import { Issue } from "../../../features/issues/domain/models/Issue";
import IssueTable from "../../../features/issues/presentation/components/IssueTable";
const { TabPane } = Tabs;

export const IssuesPage = () => {

  const fakeData =[
    {title:"hola", description:"caracola",tags: ['nice', 'developer',"sapo"],key:"1",slot:"A0.01"},
    {title:"hola", description:"caracola",tags: ['nice', 'developer'],key:"2",slot:"A0.01"},
    {title:"hola", description:"caracola",tags: ['nice', 'developer'],key:"3",slot:"A0.02"},
    {title:"hola", description:"caracola",tags: ['nice', 'developer'],key:"4",slot:"A0.03"}
]


  const [issues,setIssues] = useState<Issue[]>([]) 
  const [newIssues,setNewIssues] = useState<Issue[]>(fakeData) 
  const [completedIssues,setCompletedIssues] = useState<Issue[]>([]) 

  const acceptIssue = (issue:Issue)=> {
    console.log("issue aceptada "+ issue.title)
    setIssues(state => [...state, issue])
    setNewIssues(newIssues.filter(value=>value.key!=issue.key))
  }

  const completIssue = (issue:Issue)=> {
    console.log("issue completada "+ issue.title)
    setCompletedIssues(state => [...state, issue])
    setIssues(issues.filter(value=>value.key!=issue.key))
  }

  const reopenIssue = (issue:Issue)=>{
    console.log("issue reabierto "+ issue.title)
    setIssues(state => [...state, issue])
    setCompletedIssues(completedIssues.filter(value=>value.key!=issue.key))
    

  }



  const cancelIssue = (issue:Issue)=>{
    console.log("issue cancelado " + issue.title)
    setIssues(issues.filter(value=>value.key!=issue.key))
  }
  const cancelNewIssue = (issue:Issue)=>{
    console.log("issue cancelado " + issue.title)
    setNewIssues(newIssues.filter(value=>value.key!=issue.key))
  }
  const cancelCompletedIssue = (issue:Issue)=>{
    console.log("issue cancelado " + issue.title)
    setCompletedIssues( completedIssues.filter(value=>value.key!=issue.key))
  }

  const contentTab1 = ()=>{
    return(
    <IssueTable issues={issues} deleteAction={cancelIssue} actionName="Complentar" action={completIssue}/>
    )
  }

  const contentTab2 = ()=>{
    return(
    <IssueTable issues={newIssues} deleteAction={cancelNewIssue} actionName="Aceptar" action={acceptIssue}/>
    )
  }

  const contentTab3 = ()=>{
    return(
    <IssueTable issues={completedIssues} deleteAction={cancelCompletedIssue} actionName="Reabrir" action={reopenIssue}/>
    )
  }




  return (
 
       <div style={{"marginLeft":"100px"}}>
    <Tabs defaultActiveKey="1" type="card" size={"small"} >
          <TabPane tab="Actuales" key="1">
            {contentTab1()}
          </TabPane>
          <TabPane tab="Nuevas" key="2">
          {contentTab2()}
          </TabPane>
          <TabPane tab="Completadas" key="3">
          {contentTab3()}
          </TabPane>

        </Tabs>
        </div>
      
  );
  
};
