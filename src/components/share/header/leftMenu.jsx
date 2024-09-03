import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Loader } from '../Loader/Loader';
import { getItemFromCookie,setItemInCookie,removeItemInCookie } from '../../../helpers/cookie';
import { adminLogOut } from '../../../services/userServices'
export const LeftMenu = ({showLeftMenu}) => {
    const [menu,setMenu] = useState(1);
    const [loader,setLoader] = useState(false);
    const userAdminLogin = getItemFromCookie('userAdminLogin');
    const userEmail = getItemFromCookie('userEmail');
    const userMobile = getItemFromCookie('mobile');
    const navigate = useNavigate();
    const setCurrentMenu = (id)=>{
        id === menu?setMenu(-1):setMenu(id);
    }
    const userLogout = async () =>{
        if(userAdminLogin){
            setLoader(true)
          let logout = await adminLogOut(userMobile != undefined?userMobile:userEmail);
          if(logout.success === 1){
                setLoader(false)
                removeItemInCookie('userEmail');
                removeItemInCookie('userAdminLogin');
                navigate('/login');
          }else{
                setLoader(false)
                removeItemInCookie('userEmail');
                removeItemInCookie('userAdminLogin');
                navigate('/login');
          }
        }else{
                setLoader(false)
                removeItemInCookie('userEmail');
                removeItemInCookie('userAdminLogin');
                navigate('/login');
        }
      }
  return (
    <>
        {loader && <Loader/>}
        <div className="leftbar-tab-menu">
            <div className="main-icon-menu">
                <a href="/dashboard" className="logo logo-metrica d-block text-center">
                    <span>
                        <img src="/assets/images/logo-sm.png" alt="logo-small" className="logo-sm"/>
                    </span>
                </a>
                <div className="main-icon-menu-body">
                    <div className="position-reletive h-100" data-simplebar style={{overflowX: 'hidden;'}}>
                        <ul className="nav nav-tabs" role="tablist" id="tab-menu">
                            <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="right" title="Dashboard" data-bs-trigger="hover">
                                <a href="#MetricaDashboard" id="dashboard-tab" className={`nav-link ${menu ===1?`active`:''}`} onClick={()=>setCurrentMenu(1)}>
                                    <i className="ti ti-smart-home menu-icon"></i>
                                </a>
                            </li>
                            {/* <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="right" title="Apps" data-bs-trigger="hover">
                                <a href="#MetricaApps" id="apps-tab" className={`nav-link ${menu ===2?`active`:''}`} onClick={()=>setCurrentMenu(2)}>
                                    <i className="ti ti-apps menu-icon"></i>
                                </a>
                            </li>

                            <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="right" title="Uikit" data-bs-trigger="hover">
                                <a href="#MetricaUikit" id="uikit-tab" className={`nav-link ${menu ===3?`active`:''}`} onClick={()=>setCurrentMenu(3)}>
                                    <i className="ti ti-planet menu-icon"></i>
                                </a>
                            </li>

                            <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="right" title="Pages" data-bs-trigger="hover">
                                <a href="#MetricaPages" id="pages-tab" className={`nav-link ${menu ===4?`active`:''}`} onClick={()=>setCurrentMenu(4)}>
                                    <i className="ti ti-files menu-icon"></i>
                                </a>
                            </li>

                            <li className="nav-item" data-bs-toggle="tooltip" data-bs-placement="right" title="Authentication" data-bs-trigger="hover">
                                <a href="#MetricaAuthentication" id="authentication-tab" className={`nav-link ${menu ===5?`active`:''}`} onClick={()=>setCurrentMenu(5)}>
                                    <i className="ti ti-shield-lock menu-icon"></i>
                                </a>
                            </li> */}
                        </ul>
                    </div>
                </div>
                <div className="pro-metrica-end">
                    <a href="" className="profile">
                        <img src="/assets/images/users/user-4.jpg" alt="profile-user" className="rounded-circle thumb-sm"/>
                    </a>
                </div>
            </div>
            <div className="main-menu-inner">
                
                <div className="topbar-left">
                    <a href="index.html" className="logo">
                        <span>
                            <img src="/assets/images/logo-dark.png" alt="logo-large" className="logo-lg logo-dark"/>
                            <img src="/assets/images/logo.png" alt="logo-large" className="logo-lg logo-light"/>
                        </span>
                    </a>
                </div>
                
                <div className={`menu-body navbar-vertical tab-content ${showLeftMenu && `menuitem-active`}`} data-simplebar>
                    <div id="MetricaDashboard" className={`main-icon-menu-pane tab-pane ${menu === 1?`active show`:''}`} role="tabpanel"
                        aria-labelledby="dasboard-tab">
                        <div className="title-box">
                            <h6 className="menu-title">Dashboard</h6>
                        </div>

                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <Link className="nav-link" to={'./dashboard'}>Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/waste-category'}>Waste Category</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/banner'}>Add Banner</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'/cityUpdate'}>City Manage</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/weight-manage">Weight Manage</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/weight-manage"></Link>
                            </li>
                            <li className="nav-item pe-none" onClick={()=>userLogout()}>
                                <span className="nav-link" >Logout</span>
                            </li>
                        </ul>
                    </div>

                    <div id="MetricaApps" className={`main-icon-menu-pane tab-pane ${menu === 2?`active show`:''}`} role="tabpanel"
                        aria-labelledby="apps-tab">
                        <div className="title-box">
                            <h6 className="menu-title">Apps</h6>
                        </div>
                        <div className="collapse navbar-collapse" id="sidebarCollapse">
                            
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="#sidebarAnalytics" data-bs-toggle="collapse" role="button"
                                        aria-expanded="false" aria-controls="sidebarAnalytics">
                                        Analytics
                                    </a>
                                    <div className="collapse " id="sidebarAnalytics">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <a href="analytics-customers.html" className="nav-link ">Customers</a>
                                            </li>
                                            <li className="nav-item">
                                                <a href="analytics-reports.html" className="nav-link ">Reports</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="#sidebarCrypto" data-bs-toggle="collapse" role="button"
                                        aria-expanded="false" aria-controls="sidebarCrypto">
                                        Crypto
                                    </a>
                                    <div className="collapse " id="sidebarCrypto">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <a className="nav-link" href="crypto-exchange.html">Exchange</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="crypto-wallet.html">Wallet</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="crypto-news.html">Crypto News</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="crypto-ico.html">ICO List</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="crypto-settings.html">Settings</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="#sidebarCRM" data-bs-toggle="collapse" role="button"
                                        aria-expanded="false" aria-controls="sidebarCRM">
                                        CRM
                                    </a>
                                    <div className="collapse " id="sidebarCRM">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <a className="nav-link" href="crm-contacts.html">Contacts</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="crm-opportunities.html">Opportunities</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="crm-leads.html">Leads</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="crm-customers.html">Customers</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="#sidebarProjects" data-bs-toggle="collapse" role="button"
                                        aria-expanded="false" aria-controls="sidebarProjects">
                                        Projects
                                    </a>
                                    <div className="collapse " id="sidebarProjects">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <a className="nav-link" href="projects-clients.html">Clients</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="projects-team.html">Team</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="projects-project.html">Project</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="projects-task.html">Task</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="projects-kanban-board.html">Kanban Board</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="projects-chat.html">Chat</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="projects-users.html">Users</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="projects-create.html">Project Create</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="#sidebarEcommerce" data-bs-toggle="collapse" role="button"
                                        aria-expanded="false" aria-controls="sidebarEcommerce">
                                        Ecommerce
                                    </a>
                                    <div className="collapse " id="sidebarEcommerce">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <a className="nav-link" href="ecommerce-products.html">Products</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="ecommerce-product-list.html">Product List</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="ecommerce-product-detail.html">Product Detail</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="ecommerce-cart.html">Cart</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="ecommerce-checkout.html">Checkout</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="#sidebarHelpdesk" data-bs-toggle="collapse" role="button"
                                        aria-expanded="false" aria-controls="sidebarHelpdesk">
                                        Helpdesk
                                    </a>
                                    <div className="collapse " id="sidebarHelpdesk">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <a className="nav-link" href="helpdesk-teckets.html">Tickets</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="helpdesk-reports.html">Reports</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="helpdesk-agents.html">Agents</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="#sidebarHospital" data-bs-toggle="collapse" role="button"
                                        aria-expanded="false" aria-controls="sidebarHospital">
                                        Hospital
                                    </a>
                                    <div className="collapse " id="sidebarHospital">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <a href="#sidebarAppointments " className="nav-link" data-bs-toggle="collapse"
                                                    role="button" aria-expanded="false" aria-controls="sidebarAppointments">
                                                    Appointments 
                                                </a>
                                                <div className="collapse " id="sidebarAppointments">
                                                    <ul className="nav flex-column">
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="hospital-doctor-shedule.html">Dr. Shedule</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="hospital-all-appointments.html">All Appointments</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                            <li className="nav-item">
                                                <a href="#sidebarDoctors" className="nav-link" data-bs-toggle="collapse"
                                                    role="button" aria-expanded="false" aria-controls="sidebarDoctors">
                                                    Doctors
                                                </a>
                                                <div className="collapse" id="sidebarDoctors">
                                                    <ul className="nav flex-column">
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="hospital-all-doctors.html">All Doctors</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="hospital-add-doctor.html">Add Doctor</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="hospital-doctor-edit.html">Doctor Edit</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="hospital-doctor-profile.html">Doctor Profile</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>

                                            <li className="nav-item">
                                                <a href="#sidebarPatients" className="nav-link" data-bs-toggle="collapse"
                                                    role="button" aria-expanded="false" aria-controls="sidebarPatients">
                                                    Patients
                                                </a>
                                                <div className="collapse" id="sidebarPatients">
                                                    <ul className="nav flex-column">
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="hospital-all-patients.html">All Patients</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="hospital-add-patient.html">Add Patient</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="hospital-patient-edit.html">Patient Edit</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="hospital-patient-profile.html">Patient Profile</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>

                                            <li className="nav-item">
                                                <a href="#sidebarPayments" className="nav-link" data-bs-toggle="collapse"
                                                    role="button" aria-expanded="false" aria-controls="sidebarPayments">
                                                    Payments
                                                </a>
                                                <div className="collapse" id="sidebarPayments">
                                                    <ul className="nav flex-column">
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="hospital-all-payments.html">All Payments</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="hospital-payment-invoice.html">Payment Invoice</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="hospital-cashless-payments.html">Cashless Payments</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>

                                            <li className="nav-item">
                                                <a href="#sidebarStaff" className="nav-link" data-bs-toggle="collapse"
                                                    role="button" aria-expanded="false" aria-controls="sidebarStaff">
                                                    Staff
                                                </a>
                                                <div className="collapse" id="sidebarStaff">
                                                    <ul className="nav flex-column">
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="hospital-all-staff.html">All Staff</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="hospital-add-member.html">Add Member</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="hospital-edit-member.html">Edit Member</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="hospital-member-profile.html">Member Profile</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="hospital-salary.html">Staff Salary</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>

                                            <li className="nav-item">
                                                <a href="#sidebarGeneral" className="nav-link" data-bs-toggle="collapse"
                                                    role="button" aria-expanded="false" aria-controls="sidebarGeneral">
                                                    General
                                                </a>
                                                <div className="collapse" id="sidebarGeneral">
                                                    <ul className="nav flex-column">
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="hospital-all-rooms.html">Room Allotments</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="hospital-expenses.html">Expenses Report</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="hospital-departments.html">Departments</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="hospital-insurance-company.html">Insurance Co.</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="hospital-events.html">Events</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="hospital-leaves.html">Leaves</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="hospital-holidays.html">Holidays</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="hospital-attendance.html">Attendance</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" href="hospital-chat.html">Chat</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="#sidebarEmail" data-bs-toggle="collapse" role="button"
                                        aria-expanded="false" aria-controls="sidebarEmail">
                                        Email
                                    </a>
                                    <div className="collapse " id="sidebarEmail">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <a className="nav-link" href="apps-email-inbox.html">Inbox</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="apps-email-read.html">Read Email</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="apps-chat.html">Chat</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="apps-contact-list.html">Contact List</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="apps-calendar.html">Calendar</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="apps-invoice.html">Invoice</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div id="MetricaUikit" className={`main-icon-menu-pane tab-pane ${menu === 3?`active show`:''}`} role="tabpanel"
                        aria-labelledby="uikit-tab">
                        <div className="title-box">
                            <h6 className="menu-title">UI Kit</h6>
                        </div>
                        <div className="collapse navbar-collapse" id="sidebarCollapse_2">
                            
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="#sidebarElements" data-bs-toggle="collapse" role="button"
                                        aria-expanded="false" aria-controls="sidebarElements">
                                    UI Elements
                                    </a>
                                    <div className="collapse " id="sidebarElements">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <a className="nav-link" href="ui-alerts.html">Alerts</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="ui-avatar.html">Avatar</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="ui-buttons.html">Buttons</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="ui-badges.html">Badges</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="ui-cards.html">Cards</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="ui-carousels.html">Carousels</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="ui-dropdowns.html">Dropdowns</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="ui-grids.html">Grids</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="ui-images.html">Images</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="ui-list.html">List</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="ui-modals.html">Modals</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="ui-navs.html">Navs</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="ui-navbar.html">Navbar</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="ui-paginations.html">Paginations</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="ui-popover-tooltips.html">Popover & Tooltips</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="ui-progress.html">Progress</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="ui-spinners.html">Spinners</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="ui-tabs-accordions.html">Tabs & Accordions</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="ui-typography.html">Typography</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="ui-videos.html">Videos</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="#sidebarAdvancedUI" data-bs-toggle="collapse" role="button"
                                        aria-expanded="false" aria-controls="sidebarAdvancedUI">
                                        Advanced UI
                                    </a>
                                    <div className="collapse " id="sidebarAdvancedUI">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <a className="nav-link" href="advanced-animation.html">Animation</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="advanced-clipboard.html">Clip Board</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="advanced-dragula.html">Dragula</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="advanced-files.html">File Manager</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="advanced-highlight.html">Highlight</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="advanced-rangeslider.html">Range Slider</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="advanced-ratings.html">Ratings</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="advanced-ribbons.html">Ribbons</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="advanced-sweetalerts.html">Sweet Alerts</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="advanced-toasts.html">Toasts</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="#sidebarForms" data-bs-toggle="collapse" role="button"
                                        aria-expanded="false" aria-controls="sidebarForms">
                                        Forms
                                    </a>
                                    <div className="collapse " id="sidebarForms">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <a className="nav-link" href="forms-elements.html">Basic Elements</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="forms-advanced.html">Advance Elements</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="forms-validation.html">Validation</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="forms-wizard.html">Wizard</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="forms-editors.html">Editors</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="forms-uploads.html">File Upload</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="forms-img-crop.html">Image Crop</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="#sidebarCharts" data-bs-toggle="collapse" role="button"
                                        aria-expanded="false" aria-controls="sidebarCharts">
                                    Charts
                                    </a>
                                    <div className="collapse " id="sidebarCharts">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <a className="nav-link" href="charts-apex.html">Apex</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="charts-justgage.html">JustGage</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="charts-chartjs.html">Chartjs</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="charts-toast-ui.html">Toast</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="#sidebarTables" data-bs-toggle="collapse" role="button"
                                        aria-expanded="false" aria-controls="sidebarTables">
                                        Tables
                                    </a>
                                    <div className="collapse " id="sidebarTables">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <a className="nav-link" href="tables-basic.html">Basic</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="tables-datatable.html">Datatables</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="tables-editable.html">Editable</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="#sidebarIcons" data-bs-toggle="collapse" role="button"
                                        aria-expanded="false" aria-controls="sidebarIcons">
                                    Icons
                                    </a>
                                    <div className="collapse " id="sidebarIcons">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <a className="nav-link" href="icons-materialdesign.html">Material Design</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="icons-fontawesome.html">Font awesome</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="icons-tabler.html">Tabler</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="icons-feather.html">Feather</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="#sidebarMaps" data-bs-toggle="collapse" role="button"
                                        aria-expanded="false" aria-controls="sidebarMaps">
                                        Maps
                                    </a>
                                    <div className="collapse " id="sidebarMaps">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <a className="nav-link" href="maps-google.html">Google Maps</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="maps-leaflet.html">Leaflet Maps</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="maps-vector.html">Vector Maps</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="#sidebarEmailTemplates" data-bs-toggle="collapse" role="button"
                                        aria-expanded="false" aria-controls="sidebarEmailTemplates">
                                        Email Templates
                                    </a>
                                    <div className="collapse " id="sidebarEmailTemplates">
                                        <ul className="nav flex-column">
                                            <li className="nav-item">
                                                <a className="nav-link" href="email-templates-basic.html">Basic Action Email</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="email-templates-alert.html">Alert Email</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="email-templates-billing.html">Billing Email</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div id="MetricaPages" className={`main-icon-menu-pane tab-pane ${menu === 4?`active show`:''}`} role="tabpanel" aria-labelledby="pages-tab">
                        <div className="title-box">
                            <h6 className="menu-title">Pages</h6>
                        </div>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link" href="pages-profile.html">Profile</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="pages-tour.html">Tour</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="pages-timeline.html">Timeline</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="pages-treeview.html">Treeview</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="pages-starter.html">Starter Page</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="pages-pricing.html">Pricing</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="pages-blogs.html">Blogs</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="pages-faq.html">FAQs</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="pages-gallery.html">Gallery</a>
                            </li>
                        </ul>
                    </div>

                    <div id="MetricaAuthentication" className={`main-icon-menu-pane tab-pane ${menu === 5?`active show`:''}`} role="tabpanel"
                        aria-labelledby="authentication-tab">
                        <div className="title-box">
                            <h6 className="menu-title">Authentication</h6>
                        </div>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link" href="auth-login.html">Log in</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="auth-login-alt.html">Log in alt</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="auth-register.html">Register</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="auth-register-alt.html">Register-alt</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="auth-recover-pw.html">Re-Password</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="auth-recover-pw-alt.html">Re-Password-alt</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="auth-lock-screen.html">Lock Screen</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="auth-lock-screen-alt.html">Lock Screen-alt</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="auth-404.html">Error 404</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="auth-404-alt.html">Error 404-alt</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="auth-500.html">Error 500</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="auth-500-alt.html">Error 500-alt</a>
                            </li>
                        </ul>
                    </div>
                </div>
                
            </div>
        </div>
    </>
  )
}
