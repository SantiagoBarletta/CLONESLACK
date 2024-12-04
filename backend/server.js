import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route.js";

const app = express();

// Configuración de CORS
app.use(cors());


app.use(express.json());

app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
