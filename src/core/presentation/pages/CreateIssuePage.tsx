import { Row } from "antd";
import Text from "antd/lib/typography/Text";
import { useLocation } from "react-router-dom";
import CreateIssueForm from "../../../features/issues/presentation/components/CreateIssueForm";
import IssuesTags from "../../../features/issues/presentation/components/IssuesTags";

export const CreateIssuePage = () => {
  const search = useLocation().search;
  const name = new URLSearchParams(search).get('slot');
  let today = new Date().toLocaleDateString()

  return(
    <Row>
      <div style={{ width:"30%"}}></div>
      <div>
        <div style={{paddingLeft:"70px", marginTop:"50px",fontSize:"50px" }}>Crear aviso en el espacio {name}</div>
        <div style={{marginLeft:"210px", marginTop:"50px",fontSize:"30px" }}>Día del reporte {today} </div>
        <div style={{paddingLeft:"100px"}}>
       <CreateIssueForm  slot={name===null?undefined:name}  ></CreateIssueForm>
       
       
       </div>
      </div>
    </Row>
  );
};
