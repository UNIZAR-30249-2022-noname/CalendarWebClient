import React, { useEffect } from "react";
import { useState } from "react";
import Text from "antd/lib/typography/Text";
import { testService } from "../../domain/services/Test.service";



const TestComponent = () => {
  
    const [msg, setMsg] = useState<String>("");

    const getInf= async () =>{
        var res = await  testService.get() 
        if(res.isError)
        {
            setMsg("Error")
        }
        else 
        {
            setMsg(res.value)
        }
    }

    useEffect(()=>{  
        getInf()
        
    },[]);

    return(
        <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
        {msg}
     
    </div>
  );
    
}

export default React.memo(TestComponent);