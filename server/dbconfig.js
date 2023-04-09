const mongoose = require("mongoose");

exports.connect = () => {
  mongoose
    .connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //  useCreateIndex: false,
      //  useFindAndModify: false
    })
    .then(() => {
      console.log("DATABASE CONNECTED!");
    })
    .catch((err) => {
      console.log(err);
    });
};
