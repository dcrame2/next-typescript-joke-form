// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import axios from "axios";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let responseJokeData;
  try {
    const response = await axios.get(
      "https://v2.jokeapi.dev/joke/Any?type=single",
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (response.data.joke) {
      responseJokeData = response.data.joke;
    } else {
      console.error("No joke found in the API response");
    }
  } catch (error) {
    console.error("Error fetching joke:");
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: `${process.env.GOOGLE_USERNAME}`,
      pass: `${process.env.GOOGLE_API_CODE}`,
    },
    logger: true,
  });

  const info = await transporter.sendMail({
    from: '"Form + Joke"',
    to: `${req.body.enteredEmail}`,
    subject: "Next/TypeScript/Joke Form",
    html: `First Name: ${req.body.enteredFirstName} <br/> Last Name: ${req.body.enteredLastName} <br/> Email: ${req.body.enteredEmail}<br/> Message: ${req.body.enteredMessage} <br /> Funny Joke: ${responseJokeData}`,
    headers: { "x-myheader": "test header" },
  });
  console.log("Message sent: %s", info.response);
  res.status(200).json({ message: "You submitted the form successfully!" });
}
