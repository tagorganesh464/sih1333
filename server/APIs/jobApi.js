const verifytoken = require("./middlewares/verifyToken");
const exp = require("express");
const nodemailer = require("nodemailer");
const jobapp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const accountSid = 'AC2f8ff7f6b529db737ea304a508c021bc';
const authToken = '8c659ebaec79220a089b131cbf80697e';
const client = require('twilio')(accountSid, authToken);


const virtualTwilioNumber = '+12058831914';


// Send each article as a separate message via Twilio.
const article = '\nYou Got Job.';

jobapp.get(
  "/get-job/:role",
  expressAsyncHandler(async (request, response) => {
    // get jobCollection
    const jobCollection = request.app.get("jobCollection");

    let jobObj = await jobCollection
      .find({ role: request.params.role })
      .toArray();

    response.status(200).send({ message: "job list", payload: jobObj });
  })
);

jobapp.use(exp.json());
jobapp.post(
  "/add-public",
  expressAsyncHandler(async (request, response) => {
    
    const jobCollection = request.app.get("jobCollection");

    const newJob = request.body;

    const jobOfDB = await jobCollection.findOne({ post: newJob.post });
    if (jobOfDB !== null) {
      response.status(200).send({ message: "job already exists" });
    } else {
      const userCollection=request.app.get("userCollection");
      const to = await userCollection.find({ role: "employee" }).toArray();

      const content = `Hey ${newJob.name},\n\nA new job opportunity is available:\n\nOrganization: ${newJob.organisation}\nPost: ${newJob.post}\nJob Type: ${newJob.method}\nLast Date: ${newJob.lastDate}\nVacancies: ${newJob.vacancies}\nApplication Link: ${newJob.link}\n\nFasten your seat belt and grab the job!\n`;
      for (key of to) {
  //       client.messages
  // .create({
  //   body: article,
  //   from: virtualTwilioNumber,
  //   to: `+91${key.phone}`
  // })
  // .then(message => console.log('Message sent:', message.sid))
  // .catch(error => console.error('Error sending message:', error));
         
        sendEmail(key.email,content );
       
      }
      console.log("job created successfully in api")
     
      await jobCollection.insertOne(newJob);

      response.status(201).send({ message: "job created" });
    }
  })
);

jobapp.use(exp.json());
jobapp.post(
  "/add-private",
  expressAsyncHandler(async (request, response) => {
    
    const jobCollection = request.app.get("jobCollection");

    const newJob = request.body;

    const jobOfDB = await jobCollection.findOne({position: newJob.position });
    if (jobOfDB !== null) {
      response.status(200).send({ message: "job already exists" });
    } else {
      const userCollection=request.app.get("userCollection");
      const to = await userCollection.find({ role: "employee" }).toArray();

      const content = `Hey ${newJob.name},\n\nA new job opportunity is available:\n\nOrganization: ${newJob.companyName}\nPost: ${newJob.position}\nJob Type: ${newJob.jobType}\nLocation: ${newJob.location}\nApplication Link: ${newJob.link}\n\nFasten your seat belt and grab the job!\n`;
      for (key of to) {
  //       client.messages
  // .create({
  //   body: article,
  //   from: virtualTwilioNumber,
  //   to: `+91${key.phone}`
  // })
  // .then(message => console.log('Message sent:', message.sid))
  // .catch(error => console.error('Error sending message:', error));
         
        sendEmail(key.email,content );
       
      }
      console.log("job created successfully in api")
     
      await jobCollection.insertOne(newJob);

      response.status(201).send({ message: "job created" });
    }
  })
);





async function sendEmail(to, content) {
  // Create a SMTP transporter
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yunoastha3@gmail.com",
      pass: "pxhcostmjjmzmkwv",
    },
  });

  // Define email options
  let mailOptions = {
    from: "yunoastha3@gmail.com",
    to: to,
    subject: "new job available , please do apply",
    text: content,
  };

  // Send the email
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}

// Example usage



module.exports = jobapp;
