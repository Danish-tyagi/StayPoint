import jwt from "jsonwebtoken"
const isAuth = async (req, res, next) => {
    try{
        let{token} = req.cookies || {};
    if (!token) {
      return res.status(401).json({ message: "user doesn't have a token" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error("JWT verify error:", err.message);
      return res
        .status(401)
        .json({ message: "user doesn't have a valid token" });
    }

    console.log("Decoded token:", decoded); 
    req.userId = decoded.userId || decoded._id || decoded.id;

    if (!req.userId) {
      return res
        .status(400)
        .json({ message: "token does not contain a user id" });
    }

    return next();
  } catch (error) {
    console.error("isAuth error:", error);
    return res.status(500).json({ message: `isAuth error ${error} `});
  }
};

export default isAuth