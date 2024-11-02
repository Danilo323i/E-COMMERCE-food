const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Accesso non autorizzato" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token non valido" });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Accesso riservato agli amministratori" });
  next();
};

module.exports = { authMiddleware, adminMiddleware };
