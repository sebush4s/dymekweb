import React, { useState, useEffect } from 'react';
import { Menu, X, Cigarette, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false); // For mobile accordion
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsProductMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-content">
        <div className="logo" onClick={() => {
          if (location.pathname !== '/') navigate('/');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
          <Cigarette className="logo-icon" />
          <span>DYMEK</span>
        </div>

        <nav className={`desktop-nav`}>
          <div className="nav-item-dropdown">
            <button className="dropdown-trigger">
              Produkty <ChevronDown size={16} />
            </button>
            <div className="dropdown-menu">
              <Link to="/products/longfille" className="dropdown-link">Longfille</Link>
              <Link to="/products/olejki" className="dropdown-link">Olejki</Link>
              <Link to="/products/urzadzenia" className="dropdown-link">Urządzenia</Link>
            </div>
          </div>
          <button onClick={() => scrollToSection('offer')} className="nav-link">Oferta</button>
          <button onClick={() => scrollToSection('locations')} className="nav-link">Lokalizacje</button>
          <Link to="/glosowania" className={`nav-link ${location.pathname === '/glosowania' ? 'active' : ''}`}>
            Głosowania
          </Link>
          <Link to="/blog" className={`nav-link ${location.pathname.startsWith('/blog') ? 'active' : ''}`}>
            Blog
          </Link>
          <button onClick={() => scrollToSection('contact')} className="nav-link contact-btn">Kontakt</button>
        </nav>

        <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>

        <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-nav-group">
            <button
              className="mobile-nav-item with-icon"
              onClick={() => setIsProductMenuOpen(!isProductMenuOpen)}
            >
              Produkty <ChevronDown size={16} className={`chevron-icon ${isProductMenuOpen ? 'rotate' : ''}`} />
            </button>
            <div className={`mobile-submenu ${isProductMenuOpen ? 'open' : ''}`}>
              <Link to="/products/longfille" onClick={closeMobileMenu}>Longfille</Link>
              <Link to="/products/olejki" onClick={closeMobileMenu}>Olejki</Link>
              <Link to="/products/urzadzenia" onClick={closeMobileMenu}>Urządzenia</Link>
            </div>
          </div>
          <button onClick={() => scrollToSection('offer')}>Oferta</button>
          <button onClick={() => scrollToSection('locations')}>Lokalizacje</button>
          <Link to="/glosowania" onClick={closeMobileMenu}>Głosowania</Link>
          <Link to="/blog" onClick={closeMobileMenu}>Blog</Link>
          <button onClick={() => scrollToSection('contact')}>Kontakt</button>
        </div>
      </div>
    </header>
  );
}
