import { DiskStorage } from "@/providers/disk-storage";
import { Request, Response } from "express";
import { AppError } from "@/utils/AppError";
import uploadConfig from "@/config/upload";
import { z, ZodError } from "zod";

class UploadsController {

    async create(req: Request, res: Response){
        const diskStorage = new DiskStorage()
        try{
            const fileSchema = z.object({
                filename: z.string().min(1, { message: "Arquivo é obrigatório" }),
                mimetype: z.string().refine((type) => uploadConfig.ACCEPTED_IMAGE_TYPES.includes(type), { message: `Formato de arquivo não suportado. Formatos aceitos: ${uploadConfig.ACCEPTED_IMAGE_TYPES}` }),
                size: z.number().positive().refine((size) => size <= uploadConfig.MAX_FILE_SIZE, { message: `Arquivo excede o tamanho máximo permitido de ${uploadConfig.MAX_FILE_SIZE}`})
            }).passthrough();

            const file = fileSchema.parse(req.file);
            const filename = await diskStorage.saveFile(file.filename)

            return res.json({ filename });
        }catch (error){
            if (error instanceof ZodError){
                if(req.file){
                    await diskStorage.deletFile(req.file.filename, "tmp");
                }
                throw new AppError(error.issues[0].message);
            }
            throw error
        }
    };
};

export { UploadsController };