import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header
        className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.08)]'
            : 'bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">

            <div className="flex items-center gap-6 w-1/3">
              <a
                href="tel:+5214462000666"
                className="hidden md:flex items-center gap-2 text-gray-500 hover:text-black transition-colors group"
              >
                <span className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-black group-hover:text-white transition-all flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                  </svg>
                </span>
                <span className="text-xs font-semibold tracking-wide">+52 1 446 200 0666</span>
              </a>
            </div>

            <div className="w-1/3 flex justify-center">
              <Link to="/" className="block">
                <img src="/logo.png" alt="Infinité Products" className="h-11 object-contain" />
              </Link>
            </div>

            <div className="w-1/3 flex justify-end items-center gap-3">
              <Link
                to="/tienda"
                className="hidden md:flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Buscar
              </Link>

              <Link
                to="/nosotros"
                className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-black text-white text-xs font-bold rounded uppercase tracking-widest hover:bg-gray-800 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Conocenos
              </Link>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              >
                <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </button>
            </div>
          </div>

          <nav className="hidden md:flex items-center justify-center gap-10 pb-4 border-t border-gray-100 pt-3">
            {[
              { path: '/', label: 'Inicio' },
              { path: '/nosotros', label: 'Nosotros' },
              { path: '/tienda', label: 'Tienda' },
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`relative text-xs font-bold uppercase tracking-widest transition-colors pb-1 ${
                  isActive(path)
                    ? 'text-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-20 flex flex-col px-6 md:hidden">
          <nav className="flex flex-col gap-2 pt-8">
            {[
              { path: '/', label: 'Inicio' },
              { path: '/nosotros', label: 'Nosotros' },
              { path: '/tienda', label: 'Tienda' },
              { path: '/nosotros', label: 'Conocenos' },
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className="text-3xl font-black uppercase tracking-tight text-gray-900 py-3 border-b border-gray-100 hover:pl-4 transition-all"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto pb-10">
            <a href="tel:+5214462000666" className="text-sm text-gray-400">+52 1 446 200 0666</a>
          </div>
        </div>
      )}

      <div className="h-[104px]" />
    </>
  );
}