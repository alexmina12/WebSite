import React from 'react';
import styles from './Footer.module.css';
import fb from '../../assets/fbimg.png';
import twitter from '../../assets/twitterimg.png';
import linkedin from '../../assets/linkedinimg.png';
import insta from '../../assets/instaimg.png';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.section} ${styles['footer-links']}`}>
        <div className={styles['footer-links-div']}>
          <h4>Pentru Afaceri</h4>
          <a href='/employer'>Angajator</a>
          <a href='/healthplan'>Plan de Sănătate</a>
          <a href='/individual'>Persoană Individuală</a>
        </div>
        <div className={styles['footer-links-div']}>
          <h4>Resurse</h4>
          <a href='/resourcecenter'>Centru de Resurse</a>
          <a href='/testimonials'>Păreri</a>
          <a href='/stv'>STV</a>
        </div>
        <div className={styles['footer-links-div']}>
          <h4>Parteneri</h4>
          <a href='/employer'>Swing Tech</a>
        </div>
        <div className={styles['footer-links-div']}>
          <h4>Companie</h4>
          <a href='/about'>Despre</a>
          <a href='/press'>Presă</a>
          <a href='/career'>Carieră</a>
          <a href='/contact'>Contact</a>
        </div>
        <div className={styles['footer-links-div']}>
          <h4>În curând pe</h4>
          <div className={styles.socialmedia}>
            <a href='https://www.facebook.com/' target='_blank' rel='noopener noreferrer'>
              <img src={fb} alt='Facebook' />
            </a>
            <a href='https://twitter.com/' target='_blank' rel='noopener noreferrer'>
              <img src={twitter} alt='Twitter' />
            </a>
            <a href='https://www.linkedin.com/' target='_blank' rel='noopener noreferrer'>
              <img src={linkedin} alt='LinkedIn' />
            </a>
            <a href='https://www.instagram.com/' target='_blank' rel='noopener noreferrer'>
              <img src={insta} alt='Instagram' />
            </a>
          </div>
        </div>
      </div>
      <hr className={styles.hr} />
      <div className={styles['footer-below']}>
        <div className={styles['footer-copyright']}>
          <p>
            &copy;{(new Date().getFullYear())} ShopWise, Toate drepturile rezervate
          </p>
        </div>
        <div className={styles['footer-below-links']}>
          <a href="/terms">Termeni și Condiții</a>
          <a href="/privacy">Confidențialitate</a>
          <a href="/security">Securitate</a>
          <a href="/cookie">Declarație Cookie</a>
        </div>
      </div>
    </footer>
  );
}
