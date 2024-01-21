const fetch = require("node-fetch");

const links = async (req, res, next) => {
  const link = req.body.url;

  if (link) {
    const url = `https://phishing-url-risk-api.p.rapidapi.com/url/?url=${link}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "7ec658db27msh08b77e85d6488abp1f364ajsn3c3aee93157c",
        "X-RapidAPI-Host": "phishing-url-risk-api.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);
      res.locals.result = result;
    } catch (error) {
      console.error(error);
      const message =
        "Internal server error. Please include the valid url parameter";
      //   res.json(message);
    }
  } else {
    const message = "status:No domain included";
    // res.json(message);
    res.locals.result = {
      status: "No scam links included included",
      message: "Please include phishing links to get more accurate results",
    };
  }
  next();
};

module.exports = links;
