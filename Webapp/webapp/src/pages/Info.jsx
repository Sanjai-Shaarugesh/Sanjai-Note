import { useState, useEffect } from "react";

const [infos,setInfos] = useState([])
function Info({username,password}) {

    
  return (
    <div>
      {infos.map((info)=>{
        
        <div key={info.id}>
            <p>{info.username}</p>
            <p> {info.password} </p>
        </div>
         
      })}
    </div>
  )
}

export default Info
