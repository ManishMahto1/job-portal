import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf' || file.mimetype === 'application/msword') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF or Word documents allowed'), false);
  }
};

export const upload = multer({ storage, fileFilter });