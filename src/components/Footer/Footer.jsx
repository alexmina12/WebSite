import React from 'react';
import styles from './Footer.module.css';
import fb from '../../assets/fbimg.png';
import twitter from '../../assets/twitterimg.png';
import linkedin from '../../assets/linkedinimg.png';
import insta from '../../assets/instaimg.png';


export function Footer() {
  return (
    <footer>
        <div className={styles['section']}>
            <div className={styles['footer-links']}>
            <div className={styles['footer-links-div']}>
                <h4>For Business</h4>
                <a href='/employer'>
                    <p>Employer</p>
                </a>
                <a href='/healthplan'>
                    <p>Health Plan</p>
                </a>
                <a href='/individual'>
                    <p>Individual</p>
                </a>
                </div>
                <div className={styles['footer-links-div']}>
                <h4>Resources</h4>
                <a href='/resourcecenter'>
                    <p>Resource Center</p>
                </a>
                <a href='/testimonials'>
                    <p>Testimonials</p>
                </a>
                <a href='/stv'>
                    <p>STV</p>
                </a>
                </div>
                <div className={styles['footer-links-div']}>
                    <h4>Partners</h4>
                    <a href='/employer'>
                        <p>Swing Tech</p>
                    </a>
                </div>
                <div className={styles['footer-links-div']}>
                    <h4>Company</h4>
                    <a href='/about'>
                        <p>About</p>
                    </a>
                    <a href='/press'>
                        <p>Press</p>
                    </a>
                    <a href='/career'>
                        <p>Career</p>
                    </a>
                    <a href='/contact'>
                        <p>Contact</p>
                    </a>
                </div>
                <div className={styles['footer-links-div']}>
                    <h4>For Business</h4>
                    <a href='/employer'>
                        <p>Employer</p>
                    </a><a href='/healthplan'>
                        <p>Health Plan</p>
                    </a><a href='/individual'>
                        <p>Individual</p>
                    </a>
                </div>
                <div className={styles['footer-links-div']}>
                    <h4>Coming soon on</h4>
                    <div className={styles.socialmedia}>
                    <p><img src={fb} alt=''/></p>
                    <p><img src={twitter} alt=''/></p>
                    <p><img src={linkedin} alt=''/></p>
                    <p><img src={insta} alt=''/></p>
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className={styles['footer-below']}>
                <div className={styles['footer-copyright']}>
                    <p>
                        {(new Date().getFullYear())} ShopWise, All rights reserved &copy; 
                    </p>
                </div>
                <div className={styles['footer-below-links']}>
                    <a href="/terms"><div><p>Terms & Conditions</p></div></a>
                    <a href="/privacy"><div><p>Privacy</p></div></a>
                    <a href="/security"><div><p>Security</p></div></a>
                    <a href="/cookie"><div><p>Cookie Declaration</p></div></a>
                </div>
            </div>
        </div>
    </footer>  )
}