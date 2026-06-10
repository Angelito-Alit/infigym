import { useState, useEffect } from 'react';

export default function Cotizacion() {
  const [quoteItems, setQuoteItems] = useState([]);
  const whatsappNumber = "5218138940867";

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('quote') || '[]');
    setQuoteItems(items);
  }, []);

  const clearQuote = () => {
    localStorage.removeItem('quote');
    setQuoteItems([]);
  };

  const handleWhatsApp = () => {
    if (quoteItems.length === 0) return;
    let message = "Hola INFINITÉ, me gustaría cotizar los siguientes productos:%0A%0A";
    quoteItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name}%0A`;
    });
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', minHeight: 'calc(100vh - 70px)' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center', color: 'white' }}>Tu lista de cotización</h1>
      {quoteItems.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#666' }}>No tienes productos en tu lista.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {quoteItems.map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #333', borderRadius: '8px', color: 'white' }}>
              <span style={{ fontWeight: 'bold' }}>{item.name}</span>
            </div>
          ))}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
            <button onClick={clearQuote} style={{ padding: '1rem 2rem', backgroundColor: '#111', color: 'white', border: '1px solid #333', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Limpiar lista</button>
            <button onClick={handleWhatsApp} style={{ padding: '1rem 2rem', backgroundColor: '#25D366', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Cotizar por WhatsApp</button>
          </div>
        </div>
      )}
    </div>
  );
}