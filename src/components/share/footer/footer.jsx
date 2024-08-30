import React from 'react'
import styles from './footer.module.css';
import { Link } from 'react-router-dom';
export const Footer = () => {
  return (
    <footer className={styles.footer}>
        <div className={`container ${styles.footerContainer}`}>
            <div>
              <h4 className='font18 poppinsbold textfff mb30'>Company</h4>
              <ul className={styles.footerLink}>
                <li><a href='#' className='font14 footerGray lineHeight30'>About Us</a></li>
                <li><a href='#' className='font14 footerGray lineHeight30'>Partner</a></li>
                <li><a href='#' className='font14 footerGray lineHeight30'>Privacy Policy</a></li>
                <li><a href='#' className='font14 footerGray lineHeight30'>Terms & Conditions</a></li>
              </ul>
            </div>
            <div>
              <h4 className='font18 poppinsbold textfff mb30'>Features</h4>
              <ul className={styles.footerLink}>
                <li><a href='#' className='font14 footerGray lineHeight30'>AI Chat</a></li>
                <li><a href='#' className='font14 footerGray lineHeight30'>Live Chat</a></li>
                <li><a href='#' className='font14 footerGray lineHeight30'>Campaign</a></li>
                <li><a href='#' className='font14 footerGray lineHeight30'>Nudges</a></li>
                <li><a href='#' className='font14 footerGray lineHeight30'>Payments</a></li>
                <li><a href='#' className='font14 footerGray lineHeight30'>Co-browsing</a></li>
                <li><a href='#' className='font14 footerGray lineHeight30'>Video Chat</a></li>
                <li><a href='#' className='font14 footerGray lineHeight30'>One-to-One</a></li>
                <li><a href='#' className='font14 footerGray lineHeight30'>One-to-Many</a></li>
              </ul>
            </div>
            <div>
              <h4 className='font18 poppinsbold textfff mb30'>Resources</h4>
              <ul className={styles.footerLink}>
                <li><a href='#' className='font14 footerGray lineHeight30'>Watch a Demo</a></li>
                <li><a href='#' className='font14 footerGray lineHeight30'>API Docs</a></li>
                <li><a href='#' className='font14 footerGray lineHeight30'>Knowledgebase</a></li>
                <li><a href='#' className='font14 footerGray lineHeight30'>Live Shopping</a></li>
                <li><a href='#' className='font14 footerGray lineHeight30'>Livecommerce Electronics</a></li>
                <li><a href='#' className='font14 footerGray lineHeight30'>Livecommerce Jewellery</a></li>
                <li><a href='#' className='font14 footerGray lineHeight30'>Livecommerce Furniture</a></li>
                <li><a href='#' className='font14 footerGray lineHeight30'>Livecommerce Automobile</a></li>
              </ul>
            </div>
            <div>
              <h4 className='font18 poppinsbold textfff mb30'>Resources</h4>
              <div className={styles.address}>
                <figure><img src='/assets/images/usa.png' className='imgResponsive'/></figure>
                <div className={styles.addressText}>
                  <h5 className='font14 poppinsbold textfff mb10'>USA</h5>
                  <p className='font14 textfff lineHeight20'>Pobox #438, MORRISVILLE,<br/>North Carolina, 27560.</p>
                </div>
              </div>
              <div className={styles.address}>
                <figure><img src='/assets/images/india.png' className='imgResponsive'/></figure>
                <div className={styles.addressText}>
                  <h5 className='font14 poppinsbold textfff mb10'>USA</h5>
                  <p className='font14 textfff lineHeight20'>1/22, 2nd Floor, Asaf Ali Road,<br/>Delhi, 110002.</p>
                </div>
              </div>
            </div>
        </div>
        <div className={`container ${styles.copyRight} ${styles.copyRight1}`}>
          <p>© 2023 Saleassist.ai. All rights reserved.</p>
          <ul className={styles.termsAndCondition}>
            <li><Link to="/privacy-policy" className='text666'>Privacy and Policy</Link></li>
            <li><Link to="/terms-conditions" className='text666'>Terms & Conditions</Link></li>
          </ul>
        </div>
    </footer>
  )
}
