import styles from './Legal.module.css';

export default function Legal() {
  return (
    <div className={styles.legalContainer}>
      <div className={styles.legalCard}>
        <h1>Mentions Legales</h1>

        <section>
          <h2>1. Edition du site</h2>
          <p>En vertu de l'article 6 de la loi n&deg; 2004-575 du 21 juin 2004, il est precise aux utilisateurs du site <strong>Petanque Online</strong> l'identite des differents intervenants :</p>
          <ul>
            <li><strong>Proprietaire / Editeur :</strong> [Ton Nom &amp; Prenom]</li>
            <li><strong>Contact :</strong> tanguy.dorian9@gmail.com</li>
            <li><strong>Directeur de la publication :</strong> [Ton Nom]</li>
          </ul>
        </section>

        <section>
          <h2>2. Hebergement</h2>
          <p>Le site est heberge par :</p>
          <ul>
            <li><strong>Hebergeur :</strong> [Nom de ton hebergeur, ex: GitHub Pages / Hostinger]</li>
            <li><strong>Adresse :</strong> [Adresse de l'hebergeur]</li>
          </ul>
        </section>

        <section>
          <h2>3. Propriete intellectuelle</h2>
          <p>Le nom "Petanque Online", les logos, les graphismes et les contenus textuels sont la propriete exclusive de l'editeur. Toute reproduction, meme partielle, est interdite sans accord prealable, conformement a l'article L.122-4 du Code de la propriete intellectuelle.</p>
        </section>

        <section>
          <h2>4. Donnees personnelles (RGPD)</h2>
          <p>Conformement au Reglement General sur la Protection des Donnees (RGPD), vous disposez d'un droit d'acces, de rectification et de suppression de vos donnees.</p>
          <p>Les donnees collectees (Email, Pseudo) servent uniquement a la gestion de votre compte utilisateur sur le forum et la boutique. Elles ne seront jamais vendues a des tiers.</p>
          <p>Pour exercer vos droits, contactez : <strong>tanguy.dorian9@gmail.com</strong></p>
        </section>

        <section>
          <h2>5. Cookies</h2>
          <p>Le site <strong>Petanque Online</strong> peut utiliser des cookies pour assurer la connexion de l'utilisateur. Vous pouvez configurer votre navigateur pour les refuser, mais certaines fonctionnalites du site pourraient ne plus fonctionner.</p>
        </section>

        <div className={styles.legalFooter}>
          &copy; 2026 Petanque Online. Tous droits reserves.
        </div>
      </div>
    </div>
  );
}
