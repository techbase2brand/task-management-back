const bcrypt = require("bcrypt");

const Employee = require("../model/Employee");

// Add new product

const employee_create = async (req, res) => {
  const employee = new Employee({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  try {
    const savedEmployee = await employee.save();

    let myToken = await employee.getAuthToken();
    res.status(200).json({ message: "OK", token: myToken });
    // res.send(savedEmployee);
  } catch (error) {
    res.status(400).send(error);
  }
};

// const employee_Login = async (req, res) => {
//         console.log(req.body,"kkkk")
//   if (!req.body.email || !req.body.password){
//     res.status(301).json({message:"ok", message:" please fill  email and password both"})

//   }

//   const employee = new Employee({
//     email: req.body.email,
//     password: req.body.password,
//   });

//   console.log(employee,"sss--kkk----");

//       let user = await employee.findOne({email: employee.email})

//         console.log(user.password,"sss------");

//       if(user){
//         console.log(user.password,"sss--pppp----");

//         if(user.password) {
//           var match = await bcrypt.compare(req.body.password, user.password);
//            console.log(match,"hh---------")
//           if (match){
//             console.log("hello");
//           } else {
//             res.status(301).json({message:"error", message:" invalid password"});
//           }
//         } else {
//           res.status(301).json({message:"error", message:" user password not fffffound"});
//         }
//       }

//       // else {
//       //   res.status(301).json({message:"error", message:" user not found"});
//       // }

//     else{

//       res.status(301).json({message:"ok" , message :" invalid email id"})
//     }

//   // res.status(200).json({message:"ok", token:"ok"})
//     };

const employee_Login = async (req, res) => {
  console.log(req.body, "kkkk");

  if (!req.body.email || !req.body.password) {
    res.status(301).json({ message: "please fill email and password both" });
    return;
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const employee = new Employee({
    email: req.body.email,
    password: hashedPassword,
  });

  console.log(employee, "sss--kkk----");

  const user = await Employee.findOne({ email: employee?.email }).exec();
  console.log(user?.email, user?.confirmPassword, "sssss------");

  try {
    if (user) {
      var match = await bcrypt.compareSync(req?.body?.password, user?.password);
      console.log(match, "hh---------");
      if (match) {
        res.status(301).json({ message: "login successful" });
      } else {
        res.status(301).json({ message: "invalid password" });
      }
    } else {
      res.status(301).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "server errrrror" });
  }
  // else {
  //   res.status(301).json({ message: "invalid email id" });
  // }
};

module.exports = {
  employee_create,
  employee_Login,
};
