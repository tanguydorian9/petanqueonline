import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import styles from './Register.module.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        pseudo: username,
        email,
        createdAt: new Date(),
      });
      navigate('/');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const docSnap = await getDoc(doc(db, 'users', user.uid));
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          pseudo: user.displayName || 'Joueur',
          email: user.email,
          createdAt: new Date(),
        });
      }
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <img src="/images/logo1.png" alt="Logo" className={styles.cardLogoTop} />
        <h2>Bienvenue !</h2>
        <p>Creez votre compte pour rejoindre la famille Petanque Online.</p>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Pseudo</label>
            <input type="text" placeholder="Ton nom de joueur" required value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input type="email" placeholder="votre@email.com" required value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label>Mot de passe</label>
            <input type="password" placeholder="Minimum 6 caracteres" required value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label>Confirmer le mot de passe</label>
            <input type="password" placeholder="Tapez-le a nouveau" required value={confirm} onChange={e => setConfirm(e.target.value)} />
          </div>
          <button type="submit" className={styles.btnRegister} disabled={loading}>
            {loading ? 'Chargement...' : 'Creer mon compte'}
          </button>
        </form>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.divider}><hr /> ou <hr /></div>

        <button type="button" onClick={() => handleSocialLogin(new GoogleAuthProvider())} className={styles.socialBtn}>
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="18" alt="Google" />
          S'inscrire avec Google
        </button>
        <button type="button" onClick={() => handleSocialLogin(new FacebookAuthProvider())} className={`${styles.socialBtn} ${styles.btnFb}`}>
          <i className="fa-brands fa-facebook-f"></i>
          S'inscrire avec Facebook
        </button>

        <div className={styles.switchAuth}>
          Deja membre ? <Link to="/connexion">Connectez-vous ici</Link>
        </div>
      </div>
    </div>
  );
}
