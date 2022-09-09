import { Response } from "express";
import logg from "../Logs/Customlog";
import { CustomRequest } from "../Middleware/finduser";
import { changePassword } from "../services/Update";

//function to reset password
export const ResetPassword = async (req: CustomRequest, res: Response) => {
  if (req.User) {
    try {
      const result = await changePassword(req.User_id!.toString(), req.body.Password);
      return res.status(200).json({ status: 200, message: result });
    } catch (error: any) {
      logg.fatal(error.message);
      //else
      return res.status(404).json({ status: 404, message: "Sorry something went wrong on our side, We are fixing it!" });
    }
  }
  //else
  return res.status(401).json({ status: 401, message: "This user doesn't exist" });
};
