import styles from './Legal.module.css';

export default function Legal() {
  return (
    <div className={styles.legalContainer}>
      <div className={styles.legalCard}>
        <h1>Mentions Légales</h1>

        <section>
          <h2>1. Édition du site</h2>
          <p>En vertu de l'article 6 de la loi n&deg; 2004-575 du 21 juin 2004, il est précisé aux utilisateurs du site <strong>Pétanque Online</strong> l'identité des différents intervenants :</p>
          <ul>
            <li><strong>Propriétaire / Éditeur :</strong> [Ton Nom &amp; Prénom]</li>
            <li><strong>Contact :</strong> tanguy.dorian9@gmail.com</li>
            <li><strong>Directeur de la publication :</strong> [Ton Nom]</li>
          </ul>
        </section>

        <section>
          <h2>2. Hébergement</h2>
          <p>Le site est hébergé par :</p>
          <ul>
            <li><strong>Hébergeur :</strong> [Nom de ton hébergeur, ex: GitHub Pages / Hostinger]</li>
            <li><strong>Adresse :</strong> [Adresse de l'hébergeur]</li>
          </ul>
        </section>

        <section>
          <h2>3. Propriété intellectuelle</h2>
          <p>Le nom "Pétanque Online", les logos, les graphismes et les contenus textuels sont la propriété exclusive de l'éditeur. Toute reproduction, même partielle, est interdite sans accord préalable, conformément à l'article L.122-4 du Code de la propriété intellectuelle.</p>
        </section>

        <section>
          <h2>4. Données personnelles (RGPD)</h2>
          <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression de vos données.</p>
          <p>Les données collectées (Email, Pseudo) servent uniquement à la gestion de votre compte utilisateur sur le forum et la boutique. Elles ne seront jamais vendues à des tiers.</p>
          <p>Pour exercer vos droits, contactez : <strong>tanguy.dorian9@gmail.com</strong></p>
        </section>

        <section>
          <h2>5. Cookies</h2>
          <p>Le site <strong>Pétanque Online</strong> peut utiliser des cookies pour assurer la connexion de l'utilisateur. Vous pouvez configurer votre navigateur pour les refuser, mais certaines fonctionnalités du site pourraient ne plus fonctionner.</p>
        </section>

        <div className={styles.legalFooter}>
          &copy; 2026 Pétanque Online. Tous droits réservés.
        </div>
      </div>
    </div>
  );
}
