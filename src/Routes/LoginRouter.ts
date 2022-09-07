import { Router } from "express";
import { LoginUser } from "../controllers/LoginUser";
import { checkuserLoginAndReset } from "../Middleware/finduser";
//just to shorten things r=== router in this case and a lot of cases
const r = Router();

r.post("/User", checkuserLoginAndReset, LoginUser);

export default r;
