import { Request, Response } from "express";
import { AppError } from "@/utils/AppError";
import { prisma } from "@/database/prisma";
import { Category } from "@prisma/client"
import { z } from "zod";

class RefundsController{

    async create(req: Request, res: Response){

        const bodySchema = z.object({
            name: z.string().trim().min(1, { message: "Informe o nome da solicitação!" }),
            category: z.enum([Category.accommodation, Category.food, Category.other, Category.services, Category.transport]),
            amount: z.number().positive({ message: "O valor precisa ser positivo!" }),
            filename: z.string(),
        });

        const { name, category, amount, filename } = bodySchema.parse(req.body);

        if(!req.user?.id){
            throw new AppError("Usuário não autorizado!", 401);
        }

        const refund = await prisma.refunds.create({
            data: {
                name,
                category,
                amout: amount,
                filename,
                userId: req.user.id,
            }
        });

        return res.status(201).json(refund);
    };

    async index(req: Request, res: Response){
        
        const queryScheme = z.object({
            name: z.string().optional().default(""),
            page: z.coerce.number().optional().default(1),
            perPage: z.coerce.number().optional().default(10),
        });
        
        const { name, page, perPage } = queryScheme.parse(req.query);

        //calculando o skip
        const skip = (page - 1) * perPage;
        
        const refunds = await prisma.refunds.findMany({
            skip,
            take: perPage,
            where: {
                
                user: {
                    name: {
                        contains: name.trim()
                    }
                }
            },
            orderBy: { created_at: "desc" },
            include: { user: true },
        });

        //obter o total de registros para caclular o número de páginas
        const totalRecords = await prisma.refunds.count({
            where: {
                user: {
                    name: {
                        contains: name.trim()
                    }
                }
            }
        });

        const totalPages = Math.ceil(totalRecords / page);

        return res.json({ 
            refunds, 
            pagination: { page, perPage, totalRecords, totalPage: totalPages > 0 ? totalPages : 1 } 
        }); 
    };

    async show(req: Request, res: Response){
        const paramsScheme = z.object({
            id: z.string().uuid()
        });

        const { id } = paramsScheme.parse(req.params);

        const refund = await prisma.refunds.findFirst({
            where: {
                id
            },
            include: {
                user: true
            }
        });

        return res.json( refund )
    };
};

export { RefundsController };