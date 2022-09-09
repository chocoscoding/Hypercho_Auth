import amqplib from "amqplib";
import dotenv from "dotenv";
import logg from "../Logs/Customlog";
dotenv.config();

const serverUri: any = process.env.AMP_SERVER;
let ch2: any;
(async () => {
  const conn = await amqplib.connect(serverUri);
  ch2 = await conn.createChannel();
})().then(() => logg.info("Connection initialized for mail..."));

async function checksom({ email, Firstname, userID }: { email: string; Firstname: string; userID: string }) {
  try {
    logg.info("Connection initializing for mail...");
    const queue: any = process.env.Q1;
    const msg = JSON.stringify({ email, Firstname, userID });
    // const ch2 = await conn.createChannel();

    ch2.assertQueue(queue, {
      durable: true,
    });
    ch2.sendToQueue(queue, Buffer.from(msg));
  } catch (e: any) {
    logg.warn(e.message);
  }
}
export const sendInitmail = async ({ email, Firstname, userID }: { email: string; Firstname: string; userID: string }) => {
  return new Promise((resolve, reject) => {
    checksom({
      email,
      Firstname,
      userID,
    });
    resolve("done");
  });
};
