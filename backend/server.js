import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import workspacesRouter from "./routes/workspaces.route.js";
import usersRoutes from "./routes/users.routes.js";
import { customCorsMiddleware } from "./middleware/cors.middleware.js";
import privateMessagesRouter from "./routes/privateMessages.routes.js";


const app = express();



app.use(cors()); 

app.use(express.json({limit: '1mb'}));

app.use("/api/auth", authRouter);
app.use("/api/workspaces", workspacesRouter);
app.use("/api/users", usersRoutes);
app.use("/api/private-messages", privateMessagesRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
