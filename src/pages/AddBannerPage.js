import React, { useEffect, useState } from 'react';
import { HomePageBanner } from "../components/homePageBanner"
import { getItemFromCookie,setItemInCookie,removeItemInCookie } from '../helpers/cookie';
import {getAddBanner} from './../services/addBanner';
import { useNavigate } from "react-router-dom";
import { adminLogOut } from '../services/userServices'
export default function AddBanner () {
  const [allBanner, setAllBanner] = useState([]);
  const [bannerUpd, setBannerUpd] = useState([]);

  const userAdminLogin = getItemFromCookie('userAdminLogin');
  const userEmail = getItemFromCookie('userEmail');
  const userMobile = getItemFromCookie('mobile');
    const navigate = useNavigate();
  useEffect(() => {
    getAllAddBanner()
  }, [bannerUpd]);
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
  const getAllAddBanner = async ()=>{
    if(!userAdminLogin){
        navigate('/login');
       }else if(userAdminLogin !=''){
        let GetBanner = await getAddBanner(userAdminLogin);
        if(GetBanner.success === 1){
          setAllBanner(GetBanner.data)
        }else{
          userLogout();
        }
    }
  } 
  return (
    <HomePageBanner allBanner={allBanner} setBannerUpd={setBannerUpd} bannerUpd={bannerUpd} setAllBanner={setAllBanner}/>
  )
}
