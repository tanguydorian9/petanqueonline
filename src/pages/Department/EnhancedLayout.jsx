import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTopics } from '../../hooks/useTopics';
import { useWeather } from '../../hooks/useWeather';
import TopicCard from './TopicCard';
import NewTopicModal from './NewTopicModal';
import styles from './Department.module.css';

export default function EnhancedLayout({ dept }) {
  const { topics, addTopic, deleteTopic, toggleLike, clearAll } = useTopics(dept.number, dept.defaultTopic);
  const { temp } = useWeather(dept.latitude, dept.longitude);
  const [showModal, setShowModal] = useState(false);
  const [joined, setJoined] = useState(() => localStorage.getItem(`joined_${dept.number}`) === 'true');
  const mapRef = useRef(null);

  const gradientStyle = {
    background: `linear-gradient(45deg, ${dept.gradient[0]}, ${dept.gradient[1]})`,
  };

  const weatherGradient = {
    background: `linear-gradient(135deg, ${dept.gradient[1]}, ${dept.gradient[0]})`,
  };

  useEffect(() => {
    if (!mapRef.current || !window.L) return;
    const map = window.L.map(mapRef.current).setView([dept.latitude, dept.longitude], 10);
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
    }).addTo(map);
    return () => map.remove();
  }, [dept.latitude, dept.longitude]);

  // Load Leaflet dynamically
  useEffect(() => {
    if (window.L) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      if (mapRef.current) {
        const map = window.L.map(mapRef.current).setView([dept.latitude, dept.longitude], 10);
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap',
        }).addTo(map);
      }
    };
    document.head.appendChild(script);
  }, []);

  const handleJoin = () => {
    setJoined(true);
    localStorage.setItem(`joined_${dept.number}`, 'true');
  };

  const handleLeave = () => {
    setJoined(false);
    localStorage.removeItem(`joined_${dept.number}`);
  };

  return (
    <div className={styles.deptPage}>
      <div className={`${styles.appLayout} ${styles.enhancedLayout}`}>
        <aside className={`${styles.sidebar} ${styles.glassPanel}`}>
          <Link to="/carte" className={styles.btnHome}>&#x2B05; Carte</Link>

          <div className={styles.headerDept}>
            <div className={styles.deptNumber} style={gradientStyle}>{dept.number}</div>
            <div className={styles.deptName}>{dept.name}</div>
          </div>

          <div ref={mapRef} className={styles.mapWidget}></div>

          <div className={styles.weatherWidget} style={weatherGradient}>
            <span className={styles.weatherCity}>{dept.city}</span>
            <div className={styles.weatherHeader}>
              <div className={styles.weatherTemp}>{temp !== null ? `${temp}\u00b0` : '--\u00b0'}</div>
              <div className={styles.weatherIcon}>&#x2600;&#xFE0F;</div>
            </div>
          </div>

          <button
            className={`${styles.btnJoin} ${joined ? styles.btnJoined : ''}`}
            style={!joined ? gradientStyle : undefined}
            onClick={handleJoin}
            disabled={joined}
          >
            {joined ? 'Membre !' : 'Rejoindre l\'equipe'}
          </button>

          {joined && (
            <button className={styles.btnLeave} onClick={handleLeave}>
              Quitter l'equipe
            </button>
          )}

          <br /><br />
          <button className={styles.btnReset} onClick={() => { if (confirm('Vraiment tout effacer ?')) clearAll(); }}>
            Reset
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
        style={{ color: dept.gradient[0] }}
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
