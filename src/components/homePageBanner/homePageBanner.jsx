import React, { useState,useEffect  } from 'react'
import { BannerEditModal,Alert } from '../share';
import { DashboardTop } from './../dashboardTop';
import {getAddBanner,bannerUpdate,addNewBanner} from './../../services/addBanner';
import { getItemFromCookie,setItemInCookie,removeItemInCookie } from '../../helpers/cookie';
import { Loader } from '../share';
export const HomePageBanner = ({allBanner,setAllBanner,setBannerUpd,bannerUpd}) => {
  const [editBanner, setEditBanner] = useState(false);
  const [payload, setPayload] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [addLebal, setaddLebal] = useState(true);
  const [loader, setLoader] = useState(false);
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
  const editBannerID = (id)=>{
    setEditBanner(true);
    let currentbanner = allBanner.filter((item)=>item.id === id);
    setPayload(currentbanner[0]);
  }
  
  const addCityFunction = ()=>{
    setPayload('')
    setEditBanner(true);
    }
    const addBanner = async ()=>{
        if(payload.name !=='' && payload.is_active !==''){
            setaddLebal(true);
            // let data =''
            setLoader(true)
            const response = await addNewBanner(userAdminLogin,payload);
            if(response.success === 1){
                setLoader(false)
                message = '<strong>Well done!</strong> 👍 You successfully Add Banner.';
                showClass= 'alert-success fade show';
                setShowAlert(true);
                setEditBanner(!editBanner);
                setBannerUpd(!bannerUpd);
            }if(response.success === '0'){
                setLoader(false)
                setShowAlert(true);
                setEditBanner(!editBanner);
                message = message.sqlMessage;
                
            }
            
        }
    }
    const upDateBanner = async()=>{
        if(payload.name !=='' && payload.is_active !==''){
            setaddLebal(false);
            setLoader(true)
            let data = await bannerUpdate(userAdminLogin,payload);
            if(data.success === 1){
                message = '<strong>Well done!</strong> 👍 You successfully Update Banner.';
                showClass= 'alert-success fade show';
                setLoader(false)
                setShowAlert(true);
                setPayload('');
                setBannerUpd(!bannerUpd);
                setEditBanner(!editBanner);
            }if(data.success === '0'){
                setShowAlert(true);
                setLoader(false)
                setEditBanner(!editBanner);
                message = message.sqlMessage;
                showClass= 'alert-danger fade show';
                
            }
        }
    }
  return (
    <>
      {loader &&  <Loader/>}
      {editBanner && <BannerEditModal bannerFunction={addLebal === true?addBanner:upDateBanner} payload={payload} setPayload={setPayload} setEditBanner={setEditBanner}/> }
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
                                        <li className="breadcrumb-item active">Home Banner</li>
                                    </ol>
                                </div>
                                <h4 className="page-title">Home Banner</h4>
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
                                            <h4 className="card-title">All Banner</h4>                      
                                        </div>
                                    </div>                                   
                                </div>                                
                                <div className="card-body">
                                {showAlert && <Alert showAlert={showAlert} setShowAlert={setShowAlert} message={'<strong>Well done!</strong> 👍 You successfully Add City.'} showClass={'alert-success fade show'}/>}
                                    <div className="table-responsive">
                                        <div className="mb-2">
                                            <button className="btn btn-outline-primary btn-sm mb-1 mb-xl-0" id="reactivity-add" onClick={()=>addCityFunction()}>Add New Banner</button>
                                        </div>
                                        <table className="table table-hover mb-0">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th>Banner Name</th>
                                                    <th>Banner Image</th>
                                                    <th>Banner Show</th>
                                                    <th>Edit</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {allBanner.map((item,index)=>(
                                                    <tr key={index}>
                                                        <td>{item.name}</td>
                                                        <td><img src={`${item.url != ''?`https://treestructure.onrender.com/image/`+item.image:'assets/images/users/user-2.jpg'}`} alt="" className="thumb-sm rounded me-2"/>{item.url}</td>
                                                        <td>{item.is_active === 1?'show':'Hide'}</td>
                                                        <td>
                                                          <a href='javascript:void(0)' onClick={()=>editBannerID(item.id)}><i className="las la-pen text-secondary font-16"></i></a>
                                                        </td>
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
