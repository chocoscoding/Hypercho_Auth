import { Response } from "express";
import logg from "../Logs/Customlog";
import { CustomRequest } from "../Middleware/finduser";
import {
  addUser,
  addUserType,
  addCreatorType,
  addCreator,
  checkCreator,
  checkName,
} from "../services/Add";
import { hashpassword, signPassword } from "../utils";

//signup users
export const Signupuser = async (req: CustomRequest, res: Response) => {
  //check if user hasn't been added to the db
  const { email, Firstname, Lastname, Country, DOB, Password }: addUserType =
    req.body;

  if (!req.User) {
    try {
      //hash password the sign it
      const Pass:string = signPassword(hashpassword(Password));
      const userdata = await addUser({ Password:Pass, email, Firstname, Lastname, Country, DOB });  

      return res
        .status(200) 
        .json({ status: 200, message: "User created successfully", userdata });
    } catch (error) {
      console.log(error);
      return res.status(404).json({
        status: 404,
        message: "Sorry something went wrong on our side, We are fixing it!",
      });
    }
  }
  //else
  return res
    .status(401)
    .json({ error: "This mail is already in use by another user." });
};

//signup creators from prexising user data;
export const SignupCreator = async (req: CustomRequest, res: Response) => {
  //take data from req body
  const { studio_name, studio_banner, studio_logo }: addCreatorType = req.body;
  //check if the user's mail is in the db
  if (req.User) {
    try {
      //check if there is a matching user in the db who has created a creator account before
      const checkIfCreatorExist: boolean = await checkCreator(req.User_id!.toString());
      if (checkIfCreatorExist) {
        return res
          .status(404)
          .json({ status: 404, message: "This user is already a creator" });
      } else {
        //else if there isn't a matching user to the creator's id

        //then check if the new name has been choosen before
        const checkname: boolean = await checkName(studio_name);
        if (checkname) {
          const creatordata = await addCreator({
            studio_name,
            studio_banner,
            studio_logo,
            userRef_id: req.User_id!.toString(),
          });
          return res
            .status(200)
            .json({
              status: 200,
              message: "Studio account created successfully",
              creatordata
            });
        }
        // else
        return res
          .status(200)
          .json({
            status: 200,
            message: "Studio Name is already in use by another user",
          });
      }
    } catch (error) {
      return res
        .status(404)
        .json({
          status: 404,
          message: "Sorry something went wrong on our side, We are fixing it!",
        });
    }
  }
  //else
  return res.status(401).json({ status:401, error: "This mail is doesn't exist." });
};
