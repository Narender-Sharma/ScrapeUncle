import React, {useState} from 'react'
import Validation from '../../../form/Validation';
import {deleteUser } from '../../../services/userServices';
export const UserDelete = ({setApi,UserDelete,setDeleteModel,deleteModel,setLoader,loader,payLoad,setPayLoad,showclassName,message}) => {
   const DeleteUser = async ()=>{
    setLoader(!loader);
    const delte = await deleteUser(UserDelete,payLoad.id);
    if(delte.success === 1){
        setLoader(false);
        setDeleteModel(!deleteModel);
        setApi(true);
        message = '<strong>Well done!</strong> 👍 You successfully Update City.';
        showclassName= 'alert-success fade show';
    }else{
        message = delte.message;
        showclassName= 'alert-danger fade show';
    }
   }
  return (
    <>
        <div className="modal fade bs-example-modal-lg show" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-modal="true" style={{display: 'block'}}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h6 className="modal-title mt-0 text-center" id="myLargeModalLabel"> Are You Sure Want To Delete User</h6>
                        <button type="button" className="btn-close" onClick={()=>{setDeleteModel(!deleteModel); setPayLoad([]);}} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="button-items text-center">
                            <button type="button" className="me-2 btn btn-soft-primary" onClick={()=>DeleteUser()}>Yes</button>
                            <button type="button" className="me-2 btn btn-soft-primary" onClick={()=>{setDeleteModel(!deleteModel); setPayLoad([]);}}>No</button>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
        <div className='modal-backdrop fade show'></div>
    </>
  )
}