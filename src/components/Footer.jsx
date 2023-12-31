import React from "react";
import styles from "../styles/Footer.module.css";
import Logo from "../images/LogoFoot.svg";

function Footer() {
  return (

    <footer className={styles.footer}>
      <div className={styles.logo}>
        <img className={styles.imgLogo} src={Logo} alt="Logo"></img>
      </div>
      <div className={styles.info}>
        <div className={styles.contacts}>
          <div>г. Москва, Цветной б-р, 40</div>
          <div>+7 495 771 21 11 </div>
          <div>info@skan.ru</div>
        </div>
        <div>Copyright. 2023</div>
      </div>
    </footer>

  );
}

export default Footer;
