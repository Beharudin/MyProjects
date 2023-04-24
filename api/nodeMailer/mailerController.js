import nodemailer from "nodemailer";

export const NodeMailer = async (req, res, next) => {
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: false,
      auth: {
        user: "coopbank2023@gmail.com",
        pass: "gekrppestpuppdmt",
      },
    });
    var mailOptions = {
      from: req.body.from,
      to: req.body.to,
      subject: req.body.subject,
      html:

        `<html>` +
        `<body">` +
        `<center>
          <img src='cid:unique@logo.png'
          style="max-width:100%; margin-top:22px;height:80px;object-fit:cover;"/>
          <br/><br/>
         </center>
     ` +

        `<div style="font-size:14px;
                     font-family: Calibri, Futura;
                     width: 100%;
                     color: black;
                     
                     padding:10px;
                     line-height:28px;
                        ">
        <h4>Dear Sir/Madam,<br/></h4>
        ${req.body.message} 
        </div>` +
        `<br/><br/>
        <center>
            <footer style='margin-top:30px;color:orange'><span>Please do not replay to this email as it is system generated ! <br/><hr/> For more information about our bank please visit our website <hr/>
            <a href='https://coopbankoromia.com.et/' style="font-weight:bold;color:cyan">coopbankoromia.com.et</a></span>
            </footer>
        </center>
        `
        
        +
        `</body></html>`,

      attachments: [
        {
          filename: "cooplogo.png",
          path: "./images/coop_logo_trans.png",
          cid: "unique@logo.png",
        }
      ],
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        res.status(500).json({
          success: 0,
          message: "Failed to send Email due to internal error",
          code: 500,
          error: err,
        });
      } else {
        res
          .status(200)
          .json({ success: 1, message: "Email Sent", details: info });
      }
    });
  } catch (err) {
    console.log({ message: "Email not sent", error: err });
  }
};
