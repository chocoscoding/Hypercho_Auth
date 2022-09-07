import { Response } from "express";
import logg from "../Logs/Customlog";
import { CustomRequest } from "../Middleware/finduser";
import { checkPassword } from "../services/Login";

export const LoginUser = async (req: CustomRequest, res: Response) => {
  const { Password: plain_Password } = req.body;
  //if the use doeesn't exist
  if (req.User) {
    try {
      const result = await checkPassword(
        plain_Password,
        req.User_id!.toString()
      );
      if (result.match) {
        //else
        return res
          .status(200)
          .send({
            status: 200,
            message: "Password matches",
            userData: result.userinfo,
          });
      }
      //else
      return res
        .status(404)
        .json({ status: 404, message: "Incorrect Password" });
    } catch (error: any) {
      logg.fatal(error.message);
      //else
      return res
        .status(404)
        .json({
          status: 404,
          message: "Sorry something went wrong on our side, We are fixing it!",
        });
    }
  }
  //else
  return res
    .status(401)
    .json({ status: 401, message: "This user doesn't exist" });
};
