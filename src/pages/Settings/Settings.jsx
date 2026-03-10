import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import Switch from '../../components/ui/Switch';
import styles from './Settings.module.css';

export default function Settings() {
  const { darkMode, toggleDarkMode } = useTheme();

  const handleSave = () => {
    alert('Preferences sauvegardees avec succes !');
  };

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settingsHeader}>
        <h1>Parametres</h1>
        <p>Gerez vos preferences et la confidentialite de votre compte Petanque Online.</p>
      </div>

      <div className={styles.settingsCard}>
        <div className={styles.settingSection}>
          <div className={styles.sectionTitle}><i className="fa-solid fa-palette"></i> Apparence</div>
          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <h4>Mode Sombre</h4>
              <p>Optimise l'affichage pour les environnements sombres.</p>
            </div>
            <Switch checked={darkMode} onChange={toggleDarkMode} />
          </div>
          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <h4>Sons du site</h4>
              <p>Activer les effets sonores lors des interactions.</p>
            </div>
            <Switch checked={true} onChange={() => {}} />
          </div>
        </div>

        <div className={styles.settingSection}>
          <div className={styles.sectionTitle}><i className="fa-solid fa-bell"></i> Notifications</div>
          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <h4>Alertes Concours</h4>
              <p>Notifications pour les nouveaux tournois dans votre region.</p>
            </div>
            <Switch checked={true} onChange={() => {}} />
          </div>
          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <h4>Activites Forum</h4>
              <p>Notifications pour les reponses a vos messages.</p>
            </div>
            <Switch checked={true} onChange={() => {}} />
          </div>
        </div>

        <div className={styles.settingSection}>
          <div className={styles.sectionTitle}><i className="fa-solid fa-shield-halved"></i> Confidentialite</div>
          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <h4>Profil Public</h4>
              <p>Permettre aux autres membres de voir vos statistiques.</p>
            </div>
            <Switch checked={true} onChange={() => {}} />
          </div>
          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <h4>Afficher ma ville</h4>
              <p>Ma position approximative est visible sur la carte du forum.</p>
            </div>
            <Switch checked={false} onChange={() => {}} />
          </div>
        </div>

        <div className={styles.actions}>
          <Link to="/" className={styles.btnBack}>Annuler</Link>
          <button className={styles.btnSave} onClick={handleSave}>Enregistrer</button>
        </div>
      </div>
    </div>
  );
}
