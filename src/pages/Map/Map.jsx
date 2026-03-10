import { useState, useEffect, useRef, useCallback } from 'react';
import FranceMap from './FranceMap';
import MapTooltip from './MapTooltip';
import styles from './Map.module.css';

const FAKE_NAMES = ['Dodo', 'Ricardo', 'Polochon57', 'Jordan B', 'Marine LP', 'Tonton H'];
const FAKE_ACTIONS = ['vient de rejoindre le', 'a posté dans le', 'cherche un apéro dans le'];

function useAnimatedCounter(target, duration) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return value;
}

export default function Map() {
  const [searchQuery, setSearchQuery] = useState('');
  const [tooltip, setTooltip] = useState({ visible: false, name: '', number: '', x: 0, y: 0 });
  const [toast, setToast] = useState({ visible: false, user: '', message: '' });
  const [clickCount, setClickCount] = useState(0);
  const clickTimerRef = useRef(null);

  const deptCount = useAnimatedCounter(101, 2000);
  const userCount = useAnimatedCounter(12450, 2500);

  const handleHover = useCallback((dept, e) => {
    setTooltip({
      visible: true,
      name: dept.name,
      number: dept.number,
      x: e.clientX,
      y: e.clientY,
    });
  }, []);

  const handleHoverEnd = useCallback(() => {
    setTooltip(prev => ({ ...prev, visible: false }));
  }, []);

  // Fake notifications
  useEffect(() => {
    let timeout;
    const showNotif = () => {
      const name = FAKE_NAMES[Math.floor(Math.random() * FAKE_NAMES.length)];
      const action = FAKE_ACTIONS[Math.floor(Math.random() * FAKE_ACTIONS.length)];
      const dept = Math.floor(Math.random() * 95) + 1;
      setToast({ visible: true, user: name, message: `${action} ${dept}` });
      setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 4000);
      timeout = setTimeout(showNotif, Math.random() * 10000 + 5000);
    };
    timeout = setTimeout(showNotif, 3000);
    return () => clearTimeout(timeout);
  }, []);

  // Easter egg
  const handleLogoClick = () => {
    setClickCount(prev => prev + 1);
    clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => setClickCount(0), 1000);
  };

  useEffect(() => {
    if (clickCount === 5) {
      const emojis = ['🎱', '🟡', '🏆', '🐷'];
      for (let i = 0; i < 50; i++) {
        const el = document.createElement('div');
        el.innerText = emojis[Math.floor(Math.random() * 4)];
        el.className = styles.fallingObject;
        el.style.left = Math.random() * 100 + 'vw';
        el.style.fontSize = (Math.random() * 30 + 20) + 'px';
        el.style.animationDuration = (Math.random() * 2 + 1) + 's';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 3000);
      }
      setClickCount(0);
    }
  }, [clickCount]);

  return (
    <div className={styles.mapPage}>
      <aside className={styles.sidebar}>
        <div className={styles.logo} onClick={handleLogoClick}>
          🎱 France Pétanque by Dodo
        </div>
        <h1>Choisissez votre terrain de jeu</h1>
        <p>Rejoignez la plus grande communauté de boulistes. Sélectionnez votre département pour voir les tournois et discussions.</p>

        <div className={styles.searchContainer}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Ex: Finistère, 29..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{deptCount}</span>
            <span className={styles.statLabel}>Départements</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{userCount.toLocaleString()}</span>
            <span className={styles.statLabel}>Joueurs</span>
          </div>
        </div>

        <div className={styles.sidebarFooter}>
          &copy; 2025 - France Pétanque by Dodo
        </div>
      </aside>

      <main className={styles.mapWrapper}>
        <FranceMap
          searchQuery={searchQuery}
          onHover={handleHover}
          onHoverEnd={handleHoverEnd}
        />
      </main>
      <MapTooltip {...tooltip} />

      <div className={`${styles.toast} ${toast.visible ? styles.toastVisible : ''}`}>
        <span style={{ fontSize: '1.5em' }}>🟢</span>
        <div>
          <strong>{toast.user}</strong><br />
          <span>{toast.message}</span>
        </div>
      </div>
    </div>
  );
}
