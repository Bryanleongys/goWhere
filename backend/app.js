const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");

app.use(cors());
app.options("*", cors());

//middleware - checking everything in the software before executed
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use(errorHandler); // do not understand the difference between authJwt() and errorHandler

//Routes
const usersRoutes = require("./routes/users");
const cliquesRoutes = require("./routes/cliques");
// const categoriesRoutes = require("./routes/categories");
// const productsRoutes = require("./routes/products");
// const ordersRoutes = require("./routes/orders");

const api = process.env.API_URL;

app.use(`${api}/users`, usersRoutes);
app.use(`${api}/cliques`, cliquesRoutes);
// app.use(`${api}/categories`, categoriesRoutes);
// app.use(`${api}/products`, productsRoutes);
// app.use(`${api}/orders`, ordersRoutes);

//Database
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "eshop-database",
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

// // Server
// app.listen(3000, () => {
//   console.log("server is running http://localhost:3000");
// });

// Production
var server = app.listen(process.env.PORT || 3000, function () {
  var port = server.address().port;
  console.log("Express is working on port " + port);
});
