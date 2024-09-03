import React, { useState,useEffect } from 'react'
import {EditCity,Alert, Loader} from '../share'
import { addNewCity,cityUpdate } from '../../services/cityMaster';
import { DashboardTop } from './../dashboardTop';
import { getItemFromCookie,setItemInCookie,removeItemInCookie } from '../../helpers/cookie';
export const CityMaster = ({cityList,setCityUpd,cityUpd}) => {
    const [cityModel, setCityModel] = useState(false);
    const [payload, setPayload] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [addLebal, setaddLebal] = useState(true);
    const [loader, setLoader] = useState(false)
    let message='';
    let showClass='';
    const userAdminLogin = getItemFromCookie('userAdminLogin');
    useEffect(() => {
        const timeId = setTimeout(() => {
          // After 3 seconds set the show value to false
          setShowAlert(false)
        }, 3000)
    
        return () => {
          clearTimeout(timeId)
        }
      }, [showAlert]);
    const editCity=(id)=>{
        setCityModel(true);
        setaddLebal(false); 
        let currentCity = cityList.filter((item)=>item.id === id);
        setPayload(currentCity[0]);
        setCityUpd(!cityUpd);
    }
    const addCity = async ()=>{
        if(payload.name !=='' && payload.is_active !==''){
            setLoader(true)
            let data = await addNewCity(userAdminLogin,payload);
            if(data.success === 1){
                message = '<strong>Well done!</strong> 👍 You successfully Add City.';
                showClass= 'alert-success fade show';
                setShowAlert(true);
                setCityModel(false)
                setLoader(false)
                setCityUpd(!cityUpd);
            }if(data.success === '0'){
                setShowAlert(true);
                setLoader(false)
                message = message.sqlMessage;
                setCityModel(false)
            }
            
        }
    }
    const upDateCity = async()=>{
        if(payload.name !=='' && payload.is_active !==''){
            setLoader(true)
            let data = await cityUpdate(userAdminLogin,payload);
            if(data.success === 1){
                message = '<strong>Well done!</strong> 👍 You successfully Update City.';
                showClass= 'alert-success fade show';
                setLoader(false)
                setShowAlert(true);
                setCityModel(false);
                setPayload('');
                setCityUpd(!cityUpd);
            }if(data.success === '0'){
                setLoader(false)
                setShowAlert(true);
                message = message.sqlMessage;
                showClass= 'alert-danger fade show';
                setCityModel(false)
            }
        }
    }
    const addCityFunction = ()=>{
        setCityModel(!cityModel);
        setPayload('');
        setaddLebal(true);
    }
  return (
    <>
        {loader &&  <Loader/>}
        {cityModel  && <EditCity addLebal={addLebal} upDateCity={upDateCity} payload={payload} addCity={addCity} setPayload={setPayload} setEditBanner={setCityModel}/>}    
        <div className="page-wrapper">
            <div className="page-content-tab">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="page-title-box">
                                <div className="float-end">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="#">Dashboard</a>
                                        </li>
                                        <li className="breadcrumb-item active">City</li>
                                    </ol>
                                </div>
                                <h4 className="page-title">City</h4>
                            </div>
                        </div>
                    </div>
                    <DashboardTop />
                     <div className="row">                        
                        <div className="col-lg-12">
                            <div className="card">  
                                <div className="card-header">
                                    <div className="row align-items-center">
                                        <div className="col">                      
                                            <h4 className="card-title">All City</h4>                      
                                        </div>
                                    </div>                                   
                                </div>                                
                                <div className="card-body">
                                {showAlert && <Alert showAlert={showAlert} setShowAlert={setShowAlert} message={message} showClass={'alert-success fade show'}/>}
                                    <div className="table-responsive">
                                        <div className="mb-2">
                                            <button className="btn btn-outline-primary btn-sm mb-1 mb-xl-0" id="reactivity-add" onClick={()=>addCityFunction()}>Add New City</button>
                                        </div>
                                        <table className="table table-hover mb-0">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th>S.No.</th>
                                                    <th>City Name</th>
                                                    <th>Active</th>
                                                    <th>Edit</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {cityList.map((item,index)=>(
                                                    <tr key={index}>
                                                        <td>{index+1}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.is_active ===1?'Active':'In-Active'}</td>
                                                        <td><a className='' onClick={()=>editCity(item.id)} href='javascript:void(0)'><i className='far fa-edit'></i></a></td>
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
