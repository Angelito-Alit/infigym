import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-white">

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

          <div className="md:col-span-4 flex flex-col gap-6">
            <Link to="/">
              <img src="/logo.png" alt="Logo Infinité" className="h-14 object-contain" />
            </Link>
            <p className="text-gray-300 text-sm font-light leading-relaxed max-w-xs">
              Equipamiento de alto rendimiento para atletas y espacios comerciales. Calidad sin compromisos.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 border border-gray-700 hover:border-white flex items-center justify-center text-gray-300 hover:text-white transition-all"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 border border-gray-700 hover:border-white flex items-center justify-center text-gray-300 hover:text-white transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.88z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-5">Navegación</h4>
            <nav className="flex flex-col gap-3">
              {[
                { to: '/', label: 'Inicio' },
                { to: '/nosotros', label: 'Nosotros' },
                { to: '/tienda', label: 'Tienda' },
                { to: '/nosotros', label: 'Conocenos' },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-sm text-gray-300 hover:text-white transition-colors font-light"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-5">Legal</h4>
            <nav className="flex flex-col gap-3">
              {[
                { to: '/#', label: 'Términos y Condiciones' },
                { to: '/#', label: 'Política de Privacidad' },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-sm text-gray-300 hover:text-white transition-colors font-light"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="md:col-span-3 md:col-start-10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 mb-5">Contacto</h4>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:info@infiniteproducts.com"
                className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors group"
              >
                <span className="w-8 h-8 border border-gray-700 group-hover:border-gray-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                info@infiniteproducts.com
              </a>
              <a
                href="tel:+5214462000666"
                className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors group"
              >
                <span className="w-8 h-8 border border-gray-700 group-hover:border-gray-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                +52 1 813 894 0867
              </a>
              <div className="flex items-start gap-3 text-sm text-gray-300">
                <span className="w-8 h-8 border border-gray-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span className="font-light">
                  Lunes a Viernes<br />9:00 AM – 6:00 PM
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400 font-light">
            © {new Date().getFullYear()} INFINITÉ PRODUCTS. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-400 font-light">Querétaro, México</p>
        </div>
      </div>
    </footer>
  );
}