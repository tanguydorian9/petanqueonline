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
          <p>Nous, c'est Dorian et Paul. On se connait depuis notre plus jeune age : on a grandi ensemble en etant voisins dans un petit village en Bretagne. Depuis 20 ans, on ne s'est jamais perdus de vue et on est toujours restes de tres bons amis.</p>
          <p><strong>Petanque Online</strong> est ne de notre amitie et de la passion de Dorian pour la petanque. On s'est donne une mission claire : casser l'image du &laquo; sport de camping &raquo; et montrer que la petanque peut etre aussi dynamique que moderne. Notre objectif ? Donner envie aux gens de sortir, de se rencontrer et de vivre de vrais moments de partage sur le terrain.</p>
        </div>
      </div>

      <div className={styles.duoContainer}>
        <div className={styles.personCard}>
          <img src="/images/photodorian1.jpeg" alt="Dorian" className={styles.photoSquare} />
          <h2>Dorian</h2>
          <p>Je m'appelle Dorian, j'ai 22 ans et je viens du Finistere. Je joue a la petanque depuis l'age de 5 ans, un sport qui fait partie integrante de ma vie et de mon histoire familiale, puisque toute ma famille y joue et que mes parents se sont meme rencontres autour d'un terrain de petanque.</p>
          <p>Calme, serieux et passionne, j'aime autant la petanque conviviale que la competition. A travers Petanque Online, je souhaite partager mon experience et transmettre les valeurs fortes de la petanque : respect, esprit d'equipe et convivialite.</p>
        </div>
        <div className={styles.personCard}>
          <img src="/images/photopaul1.jpg" alt="Paul" className={styles.photoSquare} />
          <h2>Paul</h2>
          <p>Moi, c'est Paul. Souriant, pose et sociable, j'aime avant tout les echanges simples et les bons moments partages. La petanque, je la pratique surtout comme un loisir, en famille ou entre amis, pour ce qu'elle represente : la convivialite et le plaisir d'etre ensemble.</p>
          <p>Apres mes etudes, j'ai eu envie de passer du cote concret et de me lancer dans un projet qui ait du sens. Avec Petanque Online, je mets aujourd'hui ma creativite et mes competences au service d'un projet humain, dynamique et federateur.</p>
        </div>
      </div>

      <h2>Presentation</h2>
      <p>L'idee de creer ce site est nee de notre envie de rassembler les passionnes de petanque autour d'un espace commun, ou chacun peut echanger, s'informer et partager sa passion, qu'il soit joueur loisir ou competiteur.</p>

      <h2>Histoire du site</h2>
      <p>Pendant deux mois, chaque matin, on se retrouvait pour travailler sur notre idee, experimenter des fonctionnalites et resoudre les problemes ensemble. On a beaucoup appris sur la creation d'un projet, sur nous-memes et sur la maniere de mener une idee a terme. Aujourd'hui, notre site <strong>Petanque Online</strong> est en ligne et nous esperons le voir grandir. Nous continuerons a travailler pour le faire connaitre, aupres de tous les passionnes et des novices qui veulent decouvrir la petanque.</p>

      <h2>Nos 4 rubriques</h2>
      <ul className={styles.rubriquesList}>
        <li><strong>Le forum :</strong> pour discuter, poser des questions, partager des experiences.</li>
        <li><strong>Les concours :</strong> pour retrouver les competitions partout en France.</li>
        <li><strong>La boutique :</strong> pour s'equiper et representer la communaute.</li>
        <li><strong>La galerie :</strong> pour partager des photos de tournois, de moments conviviaux et de souvenirs.</li>
      </ul>

      <h2>Nos valeurs</h2>
      <div className={styles.gridValeurs}>
        <div className={styles.valeurItem}>
          <strong>Convivialite</strong>
          <p>La petanque est avant tout un sport de partage et de bonne humeur. Nous tenons a creer un espace ou chacun se sent bienvenu, dans le respect et l'esprit d'amitie.</p>
        </div>
        <div className={styles.valeurItem}>
          <strong>Favoriser les echanges</strong>
          <p>La petanque est aussi un formidable moyen de creer du lien social. Elle permet de rencontrer du monde, d'echanger, de partager des moments simples et de ne pas rester seul. A travers Petanque Online, nous souhaitons encourager les rencontres, les discussions et la creation d'une vraie communaute.</p>
        </div>
        <div className={styles.valeurItem}>
          <strong>L'Ambition</strong>
          <p>Chacun a ses propres objectifs, qu'ils soient sportifs ou personnels. Avec du travail, de la perseverance et du respect, tout est possible, que ce soit a la petanque ou dans d'autres domaines de la vie. Nous croyons en l'importance de se fixer des buts et de tout faire pour les atteindre.</p>
        </div>
      </div>

      <div className={styles.ctaSection}>
        <p>Que vous soyez debutant, amateur ou joueur confirme, nous serons ravis de vous accueillir. Rejoignez notre communaute et partageons ensemble la passion de la petanque !</p>
        <Link to="/inscriptions" className={styles.btnRegister}>S'inscrire maintenant</Link>
      </div>
    </div>
  );
}
