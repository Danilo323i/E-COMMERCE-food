require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Consente solo richieste da questa origine
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Consente l'invio di cookie e credenziali
}));


// Connessione a MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connesso a MongoDB"))
  .catch((error) => console.error("Errore di connessione:", error));

// Importa le rotte
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

// Usa le rotte
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Rotta principale
app.get("/", (req, res) => {
  res.send("Server funzionante!");
});

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});
