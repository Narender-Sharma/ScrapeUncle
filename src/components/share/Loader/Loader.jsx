import React from 'react'

export const Loader = () => {
  return (
    <>
      <div className='modal modalLoader fade show' style={{display: 'flex', paddingLeft: '0px',zIndex:1156,background: "rgba(0,0,0,0.6)"}}>
        <div className="modal-dialog" role="document">
          <div className="d-flex justify-content-center">
              <div className="spinner-border text-light" role="status"></div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
    
    // <div className='modal fade bd-example-modal-sm show' style={{display: 'block', paddingLeft: '0px'}}>
    //     <div className='spinner-border text-primary'>Loader</div>
    // </div>
  )
}
