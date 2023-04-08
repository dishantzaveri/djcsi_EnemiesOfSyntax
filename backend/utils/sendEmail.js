// const nodemailer = require('nodemailer');
// const dotenv = require('dotenv').config();
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// const PizZip = require('pizzip');
// const Docxtemplater = require('docxtemplater');

import fs from 'fs';
import path from 'path';
// const fs = require('fs');
// const path = require('path');
// const { convertToPDF } = require('./conversion');

class EmailUtils {
  sendEmail = async ({ email, subject, html, attachments }) => {
    // var transporter = nodemailer.createTransport({
    //     host: "smtp-mail.outlook.com", // hostname
    //     secureConnection: false, // TLS requires secureConnection to be false
    //     port: 587, // port for secure SMTP
    //     tls: {
    //        ciphers:'SSLv3'
    //     },
    //     auth: {
    //         user: '',
    //         pass: ''
    //     }
    // });
    try {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
          clientId: process.env.OAUTH_CLIENTID,
          clientSecret: process.env.OAUTH_CLIENT_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN
        }
      });
      // const transporter = nodemailer.createTransport({
      //   service: 'Outlook365',
      //   auth: {
      //     user: process.env.EMAIL,
      //     pass: process.env.PASSWORD
      //   },
      //   tls: {
      //     ciphers: 'SSLv3',
      //     rejectUnauthorized: false
      //   }
      // });

      const options = {
        from: '"Sainik Suvidha" <kjmickey003@gmail.com>',
        to: email,
        subject: subject,
        html: html + '\n<p>Regards,<br />Sainik Suvidha</p>',
        attachments: attachments
      };
      console.log('Sending email');

      let info = await transporter.sendMail(options);
      console.log('Message sent: %s', info.messageId);

      //   transporter.sendMail(options, function (error, info) {
      //     if (error) {
      //         console.log("Email sent successfully");
      //       return console.log(error);
      //     } else {
      //         console.log("Email sent successfully");
      //         console.log("Message sent: " + info);
      //     }

      //   });

      return;
    } catch (err) {
      console.log('emailUtil/sendEmail', err);
      throw new Error(err.message);
    }
  };

  // examiners: {
  //   internalExaminer: 'internal examiner name',
  //   externalExaminer: 'external examiner name'
  // },
  sendOralPracticalMail = async (
    email,
    htmlContent,
    { examiners, examinerType, branch, semester, courseCode, courseName }
  ) => {
    try {
      // Load the docx file as binary content
      const content = fs.readFileSync(path.resolve(__dirname, '../Assets/Oral-practical Template.docx'), 'binary');

      const zip = new PizZip(content);

      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true
      });

      const today = new Date();
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1; // Months start at 0!
      let dd = today.getDate();

      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;

      const formattedToday = dd + '/' + mm + '/' + yyyy;

      const docNo = await docNumber.findOne({});

      console.log(docNo.current);

      // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
      doc.render({
        docNumber: `${today.toLocaleString('default', { month: 'short' }).toLocaleUpperCase()}${docNo.current}`,
        acadYear: '22-23',
        date: formattedToday,
        semester,
        courseCode,
        courseName,
        examiners,
        year: yyyy,
        examinerType,
        branch
      });

      docNo.current = docNo.current + 1;
      await docNo.save();

      const buf = doc.getZip().generate({
        type: 'nodebuffer',
        // compression: DEFLATE adds a compression step.
        // For a 50MB output document, expect 500ms additional CPU time
        compression: 'DEFLATE'
      });

      await this.sendEmail({
        subject: `Appointment Order as Examiner`,
        email: email,
        attachments: [
          {
            filename: 'OR/PR Appointment Order.docx',
            content: buf
          }
        ],
        html: htmlContent
      });
      return;
    } catch (err) {
      console.log('emailUtil/sendOralPracticalMail', err);
      throw new Error(err.message);
    }
  };

  /*
Format of data
const data = {
  docNumber: 'Valid Document Number',
  examiners: [
    {
      internalExaminer: 'internal examiner name',
      externalExaminer: 'external examiner name'
    }
  ],
  project: 'Project Name',
  branch: 'Branch Name',
  semester: 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII' | 'VIII' ...,
  examinationAtDate: eg. Nov/Dec
}
*/
  sendProjectMail = async (email, htmlContent, { examiners, project, branch, semester, examinationAt }) => {
    try {
      // Load the docx file as binary content
      const content = fs.readFileSync(path.resolve(__dirname, '../Assets/Project Template.docx'), 'binary');

      const zip = new PizZip(content);

      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true
      });

      const today = new Date();
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1; // Months start at 0!
      let dd = today.getDate();

      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;

      const formattedToday = dd + '/' + mm + '/' + yyyy;

      const docNo = await docNumber.findOne({});

      console.log(docNo.current);

      // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
      doc.render({
        year: yyyy,
        date: formattedToday,
        docNumber: `${today.toLocaleString('default', { month: 'short' }).toLocaleUpperCase()}${docNo.current}`,
        examiners,
        project,
        branch,
        semester,
        examinationAt
      });

      docNo.current = docNo.current + 1;
      await docNo.save();

      const buf = doc.getZip().generate({
        type: 'nodebuffer',
        // compression: DEFLATE adds a compression step.
        // For a 50MB output document, expect 500ms additional CPU time
        compression: 'DEFLATE'
      });

      // Conver to PDF
      // await convertToPDF(buf);

      await this.sendEmail({
        subject: `Appointment Order as Examiner`,
        email: email,
        attachments: [
          {
            filename: 'OR/PR Appointment Order.docx',
            content: buf
          }
        ],
        html: htmlContent
      });
      return;
    } catch (err) {
      console.log('emailUtil/sendProjectMail', err);
      throw new Error(err.message);
    }
  };

  // examiners: {
  //   name: 'examiner name',
  //   oragnization: 'examiner organization'
  //   role: 'Chairperson & Question Paper Setter'
  //   email: 'examiner email'
  // },

  sendQPMail = async (email, htmlContent, { courseCode, courseName, semester, examiners, branch }) => {
    try {
      // Load the docx file as binary content
      const content = fs.readFileSync(path.resolve(__dirname, '../Assets/QP Template.docx'), 'binary');

      const zip = new PizZip(content);

      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true
      });

      const today = new Date();
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1; // Months start at 0!
      let dd = today.getDate();

      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;

      const formattedToday = dd + '/' + mm + '/' + yyyy;

      const docNo = await docNumber.findOne({});

      console.log(docNo.current);

      // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
      doc.render({
        docNumber: `${today.toLocaleString('default', { month: 'short' }).toLocaleUpperCase()}${docNo.current}`,
        date: formattedToday,
        courseCode,
        courseName,
        semester,
        examiners,
        branch
      });

      docNo.current = docNo.current + 1;
      await docNo.save();

      const buf = doc.getZip().generate({
        type: 'nodebuffer',
        // compression: DEFLATE adds a compression step.
        // For a 50MB output document, expect 500ms additional CPU time
        compression: 'DEFLATE'
      });

      // Conver to PDF
      // await convertToPDF(buf);

      await this.sendEmail({
        subject: `Appointment Order as Examiner`,
        email: email,
        attachments: [
          {
            filename: 'QP Appointment Order.docx',
            content: buf
          },
          {
            filename: 'QP Uploading Guidelines.pptx',
            path: path.resolve(__dirname, '../Assets/Presentation QBMS 2.pptx')
          }
        ],
        html: htmlContent
      });
      return;
    } catch (err) {
      console.log('emailUtil/sendProjectMail', err);
      throw new Error(err.message);
    }
  };
}
export default new EmailUtils();
// module.exports = new EmailUtils();
