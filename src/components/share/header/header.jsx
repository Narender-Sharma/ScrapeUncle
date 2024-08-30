import React, { useEffect, useState } from 'react';
    import { useNavigate } from "react-router-dom";
    import { getItemFromCookie,setItemInCookie,removeItemInCookie } from '../../../helpers/cookie';
    import { decrypt_object } from "../../../helpers/Base64Encode";
    import { adminLogin,adminGetUser } from '../../../services/userServices';
    import { adminLogOut } from '../../../services/userServices'
export const Header = ({setShowLeftMenu,showLeftMenu}) => {
    
    const [userDetails, setUserDetails] = useState('');
    const userAdminLogin = getItemFromCookie('userAdminLogin');
    const userEmail = getItemFromCookie('userEmail');
    const userMobile = getItemFromCookie('mobile');
    const navigate = useNavigate();
    useEffect(() => {
        getUserData()
      }, []);
      const userLogout = async () =>{
        if(userMobile != undefined){
          let logout = await adminLogOut(userMobile != undefined?userMobile:userEmail);
          if(logout.success === 1){
              removeItemInCookie('userEmail');
                removeItemInCookie('userAdminLogin');
                navigate('/login');
          }else{
                removeItemInCookie('userEmail');
                removeItemInCookie('userAdminLogin');
                navigate('/login');
          }
        }
      }
      const getUserData = async ()=>{
        if(!userAdminLogin){
            navigate('/login');
           }else if(userAdminLogin !=''){
            let GetUser = await adminGetUser(userAdminLogin);
            if(GetUser.success === 1){
                let userEmail = getItemFromCookie('userEmail');
                let user = GetUser.data.filter((item)=>item.email === userEmail && item.userType === "Admin" );
                setUserDetails(user[0])
            }else{
                userLogout()
            }
        }
      } 
  return (
    <div className="topbar">            
            <nav className="navbar-custom" id="navbar-custom">    
                <ul className="list-unstyled topbar-nav float-end mb-0">
                    <li className="dropdown">
                        <a className="nav-link dropdown-toggle nav-user" data-bs-toggle="dropdown" href="#" role="button"
                            aria-haspopup="false" aria-expanded="false">
                            <div className="d-flex align-items-center">
                                <img src="/assets/images/users/user-4.jpg" alt="profile-user" className="rounded-circle me-2 thumb-sm" />
                                <div>
                                    <small className="d-none d-md-block font-11">{userDetails.userType}</small>
                                    <span className="d-none d-md-block fw-semibold font-12">{userDetails.name} <i
                                            className="mdi mdi-chevron-down"></i></span>
                                </div>
                            </div>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                            <a className="dropdown-item" href="#"><i className="ti ti-user font-16 me-1 align-text-bottom"></i> Profile</a>
                            <a className="dropdown-item" href="#"><i className="ti ti-settings font-16 me-1 align-text-bottom"></i> Settings</a>
                            <div className="dropdown-divider mb-0"></div>
                            <a className="dropdown-item" href="javascript:void(0)" onClick={()=>userLogout()}><i className="ti ti-power font-16 me-1 align-text-bottom"></i> Logout</a>
                        </div>
                    </li>
                    {/* <li className="notification-list">
                        <a className="nav-link arrow-none nav-icon offcanvas-btn" href="#" data-bs-toggle="offcanvas" data-bs-target="#Appearance" role="button" aria-controls="Rightbar">
                            <i className="ti ti-settings ti-spin"></i>
                        </a>
                    </li>    */}
                </ul>

                <ul className="list-unstyled topbar-nav mb-0">                        
                    <li>
                        <button className="nav-link button-menu-mobile nav-icon" onClick={()=>setShowLeftMenu(!showLeftMenu)} id="togglemenu">
                            <i className="ti ti-menu-2"></i>
                        </button>
                    </li> 
                    <li className="hide-phone app-search">
                        <form role="search" action="#" method="get">
                            <input type="search" name="search" className="form-control top-search mb-0" placeholder="Type text..."/>
                            <button type="submit"><i className="ti ti-search"></i></button>
                        </form>
                    </li>                       
                </ul>
            </nav>
           
        </div>
  )
}
