const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  //roleId: { type: mongoose.Schema.ObjectId, ref: "role" },
  //assignedTaskId: { type: mongoose.Schema.ObjectId, ref: "task" },
  //workSpacesId: { type: mongoose.Schema.ObjectId, ref: "worsSpace" },
  date: { type: Date, default: Date.now },
  status: Boolean,
});

userSchema.method.generateJWT = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      roleId: this.roleId,
      iat: moment().unix(),
    },
    process.env.SECRET_KEY_JWT
  );
};

const User = mongoose.model("user", userSchema);
module.exports = User;
