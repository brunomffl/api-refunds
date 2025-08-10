import { Request, Response, NextFunction } from "express"; // vamos usar o next pois se o usuário estiver de fato logado, ele pode acessar a próxima etapa, que no caso é a rota de fato
import { AppError } from "@/utils/AppError";
import { authConfig } from "@/config/auth";
import { verify } from "jsonwebtoken";

//criando interface para tipagem
interface TokenPayload {
    role: string,
    sub: string
};

function ensureAuthenticated(req: Request, res: Response, next: NextFunction){
    try{
        const authHeader = req.headers.authorization;

        if (!authHeader){
            throw new AppError("Token JWT não encontrado", 401);
        };

        const [,token] = authHeader.split(" "); // Bearer token

        const { role, sub: user_id } = verify(token, authConfig.jwt.secret) as TokenPayload;

        req.user = {
            id: user_id,
            role
        };

        return next();
    } catch {
        throw new AppError("Token JWT inválido!")
    }
};

export { ensureAuthenticated }