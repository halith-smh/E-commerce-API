const { app } = require("./app");
const {connectDB } = require("./db");

port = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("Server is Listening on Port 8000.....");
    });
  })
  .catch((error) => {
    console.error("Error connecting while connecting to database", error);
  });
