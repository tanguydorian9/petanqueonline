import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTopics } from '../../hooks/useTopics';
import { useWeather } from '../../hooks/useWeather';
import TopicCard from './TopicCard';
import NewTopicModal from './NewTopicModal';
import styles from './Department.module.css';

function getWeatherInfo(code) {
  if (code === null || code === undefined) return { desc: 'Chargement...', icon: '\u2600\uFE0F' };
  if (code === 0) return { desc: 'Ciel dégagé', icon: '\u2600\uFE0F' };
  if (code <= 3) return { desc: 'Partiellement nuageux', icon: '\u26C5' };
  if (code <= 49) return { desc: 'Brouillard', icon: '\uD83C\uDF2B\uFE0F' };
  if (code <= 59) return { desc: 'Bruine', icon: '\uD83C\uDF27\uFE0F' };
  if (code <= 69) return { desc: 'Pluie', icon: '\uD83C\uDF27\uFE0F' };
  if (code <= 79) return { desc: 'Neige', icon: '\u2744\uFE0F' };
  if (code <= 84) return { desc: 'Averses', icon: '\uD83C\uDF26\uFE0F' };
  if (code <= 94) return { desc: 'Neige', icon: '\u2744\uFE0F' };
  return { desc: 'Orage', icon: '\u26A1' };
}

