const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ACC:1234@cluster0.1uok1.mongodb.net/ACCBOARDS?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    );
    console.log("Connected with MongoDB");
  } catch (err) {
    console.log("Error while trying to connect with MongoDB", err);
    throw new Error("Error while trying to connect with MongoDB");
  }
};

module.exports = { dbConnection };
