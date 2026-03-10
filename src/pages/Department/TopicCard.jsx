import { useState, useRef } from 'react';
import styles from './Department.module.css';

const TAG_CLASS = {
  Tournoi: styles.tagTournoi,
  Terrain: styles.tagTerrain,
  Vente: styles.tagVente,
  Autre: styles.tagAutre,
};

export default function TopicCard({ topic, gradient, onDelete, onLike }) {
  const [fading, setFading] = useState(false);
  const cardRef = useRef(null);
  const initial = topic.pseudo.charAt(0).toUpperCase();
  const gradientStyle = {
    background: `linear-gradient(135deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`,
  };

  const handleDelete = (id) => {
    setFading(true);
    setTimeout(() => onDelete(id), 300);
  };

  return (
    <div
      ref={cardRef}
      className={`${styles.glassPanel} ${styles.topic} ${fading ? styles.topicFadeOut : ''}`}
    >
      <div className={styles.topicHeader}>
        <span className={`${styles.tag} ${TAG_CLASS[topic.tag] || styles.tagAutre}`}>
          {topic.tag}
        </span>
        <button className={styles.btnDelete} onClick={() => handleDelete(topic.id)}>
          &#10006;
        </button>
      </div>
      <h3>{topic.titre}</h3>
      <p>{topic.message}</p>
      <div className={styles.topicFooter}>
        <div className={styles.user}>
          <div className={styles.userAvatar} style={gradientStyle}>
            {initial}
          </div>
          {topic.pseudo}
        </div>
        <button className={styles.likeBtn} onClick={() => onLike(topic.id)}>
          <span>&#10084;&#65039;</span> {topic.likes || 0}
        </button>
      </div>
    </div>
  );
}
