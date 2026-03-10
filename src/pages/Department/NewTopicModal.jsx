import { useState } from 'react';
import styles from './Department.module.css';

export default function NewTopicModal({ deptNumber, gradient, onSubmit, onClose }) {
  const [pseudo, setPseudo] = useState('');
  const [tag, setTag] = useState('Tournoi');
  const [titre, setTitre] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ pseudo, tag, titre, message });
    onClose();
  };

  const accentColor = gradient[0];

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={`${styles.glassPanel} ${styles.modalContent}`}
        onClick={e => e.stopPropagation()}
      >
        <button className={styles.modalClose} onClick={onClose}>&times;</button>
        <h2 style={{ marginTop: 0, color: '#2d3436' }}>Lancer un sujet ({deptNumber})</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className={styles.formInput}
            placeholder="Votre pseudo"
            required
            value={pseudo}
            onChange={e => setPseudo(e.target.value)}
            style={{ '--focus-color': accentColor }}
          />
          <select className={styles.formInput} value={tag} onChange={e => setTag(e.target.value)}>
            <option value="Tournoi">Tournoi</option>
            <option value="Terrain">Terrain</option>
            <option value="Vente">Vente</option>
            <option value="Autre">Autre</option>
          </select>
          <input
            type="text"
            className={styles.formInput}
            placeholder="Titre du sujet"
            required
            value={titre}
            onChange={e => setTitre(e.target.value)}
          />
          <textarea
            rows="3"
            className={styles.formInput}
            placeholder="Votre message..."
            required
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className={styles.btnSubmit}
            style={{ background: accentColor }}
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}
