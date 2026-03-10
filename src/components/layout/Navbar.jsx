import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? styles.active : '';

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        <img src="/images/logo1.png" alt="Pétanque Online Logo" />
      </Link>

      <div className={styles.navLinks}>
        <Link to="/carte" className={isActive('/carte')}>Forum</Link>
        <a href="#">Concours</a>
        <Link to="/boutique" className={isActive('/boutique')}>Boutique</Link>
        <Link to="/galerie" className={isActive('/galerie')}>Galerie</Link>
      </div>

      <div className={styles.navRight}>
        <div className={styles.userMenuWrapper}>
          {!user ? (
            <Link to="/connexion" className={styles.accountIcon}>
              <i className="fa-regular fa-circle-user"></i>
            </Link>
          ) : (
            <>
              <div className={`${styles.accountIcon} ${styles.activeUser}`}>
                <i className="fa-solid fa-circle-user"></i>
              </div>
              <div className={styles.dropdownContent}>
                <Link to="/compte">Mon Profil</Link>
                <Link to="/parametre">Paramètres</Link>
                <button onClick={logout} className={styles.btnLogoutMenu}>
                  Déconnexion
                </button>
              </div>
            </>
          )}
        </div>
        <Link to="/parametre" className={styles.settingsIcon}>
          <i className="fa-solid fa-sliders"></i>
        </Link>
      </div>
    </nav>
  );
}
