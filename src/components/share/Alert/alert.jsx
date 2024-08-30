import React from 'react'

export const Alert = ({showClass,message,setShowAlert,showAlert}) => {
  return (
    <div className={`alert  alert-dismissible position-fixed  ${showClass} border-0 b-round alertTop`} role="alert" >
        <div dangerouslySetInnerHTML={{__html:message}}></div>
        <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={()=>setShowAlert(!showAlert)} aria-label="Close"></button>
    </div>
  )
}
