import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Validation from '../form/Validation';
import { getItemFromCookie,setItemInCookie,removeItemInCookie } from '../helpers/cookie';
import { DashBoard } from '../components'
import { adminLogin,adminGetUser,adminLogOut } from '../services/userServices';
import { Loader } from '../components/share';
export default function DashBoardPage(){
    const [userDetails, setUserDetails] = useState('');
    const [allUserDetails, setAllUserDetails] = useState('');
    const [Api, setApi] = useState(false);
    const userAdminLogin = getItemFromCookie('userAdminLogin');
    const userEmail = getItemFromCookie('userEmail');
    const userMobile = getItemFromCookie('mobile');
    const navigate = useNavigate();
  useEffect(() => {
    getUserData()
  }, [Api]);
  const userLogout = async () =>{
    if(userMobile !== undefined || userEmail !== undefined){
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
        let user;
        if(GetUser.success === 1){
            userMobile != undefined?user = GetUser.data.filter((item)=>( item.mobile === userMobile.toString() && item.userType === "Admin")):user = GetUser.data.filter((item)=>item.email === userEmail && item.userType === "Admin" );
            setUserDetails(GetUser.data[0]);
            setAllUserDetails(GetUser.data);
        }else{
          userLogout();
        }
    }
  } 
  return (
    allUserDetails.length > 0? <DashBoard setApi={setApi} userAdminLogin={userAdminLogin} userDetails={userDetails} allUserDetails={allUserDetails}/>:<Loader/>
  )
}
