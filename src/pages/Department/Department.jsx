import { useParams, Navigate } from 'react-router-dom';
import { departments } from '../../data/departments';
import BasicLayout from './BasicLayout';
import EnhancedLayout from './EnhancedLayout';
import SocialLayout from './SocialLayout';

const LAYOUTS = {
  basic: BasicLayout,
  enhanced: EnhancedLayout,
  social: SocialLayout,
};

export default function Department() {
  const { id } = useParams();
  const dept = departments[id];

  if (!dept) {
    return <Navigate to="/carte" replace />;
  }

  const LayoutComponent = LAYOUTS[dept.layout] || BasicLayout;
  return <LayoutComponent dept={dept} />;
}
