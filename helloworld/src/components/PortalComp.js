import React from 'react'
import  ReactDOM  from 'react-dom'

function PortalComp() {
  return ReactDOM.createPortal(
    <div> <h1>Portal demo</h1> </div>, 
    document.getElementById('portal-root')
  )
}

export default PortalComp

