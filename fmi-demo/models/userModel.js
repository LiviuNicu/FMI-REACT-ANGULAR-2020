const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");
const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  hashed_password: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now },
});
const user = mongoose.model("user", UserSchema);
function hashPW(pw) {
  return crypto.createHash("sha256").update(pw).digest("base64").toString();
}
exports.register = function (userReq) {
  let newUser = new user();

  newUser.set("email", userReq.email);
  newUser.set("name", userReq.name);
  newUser.set("hashed_password", hashPW(userReq.password));

  return new Promise((resolve, reject) => {
    newUser.save(function (err, insertedUser) {
      if (err) {
        reject({ err });
      } else {
        resolve({ user: insertedUser });
      }
    });
  });
};
