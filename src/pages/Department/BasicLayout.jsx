import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTopics } from '../../hooks/useTopics';
import TopicCard from './TopicCard';
import NewTopicModal from './NewTopicModal';
import styles from './Department.module.css';

export default function BasicLayout({ dept }) {
  const { topics, addTopic, deleteTopic, toggleLike, clearAll } = useTopics(dept.number, dept.defaultTopic);
  const [showModal, setShowModal] = useState(false);

  const gradientStyle = {
    background: `linear-gradient(45deg, ${dept.gradient[0]}, ${dept.gradient[1]})`,
  };

  return (
    <div className={styles.deptPage}>
      <div className={styles.appLayout}>
        <aside className={`${styles.sidebar} ${styles.glassPanel}`}>
          <Link to="/carte" className={styles.btnHome}>&#x2B05; Carte</Link>
          <div className={styles.deptNumber} style={gradientStyle}>{dept.number}</div>
          <div className={styles.deptName}>{dept.name}</div>
          <p style={{ marginTop: 20, color: '#636e72' }}>{dept.description}</p>
          <div className={styles.topicCount}>
            <strong>{topics.length}</strong> sujets actifs
          </div>
          <button className={styles.btnReset} onClick={() => { if (confirm('Vraiment tout effacer ?')) clearAll(); }}>
            Reset Tout
          </button>
        </aside>

        <main>
          <h2 className={styles.feedTitle}>{dept.feedTitle}</h2>
          <div>
            {[...topics].reverse().map(topic => (
              <TopicCard
                key={topic.id}
                topic={topic}
                gradient={dept.gradient}
                onDelete={(id) => { if (confirm('Supprimer ce message ?')) deleteTopic(id); }}
                onLike={toggleLike}
              />
            ))}
          </div>
        </main>
      </div>

      <button
        className={styles.fab}
        style={{ color: dept.gradient[1] }}
        onClick={() => setShowModal(true)}
      >+</button>

      {showModal && (
        <NewTopicModal
          deptNumber={dept.number}
          gradient={dept.gradient}
          onSubmit={addTopic}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
