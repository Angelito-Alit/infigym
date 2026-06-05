import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'POST') {
    try {
      const { image } = req.body;
      if (!image) {
        return res.status(400).json({ error: 'No se recibió imagen' });
      }
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: 'infinitegym',
        transformation: [
          { quality: 'auto:good' },
          { fetch_format: 'auto' },
        ],
      });
      return res.status(200).json({ url: uploadResponse.secure_url });
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      return res.status(500).json({ error: 'Error subiendo imagen', details: error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { imageUrl } = req.body;
      if (!imageUrl) return res.status(400).json({ error: 'Falta la URL de la imagen' });
      const parts = imageUrl.split('/');
      const folderAndFile = parts.slice(-2).join('/');
      const publicId = folderAndFile.split('.')[0];
      await cloudinary.uploader.destroy(publicId);
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: 'Error eliminando imagen de Cloudinary' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}