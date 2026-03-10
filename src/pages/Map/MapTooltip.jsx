import { createPortal } from 'react-dom';
import styles from './Map.module.css';

export default function MapTooltip({ name, number, visible, x, y }) {
  if (!visible) return null;

  return createPortal(
    <div
      className={`${styles.tooltip} ${styles.tooltipVisible}`}
      style={{ left: x, top: y }}
    >
      {name} (<span style={{ color: '#3498db', fontWeight: 800 }}>{number}</span>)
    </div>,
    document.body
  );
}
