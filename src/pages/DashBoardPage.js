import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Validation from '../form/Validation';
import { getItemFromCookie,setItemInCookie,removeItemInCookie } from '../helpers/cookie';
import { DashBoard } from '../components'
import { adminLogin,adminGetUser,adminLogOut } from '../services/userServices';
export default function DashBoardPage(){
    const [userDetails, setUserDetails] = useState('');
    const [allUserDetails, setAllUserDetails] = useState('');
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
            console.log(GetUser, 'GetUser')
            let user = userEmail !== undefined ? GetUser.data.filter((item)=>item.email === userEmail && item.userType === "Admin" ): GetUser.data.filter((item)=>item.mobile === userMobile && item.userType === "Admin" );
            if(user.length > 0 ){
              userLogout();
            }
            setUserDetails(user[0]);
            setAllUserDetails(GetUser.data);
        }else{
          userLogout();
        }
    }
  } 
  console.log(allUserDetails, 'allUserDetails')
  return (
    allUserDetails.length > 0? <DashBoard userDetails={userDetails} allUserDetails={allUserDetails}/>:''
  )
}
