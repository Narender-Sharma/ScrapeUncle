import React, {useEffect, useState } from 'react'
import { WasteCategoryCom } from '../components/wasteCategory'
import {getCategory} from './../services/wasteCategory';
import { getItemFromCookie,setItemInCookie,removeItemInCookie } from '../helpers/cookie';
import { useNavigate } from "react-router-dom";
import { adminLogOut } from '../services/userServices'
export default function WasteCategory(){
    const [wasteCategoryUpd, setWasteCategoryUpd] = useState([]);
    const [wasteCategory, setWasteCategory] = useState(true);
    const userAdminLogin = getItemFromCookie('userAdminLogin');
    const userEmail = getItemFromCookie('userEmail');
    const userMobile = getItemFromCookie('mobile');
    const navigate = useNavigate();
    useEffect(() => {
        getCityData();
      }, [wasteCategoryUpd]);
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
    const getCityData = async ()=>{
        if(userAdminLogin === undefined){
            navigate('/login');
           }else if(userAdminLogin !=''){
            let GetCategory = await getCategory(userAdminLogin);
            if(GetCategory.success === 1){
                setWasteCategory(GetCategory.data)
            }else{
              userLogout()
            }
        }
      } 
  return (
    <>
        {wasteCategory && wasteCategory.length > 0  &&  <WasteCategoryCom userAdminLogin={userAdminLogin} setWasteCategoryUpd={setWasteCategoryUpd} wasteCategoryUpd={wasteCategoryUpd} wasteCategory={wasteCategory}/>}
    </>
  )
}
