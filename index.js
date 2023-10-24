const express = require("express");
const { ConnectToMongodb } = require("./connect");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./Routes/UserRoutes");
const StocksRoute = require("./Routes/StocksRoute");
const { checkforauthentication } = require("./middleware");
const cors = require("cors");

const app = express();
const port = 8000;

//connect to mongodb
ConnectToMongodb(
  "mongodb+srv://fazfaizan22:faizan415263@faizan.imlzvdr.mongodb.net/mern_stocks?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(() => console.log("Connected to the databse"));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
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
