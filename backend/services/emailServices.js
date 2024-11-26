require("dotenv").config();

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: process.env.EMAIL_SERVICE_PROVIDER,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_SERVICE_AUTH_EMAIL,
    pass: process.env.EMAIL_SERVICE_AUTH_PASS,
  },
});

const setPasswordEmail = async (email, name, otp, username) => {
  try {
    const data = await transporter.sendMail({
      from: process.env.EMAIL_SERVICE_SEND_FROM,
      to: email,
      subject: "Login Details",
      text: `Hey ${name}, Thanks for using our service`,
      html: `
			 <!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Login Details</title>
	<style>
		/* Reset styles */
		body, html {
			margin: 0;
			padding: 0;
		}
		/* Email body styles */
		.email-body {
			font-family: Arial, sans-serif;
			background-color: #f4f4f4;
			padding: 20px;
		}
		/* Email container styles */
		.email-container {
			max-width: 600px;
			margin: 0 auto;
			border-radius: 10px;
			box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
			padding: 20px;
			text-align: center;
			animation: gradient-shift 10s ease infinite;
			background: linear-gradient(45deg, #FFC107, #FF5722, #3F51B5, #009688);
			background-size: 400% 400%;
		}
		@keyframes gradient-shift {
			0% {
				background-position: 0% 50%;
			}
			50% {
				background-position: 100% 50%;
			}
			100% {
				background-position: 0% 50%;
			}
		}
		/* Heading styles */
		h1 {
			color: #fff;
			font-size: 28px;
			margin-bottom: 20px;
		}
		/* Logo styles */
		.logo {
			max-width: 150px;
			margin-bottom: 20px;
		}
		/* Description styles */
		.description {
			color: #fff;
			font-size: 16px;
			line-height: 1.6;
			margin-bottom: 20px;
		}
		/* OTP box styles */
		.otp-box {
			display: inline-block;
			background-color: #f0f0f0;
			padding: 10px 20px;
			border-radius: 5px;
			font-size: 24px;
			margin-bottom: 20px;
			animation: pulse 1s infinite alternate;
		}
		@keyframes pulse {
			from {
				transform: scale(1);
			}
			to {
				transform: scale(1.1);
			}
		}
		/* Expiry message styles */
		.expiry-msg {
			color: #fff;
			font-size: 14px;
			margin-bottom: 20px;
		}
		/* Button styles */
		.button {
			background-color: #007bff;
			color: #fff;
			text-decoration: none;
			padding: 10px 20px;
			border-radius: 5px;
			transition: background-color 0.3s ease;
		}
		.button:hover {
			background-color: #0056b3;
		}
		.change-password {
			color: #ffeb3b; /* Yellow text color */
			font-size: 14px;
			margin-top: 10px;
		}
		.logo{
		  border-radius: 5px;
		  height: 100px;
		  width: 100px;
		}
		
	</style>
</head>
<body class="email-body">
	<div class="email-container">
		<img src="https://res.cloudinary.com/dzcwyczlf/image/upload/v1731823632/tqqzll6uyrihsujnhtjl.png" alt="Logo" class="logo" />
		<h1>Login Details</h1>
		<p class="description">Hi <strong>${name}</strong>,</p>
		<p class="description">
			You have successfully registered in our service. Here are your login details. Keep them safe and do not share them with anyone.
		</p>
		<p class="description">Your username:</p>
		<div class="otp-box">${username}</div>
		<p class="description">Your password:</p>
		<div class="otp-box">${otp}</div>
		<p class="change-password"> * Please change your default password from the application </p>
	</div>
</body>
</html>
`,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { transporter, setPasswordEmail };
