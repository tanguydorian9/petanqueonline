import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import Switch from '../../components/ui/Switch';
import styles from './Settings.module.css';

export default function Settings() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [sounds, setSounds] = useState(true);
  const [alertsConcours, setAlertsConcours] = useState(true);
  const [activitesForum, setActivitesForum] = useState(true);
  const [profilPublic, setProfilPublic] = useState(true);
  const [afficherVille, setAfficherVille] = useState(false);

  const handleSave = () => {
    alert('Préférences sauvegardées avec succès !');
  };

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settingsHeader}>
        <h1>Paramètres</h1>
        <p>Gérez vos préférences et la confidentialité de votre compte Pétanque Online.</p>
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
            <Switch checked={sounds} onChange={() => setSounds(v => !v)} />
          </div>
        </div>

        <div className={styles.settingSection}>
          <div className={styles.sectionTitle}><i className="fa-solid fa-bell"></i> Notifications</div>
          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <h4>Alertes Concours</h4>
              <p>Notifications pour les nouveaux tournois dans votre région.</p>
            </div>
            <Switch checked={alertsConcours} onChange={() => setAlertsConcours(v => !v)} />
          </div>
          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <h4>Activités Forum</h4>
              <p>Notifications pour les réponses à vos messages.</p>
            </div>
            <Switch checked={activitesForum} onChange={() => setActivitesForum(v => !v)} />
          </div>
        </div>

        <div className={styles.settingSection}>
          <div className={styles.sectionTitle}><i className="fa-solid fa-shield-halved"></i> Confidentialité</div>
          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <h4>Profil Public</h4>
              <p>Permettre aux autres membres de voir vos statistiques.</p>
            </div>
            <Switch checked={profilPublic} onChange={() => setProfilPublic(v => !v)} />
          </div>
          <div className={styles.settingRow}>
            <div className={styles.settingInfo}>
              <h4>Afficher ma ville</h4>
              <p>Ma position approximative est visible sur la carte du forum.</p>
            </div>
            <Switch checked={afficherVille} onChange={() => setAfficherVille(v => !v)} />
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
