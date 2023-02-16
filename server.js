const app = require("./app");

const PORT = process.env.PORT || 4000;

const mongoose = require("mongoose");

const URL = process.env.MONGO_URI;

const connectToDB = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(URL)
    .then((connection) => {
      console.log(`Connected to DB: ${connection.connection.host}`);
      app.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`);
      });
    })
    .catch((error) => {
      console.log(error.message);
      process.exit(1);
    });
};

connectToDB();
