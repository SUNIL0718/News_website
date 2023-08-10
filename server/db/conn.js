const mongoose = require("mongoose");

const db =
  "mongodb+srv://skay:skay@cluster0.rrmt1nm.mongodb.net/NewsAuth?retryWrites=true&w=majority";
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Databse Connected");
  })
  .catch((error) => {
    console.log("Error" + error.message);
  });
