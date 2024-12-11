import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import workspacesRouter from "./routes/workspaces.route.js";
import usersRoutes from "./routes/users.routes.js";
import { customCorsMiddleware } from "./middleware/cors.middleware.js";


const app = express();

// Configuración de CORS

app.use(customCorsMiddleware);

// app.use(cors({
//   origin: "https://cloneslack-git-main-santiago-barlettas-projects.vercel.app", 
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true, 
// }));

// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, 'dist')));

app.use(cors()); 

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/workspaces", workspacesRouter);
app.use("/api/users", usersRoutes);

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
