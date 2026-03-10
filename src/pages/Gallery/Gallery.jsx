import { useState, useRef } from 'react';
import Modal from '../../components/ui/Modal';
import styles from './Gallery.module.css';

const INITIAL_PHOTOS = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500',
    desc: 'Belle journée de pétanque !',
    type: 'public',
    likes: 12,
    comments: 3,
  },
];

export default function Gallery() {
  const [photos, setPhotos] = useState(INITIAL_PHOTOS);
  const [activeTab, setActiveTab] = useState('public');
  const [modalPhoto, setModalPhoto] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [desc, setDesc] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreviewSrc(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const resetUpload = () => {
    setPreviewSrc(null);
    setDesc('');
    setIsPublic(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const confirmUpload = () => {
    if (!previewSrc) return;
    const type = isPublic ? 'public' : 'private';
    const newPhoto = {
      id: Date.now(),
      src: previewSrc,
      desc: desc || 'Souvenir Pétanque Online',
      type,
      likes: 0,
      comments: 0,
    };
    setPhotos(prev => [newPhoto, ...prev]);
    resetUpload();
    setActiveTab(type);
  };

  const filteredPhotos = photos.filter(p => p.type === activeTab);

  const handleZoneClick = (e) => {
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'BUTTON') {
      fileInputRef.current?.click();
    }
  };

  return (
    <>
      <div className={styles.uploadSection}>
        <div className={styles.uploadZone} onClick={handleZoneClick}>
          <img src="/images/logo1.png" alt="Logo" className={styles.uploadCardLogo} />
          <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleFileChange} />

          {!previewSrc ? (
            <div className={styles.uploadPlaceholder}>
              <i className="fa-solid fa-camera"></i>
              <h2>Partager un moment</h2>
              <p style={{ color: 'var(--text-muted)' }}>Cliquez ici pour choisir une photo</p>
            </div>
          ) : (
            <div className={styles.uploadPreview}>
              <div className={styles.previewImgContainer}>
                <img src={previewSrc} alt="Preview" />
              </div>
              <div className={styles.uploadForm}>
                <input type="text" placeholder="Écrire une description..." value={desc} onChange={e => setDesc(e.target.value)} onClick={e => e.stopPropagation()} />
                <div className={styles.checkboxRow} onClick={e => e.stopPropagation()}>
                  <input type="checkbox" id="is-public-check" checked={isPublic} onChange={e => setIsPublic(e.target.checked)} />
                  <label htmlFor="is-public-check">Rendre cette photo publique</label>
                </div>
                <div className={styles.btnRow} onClick={e => e.stopPropagation()}>
                  <button className={styles.btnPublish} onClick={confirmUpload}>PUBLIER</button>
                  <button className={styles.btnCancel} onClick={resetUpload}>Annuler</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.tabs}>
        <button className={`${styles.tab} ${activeTab === 'public' ? styles.tabActive : ''}`} onClick={() => setActiveTab('public')}>PUBLIC</button>
        <button className={`${styles.tab} ${activeTab === 'private' ? styles.tabActive : ''}`} onClick={() => setActiveTab('private')}>PRIVÉE</button>
      </div>

      <div className={styles.grid}>
        {filteredPhotos.map(photo => (
          <div key={photo.id} className={`${styles.postCard} ${photo.type === 'private' ? styles.privateStyle : ''}`} onClick={() => setModalPhoto(photo)}>
            <div className={styles.imgBox}><img src={photo.src} alt="" /></div>
            <div className={styles.postInfo}>
              <div className={styles.stats}>
                <span><i className="fa-solid fa-heart"></i> {photo.likes}</span>
                {photo.type === 'public' ? (
                  <span><i className="fa-solid fa-comment"></i> {photo.comments}</span>
                ) : (
                  <span className={styles.privateLabel}><i className="fa-solid fa-lock"></i> PRIVÉ</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalPhoto && (
        <Modal onClose={() => setModalPhoto(null)}>
          <div className={styles.modalContainer}>
            <div className={styles.modalLeft}>
              <img src={modalPhoto.src} alt="" />
            </div>
            <div className={styles.modalRight}>
              <h3 style={{ marginTop: 0 }}>Description</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.5 }}>{modalPhoto.desc}</p>
              <div className={styles.commentBox}>
                <p><strong>Admin :</strong> Top cette photo !</p>
              </div>
              <button className={styles.btnPublish} style={{ marginTop: 20, background: 'var(--accent)' }}>LIKER</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
