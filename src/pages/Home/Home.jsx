import { Link } from 'react-router-dom';
import styles from './Home.module.css';

export default function Home() {
  return (
    <>
      <main className={styles.heroContainer}>
        <Link to="/carte" className={`${styles.mainCard} ${styles.cardLeft}`}>
          <div className={styles.bubbleBtn}>FORUM</div>
          <div className={styles.hoverText}>Viens discuter avec des passionnes pres de chez toi !</div>
        </Link>
        <a href="#" className={`${styles.mainCard} ${styles.cardRight}`}>
          <div className={styles.bubbleBtn}>Calendrier petanque</div>
          <div className={styles.hoverText}>Trouve ton concours !</div>
        </a>
      </main>

      <section className={styles.bottomNav}>
        <Link to="/boutique" className={styles.navCard}>
          <i className="fa-solid fa-basket-shopping"></i>
          <span>Boutique</span>
        </Link>
        <Link to="/galerie" className={styles.navCard}>
          <i className="fa-solid fa-images"></i>
          <span>Galerie</span>
        </Link>
        <Link to="/quisommesnous" className={styles.navCard}>
          <i className="fa-solid fa-users"></i>
          <span>Qui sommes nous</span>
        </Link>
      </section>
    </>
  );
}
