//function that serves as a security check for api routes
//if there is no user or if the user is not an admin the user cannot access our api infomation

const security = (apiInfo, req, res) => {
  if (!req.user || !req.user.isAdmin) res.status(401).send("Forbidden");
  else res.send(apiInfo);
};

module.exports = {
  security
};
