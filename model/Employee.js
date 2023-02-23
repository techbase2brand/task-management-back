const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const employeeSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: {
    type: String,
    // select: false,
  },
  tokens: [
    {
      token: {
        type: String,
        require: true,
      },
    },
  ],

  confirmPassword: {
    type: String
    // select: false,
  },
});

// Virtual property to hide password field in database
employeeSchema.virtual("passwordHash").get(function () {
  return undefined;
});

// Hash password before saving
employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.confirmPassword = undefined;
//   this.password = undefined;
  next();
});

employeeSchema.methods.getAuthToken = async function (data) {
  let params = {
    id: this._id,
    email: this.email,
  };
  var tokenValue = jwt.sign(params, process.env.SECRETKEY);
  this.tokens = this.tokens.concat({ token: tokenValue });
  await this.save();
  return tokenValue;
};

module.exports = mongoose.model("Employee", employeeSchema);
