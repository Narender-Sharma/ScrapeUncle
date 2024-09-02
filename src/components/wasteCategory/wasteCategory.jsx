import React, {useEffect, useState } from 'react'
import { DashboardTop } from './../dashboardTop';
import { Alert, WasteCategoryModel} from '../share';
import { getItemFromCookie } from '../../helpers/cookie';
import {getMeasurementMaster} from './../../services/measurementMaster';
import {getCategory,addCategory,categoryUpdate} from './../../services/wasteCategory';
export const WasteCategoryCom = ({userAdminLogin,wasteCategoryUpd,setWasteCategoryUpd,wasteCategory,setWasteCategory}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [payload, setPayload] = useState('');
  const [addLebal, setaddLebal] = useState(true);
  const [editBanner, setEditBanner] = useState(false);
  const [meashuMaster, setMeashuMaster] = useState([]);
  let message='';
  let showClass='';
  useEffect(() => {
    getMeasure();
  }, []);
  const getMeasure = async ()=>{
        let mesd = await getMeasurementMaster(userAdminLogin);
        if(mesd.success === 1){
            setMeashuMaster(mesd.data)
        }
  }
  const addMeasurementFunction = ()=>{
        setEditBanner(!editBanner);
        setPayload('')
        setaddLebal(true);
    } 
  const addWasteCategory = async ()=>{
    setaddLebal(true)
    let data = await addCategory(userAdminLogin,payload);
    if(data.success === 1){
        message = '<strong>Well done!</strong> 👍 You successfully Add Measurement.';
        showClass= 'alert-success fade show';
        setShowAlert(true);
        setEditBanner(false)
        setWasteCategoryUpd(!wasteCategoryUpd);
    }if(data.success === '0'){
        setShowAlert(true);
        message = message.sqlMessage;
        setEditBanner(false);
        setWasteCategoryUpd(!wasteCategoryUpd);
    }

  }
  const editWasteCategory = (id)=>{
    setaddLebal(false)
    setEditBanner(true);
    let westcty = wasteCategory.filter((item)=>item.id === id);
    setPayload(westcty[0]);
    setWasteCategoryUpd(!wasteCategoryUpd)
  }
  return (
    <>
    {editBanner && <WasteCategoryModel meashuMaster={meashuMaster} bannerFunction={addLebal === true?addWasteCategory:editWasteCategory} setEditBanner={setEditBanner} setPayload={setPayload} payload={payload}/> }
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
                    <DashboardTop/>
                     <div className="row"> 
                                              
                        <div className="col-lg-12">
                            <div className="card">  
                                <div className="card-header">
                                    <div className="row align-items-center">
                                        <div className="col">                      
                                            <h4 className="card-title">All Category</h4>                      
                                        </div>
                                    </div>                                   
                                </div>                                
                                <div className="card-body">
                                {showAlert && <Alert showAlert={showAlert} setShowAlert={setShowAlert} message={'<strong>Well done!</strong> 👍 You successfully Add City.'} showClass={'alert-success fade show'}/>}
                                    <div className="table-responsive">
                                        <div className="mb-2">
                                            <button className="btn btn-outline-primary btn-sm mb-1 mb-xl-0" id="reactivity-add" onClick={()=>addMeasurementFunction()}>Add New Measurement</button>
                                        </div>
                                        <table className="table table-hover mb-0">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th>S.No.</th>
                                                    <th>Category Name</th>
                                                    <th>Label</th>
                                                    <th>Measurement</th>
                                                    <th>Icon</th>
                                                    <th>Active</th>
                                                    <th>Edit</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {wasteCategory.map((item,index)=>(
                                                    <tr key={index}>
                                                        <td>{index+1}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.label}</td>
                                                        <td>{item.weight}</td>
                                                        <td>{item.image !=''?item.image:''}</td>
                                                        <td>{item.is_active ===1?'Active':'In-Active'}</td>
                                                        <td><a className='' onClick={()=>editWasteCategory(item.id)} href='javascript:void(0)'><i className='far fa-edit'></i></a></td>
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
