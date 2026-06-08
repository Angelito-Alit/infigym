import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ProductoDetalle() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [openSection, setOpenSection] = useState('descripcion');

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p.id === parseInt(id));
        setProduct(found);
      });

    window.scrollTo(0, 0);
  }, [id]);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? '' : section);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center font-bold uppercase tracking-widest text-sm text-gray-400">
        Cargando información...
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-24">
      
      {/* Breadcrumb — Corregido para evitar que el texto se corte a la mitad */}
      <div className="border-b border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex flex-wrap items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <Link to="/" className="hover:text-black transition-colors">
              Inicio
            </Link>
            <span className="text-gray-300">/</span>
            <Link to="/tienda" className="hover:text-black transition-colors">
              Tienda
            </Link>
            <span className="text-gray-300">/</span>
            <span className="hover:text-black transition-colors cursor-default">
              {product.category}
            </span>
            <span className="text-gray-300">/</span>
            {/* Se eliminó 'truncate' y 'max-w' para que el texto siempre sea visible */}
            <span className="text-black font-bold whitespace-normal break-words">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12">
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* Imagen */}
          <div className="w-full lg:w-3/5 lg:sticky lg:top-32">
            <div className="bg-gray-50 rounded-2xl p-8 lg:p-16 flex items-center justify-center border border-gray-100">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full max-h-[600px] object-contain mix-blend-multiply drop-shadow-xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Info */}
          <div className="w-full lg:w-2/5 flex flex-col">

            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
              {product.category}
            </span>

            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6 leading-[1.1] uppercase tracking-tight">
              {product.name}
            </h1>

            <div className="mb-8">
              <span
                className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
                  product.stock_status === 'disponible'
                    ? 'bg-green-50 text-green-600 border-green-200'
                    : product.stock_status === 'poco_stock'
                    ? 'bg-yellow-50 text-yellow-600 border-yellow-200'
                    : 'bg-red-50 text-red-600 border-red-200'
                }`}
              >
                {product.stock_status === 'disponible'
                  ? 'Disponible'
                  : product.stock_status === 'poco_stock'
                  ? '¡Últimas unidades!'
                  : 'Agotado'}
              </span>
            </div>

            {/* Los botones de cotización de WhatsApp fueron eliminados de esta sección */}

            {/* Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 py-6 border-y border-gray-100">
              <div className="flex flex-col items-center text-center gap-2">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs font-bold text-gray-600 uppercase">Envíos a todo el país</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-xs font-bold text-gray-600 uppercase">Garantía INFINITÉ</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-xs font-bold text-gray-600 uppercase">Compra Segura</span>
              </div>
            </div>

            {/* Acordeón */}
            <div className="flex flex-col border-t border-gray-100">

              <div className="border-b border-gray-100">
                <button
                  onClick={() => toggleSection('descripcion')}
                  className="w-full py-5 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className={`text-sm font-bold uppercase tracking-widest transition-colors ${openSection === 'descripcion' ? 'text-black' : 'text-gray-500 group-hover:text-black'}`}>
                    Descripción del Equipo
                  </span>
                  <svg className={`w-5 h-5 transition-transform duration-300 ${openSection === 'descripcion' ? 'rotate-180 text-black' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openSection === 'descripcion' ? 'max-h-[1000px] pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                    {product.description || 'Sin descripción disponible para este equipo.'}
                  </p>
                </div>
              </div>

              <div className="border-b border-gray-100">
                <button
                  onClick={() => toggleSection('caracteristicas')}
                  className="w-full py-5 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className={`text-sm font-bold uppercase tracking-widest transition-colors ${openSection === 'caracteristicas' ? 'text-black' : 'text-gray-500 group-hover:text-black'}`}>
                    Características
                  </span>
                  <svg className={`w-5 h-5 transition-transform duration-300 ${openSection === 'caracteristicas' ? 'rotate-180 text-black' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openSection === 'caracteristicas' ? 'max-h-[1000px] pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                  {product.features ? (
                    <ul className="list-disc pl-5 text-sm text-gray-600 flex flex-col gap-3">
                      {product.features.split('\n').filter(line => line.trim() !== '').map((line, i) => (
                        <li key={i} className="leading-relaxed">{line}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm">Sin características registradas.</p>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}