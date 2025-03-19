import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Validation from '../../form/Validation';
import {OrderModal,Alert, Loader} from '../share'
import { getItemFromCookie,setItemInCookie,removeItemInCookie } from '../../helpers/cookie';
import { decrypt_object } from "../../helpers/Base64Encode";
import { adminLogin,adminGetUser } from '../../services/userServices';
import { DashboardTop } from '../dashboardTop';
import { getMeasurementMaster } from '../../services/measurementMaster';
import { OrdersUpdate } from '../../services/orders';
import moment from 'moment';
export const Orders = ({userDetails,allUserDetails}) => {   
    const [payload, setPayload] = useState('');
    const [orderModel,setOrderModel  ] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [loader, setLoader] = useState(false);
    const [weightList, setWeightList] = useState([]);
    const userAdminLogin = getItemFromCookie('userAdminLogin');
     let message='';
    let showClass='';
    const editOrders = async(id)=>{
        setLoader(true);
        let GetWeight = await getMeasurementMaster(userAdminLogin);
            if(GetWeight.success === 1){
                setLoader(false);
                setOrderModel(!orderModel);
                setWeightList(GetWeight.data)
            }
        let currentOrder = allUserDetails.filter((item)=>item.id === id);
        setPayload(currentOrder[0])
    }
    const UpdateOrder = async()=>{
        
        if(payload.name !=='' && payload.is_active !==''){
            setLoader(true)
            let NewPyload = {
                "status":payload.status,
                "is_active":payload.is_active,
                "categoryId":payload.categoryId,
                "weight":payload.weight,
                "weightId":payload.weightId,
                "addressId":payload.addressId,
                "message":payload.message,
                "date":moment(payload.date).utc().format('DD/MM/YYYY'),
                "time":moment(payload.time).format('LTS')
            }
            let data = await OrdersUpdate(userAdminLogin,NewPyload,payload.id);
            if(data.success === 1){
                message = '<strong>Well done!</strong> 👍 You successfully Update City.';
                showClass= 'alert-success fade show';
                setLoader(false);
                setOrderModel(false);
                setShowAlert(true);
                setPayload('');
                
            }if(data.success === '0'){
                setLoader(false)
                setShowAlert(true);
                message = message.sqlMessage;
                showClass= 'alert-danger fade show';
                
            }
        }
    }
    console.log(payload, 'payload')
  return (
    <>
        {loader && <Loader/>}
        {orderModel && <OrderModal OrderUpdate={UpdateOrder} weightList={weightList} setPayload={setPayload} payload={payload} orderModel={orderModel} setOrderModel={setOrderModel}/> }
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
                                    {showAlert && <Alert showAlert={showAlert} setShowAlert={setShowAlert} message={message} showClass={'alert-success fade show'}/>}
                                    <div className="table-responsive">
                                        <table className="table table-hover mb-0">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th>User Name</th>
                                                    <th>User Mobile</th>
                                                    <th>User Email</th>
                                                    <th>City</th>
                                                    <th>Gender</th>
                                                    <th>Waste Type</th>
                                                    <th>Waste Weight</th>
                                                    <th>Address Type</th>
                                                    <th>Address</th>
                                                    <th>Message</th>
                                                    <th>Pick Time</th>
                                                    <th>Pick Date</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {allUserDetails && allUserDetails.length >  0? allUserDetails.map((item,index)=>(
                                                    <tr key={index}>
                                                        <td>{item.userName}</td>
                                                        <td>{item.mobile}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.city}</td>
                                                        <td>{item.gender}</td>
                                                        <td>{item.categoryName}</td>
                                                        <td>{item.weight} {item.weightName}</td>
                                                        <td>{item.address_type}</td>
                                                        <td>{item.address_line_1 + ' ' + item.address_line_2 + ' ' + item.pincode}</td>
                                                        <td>{item.message}</td>
                                                        <td>{item.time}</td>
                                                        <td>{moment(item.date).utc().format('DD/MM/YYYY')}</td>
                                                        <td>{item.status == 0 ? 'Incomplete':'Complete'}</td>
                                                        <td><a className='' onClick={()=>editOrders(item.id)} href='javascript:void(0)'><i className='far fa-edit'></i></a></td>

                                                    </tr>
                                                )): <tr>
                                                    <td colSpan={14}>
                                                        <p>No Records Found</p>
                                                    </td>
                                                </tr> }                                                                                              
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
