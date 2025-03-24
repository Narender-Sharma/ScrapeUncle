import React, { useEffect, useState } from 'react';
import {Alert, Loader,UserDelete} from '../share'
import { DashboardTop } from '../dashboardTop';
export const DashBoard = ({setApi,userAdminLogin,userDetails,allUserDetails}) => {   
    const [loader, setLoader] = useState(false);
    const [deleteModel, setDeleteModel] = useState(false);
    const [payLoad, setPayLoad] = useState([]);
    let message='';
    let showclassName='';
    const editUser =(id)=>{
        // setLoader(true);
        setDeleteModel(true);
        let currentOrder = allUserDetails.filter((item)=>item.id === id);
        setPayLoad(currentOrder[0])
    }
  return (
   <>
   {loader && <Loader/>}
   {deleteModel && <UserDelete setApi={setApi} userAdminLogin={userAdminLogin} setDeleteModel={setDeleteModel} setLoader={setLoader} loader={loader} deleteModel={deleteModel} payLoad={payLoad} setPayLoad={setPayLoad} message={message} showclassName={showclassName}/>}
     <div className="page-wrapper">
            <div className="page-content-tab">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="page-title-box">
                                <div className="float-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="#">Metrica</a>
                                        </li>
                                        <li className="breadcrumb-item"><a href="#">Project</a>
                                        </li>
                                        <li className="breadcrumb-item active">Dashboard</li>
                                    </ol>
                                </div>
                                <h4 className="page-title">Dashboard</h4>
                            </div>
                        </div>
                    </div>
                     <div className="row"> 
                        <DashboardTop/>                 
                        <div className="col-lg-12">
                            <div className="card">  
                                <div className="card-header">
                                    <div className="row align-items-center">
                                        <div className="col">                      
                                            <h4 className="card-title">All User</h4>                      
                                        </div>
                                        <div className="col-auto"> 
                                            <a href="#" className="text-primary">View All</a>   
                                        </div>
                                    </div>                                   
                                </div>                                
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-hover mb-0">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th>User Name</th>
                                                    <th>User Mobile</th>
                                                    <th>User Email</th>
                                                    <th>City</th>
                                                    <th>Gender</th>
                                                    <th>User Type</th>
                                                    <th>Delete User</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {allUserDetails.map((item,index)=>(
                                                    <tr key={index}>
                                                        <td><img src="assets/images/users/user-2.jpg" alt="" className="thumb-sm rounded me-2"/>{item.name}</td>
                                                        <td>{item.mobile}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.city}</td>
                                                        <td>{item.gender}</td>
                                                        <td>{item.userType}</td>
                                                        <td><a className='' onClick={()=>editUser(item.id)} href='javascript:void(0)'><i className='far fa-edit'></i></a></td>
                                                    </tr>
                                                ))}                                                                                              
                                            </tbody>
                                        </table>
                                                                                       
                                    </div>
                                </div>                                                                                                       
                            </div>
                        </div>      
                    </div>

                </div>

                <div className="offcanvas offcanvas-end" tabIndex="-1" id="Appearance" aria-labelledby="AppearanceLabel">
                    <div className="offcanvas-header border-bottom">
                      <h5 className="m-0 font-14" id="AppearanceLabel">Appearance</h5>
                      <button type="button" className="btn-close text-reset p-0 m-0 align-self-center" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">  
                        <h6>Account Settings</h6>
                        <div className="p-2 text-start mt-3">
                            <div className="form-check form-switch mb-2">
                                <input className="form-check-input" type="checkbox" id="settings-switch1"/>
                                <label className="form-check-label" htmlFor="settings-switch1">Auto updates</label>
                            </div>
                            <div className="form-check form-switch mb-2">
                                <input className="form-check-input" type="checkbox" id="settings-switch2" checked/>
                                <label className="form-check-label" htmlFor="settings-switch2">Location Permission</label>
                            </div>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="settings-switch3"/>
                                <label className="form-check-label" htmlFor="settings-switch3">Show offline Contacts</label>
                            </div>
                        </div>
                        <h6>General Settings</h6>
                        <div className="p-2 text-start mt-3">
                            <div className="form-check form-switch mb-2">
                                <input className="form-check-input" type="checkbox" id="settings-switch4"/>
                                <label className="form-check-label" htmlFor="settings-switch4">Show me Online</label>
                            </div>
                            <div className="form-check form-switch mb-2">
                                <input className="form-check-input" type="checkbox" id="settings-switch5" checked/>
                                <label className="form-check-label" htmlFor="settings-switch5">Status visible to all</label>
                            </div>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="settings-switch6"/>
                                <label className="form-check-label" htmlFor="settings-switch6">Notifications Popup</label>
                            </div>
                        </div>       
                    </div>
                </div>
            </div>
        </div>
   </>
  )
}
