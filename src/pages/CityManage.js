import React, {useEffect, useState } from 'react'
import { CityMaster } from '../components/cityMaster'
import {getCityMaster} from './../services/cityMaster';
import { getItemFromCookie,setItemInCookie,removeItemInCookie } from '../helpers/cookie';
import { useNavigate } from "react-router-dom";
import { adminLogOut } from '../services/userServices'
export default function LoginPage(){
    const [cityList, setCityList] = useState([]);
    const [cityUpd, setCityUpd] = useState(true);
    const userAdminLogin = getItemFromCookie('userAdminLogin');
    const userEmail = getItemFromCookie('userEmail');
    const userMobile = getItemFromCookie('mobile');
    const navigate = useNavigate();
    useEffect(() => {
        getCityData()
      }, [cityUpd]);
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
            let GetCity = await getCityMaster(userAdminLogin);
            if(GetCity.success === 1){
                setCityList(GetCity.data)
            }else{
              userLogout();
            }
        }
      } 
  return (
    <>
    {cityList && cityList.length > 0  &&  <CityMaster cityList={cityList} setCityUpd={setCityUpd} cityUpd={cityUpd}/>}
    </>
  )
}
