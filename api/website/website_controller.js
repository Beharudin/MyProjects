import {
  Get,
  Update,
} from "./website_modal.js";

export function getWebsite(req, res) {
  Get((error, results) => {
    if (error) {
      res.status(500).json({
        success: 0,
        message: "Failed to fetch website",
      });
    } else if (!results) {
      res.status(201).json({
        success: 0,
        message: "Record not found!",
      });
    } else {
      res.status(200).json({
        success: 1,
        data: results,
      });
    }
  });
}
export function updateWebsite(req, res) {
  const body = req.body;
  const id=req.params.id;

  Update(id, body, (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({
        success: 0,
        message: "Failed to update website",
      });
    }
    res.status(200).json({
      success: 1,
      message: "Website updated successfully!",
      data: results,
    });
  });
}

// export function login(req, res) {
//   GetByMobile(req.body.mobile, (error, results) => {
//     if (error) {
//       console.log(error);
//       return res.status(500).json({
//         success: 0,
//         message: "mysql error please check your query",
//         status: "failed",
//       });
//     }
//     if (!results) {
//       return res.status(201).json({
//         success: 0,
//         message: "no data associated with this mobile number!",
//       });
//     }

//     const result = bcrypt.compareSync(req.body.password, results.password);
//     // console.log(results[0].user_password);
//     if (result) {
//       results.password = undefined;
//       const jt = jwt.sign({ result: results }, process.env.JWT_KEY, {
//         expiresIn: "1d",
//       });
//       return res.json({
//         success: 1,
//         message: "customer login Successful!",
//         token: jt,
//       });
//     } else {
//       return res.json({
//         success: 0,
//         data: "invalid username or password",
//       });
//     }
//   });
// }
