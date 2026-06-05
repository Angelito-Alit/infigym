import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (!process.env.DATABASE_URL) {
    return res.status(500).json({ error: 'DATABASE_URL no está configurada' });
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    if (req.method === 'GET') {
      const products = await sql`SELECT * FROM products ORDER BY id DESC`; 
      return res.status(200).json(products);
    }

    if (req.method === 'POST') {
      const { name, description, image_url, category, features, stock_status } = req.body;
      const newProduct = await sql`
        INSERT INTO products (name, description, image_url, category, features, stock_status)
        VALUES (${name}, ${description}, ${image_url}, ${category}, ${features}, ${stock_status})
        RETURNING *
      `;
      return res.status(201).json(newProduct[0]);
    }

    if (req.method === 'PUT') {
      const { id, name, description, image_url, category, features, stock_status } = req.body;
      const updatedProduct = await sql`
        UPDATE products 
        SET name = ${name}, description = ${description}, 
            image_url = ${image_url}, category = ${category}, features = ${features}, 
            stock_status = ${stock_status}
        WHERE id = ${id}
        RETURNING *
      `;
      return res.status(200).json(updatedProduct[0]);
    }

    if (req.method === 'DELETE') {
      const { id } = req.body;
      await sql`DELETE FROM products WHERE id = ${id}`;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error en base de datos:', error);
    return res.status(500).json({ error: 'Error interno de servidor', details: error.message });
  }
}