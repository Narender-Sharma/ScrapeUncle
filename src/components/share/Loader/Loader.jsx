import React from 'react'

export const Loader = () => {
  return (
    <>
      <div className='modal modalLoader fade show' style={{display: 'flex', paddingLeft: '0px'}}>
        <div class="modal-dialog" role="document">
          <div class="d-flex justify-content-center">
              <div class="spinner-border text-light" role="status"></div>
          </div>
        </div>
        
      </div>
      <div class="modal-backdrop fade show"></div>
    </>
    
    // <div className='modal fade bd-example-modal-sm show' style={{display: 'block', paddingLeft: '0px'}}>
    //     <div className='spinner-border text-primary'>Loader</div>
    // </div>
  )
}
