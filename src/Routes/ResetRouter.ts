import { Router } from "express";
import { ResetPassword } from "../controllers/Resetpassword";
import { checkuserForReset } from "../Middleware/finduser";
//just to shorten things r=== router in this case and a lot of cases
const r = Router();

r.post("/", checkuserForReset, ResetPassword);

export default r;
