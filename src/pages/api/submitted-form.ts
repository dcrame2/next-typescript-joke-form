// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: `dcrame2@gmail.com`,
      pass: `xwit skzx myso bjqg`,
    },
    logger: true,
  });

  const info = await transporter.sendMail({
    from: '"Dylan" <fuckme@gmail.com>',
    to: "dcrame2@gmail.com",
    subject: "Next/TypeScript Form",
    text: "Bro just give up on coding",
    html: `First Name: ${req.body.enteredFirstName} <br/> Last Name: ${req.body.enteredLastName} <br/> Message: ${req.body.enteredMessage}`,
    headers: { "x-myheader": "test header" },
  });
  console.log("Message sent: %s", info.response);

  console.log(req.body);
  //   const {enteredFirstName, enteredLastName, enteredMessage} = req.body;
  res.status(200).json({ message: "You submitted the form successfully!" });
}
