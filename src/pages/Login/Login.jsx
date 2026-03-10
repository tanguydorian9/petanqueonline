import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
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
        <h2>Bon retour !</h2>
        <p>Connectez-vous pour rejoindre la famille !</p>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input type="email" placeholder="votre@email.com" required value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label>Mot de passe</label>
            <input type="password" placeholder="••••••••" required value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" className={styles.btnLogin}>Se connecter</button>
        </form>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.divider}><hr /> ou <hr /></div>

        <div className={styles.socialGroup}>
          <button onClick={() => handleSocialLogin(new GoogleAuthProvider())} className={styles.socialBtn}>
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" width="18" alt="Google" />
            Continuer avec Google
          </button>
          <button onClick={() => handleSocialLogin(new FacebookAuthProvider())} className={`${styles.socialBtn} ${styles.btnFb}`}>
            <i className="fa-brands fa-facebook-f"></i>
            Continuer avec Facebook
          </button>
        </div>

        <div className={styles.switchAuth}>
          Pas encore de compte ? <Link to="/inscriptions">Inscrivez-vous ici</Link>
        </div>
      </div>
    </div>
  );
}
