import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";
import { authConfig } from "@/config/auth";
import { prisma } from "@/database/prisma";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { z } from "zod";

class SessionsController{
    
    async create(req: Request, res: Response){
        const bodySchema = z.object({
            email: z.string().email({ message: "E-mail inválido" }),
            password: z.string() // não coloquei o minimo de caracter pois o banco que vai validar
        });

        const { email, password } = bodySchema.parse(req.body);

        const user = await prisma.user.findFirst({ 
            where: 
                { email } 
        });

        if (!user){
            throw new AppError("E-mail ou senha inválido(s)", 401);
        };

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched){
            throw new AppError("E-mail ou senha inválido(s)", 401);
        };

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({ role: user.role }, secret, {
            subject: user.id,
            expiresIn,
        });

        const { password: _, ...userWithoutPassword } = user;

        return res.json({ token, userWithoutPassword });
    }

}

export { SessionsController }