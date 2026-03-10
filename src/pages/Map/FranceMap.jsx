import { useState, useCallback } from 'react';
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

export default function FranceMap({ searchQuery, onHover, onHoverEnd }) {
  const navigate = useNavigate();
  const [hoveredDept, setHoveredDept] = useState(null);

  const handleMouseEnter = useCallback((dept, e) => {
    setHoveredDept(dept.number);
    onHover?.(dept, e);
  }, [onHover]);

  const handleMouseLeave = useCallback(() => {
    setHoveredDept(null);
    onHoverEnd?.();
  }, [onHoverEnd]);

  const handleClick = useCallback((dept) => {
    navigate(`/departements/${dept.number}`);
  }, [navigate]);

  const isSearchMatch = (dept) => {
    if (!searchQuery) return false;
    const q = searchQuery.toLowerCase().trim();
    return dept.name.toLowerCase().includes(q) || dept.number.includes(q);
  };

  return (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox={SVG_VIEWBOX}>
      {regions.map(region => (
        <g key={region.code} className={`region region-${region.code}`} data-nom={region.name}>
          {region.departments.map(dept => {
            const isHovered = hoveredDept === dept.number;
            const isMatch = isSearchMatch(dept);
            let style = { ...PATH_STYLE };
            if (isMatch) style = { ...style, ...SEARCH_STYLE };
            if (isHovered) style = { ...style, ...HOVER_STYLE };

            return (
              <path
                key={dept.number}
                d={dept.path}
                data-nom={dept.name}
                data-numerodepartement={dept.number}
                style={style}
                onMouseEnter={(e) => handleMouseEnter(dept, e)}
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
