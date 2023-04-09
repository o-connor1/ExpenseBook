const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    // debug: true,
    // logger: true,
  });
  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: "aryan_g@mt.iitr.ac.in",
  //     pass: "Aryan$652",
  //   },
  // });

  const mailOptions = {
    from: "Aryan Gaurav <aryan_g@mt.iitr.ac.in>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error);
    else console.log("Mail sent successfully");
  });
};

module.exports = sendEmail;
