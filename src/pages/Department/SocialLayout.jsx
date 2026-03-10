import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWeather } from '../../hooks/useWeather';
import confetti from 'canvas-confetti';
import styles from './Department.module.css';

function getNow() {
  const d = new Date();
  return `Le ${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')} a ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}

const PSEUDOS = ['Marco03', 'Petanqueuse03', 'LaGachette', 'Moulinois'];

function generateInitialData() {
  return Array.from({ length: 5 }, (_, i) => ({
    id: i,
    user: PSEUDOS[Math.floor(Math.random() * PSEUDOS.length)],
    content: 'Salut l\'Allier ! Pret pour une partie aujourd\'hui ?',
    img: null,
    comments: [],
    likes: Math.floor(Math.random() * 10),
    isLiked: false,
    date: 'Aujourd\'hui',
  }));
}

export default function SocialLayout({ dept }) {
  const { temp } = useWeather(dept.latitude, dept.longitude);
  const [posts, setPosts] = useState(() => {
    const stored = localStorage.getItem(`posts_${dept.number}_v2`);
    return stored ? JSON.parse(stored) : generateInitialData();
  });
  const [postInput, setPostInput] = useState('');
  const [previewImg, setPreviewImg] = useState(null);
  const [viewMode, setViewMode] = useState('feed');
  const [currentPostId, setCurrentPostId] = useState(null);
  const [commentInput, setCommentInput] = useState('');

  const savePosts = (updated) => {
    setPosts(updated);
    localStorage.setItem(`posts_${dept.number}_v2`, JSON.stringify(updated));
  };

  const publishPost = () => {
    if (!postInput && !previewImg) return;
    const newPost = {
      id: Date.now(),
      user: 'Moi',
      content: postInput,
      img: previewImg,
      comments: [],
      likes: 0,
      isLiked: false,
      date: getNow(),
    };
    savePosts([...posts, newPost]);
    setPostInput('');
    setPreviewImg(null);
    confetti({ particleCount: 40, spread: 60, colors: ['#2094e3', '#ffffff'] });
  };

  const handleImageInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreviewImg(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const openComments = (id) => {
    setCurrentPostId(id);
    setViewMode('comments');
  };

  const addComment = () => {
    if (!commentInput) return;
    const updated = posts.map(p =>
      p.id === currentPostId
        ? { ...p, comments: [...p.comments, { user: 'Moi', text: commentInput }] }
        : p
    );
    savePosts(updated);
    setCommentInput('');
  };

  const currentPost = posts.find(p => p.id === currentPostId);

  return (
    <div className={styles.socialPage}>
      <nav className={styles.socialNavbar}>
        <Link to="/" className={styles.navLogo}>Petanque Online</Link>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link to="/" className={styles.navBtn}><i className="fa-solid fa-house"></i> Accueil</Link>
          <Link to="/compte" className={styles.navBtn}><i className="fa-solid fa-user"></i> Mon Profil</Link>
        </div>
      </nav>

      <aside className={styles.socialSidebar}>
        <div className={styles.card}>
          <div className={styles.sidebarMenu}>
            <Link to="/" className={styles.navBtn}><i className="fa-solid fa-house"></i> Menu principal</Link>
            <Link to="/carte" className={styles.navBtn}><i className="fa-solid fa-map-location-dot"></i> Retour a la Carte</Link>
          </div>
          <hr style={{ border: 0, borderTop: '1px solid #eee', margin: '15px 0' }} />
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ color: '#2094e3', margin: 0, fontWeight: 800 }}>{dept.name.toUpperCase()} ({dept.number})</h2>
            <small style={{ color: 'var(--text-muted)' }}>Espace local</small>
          </div>
        </div>

        <div className={`${styles.card} ${styles.socialWeather}`}>
          <small>METEO - {dept.city.toUpperCase()}</small>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
            <span className={styles.tempVal}>{temp !== null ? `${temp}\u00b0` : '--\u00b0'}</span>
            <i className="fa-solid fa-cloud-sun" style={{ fontSize: '2.2rem' }}></i>
          </div>
        </div>

        <div className={styles.card}>
          <h3 style={{ marginTop: 0, fontSize: '1.1rem', fontWeight: 800 }}>Mes Amis</h3>
          <div className={styles.friendItem}>
            <img src="https://i.pravatar.cc/100?u=Dede" className={styles.pfpMini} alt="" />
            <span>Dede03</span>
          </div>
          <div className={styles.friendItem}>
            <img src="https://i.pravatar.cc/100?u=Marie" className={styles.pfpMini} alt="" />
            <span>LaVichyssoise</span>
          </div>
        </div>
      </aside>

      <main className={styles.socialMain}>
        {viewMode === 'feed' ? (
          <>
            <div className={`${styles.publishBox} ${styles.card}`}>
              <textarea
                placeholder={`Quoi de neuf dans ${dept.name} ?`}
                rows="2"
                value={postInput}
                onChange={e => setPostInput(e.target.value)}
              />
              {previewImg && (
                <div style={{ position: 'relative', display: 'inline-block', marginTop: 15 }}>
                  <img src={previewImg} style={{ maxHeight: 200, borderRadius: 12, display: 'block' }} alt="" />
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, borderTop: '1px solid #f1f1f1', paddingTop: 12 }}>
                <label style={{ cursor: 'pointer', color: '#2094e3', fontSize: '1.6rem' }}>
                  <i className="fa-regular fa-image"></i>
                  <input type="file" hidden accept="image/*" onChange={handleImageInput} />
                </label>
                <button className={styles.btnAccent} onClick={publishPost}>Publier</button>
              </div>
            </div>

            <h3 style={{ fontWeight: 800, marginLeft: 5, color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
              Fil d'actualite
            </h3>

            <div>
              {[...posts].reverse().map(post => (
                <div key={post.id} className={styles.post} onClick={() => openComments(post.id)}>
                  <div style={{ display: 'flex', gap: 18 }}>
                    <img src={`https://i.pravatar.cc/100?u=${post.user}`} className={styles.pfpPost} alt="" />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong style={{ color: '#2094e3' }}>{post.user}</strong>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{post.date}</span>
                      </div>
                      <div style={{ margin: '10px 0' }}>{post.content}</div>
                      {post.img && <img src={post.img} style={{ width: '100%', borderRadius: 15, marginTop: 10 }} alt="" />}
                      <div style={{ marginTop: 15, fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700, display: 'flex', gap: 20 }}>
                        <span>&#128172; {post.comments.length}</span>
                        <span className={post.isLiked ? styles.liked : ''}>&#10084;&#65039; {post.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className={styles.card}>
            <button onClick={() => setViewMode('feed')} style={{ border: 'none', background: 'none', color: '#2094e3', cursor: 'pointer', fontWeight: 800, marginBottom: 15, fontFamily: 'inherit' }}>
              &#x2B05; Retour au fil
            </button>
            {currentPost && (
              <>
                <h4 style={{ color: '#2094e3' }}>{currentPost.user}</h4>
                <p>{currentPost.content}</p>
                <hr style={{ border: 0, borderTop: '1px solid #eee', margin: '20px 0' }} />
                <div>
                  {currentPost.comments.map((c, i) => (
                    <div key={i} style={{ padding: 10, borderBottom: '1px solid #eee' }}>
                      <strong>{c.user}</strong>: {c.text}
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 25 }}>
                  <input
                    type="text"
                    value={commentInput}
                    onChange={e => setCommentInput(e.target.value)}
                    style={{ flex: 1, padding: 14, borderRadius: 14, border: '1px solid #ddd', fontFamily: 'inherit' }}
                    placeholder="Repondre..."
                  />
                  <button className={styles.btnAccent} onClick={addComment}>Envoyer</button>
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
