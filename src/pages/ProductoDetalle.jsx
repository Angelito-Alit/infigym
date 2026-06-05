import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const compressImage = (base64) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let { width, height } = img;
      const MAX = 1200;
      if (width > MAX || height > MAX) {
        if (width > height) {
          height = Math.round((height * MAX) / width);
          width = MAX;
        } else {
          width = Math.round((width * MAX) / height);
          height = MAX;
        }
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      let quality = 0.82;
      let result = canvas.toDataURL('image/jpeg', quality);
      while (result.length > 3 * 1024 * 1024 && quality > 0.3) {
        quality -= 0.08;
        result = canvas.toDataURL('image/jpeg', quality);
      }
      resolve(result);
    };
    img.onerror = () => resolve(base64);
  });
};

export default function AdminProductos() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    id: null, name: '', description: '', price: '', category: 'Accesorios',
    image_url: '', features: '', stock_status: 'disponible'
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('isAuthenticated')) {
      navigate('/login');
      return;
    }
    fetchProducts();
  }, [navigate]);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data || []);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadError('');
    const reader = new FileReader();
    reader.onloadend = async () => {
      const compressed = await compressImage(reader.result);
      setImageFile(compressed);
      setImagePreview(compressed);
    };
    reader.readAsDataURL(file);
  };

  const removeImagePreview = () => {
    setImageFile(null);
    setImagePreview(null);
    setUploadError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUploadError('');
    let finalImageUrl = form.image_url;

    if (imageFile) {
      try {
        if (form.image_url) {
          await fetch('/api/upload', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageUrl: form.image_url })
          }).catch(() => {});
        }

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: imageFile })
        });

        const text = await uploadRes.text();
        let uploadData;
        try {
          uploadData = JSON.parse(text);
        } catch {
          setUploadError('Error del servidor al subir la imagen. Intenta con una imagen más pequeña.');
          setLoading(false);
          return;
        }

        if (!uploadRes.ok) {
          setUploadError('Error al subir imagen: ' + (uploadData?.error || uploadData?.details || uploadRes.status));
          setLoading(false);
          return;
        }

        finalImageUrl = uploadData.url;
      } catch (err) {
        setUploadError('Error de red al subir la imagen. Verifica tu conexión.');
        setLoading(false);
        return;
      }
    }

    const method = form.id ? 'PUT' : 'POST';
    const res = await fetch('/api/products', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, image_url: finalImageUrl })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      setUploadError('Error al guardar producto: ' + (err.details || err.error || res.status));
      setLoading(false);
      return;
    }

    resetForm();
    fetchProducts();
    setLoading(false);
  };

  const handleEdit = (product) => {
    setForm({
      id: product.id,
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      category: product.category || 'Accesorios',
      image_url: product.image_url || '',
      features: product.features || '',
      stock_status: product.stock_status || 'disponible'
    });
    setImageFile(null);
    setImagePreview(null);
    setUploadError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`¿Eliminar definitivamente "${product.name}"?`)) return;
    setLoading(true);

    if (product.image_url) {
      await fetch('/api/upload', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: product.image_url })
      }).catch(() => {});
    }

    await fetch('/api/products', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: product.id })
    });

    fetchProducts();
    setLoading(false);
  };

  const resetForm = () => {
    setForm({ id: null, name: '', description: '', price: '', category: 'Accesorios', image_url: '', features: '', stock_status: 'disponible' });
    setImageFile(null);
    setImagePreview(null);
    setUploadError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const previewSrc = imagePreview || form.image_url;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-widest text-black">Inventario</h1>
        <div className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg shadow-sm">
          <span className="text-sm font-bold">{products.length}</span>
          <span className="text-xs uppercase tracking-widest text-gray-300">Items</span>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm mb-12">
        <h2 className="text-sm font-bold uppercase tracking-widest mb-8 text-gray-800 border-b border-gray-100 pb-4">
          {form.id ? 'Modificar Producto' : 'Añadir Nuevo Producto'}
        </h2>

        {uploadError && (
          <div className="mb-6 flex items-start gap-3 px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
            <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-red-700 font-medium">{uploadError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Nombre del producto</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                required
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all text-sm text-gray-800"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Precio (MXN)</label>
              <input
                type="number"
                step="0.01"
                value={form.price}
                onChange={e => setForm({...form, price: e.target.value})}
                required
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all text-sm text-gray-800"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Estado de Stock</label>
              <select
                value={form.stock_status}
                onChange={e => setForm({...form, stock_status: e.target.value})}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all text-sm text-gray-800"
              >
                <option value="disponible">Disponible</option>
                <option value="poco_stock">Poco Stock</option>
                <option value="agotado">Agotado</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Categoría</label>
              <select
                value={form.category}
                onChange={e => setForm({...form, category: e.target.value})}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all text-sm text-gray-800 cursor-pointer appearance-none"
              >
                <option value="Accesorios">Accesorios</option>
                <option value="Cardio">Cardio</option>
                <option value="Fuerza">Fuerza</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Descripción detallada</label>
              <textarea
                value={form.description}
                onChange={e => setForm({...form, description: e.target.value})}
                required
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all text-sm text-gray-800 min-h-[100px] resize-y"
              />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-xs font-bold uppercase text-gray-500 tracking-wider flex justify-between">
                <span>Características (Viñetas)</span>
                <span className="text-gray-400 font-normal lowercase tracking-normal">Separa cada punto con un salto de línea (Enter)</span>
              </label>
              <textarea
                value={form.features}
                onChange={e => setForm({...form, features: e.target.value})}
                placeholder="Materiales de alta durabilidad...&#10;Diseño ergonómico...&#10;Garantía extendida..."
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all text-sm text-gray-800 min-h-[120px] resize-y leading-relaxed"
              />
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-2">
            <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">
              Fotografía
              <span className="ml-1 text-[10px] text-gray-400 font-normal normal-case tracking-normal">(se comprime automáticamente)</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors flex flex-col items-center justify-center min-h-[240px] h-full relative group">
              {previewSrc ? (
                <div className="w-full h-full p-4 relative flex items-center justify-center">
                  <img src={previewSrc} alt="preview" className="max-h-48 object-contain rounded" />
                  <button
                    type="button"
                    onClick={removeImagePreview}
                    className="absolute top-4 right-4 bg-white text-red-500 shadow-md w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 hover:text-red-600 transition-colors z-10"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 p-6 text-center pointer-events-none">
                  <svg className="w-10 h-10 text-gray-400 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-black transition-colors">Subir Imagen</span>
                  <span className="text-[10px] text-gray-400">PNG, JPG, WEBP hasta 10MB</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <div className="lg:col-span-12 flex items-center gap-4 pt-6 mt-2 border-t border-gray-100">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 bg-black text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md shadow-black/10"
            >
              {loading ? 'Procesando...' : (form.id ? 'Guardar Cambios' : 'Publicar Producto')}
            </button>
            {form.id && (
              <button
                type="button"
                onClick={resetForm}
                className="px-8 py-3.5 bg-white border border-gray-200 rounded-lg text-black text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-all"
              >
                Cancelar Edición
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-gray-500 w-24">Imagen</th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-gray-500">Producto</th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-gray-500">Categoría</th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-gray-500">Precio</th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-gray-500">Estado</th>
                <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-gray-500 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="h-14 w-14 rounded-lg bg-gray-50 border border-gray-100 p-1 flex items-center justify-center overflow-hidden">
                      {product.image_url && (
                        <img src={product.image_url} alt={product.name} className="max-h-full object-contain" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-sm text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">{product.category}</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-sm text-gray-900">
                    {product.price ? new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(product.price) : '—'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${
                      product.stock_status === 'disponible' ? 'bg-green-100 text-green-700' :
                      product.stock_status === 'poco_stock' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {product.stock_status === 'disponible' ? 'Disponible' :
                       product.stock_status === 'poco_stock' ? 'Poco Stock' : 'Agotado'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleEdit(product)}
                      disabled={loading}
                      className="text-gray-400 hover:text-black text-xs font-bold uppercase tracking-widest transition-colors mr-5"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product)}
                      disabled={loading}
                      className="text-gray-400 hover:text-red-500 text-xs font-bold uppercase tracking-widest transition-colors"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}