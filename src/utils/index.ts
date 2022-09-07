import { compareSync } from "bcrypt";
import { hashSync } from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.JWT_TOKEN;
//check if all parameters are provided
export const checkparameter = (arr: Object): string | null => {
  let string: string = "";
  Object.entries(arr).forEach(([key, value], i, array) => {
    if (!value) {
      string += `${key}, `;
    }
  });
  if (string) {
    return string;
  }
  return null;
};

//hash password with bcrypt
export const hashpassword = (password: string): string => {
  const hash: string = hashSync(password, 15);
  return hash;
};
//compare password with bcrypt
export const comparepassword = (
  plainpassword: string,
  hashedpassowrd: string
): boolean => {
  const compareString: any = compareSync(plainpassword, hashedpassowrd);
  return compareString;
};
//sign password with jwt
export const signPassword = (hashedPassword: string): string => {
  const sign = jwt.sign(hashedPassword, secret!);
  return sign;
};
//checnge passeord with jwt
export const verifyPassword = (signedpassword: string): string => {
  const hashedpassword: any = jwt.verify(signedpassword, secret!);
  return hashedpassword;
};
