const db = require('../middlewares/dbCheck');

// Fonction qui renvoie le code 200 de réponse si le serveur est en marche
exports.isAlive = function (req, res) {
  // Vérifier que la base de données est accessible
  if (db.isAlive()) {
    res.status(200).send('OK');
  } else {
    res.status(500).send('KO');
  }
};
