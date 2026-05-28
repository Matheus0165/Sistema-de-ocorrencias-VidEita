/**
 * Upload local para rodar no Docker.
 * As imagens ficam no volume /app/uploads e são servidas pela API em /uploads.
 */
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `report-${unique}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const ok = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.mimetype);
  ok ? cb(null, true) : cb(new Error('Apenas imagens são permitidas'), false);
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

const uploadParaCloudinary = async (filePath) => {
  const filename = path.basename(filePath);
  return {
    url: `/uploads/${filename}`,
    public_id: filename,
  };
};

const removerDoCloudinary = async (publicId) => {
  const fp = path.join(uploadDir, publicId);
  if (fs.existsSync(fp)) fs.unlinkSync(fp);
};

module.exports = { upload, uploadParaCloudinary, removerDoCloudinary };
