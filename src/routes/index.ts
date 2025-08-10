import { Router } from "express";
import { userRoutes } from "./users-routes";
import { refundsRoutes } from "./refunds-routes";
import { uploadsRoutes } from "./uploads-routes";
import { sessionsRoutes } from "./sessions-routes";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const routes = Router();

//rotas públicas
routes.use("/users", userRoutes);
routes.use("/sessions", sessionsRoutes);

// a ordem das rotas é importante para os middlewares. O middleware ensureAuthenticated vai funcionar apenas nas rotas que estiverem abaixo dele, aí podemos dividir as rotas privadas das públicas para facilitar o uso do middleware com uma linha de código só, ao invés de ter que adicionar rota por rota.

//rotas privadas
    //tudo abaixo desse uso vai pedir autenticação :)
routes.use(ensureAuthenticated); 
routes.use("/refunds", refundsRoutes);
routes.use("/uploads", uploadsRoutes);

export { routes };