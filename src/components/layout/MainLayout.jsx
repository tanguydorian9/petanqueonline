import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const PAGES_WITHOUT_FOOTER = ['/connexion', '/inscriptions', '/parametre', '/mentionslegales'];

export default function MainLayout() {
  const location = useLocation();
  const showFooter = !PAGES_WITHOUT_FOOTER.includes(location.pathname);

  return (
    <>
      <Navbar />
      <Outlet />
      {showFooter && <Footer />}
    </>
  );
}
