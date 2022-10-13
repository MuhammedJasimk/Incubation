import React from 'react'
import Login  from "../component/login/login";
function loginPages(props) {
    return (
      <div>
        <Login admin={props.admin}/>
      </div>
    )
  }
  
  export default loginPages