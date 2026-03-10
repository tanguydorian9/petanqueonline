import { Link } from 'react-router-dom';
import styles from './Shop.module.css';

export default function Shop() {
  return (
    <main className={styles.maintenanceContainer}>
      <h1 className={styles.maintenanceText}>
        Cette page est en cours de preparation,<br />
        l'equipe Petanque Online y travaille actuellement.
      </h1>
      <img src="/images/aie.png" alt="Aie, crochete !" className={styles.maintenanceImg} />
      <Link to="/" className={styles.backBtn}>Retourner au menu</Link>
    </main>
  );
}
