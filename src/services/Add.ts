import { ObjectId } from "mongoose";
import logg from "../Logs/Customlog";
import { UserData } from "../Middleware/finduser";
import { User, Creator } from "../models/Users";
import { sendInitmail } from "./sendqueue";

export interface addUserType {
  email: string;
  Firstname: string;
  Lastname: string;
  DOB: string;
  Country: string;
  Password: string;
}
export interface addCreatorType {
  studio_banner: string;
  studio_logo: string;
  studio_name: string;
  userRef_id: string | ObjectId;
}
interface tempData extends Omit<UserData, "Password"> {
  Password?: string;
}
//function to add new user
export const addUser = async ({ Password, email, Firstname, Lastname, Country, DOB }: addUserType): Promise<tempData> => {
  const username: string = `${Firstname.trim().toLowerCase()}${Lastname.trim().toLowerCase()}`;
  //check if user hasn't been added to the db
  try {
    const user: any = new User({
      email,
      Firstname,
      Lastname,
      Country,
      DOB,
      Verified: false,
      Password,
      profilePic: "1",
      username,
      Settings: {
        History: false,
      },
    });
    const created_user = await user.save();
    sendInitmail({
      email: created_user.email,
      Firstname: created_user.Firstname,
      userID: created_user._id.toString(),
    });
    console.log("added new user");
    const tempdata: tempData = created_user;
    tempdata.Password = undefined;
    return tempdata;
  } catch (error: any) {
    logg.fatal(error.message);
    throw new Error(error.message);
  }
};

//function to add new creator
export const addCreator = async ({ studio_banner, studio_logo, studio_name, userRef_id }: addCreatorType): Promise<addCreatorType> => {
  //check if user hasn't been added to the db
  try {
    const creator: any = new Creator({
      studio_banner,
      studio_logo,
      studio_name,
      userRef_id,
      Reg_date: new Date(),
    });
    const created_creator = await creator.save();
    await User.findOneAndUpdate({ _id: userRef_id.toString() }, { Creator: true });
    return created_creator;
  } catch (error: any) {
    logg.fatal(error.message);
    throw new Error(error.message);
  }
};

//function to check if there is a studio user connected to user
export const checkCreator = async (userid: string): Promise<boolean> => {
  const id = userid.toString();
  try {
    const checkCreator = await Creator.find({ userRef_id: id });
    if (checkCreator.length > 0) return true;
    return false;
  } catch (error: any) {
    logg.fatal(error.message);
    throw new Error(error.message);
  }
};

//function to check if the name already exist
export const checkName = async (name: string): Promise<boolean> => {
  try {
    const checkName = await Creator.findOne({ studio_name: name });
    if (checkName === null) return true;
    return false;
  } catch (error: any) {
    logg.fatal(error.message);
    throw new Error(error.message);
  }
};

// {
//   "email": "timileyinwandf@gmail.com",
//   "Firstname": "Timiletttt",
//   "Lastname": "Chocos",
//   "Country": "Nigeria",
//   "DOB": "33-33-33",
//   "Password": "abc123"
// }
// {
//   "email": "timileyinwandf@gmail.com",
//   "Password": "abc123"
// }
