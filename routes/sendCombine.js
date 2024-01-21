const sendMail = require("./sendmail.js");
const sendCombine = async (req, res) => {
  const content = res.result;
  const email = req.body.email;
  console.log("email", email);
  const response = await sendMail({ email, content });
  if (response.ok) {
    res.json({
      message: "Results were sent successfully on the email",
      response: response,
    });
  } else {
    res.json({ message: "There was an error sending the mail. Try again" });
  }
};
module.exports = sendCombine;
