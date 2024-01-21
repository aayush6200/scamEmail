const fetch = require("node-fetch");

const dnsVerify = async (req, res, next) => {
  const fetch = require("node-fetch");
  const domain = req.body.dnsName;

  if (domain) {
    const url = `https://zozor54-whois-lookup-v1.p.rapidapi.com/?domain=${domain}&format=json&_forceRefresh=0`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "7ec658db27msh08b77e85d6488abp1f364ajsn3c3aee93157c",
        "X-RapidAPI-Host": "zozor54-whois-lookup-v1.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      console.log(domain);
      const result = await response.text();
      console.log(result);
      res.locals.result = result;
      // res.json(result);
    } catch (error) {
      console.error(error);
      res.json(result);
    }
  } else {
    const message = "status:No domain included";
    // res.json(result);
    res.locals.result = {
      status: "No domain included",
      message: "Please include phising links to get more accurate results",
    };
  }
  next();
};

module.exports = dnsVerify;
