const express = require("express");
require('dotenv').config();
const { ConnectToMongodb } = require("./connect");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./Routes/UserRoutes");
const StocksRoute = require("./Routes/StocksRoute");
const { checkforauthentication } = require("./middleware");
const cors = require("cors");

const app = express();
const port = 8000;
const CONNECT_TO_MONOGODB = process.env.CONNECT_TO_MONOGODB;
const ORIGIN = process.env.ORIGIN;

//connect to mongodb
ConnectToMongodb(
  CONNECT_TO_MONOGODB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(() => console.log("Connected to the databse"));
app.use(cors({ origin: ORIGIN, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(checkforauthentication);
app.use("/api/users", userRoutes);
app.use("/", StocksRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
