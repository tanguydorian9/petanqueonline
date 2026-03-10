import { useState, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Profile.module.css';

export default function Profile() {
  const { profile } = useAuth();
  const fileInputRef = useRef(null);
  const [avatarSrc, setAvatarSrc] = useState(
    `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.pseudo || 'Joueur')}&background=A67B5B&color=fff&size=150`
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatarSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Modifications enregistrées !');
  };

  return (
    <div className={styles.profileContainer}>
      <aside className={styles.profileSidebar}>
        <div className={styles.profileInfo}>
          <div className={styles.avatarWrapper}>
            <img src={avatarSrc} alt="Profil" className={styles.avatarImg} />
            <label className={styles.changePhotoBtn} onClick={() => fileInputRef.current?.click()}>
              <i className="fa-solid fa-camera"></i>
            </label>
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={handleImageChange} />
          </div>
          <h1 className={styles.profileName}>{profile?.pseudo || 'Joueur'}</h1>
          <span className={styles.profileRole}>Membre de la famille depuis 2026</span>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}><span>24</span><label>Concours</label></div>
            <div className={styles.statItem}><span>12</span><label>Photos</label></div>
          </div>
        </div>
      </aside>

      <main className={styles.profileMain}>
        <h2>Paramètres du compte</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.settingsGroup}>
            <h3>Informations personnelles</h3>
            <div className={styles.inputRow}>
              <div className={styles.field}>
                <label>Nom complet</label>
                <input type="text" defaultValue={profile?.pseudo || 'Joueur'} />
              </div>
              <div className={styles.field}>
                <label>Adresse Email</label>
                <input type="email" defaultValue={profile?.email || ''} />
              </div>
            </div>
          </div>
          <div className={styles.settingsGroup}>
            <h3>Sécurité</h3>
            <div className={styles.inputRow}>
              <div className={styles.field}>
                <label>Nouveau mot de passe</label>
                <input type="password" placeholder="••••••••" />
              </div>
              <div className={styles.field}>
                <label>Confirmer le mot de passe</label>
                <input type="password" placeholder="••••••••" />
              </div>
            </div>
          </div>
          <button type="submit" className={styles.btnSave}>Enregistrer les modifications</button>
        </form>
        <div className={styles.dangerZone}>
          <button className={styles.btnDelete}>Désactiver mon compte</button>
        </div>
      </main>
    </div>
  );
}
