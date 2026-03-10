import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const PAGES_WITH_FOOTER = ['/', '/quisommesnous'];

export default function MainLayout() {
  const location = useLocation();
  const showFooter = PAGES_WITH_FOOTER.includes(location.pathname);

  return (
    <>
      <Navbar />
      <Outlet />
      {showFooter && <Footer />}
    </>
  );
}
