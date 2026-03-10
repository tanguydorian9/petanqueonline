import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import Settings from './pages/Settings/Settings';
import Shop from './pages/Shop/Shop';
import Gallery from './pages/Gallery/Gallery';
import About from './pages/About/About';
import Legal from './pages/Legal/Legal';
import Map from './pages/Map/Map';
import Department from './pages/Department/Department';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/connexion" element={<Login />} />
              <Route path="/inscriptions" element={<Register />} />
              <Route path="/compte" element={<Profile />} />
              <Route path="/parametre" element={<Settings />} />
              <Route path="/boutique" element={<Shop />} />
              <Route path="/galerie" element={<Gallery />} />
              <Route path="/quisommesnous" element={<About />} />
              <Route path="/mentionslegales" element={<Legal />} />
            </Route>
            <Route path="/carte" element={<Map />} />
            <Route path="/departements/:id" element={<Department />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
