const jwt = require("jsonwebtoken");

exports.checkAuth = (req, res, next) => {
  let header, token;
  if (
    !(header = req.header("Authorization")) ||
    !(token = header.replace("Bearer ", ""))
  ) {
    return res.status(400).send({
      status: "failed",
      message: "Access Denied",
    });
  }

  try {
    const secretKey = "kamucantik3492";

    const verified = jwt.verify(token, secretKey);
    req.userId = verified;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Invalid Token",
    });
  }
};
