const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('authorization');
  if (!token) {
    return res.status(403).send({ message: 'Token non valido o non fornito' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (e) {
    res.status(403).send({ message: 'Token scaduto o non valido' });
  }
};
