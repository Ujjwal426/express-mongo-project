import User from "../src/models/users.js";
import statusCode from "../Constants/HttpStatusCode.js";
import bcrypt from "bcryptjs";

export const logUser = async (req, res) => {
  try {
    const password = req.body.password;
    const findUser = await User.findOne({email: req.body.email});
    if (!findUser) {
      return res.status(statusCode.BAD_REQUEST).send({
        message: `Invalid email and passowrd`,
      });
    }
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (isMatch) {
      res.status(statusCode.OK).send({
        data: findUser,
        message: `Login User`,
      });
    } else {
      return res.status(statusCode.BAD_REQUEST).send({
        message: `Invalid email and passowrd`,
      });
    }
  } catch (err) {
    res.status(statusCode.INTERNAL_SERVER).send({
      message: `DataBase Server Error`,
    });
  }
};
