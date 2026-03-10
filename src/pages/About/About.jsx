import { Link } from 'react-router-dom';
import styles from './About.module.css';

export default function About() {
  return (
    <div className={styles.container}>
      <h1>Qui sommes-nous ?</h1>

      <div className={styles.introSection}>
        <div className={styles.photoContainerMain}>
          <img src="/images/pauldorianpetanque.jpeg" alt="Dorian et Paul" className={styles.photoPlaceholder} />
        </div>
        <div>
          <h2>Nous</h2>
          <p>Nous, c'est Dorian et Paul. On se connaît depuis notre plus jeune âge : on a grandi ensemble en étant voisins dans un petit village en Bretagne. Depuis 20 ans, on ne s'est jamais perdus de vue et on est toujours restés de très bons amis.</p>
          <p><strong>Pétanque Online</strong> est né de notre amitié et de la passion de Dorian pour la pétanque. On s'est donné une mission claire : casser l'image du &laquo; sport de camping &raquo; et montrer que la pétanque peut être aussi dynamique que moderne. Notre objectif ? Donner envie aux gens de sortir, de se rencontrer et de vivre de vrais moments de partage sur le terrain.</p>
        </div>
      </div>

      <div className={styles.duoContainer}>
        <div className={styles.personCard}>
          <img src="/images/photodorian1.jpeg" alt="Dorian" className={styles.photoSquare} />
          <h2>Dorian</h2>
          <p>Je m'appelle Dorian, j'ai 22 ans et je viens du Finistère. Je joue à la pétanque depuis l'âge de 5 ans, un sport qui fait partie intégrante de ma vie et de mon histoire familiale, puisque toute ma famille y joue et que mes parents se sont même rencontrés autour d'un terrain de pétanque.</p>
          <p>Calme, sérieux et passionné, j'aime autant la pétanque conviviale que la compétition. À travers Pétanque Online, je souhaite partager mon expérience et transmettre les valeurs fortes de la pétanque : respect, esprit d'équipe et convivialité.</p>
        </div>
        <div className={styles.personCard}>
          <img src="/images/photopaul1.jpg" alt="Paul" className={styles.photoSquare} />
          <h2>Paul</h2>
          <p>Moi, c'est Paul. Souriant, posé et sociable, j'aime avant tout les échanges simples et les bons moments partagés. La pétanque, je la pratique surtout comme un loisir, en famille ou entre amis, pour ce qu'elle représente : la convivialité et le plaisir d'être ensemble.</p>
          <p>Après mes études, j'ai eu envie de passer du côté concret et de me lancer dans un projet qui ait du sens. Avec Pétanque Online, je mets aujourd'hui ma créativité et mes compétences au service d'un projet humain, dynamique et fédérateur.</p>
        </div>
      </div>

      <h2>Présentation</h2>
      <p>L'idée de créer ce site est née de notre envie de rassembler les passionnés de pétanque autour d'un espace commun, où chacun peut échanger, s'informer et partager sa passion, qu'il soit joueur loisir ou compétiteur.</p>

      <h2>Histoire du site</h2>
      <p>Pendant deux mois, chaque matin, on se retrouvait pour travailler sur notre idée, expérimenter des fonctionnalités et résoudre les problèmes ensemble. On a beaucoup appris sur la création d'un projet, sur nous-mêmes et sur la manière de mener une idée à terme. Aujourd'hui, notre site <strong>Pétanque Online</strong> est en ligne et nous espérons le voir grandir. Nous continuerons à travailler pour le faire connaître, auprès de tous les passionnés et des novices qui veulent découvrir la pétanque.</p>

      <h2>Nos 4 rubriques</h2>
      <ul className={styles.rubriquesList}>
        <li><strong>Le forum :</strong> pour discuter, poser des questions, partager des expériences.</li>
        <li><strong>Les concours :</strong> pour retrouver les compétitions partout en France.</li>
        <li><strong>La boutique :</strong> pour s'équiper et représenter la communauté.</li>
        <li><strong>La galerie :</strong> pour partager des photos de tournois, de moments conviviaux et de souvenirs.</li>
      </ul>

      <h2>Nos valeurs</h2>
      <div className={styles.gridValeurs}>
        <div className={styles.valeurItem}>
          <strong>Convivialité</strong>
          <p>La pétanque est avant tout un sport de partage et de bonne humeur. Nous tenons à créer un espace où chacun se sent bienvenu, dans le respect et l'esprit d'amitié.</p>
        </div>
        <div className={styles.valeurItem}>
          <strong>Favoriser les échanges</strong>
          <p>La pétanque est aussi un formidable moyen de créer du lien social. Elle permet de rencontrer du monde, d'échanger, de partager des moments simples et de ne pas rester seul. À travers Pétanque Online, nous souhaitons encourager les rencontres, les discussions et la création d'une vraie communauté.</p>
        </div>
        <div className={styles.valeurItem}>
          <strong>L'Ambition</strong>
          <p>Chacun a ses propres objectifs, qu'ils soient sportifs ou personnels. Avec du travail, de la persévérance et du respect, tout est possible, que ce soit à la pétanque ou dans d'autres domaines de la vie. Nous croyons en l'importance de se fixer des buts et de tout faire pour les atteindre.</p>
        </div>
      </div>

      <div className={styles.ctaSection}>
        <p>Que vous soyez débutant, amateur ou joueur confirmé, nous serons ravis de vous accueillir. Rejoignez notre communauté et partageons ensemble la passion de la pétanque !</p>
        <Link to="/inscriptions" className={styles.btnRegister}>S'inscrire maintenant</Link>
      </div>
    </div>
  );
}
