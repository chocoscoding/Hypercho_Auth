import { Date, model, ObjectId, Schema, Types } from "mongoose";

interface User {
  email: string;
  Firstname: string;
  Lastname: string;
  Country: string;
  Creator: boolean;
  DOB: string;
  Verified: boolean;
  Password: string;
  Reg_date: Date;
}

interface Creator extends User {
  _id: ObjectId;
  userRef_id: ObjectId;
  studio_name: string;
  studio_logo: string;
  studio_banner: string;
  Reg_date: Date;
}

// Create a Schema for user interface.
const userSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
  },
  Firstname: {
    type: String,
    required: true,
  },
  Lastname: {
    type: String,
    required: true,
  },
  Country: {
    type: String,
    required: true,
  },
  Creator: {
    type: Boolean,
    required: true,
  },
  DOB: {
    type: String,
    required: true,
  },
  Verified: {
    type: Boolean,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Reg_date: {
    type: Date,
    required: true,
  },
});
// Create a Schema for creator interface.
const creatorSchema = new Schema<Creator>({
  userRef_id: { type: Schema.Types.ObjectId,required: true},
  studio_banner: { type: String },
  studio_logo: { type: String },
  studio_name: { type: String, required: true },
  Reg_date: {
    type: Date,
    required: true,
  },
});

// export schemas.
export const User = model<User>("User", userSchema);
export const Creator = model<Creator>("Creator", creatorSchema);

