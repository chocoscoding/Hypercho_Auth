import { Router } from "express";
import { SignupCreator, Signupuser } from "../controllers/Signups";
import {checkuser,checkuser_creator } from "../Middleware/finduser";
//just to shorten things r=== router in this case and a lot of cases
const r = Router();

r.post('/User', checkuser, Signupuser)
r.post('/Creator', checkuser_creator, SignupCreator)


export default r;

