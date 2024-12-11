import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import workspacesRouter from "./routes/workspaces.route.js";
import usersRoutes from "./routes/users.routes.js";
import path from 'path';


const app = express();


const allowedOrigins = [
  "https://cloneslack-git-main-santiago-barlettas-projects.vercel.app",
  "http://localhost:3000",
];


// Configuración de CORS

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
})



// app.use(cors({
//   origin: "https://cloneslack-git-main-santiago-barlettas-projects.vercel.app", 
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true, 
// }));

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'dist')));

app.options("*", cors()); 

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/workspaces", workspacesRouter);
app.use("/api/users", usersRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
