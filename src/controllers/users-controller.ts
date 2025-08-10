import { Request, Response } from "express"
import { UserRole } from "@prisma/client";
import { z } from "zod";
import { hash } from "bcrypt"
import { AppError } from "@/utils/AppError";
import { prisma } from "@/database/prisma";

class UsersController{

    async create(req: Request, res: Response){
        const bodySchema = z.object({
            name: z.string().trim().min(2, { message: "Nome é obrigatório" }),
            email: z.string().trim().email({ message: "E-mail inválido" }).toLowerCase(),
            password: z.string().min(6, { message: "A senha deve ter pelo menos 5 dígitos" }),
            role: z.enum([UserRole.employee, UserRole.manager]).default(UserRole.employee)
        });

        const { name, email, password, role } = bodySchema.parse(req.body);

        const userWithSameEmail = await prisma.user.findFirst({ where: { email } }); //para ver se tem um usuário cadastrado com o mesmo email

        if (userWithSameEmail){
            throw new AppError("E-mail já cadastrado!");
        };

        const hashedPassword = await hash(password,8); //bcrypt hash retorna uma promise, por isso usamos o await

        await prisma.user.create({
            data:{
                name,
                email,
                password: hashedPassword,
                role
            }
        })

        return res.status(201).json();
    }

}

export { UsersController }