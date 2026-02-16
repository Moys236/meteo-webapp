const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Secret pour JWT (à mettre dans .env en production)
const JWT_SECRET = 'votre_secret_super_secure';
const JWT_EXPIRES_IN = '1h';

const users = [
    {id: 1, username: 'user1', password: '1234'},
    {id: 2, username: 'user2', password: '0000'}
];

// ============================================
// MIDDLEWARE D'AUTHENTIFICATION
// ============================================

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide ou expiré' });
    }
    req.user = user;
    next();
  });
};

// ============================================
// ROUTES D'AUTHENTIFICATION
// ============================================


// Connexion
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({ message: 'Username et mot de passe requis' });
    }

    // Trouver l'utilisateur
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({ message: 'Username ou mot de passe incorrect' });
    }

    // Vérifier le mot de passe
    if (password !== user.password) {
      return res.status(401).json({ message: 'Username ou mot de passe incorrect' });
    }

    // Créer le token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Retourner les données sans le mot de passe
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Connexion réussie',
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Erreur de connexion:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Vérifier le token
app.get('/api/auth/verify', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  
  if (!user) {
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
  }

  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

// Rafraîchir le token
app.post('/api/auth/refresh', authenticateToken, (req, res) => {
  try {
    const newToken = jwt.sign(
      { id: req.user.id, username: req.user.username },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      message: 'Token rafraîchi',
      token: newToken
    });
  } catch (error) {
    console.error('Erreur de rafraîchissement:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});


// ============================================
// DÉMARRAGE DU SERVEUR
// ============================================

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`API disponible sur http://localhost:${PORT}`);
});

module.exports = app;