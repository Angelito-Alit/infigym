import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Accesorios',
    desc: 'Complementa tu entrenamiento con los mejores accesorios.',
    img: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop',
    filter: 'Accesorios',
  },
  {
    name: 'Cardio',
    desc: 'Equipos de alto rendimiento para superar tus límites.',
    img: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop',
    filter: 'Cardio',
  },
  {
    name: 'Fuerza',
    desc: 'Construye músculo con maquinaria profesional de gama alta.',
    img: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=2071&auto=format&fit=crop',
    filter: 'Fuerza',
  },
];

const stats = [
  { value: '100%', label: 'Garantía de calidad' },
  { value: 'Soporte dedicado', label: ' ' },
];

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    fetch('/api/products')
      .then(r => r.json())
      .then(data => setFeaturedProducts((data || []).slice(0, 3)));
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      <section className="relative w-full min-h-[92vh] flex items-end pb-20 bg-black overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
            alt="Atleta entrenando"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        </div>

        <div className="absolute top-8 right-8 md:top-12 md:right-12 z-10 flex flex-col gap-3 items-end">
          {['Alta Gama', 'Uso Comercial', 'Garantía Infinité'].map((tag, i) => (
            <span
              key={tag}
              className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest rounded-full"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div
            className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.4em] mb-6">
              Equipamiento Profesional
            </p>
            <h1
              className="text-6xl md:text-8xl lg:text-[110px] font-black text-white uppercase leading-[0.9] tracking-tighter mb-8"
              style={{ fontStretch: 'condensed' }}
            >
              Entrena<br />
              <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>
                Sin
              </span>{' '}
              Límites
            </h1>

            <div className="flex flex-wrap items-center gap-4 mt-10">
              <Link
                to="/tienda"
                className="group flex items-center gap-3 px-8 py-4 bg-white text-black text-sm font-bold uppercase tracking-widest hover:bg-gray-100 transition-all"
              >
                Ver Catálogo
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/nosotros"
                className="px-8 py-4 border border-white/40 text-white text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                ¡Conocenos y escríbenos!
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 border-t border-white/10">
              {stats.map((s, i) => (
                <div key={i} className="py-6 px-4 border-r border-white/10 last:border-r-0">
                  <p className="text-2xl md:text-3xl font-black text-white">{s.value}</p>
                  <p className="text-[11px] text-gray-400 uppercase tracking-widest mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">Explora</p>
              <h2 className="text-4xl md:text-5xl font-black text-black uppercase leading-tight">
                Nuestras<br />Categorías
              </h2>
            </div>
            <Link
              to="/tienda"
              className="self-start md:self-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors border-b border-gray-300 hover:border-black pb-1"
            >
              Ver todo el catálogo
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <Link
                to={`/tienda?categoria=${cat.filter}`}
                key={cat.name}
                className="group relative overflow-hidden bg-gray-900 aspect-[3/4] flex flex-col justify-end cursor-pointer"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="relative z-10 p-8">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">
                    Categoría
                  </span>
                  <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-gray-400 text-sm font-light mb-6 leading-relaxed max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500">
                    {cat.desc}
                  </p>
                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explorar
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {featuredProducts.length > 0 && (
        <section className="py-24 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-3">Destacados</p>
                <h2 className="text-4xl md:text-5xl font-black text-black uppercase leading-tight">
                  Productos<br />Populares
                </h2>
              </div>
              <Link
                to="/tienda"
                className="self-start md:self-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors border-b border-gray-300 hover:border-black pb-1"
              >
                Ver todos
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <Link
                  to={`/producto/${product.id}`}
                  key={product.id}
                  className="group bg-white border border-gray-100 hover:border-gray-300 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="aspect-square bg-gray-50 overflow-hidden p-6 relative">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className={`absolute top-4 right-4 text-[10px] font-bold uppercase px-2 py-1 rounded ${
                      product.stock_status === 'disponible' ? 'bg-green-100 text-green-700' :
                      product.stock_status === 'poco_stock' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {product.stock_status === 'disponible' ? 'Disponible' :
                       product.stock_status === 'poco_stock' ? 'Últimas unidades' : 'Agotado'}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1 border-t border-gray-100">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">{product.category}</span>
                    <h3 className="text-sm font-black uppercase tracking-wide text-gray-900 mb-2 line-clamp-2 leading-snug">{product.name}</h3>
                    <p className="text-gray-400 text-xs font-light leading-relaxed mb-4 line-clamp-2 flex-1">{product.description}</p>
                    <div className="flex items-center justify-end mt-auto">
                      <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors">
                        Ver detalles
                        <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-4">¿Por qué elegirnos?</p>
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase leading-tight mb-10">
                Calidad que<br />se siente
              </h2>
              <div className="flex flex-col gap-6">
                {[
                  { icon: '◈', title: 'Equipos certificados', desc: 'Todos nuestros productos cumplen con los más altos estándares internacionales de calidad y seguridad.' },
                  { icon: '◉', title: 'Garantía extendida', desc: 'Respaldamos cada producto con garantía Infinité. Tu inversión siempre protegida.' },
                  { icon: '◎', title: 'Envíos a todo México', desc: 'Logística eficiente para que tu equipo llegue en perfectas condiciones a cualquier parte del país.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-5 items-start group">
                    <span className="text-2xl text-gray-600 group-hover:text-white transition-colors mt-0.5 flex-shrink-0">{item.icon}</span>
                    <div>
                      <h4 className="text-sm font-black text-white uppercase tracking-wide mb-1">{item.title}</h4>
                      <p className="text-gray-500 text-sm font-light leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden aspect-[4/5] bg-gray-900">
                <img
                  src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop"
                  alt="Gym de alta gama"
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/60" />
                
              </div>

              <div className="absolute -top-4 -right-4 w-24 h-24 border border-gray-700 -z-10 hidden lg:block" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-gray-800 -z-10 hidden lg:block" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-black uppercase leading-tight">
              ¿Listo para<br />transformar tu espacio?
            </h2>
            <p className="text-gray-500 text-sm mt-3 font-light">Recibe una cotización personalizada sin costo.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link
              className="px-8 py-4 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center gap-2 justify-center"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Cotizar por WhatsApp
            </Link>
            <Link
              to="/tienda"
              className="px-8 py-4 border border-gray-200 text-black text-xs font-bold uppercase tracking-widest hover:border-black transition-colors flex items-center justify-center"
            >
              Ver catálogo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}