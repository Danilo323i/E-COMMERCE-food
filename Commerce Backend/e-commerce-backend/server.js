require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connesso a MongoDB"))
  .catch((error) => console.error("Errore di connessione:", error));

const productRoutes = require("./routes/productRoutes");

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Server funzionante!");
});

app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
});