export default function EnhancedLayout({ dept }) {
  const { topics, addTopic, deleteTopic, toggleLike, clearAll } = useTopics(dept.number, dept.defaultTopic);
  const { temp, weatherCode } = useWeather(dept.latitude, dept.longitude);
  const [showModal, setShowModal] = useState(false);
  const [joined, setJoined] = useState(() => localStorage.getItem(`joined_${dept.number}`) === 'true');
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [citySearch, setCitySearch] = useState('');
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const weatherInfo = getWeatherInfo(weatherCode);

  const gradientStyle = {
    background: `linear-gradient(45deg, ${dept.gradient[0]}, ${dept.gradient[1]})`,
  };

  const weatherGradient = {
    background: `linear-gradient(135deg, ${dept.gradient[1]}, ${dept.gradient[0]})`,
  };

  // Single map initialization
  useEffect(() => {
    let map = null;

    const initMap = () => {
      if (!mapRef.current || !window.L || mapInstanceRef.current) return;
      map = window.L.map(mapRef.current).setView([dept.latitude, dept.longitude], 10);
      window.L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
      }).addTo(map);
      window.L.marker([dept.latitude, dept.longitude]).addTo(map)
        .bindPopup(`${dept.name} (${dept.number})`).openPopup();
      mapInstanceRef.current = map;
    };

    if (window.L) {
      initMap();
    } else {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = initMap;
      document.head.appendChild(script);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [dept.latitude, dept.longitude, dept.name, dept.number]);

  // City search
  const searchCity = useCallback(async (query) => {
    if (query.length < 3) {
      setCitySuggestions([]);
      return;
    }
    try {
      const res = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5&type=municipality`);
      const data = await res.json();
      setCitySuggestions(data.features?.map(f => ({
        label: f.properties.label,
        lat: f.geometry.coordinates[1],
        lon: f.geometry.coordinates[0],
      })) || []);
    } catch {
      setCitySuggestions([]);
    }
  }, []);

  const handleCitySelect = (city) => {
    setCitySearch(city.label);
    setCitySuggestions([]);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([city.lat, city.lon], 13);
      window.L.marker([city.lat, city.lon]).addTo(mapInstanceRef.current)
        .bindPopup(city.label).openPopup();
    }
  };

  // Speech recognition
  const toggleSpeech = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('La reconnaissance vocale n\'est pas supportée par votre navigateur.');
      return;
    }
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'fr-FR';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setShowModal(true);
      window.__speechTranscript = transcript;
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  // Confetti effect
  const fireConfetti = () => {
    const duration = 800;
    const end = Date.now() + duration;
    const colors = [dept.gradient[0], dept.gradient[1], '#ffffff', '#ffd700'];
    const frame = () => {
      const el = document.createElement('div');
      el.style.cssText = `position:fixed;top:-10px;left:${Math.random()*100}vw;font-size:${Math.random()*20+15}px;z-index:9999;pointer-events:none;animation:fall ${Math.random()*1.5+0.5}s linear forwards;`;
      el.innerText = ['🎉','🎊','✨','🏆'][Math.floor(Math.random()*4)];
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 2500);
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };

  // Tear rain effect
  const fireTearRain = () => {
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const el = document.createElement('div');
        el.innerText = '💧';
        el.style.cssText = `position:fixed;top:-20px;left:${Math.random()*100}vw;font-size:${Math.random()*15+12}px;z-index:9999;pointer-events:none;animation:fall ${Math.random()*2+1}s linear forwards;`;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 3000);
      }, i * 50);
    }
  };

  const handleJoin = () => {
    setJoined(true);
    localStorage.setItem(`joined_${dept.number}`, 'true');
    fireConfetti();
  };

  const handleLeave = () => {
    if (!confirm(`Voulez-vous vraiment quitter l'équipe du ${dept.number} ?`)) return;
    setJoined(false);
    localStorage.removeItem(`joined_${dept.number}`);
    fireTearRain();
  };

  return (
    <div className={styles.deptPage} style={{ animationDuration: '15s' }}>
      <div className={`${styles.appLayout} ${styles.enhancedLayout}`}>
        <aside className={`${styles.sidebar} ${styles.glassPanel}`} style={{ top: 20, padding: 30 }}>
          <Link to="/carte" className={styles.btnHome}>&#x2B05; Carte</Link>

          <div className={styles.headerDept}>
            <div className={styles.deptNumber} style={gradientStyle}>{dept.number}</div>
            <div className={styles.deptName}>{dept.name}</div>
          </div>

          <div style={{ position: 'relative', marginBottom: 15 }}>
            <input
              type="text"
              placeholder="🔍 Rechercher une ville..."
              value={citySearch}
              onChange={e => { setCitySearch(e.target.value); searchCity(e.target.value); }}
              style={{ width: '100%', padding: '10px 15px', borderRadius: 12, border: '2px solid #f1f2f6', fontFamily: 'inherit', boxSizing: 'border-box' }}
            />
            {citySuggestions.length > 0 && (
              <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', borderRadius: 12, boxShadow: '0 5px 20px rgba(0,0,0,0.1)', zIndex: 10, overflow: 'hidden' }}>
                {citySuggestions.map((city, i) => (
                  <div
                    key={i}
                    onClick={() => handleCitySelect(city)}
                    style={{ padding: '10px 15px', cursor: 'pointer', borderBottom: '1px solid #f1f1f1', fontSize: '0.9em' }}
                    onMouseEnter={e => e.target.style.background = '#f0f7ff'}
                    onMouseLeave={e => e.target.style.background = 'white'}
                  >
                    {city.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div ref={mapRef} className={styles.mapWidget}></div>

          <div className={styles.weatherWidget} style={{ ...weatherGradient, boxShadow: '0 5px 15px rgba(0,0,0,0.15)' }}>
            <span className={styles.weatherCity}>{dept.city}</span>
            <div className={styles.weatherHeader}>
              <div>
                <div className={styles.weatherTemp}>{temp !== null ? `${temp}\u00b0` : '--\u00b0'}</div>
                <div style={{ fontSize: '0.85em', opacity: 0.9 }}>{weatherInfo.desc}</div>
              </div>
              <div className={styles.weatherIcon}>{weatherInfo.icon}</div>
            </div>
          </div>

          <button
            className={`${styles.btnJoin} ${joined ? styles.btnJoined : ''}`}
            style={!joined ? { ...gradientStyle, boxShadow: '0 5px 15px rgba(0,0,0,0.2)' } : undefined}
            onClick={handleJoin}
            disabled={joined}
          >
            {joined ? '✅ Membre !' : '🤝 Rejoindre l\'équipe'}
          </button>

          {joined && (
            <button className={styles.btnLeave} onClick={handleLeave}>
              👋 Quitter l'équipe
            </button>
          )}

          <div style={{ marginTop: 15 }}>
            <button
              onClick={toggleSpeech}
              style={{
                width: '100%', padding: 10, borderRadius: 12,
                border: isListening ? '2px solid #ff7675' : '2px solid #f1f2f6',
                background: isListening ? '#fff5f5' : 'white',
                cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700,
                color: isListening ? '#ff7675' : '#636e72',
              }}
            >
              🎤 {isListening ? 'Écoute en cours...' : 'Dicter un message'}
            </button>
          </div>

          <br />
          <button className={styles.btnReset} onClick={() => { if (confirm(`Vraiment tout effacer pour le ${dept.number} ?`)) clearAll(); }}>
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
                onDelete={(id) => { if (confirm(`Supprimer ce message du ${dept.number} ?`)) deleteTopic(id); }}
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
