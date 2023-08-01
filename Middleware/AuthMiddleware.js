const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_secret_key_here';

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    // Tambahkan informasi pengguna yang diverifikasi ke objek permintaan
    req.user = user;
    next();
  });
}
