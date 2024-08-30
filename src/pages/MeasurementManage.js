import React, {useEffect, useState } from 'react'
import { Measurement } from '../components/measurement'
import {getMeasurementMaster} from './../services/measurementMaster';
import { getItemFromCookie,setItemInCookie,removeItemInCookie } from '../helpers/cookie';
import { useNavigate } from "react-router-dom";
import { adminLogOut } from '../services/userServices'
export default function LoginPage(){
    const [weightList, setWeightList] = useState([]);
    const [measureMentUpd, setMeasureMentUpd] = useState(true);
    const userAdminLogin = getItemFromCookie('userAdminLogin');
    const userEmail = getItemFromCookie('userEmail');
    const userMobile = getItemFromCookie('mobile');
    const navigate = useNavigate();
    useEffect(() => {
        getCityData();
      }, [measureMentUpd]);
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
            let GetWeight = await getMeasurementMaster(userAdminLogin);
            if(GetWeight.success === 1){
              setWeightList(GetWeight.data)
            }else{
              userLogout()
            }
        }
      } 
  return (
    <>
    {weightList && weightList.length > 0  &&  <Measurement weightList={weightList} measureMentUpd={measureMentUpd} setMeasureMentUpd={setMeasureMentUpd}/>}
    </>
  )
}
