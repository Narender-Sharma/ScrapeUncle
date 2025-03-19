import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Validation from '../form/Validation';
import { getItemFromCookie,setItemInCookie,removeItemInCookie } from '../helpers/cookie';
import { Orders } from '../components'
import { adminLogin,adminGetUser,adminLogOut } from '../services/userServices';
import { GetAllOrders } from '../services/orders';
import { Loader } from '../components/share';
export default function OrdersPage(){
    const [userDetails, setUserDetails] = useState(false);
    const [allUserDetails, setAllUserDetails] = useState('');
    const userAdminLogin = getItemFromCookie('userAdminLogin');
    const userEmail = getItemFromCookie('userEmail');
    const userMobile = getItemFromCookie('mobile');
    const navigate = useNavigate();
  useEffect(() => {
    getUserData()
  }, []);
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
        let GetOrders = await GetAllOrders();
        if(GetOrders.success === 1){
            setUserDetails(true);
            setAllUserDetails(GetOrders.data);
        }else{
          userLogout();
        }
    }
  } 
  return (
    userDetails ? <Orders allUserDetails={allUserDetails}/>:<Loader/>
  )
}
