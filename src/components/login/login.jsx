import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Validation from '../../form/Validation';
import { getItemFromCookie,setItemInCookie,removeItemInCookie } from '../../helpers/cookie';
import { decrypt_object } from "../../helpers/Base64Encode";
import { adminLogin,LoginOtpVerify,adminLogOut } from '../../services/userServices';
export const Login = () => {
    let user = {
        email:"sharmanarender06@gmail.com",
        mobile:"9013261173"
    }
    const navigate = useNavigate();
    const [userAdmin,setAdminUser] = useState(user);
    const [errorMsg, setErrorMsg] = useState('');
    const [loginWith, setLoginWith] = useState('email');
    const [otpText, setOTPText] = useState('');
    const [OTPShow, setOTPShow] = useState(false);
    const userEmail = getItemFromCookie('userEmail');
    const userMobile = getItemFromCookie('mobile');
    const userAdminLogin = getItemFromCookie('userAdminLogin');
    useEffect(() => {
       if(userAdminLogin){
        navigate('/dashboard');
       }
      }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        let isValid = isAllowed(value, name);
        if (isValid) {
            setAdminUser({ ...userAdmin, [name]: value });
        }
      };
    const handleChangeOTP = (e) => {
        const { name, value } = e.target;
        let isValid = isAllowed(value, name);
        if (isValid) {
            console.log(name, value)
            setOTPText(value );
        }
      };
      const isAllowed = (value, type) => {
        switch (type){
          case 'email':
            return  true;
          case 'password':
            return  true;
          case 'otpText':
            return true;
          default:
            return  true;
        }
      }
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
      const sendLogin = async () => {
        if((userAdmin.mobile === '' || Validation.validateEmail(userAdmin.email))){
            if (!userAdminLogin) {
                const login = await adminLogin(userAdmin);
                if (login.message === "OTP sent successfully!") {
                    setOTPShow(true);
                }else if(login.message === 'User is already login!'){
                    let logout = await userLogout();
                    if(logout){
                        navigate('/dashboard');
                        setErrorMsg('please login Again!')
                    }
                    
                } else {
                  setErrorMsg(login.message);
               }
              } 
              else {
                navigate('/dashboard');
              }
        }
      }
      const OTPVerify = async ()=>{
        if(otpText !==''){
            let payLoad ={
                "email": userAdmin.email,
                "mobile":userAdmin.mobile,
                "otp":otpText
            }
            const verify = await LoginOtpVerify(payLoad);
            if(verify.message === 'OTP verified successfully!'){
                if(verify.data.userType === 'Admin'){
                setItemInCookie('userAdminLogin', verify.token);
                loginWith === 'email'?  setItemInCookie('userEmail', verify.data.email):setItemInCookie('mobile', verify.data.mobile);
                navigate('/dashboard');
                }else{
                    setErrorMsg('user not authorized')
                }
            }
        }
      }
  return (
    <>
        <div className="container-fluid">
            <div className="row vh-100">
                <div className="col-12">
                    <div className="card-body p-0">
                        <div className="row d-flex align-items-center">
                            
                            <div className="col-md-7 col-xl-9 col-lg-8  p-0 vh-100 d-flex justify-content-center auth-bg">
                                <div className="accountbg d-flex align-items-center"> 
                                    <div className="account-title text-center text-white">
                                        <img src="assets/images/logo-sm.png" alt="" className="thumb-sm"/>
                                        <h4 className="mt-3 text-white">Welcome To <span className="text-warning">Metrica</span> </h4>
                                        <h1 className="text-white">Let's Get Started</h1>
                                        <p className="font-18 mt-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam laoreet tellus ut tincidunt euismod.</p>
                                        <div className="border w-25 mx-auto border-warning"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5 col-xl-3 col-lg-4">
                                <div className="card mb-0 border-0">
                                    <div className="card-body p-0">
                                        <div className="text-center p-3">
                                            <a href="index.html" className="logo logo-admin">
                                                <img src="assets/images/logo-sm.png" height="50" alt="logo" className="auth-logo"/>
                                            </a>
                                            <h4 className="mt-3 mb-1 fw-semibold font-18">Let's Get Started Metrica</h4>   
                                            <p className="text-muted  mb-0">Sign in to continue to Metrica.</p>  
                                        </div>
                                    </div>
                                    <div class="btn-group filter-options">
                                        <button class="btn btn-primary active" onClick={()=>setLoginWith('email')}>Login with E-mail</button>
                                        <button class="btn btn-primary" onClick={()=>setLoginWith('mobile')}>Login with Mobile</button>
                                    </div>
                                    <div className="card-body pt-0">                                    
                                        <form className="my-4" action="index.html">            
                                            {loginWith === 'email'?<div className="form-group mb-2">
                                                <label className="form-label" htmlFor="email">User E-mail</label>
                                                <input type="text" 
                                                className="form-control" 
                                                id="email" 
                                                name="email" 
                                                value={userAdmin.email} 
                                                required={true}
                                                onChange={(e) => handleChange(e)}
                                                placeholder="Enter username"/>                               
                                            </div>:
                                            loginWith === 'mobile'?
                                            <div className="form-group">
                                                <label className="form-label" htmlFor="userpassword">Mobile</label>                                            
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    name="mobile" 
                                                    id="userpassword" 
                                                    value={userAdmin.mobile} 
                                                    placeholder="Enter Mobile"
                                                    required={true}
                                                    onChange={(e) => handleChange(e)}
                                                    />                            
                                            </div>
                                            :''
                                            }
                                            {
                                                OTPShow && 
                                                <div className="form-group mb-2">
                                                    <label className="form-label" htmlFor="otpText">Please Enter OTP!</label>
                                                    <input type="text" 
                                                    className="form-control" 
                                                    id="otpText" 
                                                    name="otpText" 
                                                    value={otpText} 
                                                    maxLength={4}
                                                    required={true}
                                                    onChange={(e) => handleChangeOTP(e)}
                                                    placeholder="Enter OTP"/>                               
                                                </div>
                                            }
                                            {errorMsg && <div className="text-center mt-n5">
                                                <h6 className="card-bg px-3 my-4 d-inline-block">{errorMsg}</h6>
                                            </div>}
                                            {/* <div className="form-group row mt-3">
                                                <div className="col-sm-6">
                                                    <div className="form-check form-switch form-switch-success">
                                                        <input className="form-check-input" type="checkbox" id="customSwitchSuccess"/>
                                                        <label className="form-check-label" htmlFor="customSwitchSuccess">Remember me</label>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6 text-end">
                                                    <a href="auth-recover-pw.html" className="text-muted font-13"><i className="dripicons-lock"></i> Forgot password?</a>                                    
                                                </div>
                                            </div> */}
                                            
                                            <div className="form-group mb-0 row">
                                                <div className="col-12">
                                                    <div className="d-grid mt-3">
                                                        <button className="btn btn-primary" onClick={ ()=>OTPShow?OTPVerify():sendLogin()} type="button">{OTPShow ? 'Verify OTP':'Log In'} <i className="fas fa-sign-in-alt ms-1"></i></button>
                                                    </div>
                                                </div>
                                            </div>                           
                                        </form>
                                        <div className="m-3 text-center text-muted">
                                            <p className="mb-0">Don't have an account ?  <a href="auth-register-alt.html" className="text-primary ms-2">Free Resister</a></p>
                                        </div>
                                        <hr className="hr-dashed mt-4"/>
                                        <div className="text-center mt-n5">
                                            <h6 className="card-bg px-3 my-4 d-inline-block">Or Login With</h6>
                                        </div>
                                        <div className="d-flex justify-content-center mb-1">
                                            <a href="" className="d-flex justify-content-center align-items-center thumb-sm bg-soft-primary rounded-circle me-2">
                                                <i className="fab fa-facebook align-self-center"></i>
                                            </a>
                                            <a href="" className="d-flex justify-content-center align-items-center thumb-sm bg-soft-info rounded-circle me-2">
                                                <i className="fab fa-twitter align-self-center"></i>
                                            </a>
                                            <a href="" className="d-flex justify-content-center align-items-center thumb-sm bg-soft-danger rounded-circle">
                                                <i className="fab fa-google align-self-center"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
