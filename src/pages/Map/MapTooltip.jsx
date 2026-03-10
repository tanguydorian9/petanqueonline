import styles from './Map.module.css';

export default function MapTooltip({ name, number, visible, x, y }) {
  if (!visible) return null;

  return (
    <div
      className={`${styles.tooltip} ${styles.tooltipVisible}`}
      style={{ left: x, top: y }}
    >
      {name} ({number})
    </div>
  );
}
