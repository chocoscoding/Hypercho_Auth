import { ObjectId } from "mongoose";
import {User} from '../models/Users'
import { hashpassword, signPassword } from '../utils' 
import logg from '../Logs/Customlog'
//function to change password
export const changePassword =async (user_id:string, newPassword:string) => {
 const _id:string = user_id.toString();
 const newPassword_signedAndHashed: string = signPassword(hashpassword(newPassword));
    //findone and update
 try {
     await User.findOneAndUpdate({_id}, {Password:newPassword_signedAndHashed});
     return 'Password reset successfully'     
 } catch (error:any) {
    logg.fatal(error.message);
    throw new Error(error.message)
 }
}