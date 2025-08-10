import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";

//podemos passar um array para vários perfis com esse parâmetro, tipo se tivessemos 6 perfis e apenas 2 pudessem acessar a rota isso facilitaria a vida parelho, deixa flexível né não fica refém a um perfil só
function verifyUserAuthorization(role: string[]){
    return (req: Request, res: Response, next: NextFunction) => {
        // verificamos se o usuário NÃO está logado OU se a role do usuário que foi enviada na requisição NÃO está no array de roles que definirmos para a rota, casho caia no if vai retornar um 401 de não autorizado pra barrar o elemento que ta fora da lei
        if(!req.user || !role.includes(req.user.role)){
            throw new AppError("Não autorizado", 401);
        };

        return next();
    }
};

export { verifyUserAuthorization }