import { Router } from "express";
import { loginUserController, logoutUserController, refreshSessionController, registerUserController, requestResetPasswordEmailController, resetPasswordController } from "../controllers/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
import { registerUserValidationSchema, loginUserValidationSchema, requestResetEmailValidationSchema, resetPasswordValidationSchema } from "../validation/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const authRouter = Router();
authRouter.post("/register", validateBody(registerUserValidationSchema), ctrlWrapper(registerUserController));
authRouter.post("/login", validateBody(loginUserValidationSchema), ctrlWrapper(loginUserController));
authRouter.post("/logout", ctrlWrapper(logoutUserController));
authRouter.post("/refresh", ctrlWrapper(refreshSessionController));
authRouter.post("/send-reset-email", validateBody(requestResetEmailValidationSchema), requestResetPasswordEmailController);
authRouter.post("/reset-password", validateBody(resetPasswordValidationSchema), resetPasswordController);

export default authRouter;
