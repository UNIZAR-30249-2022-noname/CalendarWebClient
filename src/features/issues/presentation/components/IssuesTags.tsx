import CheckableTag from "antd/lib/tag/CheckableTag";
import React from "react";
import { useState } from "react";
type Props ={
  setTags: Function
  selectedTags:string[]
  allTags:string[]
}

const IssuesTags = ({setTags,selectedTags,allTags}:Props)=>{

  
   
    
     
    
      const handleChange = (tag:string, checked:boolean) =>{
  
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        console.log('You are interested in: ', nextSelectedTags);
        setTags( nextSelectedTags )
      }
    
      
        return (
          <>
         
            <span style={{ marginRight: 8 }}>Etiquetas:</span>
            <div style={{background:"white", padding:"10px"}}>
            {allTags.map(tag => (
              <CheckableTag

                key={tag}
                checked={selectedTags.indexOf(tag) > -1}
                onChange={checked => handleChange(tag, checked)}
              >
                {tag}
              </CheckableTag>
            ))}
            </div>
          </>
        )
      }


export default React.memo(IssuesTags);