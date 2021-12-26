import User from "../src/models/users.js";
import statusCode from "../Constants/HttpStatusCode.js";

export const addUser = async (req, res) => {
    try{  
    const findemail = await User.findOne({email: req.body.email});
    const findPhone = await User.findOne({phone: req.body.phone});
    if(findemail){
        return res.status(statusCode.BAD_REQUEST).send({
            message: `Mail already Exist`,
        })
    }
    if(findPhone){
        return res.status(statusCode.BAD_REQUEST).send({
            message: `Phone No already Exist`,
        })
    }
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    if (password === confirmpassword) {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        gender: req.body.gender,
        phone: req.body.phone,
        password: password,
        confirmpassword: confirmpassword,
      });

      const token = await user.generateAuthToken();

      const registerUser = await user.save();

      res.status(statusCode.OK).send({
        data: registerUser,
        message: `Create User`,
      });
    } else {
      return res.status(statusCode.BAD_REQUEST).send({
        message: `Password are Not Matching`,
      });
    }
}catch(err){
    res.status(statusCode.INTERNAL_SERVER).send({
        error: err,
        message: `DataBase Server Errror`,
    })
}
};
