import jwt from "jsonwebtoken";

export const getToken = (user) => {
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
  return token;
};

export const decodeToken = (token) => {
  const value = jwt.verify(token, process.env.SECRET_KEY);
  return value.userId;
};
