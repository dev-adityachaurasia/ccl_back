import jwt from "jsonwebtoken";

const isAuthantication = (req, res, next) => {
  try {
    console.log("first");
    const token = req.cookies?.token; // Optional chaining for cookies
    if (!token) {
      return res.status(401).json({
        message: "User is not authenticated",
        success: false,
      });
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.id = decode.userId;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({
      message: "Token is invalid or expired",
      success: false,
    });
  }
};

export default isAuthantication;
