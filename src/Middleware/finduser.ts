import { NextFunction, Request, Response } from "express";
import { Date, ObjectId } from "mongoose";
import logg from "../Logs/Customlog";
import { User } from "../models/Users";
import { addUserType } from "../services/Add";
import { checkparameter } from "../utils";

//extend the express type request
export interface CustomRequest extends Request {
  User?: string | null;
  User_id?: string | null;
}

//types for UserData
export interface UserData {
  _id: string;
  email: string;
  Firstname: string;
  Lastname: string;
  Country: string;
  Creator: boolean;
  DOB: number;
  Verified: boolean;
  Password: string;
  Reg_date: Date;
}

//check if user exist in the database
export const checkuser = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
  const { email, Firstname, Lastname, Country, DOB, Password }: addUserType = req.body;
  const parametercheck = checkparameter({
    email,
    Firstname,
    Lastname,
    Country,
    DOB,
    Password,
  });

  //check if email isn't valid
  if (parametercheck) {
    return res.status(401).send({ error: `Kindly provide: ${parametercheck}` });
  }
  //else
  try {
    const UserData: null | UserData = await User.findOne({ email }, "email");
    //if user doesnt exist, continue to the next thing
    if (UserData === null) {
      req.User = null;
      return next();
    }
    // else
    req.User = UserData.email;
    return next();
  } catch (error: any) {
    logg.error(error.message);
    return res.status(404).send({
      error: "Sorry something went wrong on our side, We are fixing it!",
    });
  }
};

//check if the user exist but for creators
export const checkuser_creator = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
  const { email, studio_name }: { email: string; studio_name: string } = req.body;
  const parametercheck = checkparameter({ email, studio_name });

  //check if email isn't valid
  if (parametercheck) {
    return res.status(401).send({ error: `Kindly provide: ${parametercheck}` });
  }
  //else
  try {
    const UserData: null | UserData = await User.findOne({ email }, "email");
    //if user doesnt exist, continue to the next thing
    if (!UserData) {
      req.User = null;
      return next();
    }
    // else
    req.User = UserData.email;
    req.User_id = UserData._id;
    return next();
  } catch (error: any) {
    logg.error(error.message);
    return res.status(404).send({
      error: "Sorry something went wrong on our side, We are fixing it!",
    });
  }
};

//check if user exist in the database for logi n and reset password
export const checkuserLoginAndReset = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => {
  const { userId, Password }: { userId: ObjectId; Password: string } = req.body;
  const parametercheck = checkparameter({ userId, Password });

  //check if email isn't valid
  if (parametercheck) {
    return res.status(401).send({ error: `Kindly provide: ${parametercheck}` });
  }
  //else
  try {
    const UserData: null | UserData = await User.findOne({ _id: userId });
    //if user doesnt exist, continue to the next thing
    if (UserData === null) {
      req.User = null;
      return next();
    }
    // else
    req.User_id = UserData._id;
    return next();
  } catch (error: any) {
    logg.error(error.message);
    return res.status(404).send({
      error: "Sorry something went wrong on our side, We are fixing it!",
    });
  }
};
