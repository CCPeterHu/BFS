const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
const multer  = require('multer')
const db = require('../conf/database');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/filterUploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    // image/jpeg  [1] = jpeg
    let fileExt = file.mimetype.split('/')[1];
    //   console.log(fileExt);
    cb(null, `${file.fieldname} - ${Date.now()}-${Math.round(Math.random() * 1E9)}.${fileExt}`)
  }
})


let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
         type: "OAuth2",
         user: "huchen.peter@gmail.com", 
         clientId: "713151316505-egvc7189bk3u5v71ct91u486c3mdmc1e.apps.googleusercontent.com",
         clientSecret: "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",
         refreshToken: "1//04yRjCyG87J6QCgYIARAAGAQSNwF-L9IrXQBpILQEEUQo9p_kgDBAmp2A-2frhbOZNuG3Y0NP_e55qY-v4wBQesH2vDnGLyedP38",
         accessToken  : "ya29.a0AX9GBdWbK1zh1soZK4Ph5ePXCzem-OwHl20SrHHnVA5DKd4PXJB1B2JfOaz2KkItxniB9H8YysP1KD0o2E9mp1KFWoHnzDCwjWUW7q8fC743U-oXhXfgmabhzSTTBKTS_M_MvhUAthY6WPPJx_mOcZ_Tw-1faCgYKAcYSARMSFQHUCsbCGRrvHipyZIS4l3bpwBEgxA0163",
    },
    tls: {
        rejectUnauthorized: false
      },
  });
  

const upload = multer({storage: storage})

router.post('/create', upload.single("uploadImage") , async function (req, res, next) {
    // console.log(req.body);
    let uploadedFile = req.file.path;
    // console.log('mimetype: ' + req.file.mimetype);
    let fileExt = req.file.mimetype.split('/')[1];

    // send mail with defined transport object
    let info = transporter.sendMail({
        from: "<no-reply@gmail.com>",
        to: "chu3@mail.sfsu.edu",
        subject: `Order from ${req.body.name}`,
        text: `Name: ${req.body.name},\nAddress: ${req.body.address},\nNumber:  ${req.body.number},\n 
        20x16: Quantity: ${req.body.quantity20x16}, Matirial: ${req.body.material20x16},\n
        20x20: Quantity: ${req.body.quantity20x20}, Matirial: ${req.body.material20x20},\n
        16x20: Quantity: ${req.body.quantity16x20}, Matirial: ${req.body.material16x20},\n
        note: ${req.body.note}\n
        `,
        attachments: [{
          filename: `requirement.${fileExt}`,
          path: uploadedFile,
        }]
      });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    res.json({
        status: 200,
        message: "Server has gotten your order"
    })
})

module.exports = router;
