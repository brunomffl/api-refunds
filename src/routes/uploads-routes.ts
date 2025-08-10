import multer from "multer";
import { Router } from "express";
import uploadConfig from "@/config/upload";
import { UploadsController } from "@/controllers/uploads-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const upload = multer(uploadConfig.MULTER);

const uploadsRoutes = Router();
const uploadsController = new UploadsController();

uploadsRoutes.use(verifyUserAuthorization(["employee"]));
uploadsRoutes.post("/", upload.single("file"), uploadsController.create);

export { uploadsRoutes };