import { ObjectId } from "mongodb";
import { UserData } from "../Middleware/finduser";
import { User } from "../models/Users";
import { comparepassword, verifyPassword } from "../utils";

interface tempData extends Omit<UserData, "Password"> {
  Password?: string;
}
//function to verify password
export const checkPassword = async (plain_Password: string, _id: string): Promise<{ match: boolean; userinfo: null | tempData }> => {
  //fetch password
  const findUser: UserData | null = await User.findOne({ _id }).populate("channel", { _id: 1, channelPic: 1, channelName: 1 });
  //convert it from jwt to hashed version
  const verifiedPass = verifyPassword(findUser!.Password);
  //compare hased version and plain text
  const PasswordMatch = comparepassword(plain_Password, verifiedPass);
  const tempdata: tempData = findUser!;
  tempdata.Password = undefined;
  if (PasswordMatch)
    return {
      match: true,
      userinfo: tempdata,
    };
  return {
    match: false,
    userinfo: null,
  };
};
