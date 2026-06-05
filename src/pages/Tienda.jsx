import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const CATEGORIES = ['Accesorios', 'Cardio', 'Fuerza'];
const SORT_OPTIONS = [
  { value: 'default', label: 'Más recientes' },
  { value: 'name', label: 'A - Z' },
];

export default function Tienda() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sort, setSort] = useState('default');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const cat = searchParams.get('categoria');
    if (cat) setSelectedCategories([cat]);
  }, [searchParams]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => { setProducts(data || []); setLoading(false); });
  }, []);

  const toggleCategory = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const filtered = products
    .filter(p => selectedCategories.length === 0 || selectedCategories.includes(p.category))
    .sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="min-h-screen bg-white">

      <div className="bg-black py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-widest mb-6">
            <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-white">Tienda</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase leading-none tracking-tighter">
            Catálogo
          </h1>
          <p className="text-gray-400 text-sm mt-4 font-light">
            Equipamiento profesional para llevar tu entrenamiento al siguiente nivel
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">

          <aside className="w-full lg:w-56 flex-shrink-0">
            <div className="lg:sticky lg:top-40">

              <div className="mb-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-4">
                  Categoría
                </h3>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => setSelectedCategories([])}
                    className={`text-left px-3 py-2.5 text-sm font-medium rounded transition-colors ${
                      selectedCategories.length === 0
                        ? 'bg-black text-white font-bold'
                        : 'text-gray-600 hover:text-black hover:bg-gray-50'
                    }`}
                  >
                    Todos
                  </button>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`text-left px-3 py-2.5 text-sm font-medium rounded transition-colors flex items-center justify-between group ${
                        selectedCategories.includes(cat)
                          ? 'bg-black text-white font-bold'
                          : 'text-gray-600 hover:text-black hover:bg-gray-50'
                      }`}
                    >
                      {cat}
                      {selectedCategories.includes(cat) && (
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {selectedCategories.length > 0 && (
                <button
                  onClick={() => setSelectedCategories([])}
                  className="text-xs text-gray-400 hover:text-black transition-colors underline underline-offset-2"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-sm font-black text-black">
                  {filtered.length}
                </span>
                <span className="text-sm text-gray-400">
                  {filtered.length === 1 ? 'producto' : 'productos'}
                  {selectedCategories.length > 0 && (
                    <span className="ml-1">en <strong className="text-black">{selectedCategories.join(', ')}</strong></span>
                  )}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Ordenar</label>
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="text-xs font-medium border border-gray-200 rounded px-3 py-2 focus:outline-none focus:border-black bg-white text-gray-700"
                >
                  {SORT_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="bg-gray-100 animate-pulse rounded">
                    <div className="aspect-square" />
                    <div className="p-4">
                      <div className="h-3 bg-gray-200 rounded mb-2 w-1/3" />
                      <div className="h-4 bg-gray-200 rounded mb-1" />
                      <div className="h-4 bg-gray-200 rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="text-6xl mb-4">○</div>
                <p className="text-lg font-black uppercase tracking-wide text-gray-300 mb-2">Sin resultados</p>
                <p className="text-sm text-gray-400 mb-6">No hay productos con los filtros seleccionados.</p>
                <button
                  onClick={() => setSelectedCategories([])}
                  className="px-6 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
                >
                  Ver todos
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((product) => (
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
                      <span className={`absolute top-4 left-4 text-[10px] font-bold uppercase px-2 py-1 rounded ${
                        product.stock_status === 'disponible' ? 'bg-green-100 text-green-700' :
                        product.stock_status === 'poco_stock' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {product.stock_status === 'disponible' ? 'Disponible' :
                         product.stock_status === 'poco_stock' ? 'Últimas unidades' : 'Agotado'}
                      </span>
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="w-9 h-9 bg-black text-white flex items-center justify-center rounded-full shadow-lg">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1 border-t border-gray-100">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">{product.category}</span>
                      <h3 className="text-sm font-black uppercase tracking-wide text-gray-900 mb-2 line-clamp-2 leading-snug">{product.name}</h3>
                      <p className="text-gray-400 text-xs font-light leading-relaxed mb-4 line-clamp-2 flex-1">{product.description}</p>
                      <div className="flex items-center justify-end mt-auto pt-3 border-t border-gray-50">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors">
                          Ver detalles →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}