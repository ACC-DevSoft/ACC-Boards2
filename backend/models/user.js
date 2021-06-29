const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const userSchema = new mongoose.Schema({
  name: String,
  userName: String,
  email: String,
  password: String,
  roleId: { type: mongoose.Schema.ObjectId, ref: "role" },
  workSpacesId: [{ type: mongoose.Schema.ObjectId, ref: "worksSpaces" }],
  assignedTaskId: [{ type: mongoose.Schema.ObjectId, ref: "task" }],
  date: { type: Date, default: Date.now },
  status: Boolean,
});

userSchema.methods.generateJWT = function () {
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
