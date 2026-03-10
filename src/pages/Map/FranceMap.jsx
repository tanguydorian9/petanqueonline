import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { regions, SVG_VIEWBOX } from '../../assets/franceSvgPaths';

const PATH_STYLE = {
  fill: 'rgba(255, 255, 255, 0.5)',
  stroke: '#ffffff',
  strokeWidth: '1px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
};

const HOVER_STYLE = {
  fill: '#3498db',
  stroke: '#3498db',
  filter: 'drop-shadow(0 0 15px rgba(52, 152, 219, 0.5))',
  transform: 'scale(1.01)',
  transformOrigin: 'center',
};

const SEARCH_STYLE = {
  fill: '#ff7675',
  transform: 'scale(1.02)',
  transformOrigin: 'center',
};

const DIM_STYLE = {
  opacity: 0.2,
};

export default function FranceMap({ searchQuery, onHover, onHoverEnd }) {
  const navigate = useNavigate();
  const [hoveredDept, setHoveredDept] = useState(null);
  const [pulsingDept, setPulsingDept] = useState(null);
  const pulseTimerRef = useRef(null);

  const handleMouseMove = useCallback((dept, e) => {
    setHoveredDept(dept.number);
    onHover?.(dept, e);
  }, [onHover]);

  const handleMouseLeave = useCallback(() => {
    setHoveredDept(null);
    onHoverEnd?.();
  }, [onHoverEnd]);

  const handleClick = useCallback((dept) => {
    setPulsingDept(dept.number);
    clearTimeout(pulseTimerRef.current);
    pulseTimerRef.current = setTimeout(() => {
      setPulsingDept(null);
      navigate(`/departements/${dept.number}`);
    }, 300);
  }, [navigate]);

  const isSearchMatch = (dept) => {
    if (!searchQuery) return false;
    const q = searchQuery.toLowerCase().trim();
    return dept.name.toLowerCase().includes(q) || dept.number.includes(q);
  };

  const hasSearch = searchQuery && searchQuery.trim().length > 0;

  return (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox={SVG_VIEWBOX}>
      <style>{`
        @keyframes pulseMap {
          0% { transform: scale(1); }
          50% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }
        .pulse-effect {
          animation: pulseMap 0.3s ease-in-out;
          transform-origin: center;
        }
      `}</style>
      {regions.map(region => (
        <g key={region.code} className={`region region-${region.code}`} data-nom={region.name}>
          {region.departments.map(dept => {
            const isHovered = hoveredDept === dept.number;
            const isMatch = isSearchMatch(dept);
            const isPulsing = pulsingDept === dept.number;
            const isDimmed = hasSearch && !isMatch;
            let style = { ...PATH_STYLE };
            if (isDimmed) style = { ...style, ...DIM_STYLE };
            if (isMatch) style = { ...style, ...SEARCH_STYLE };
            if (isHovered) style = { ...style, ...HOVER_STYLE };

            return (
              <path
                key={dept.number}
                d={dept.path}
                data-nom={dept.name}
                data-numerodepartement={dept.number}
                style={style}
                className={isPulsing ? 'pulse-effect' : ''}
                onMouseMove={(e) => handleMouseMove(dept, e)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(dept)}
              />
            );
          })}
        </g>
      ))}
    </svg>
  );
}
