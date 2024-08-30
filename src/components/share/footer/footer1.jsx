import React from 'react'
import styles from './footer.module.css';
import { Link } from 'react-router-dom';
export const Footer1 = () => {
  return (
    <footer className={`${styles.footer1} ${styles.footer}`}>
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
