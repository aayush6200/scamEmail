const combine = (req, res, next) => {
  console.log("combine", res.locals.result);
  if (res.combinedResults) {
    res.combinedResults.push(res.locals.result);
  } else {
    res.combinedResults = [];
    res.combinedResults.push(res.locals.result);
  }
  console.log("at combine result", res.combinedResults);
  next();
};
module.exports = combine;
