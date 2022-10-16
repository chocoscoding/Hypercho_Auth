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
  username: string;
  profilePic: string;
  Settings: {
    History: {
      Pause: Boolean;
    };
  };
}

interface Creator extends User {
  _id: ObjectId;
  userRef_id: ObjectId;
  creator_banner: string;
  creator_pic: string;
  channel_name: string;
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
    default: Date.now
    },
  Settings: {
    type: Schema.Types.Mixed,
    History: {
      type: Schema.Types.Mixed,
      Pause: { type: Boolean, default: false },
    },
  },
  profilePic: { type: String, required: true },
  username: { type: String, required: true },
});
// Create a Schema for creator interface.
const creatorSchema = new Schema<Creator>({
  userRef_id: { type: Schema.Types.ObjectId, required: true },
  creator_banner: { type: String },
  creator_pic: { type: String },
  channel_name: { type: String, required: true },
  Reg_date: {
    type: Date,
    required: true,
  },
});

// export schemas.
export const User = model<User>("User", userSchema);
export const Creator = model<Creator>("Creator", creatorSchema);
