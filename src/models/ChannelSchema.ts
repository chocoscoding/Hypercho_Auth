import { model, Schema, ObjectId, Document } from "mongoose";
import logg from "../Logs/Customlog";

//types for channel schema
interface ChannelSchemaType {
  channelName: string;
  channelPic: string;
  channelBanner: string;
  userRef: ObjectId;
  username: string;
  Subscribers: number;
  RegDate: Date;
}
//channel shema
const ChannelSchema = new Schema<ChannelSchemaType>({
  Subscribers: {
    type: Number,
    default: 0,
  },
  RegDate: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  userRef: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  channelName: {
    type: String,
    required: true,
  },
  channelPic: {
    type: String,
    required: true,
    default: "1",
  },
  channelBanner: {
    type: String,
    required: true,
    default: "2",
  },
});

export default model<ChannelSchemaType>("channel", ChannelSchema);
