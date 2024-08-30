import React, { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom"
import { Suspense } from "react"
import { Header,Footer,LeftMenu } from '../share/';
import { useLocation } from 'react-router-dom'
export const Layout = () => {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(true);
  const [showLeftMenu, setLeftMenu] = useState(false);
  useEffect(() => {    
    if(location.pathname == '/login'){
      setShowMenu(false)
    }else{
      setShowMenu(true)
    }
  },[location.pathname]);
  const setShowLeftMenu = ()=>{
    setLeftMenu(!showLeftMenu);
    if(showLeftMenu){
      document.body.classList.remove('menuitem-active', 'enlarge-menu');
      document.body.classList.add('menuitem-active');
    }else{
      document.body.classList.remove('menuitem-active');
      document.body.classList.add('menuitem-active', 'enlarge-menu');
    }
  }
  return (
    <>
        {showMenu?
        <><LeftMenu showLeftMenu={showLeftMenu}/>
        <Header setShowLeftMenu={setShowLeftMenu} showLeftMenu={showLeftMenu}/></>
        :''}
          <main>
              <Suspense fallback={<div>Loading...</div>}>
                  <Outlet />
              </Suspense>
          </main>
    </>
  )
}
