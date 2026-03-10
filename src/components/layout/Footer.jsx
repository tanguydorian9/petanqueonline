import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInfo}>
        &copy; 2026 Petanque Online. Tous droits reserves<br />
        petanqueonline@gmail.com
      </div>
      <div className={styles.footerLogo}>
        <img src="/images/logo1.png" alt="Petanque Online" />
      </div>
      <div className={styles.socials}>
        <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
        <a href="#"><i className="fa-brands fa-tiktok"></i></a>
        <a href="#"><i className="fa-brands fa-instagram"></i></a>
      </div>
    </footer>
  );
}
