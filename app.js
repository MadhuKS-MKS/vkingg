const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const fileupload = require("express-fileupload");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const hpp = require("hpp");
var exphbs = require("express-handlebars");
const cors = require("cors");
const xss = require("xss-clean");
const connectDB = require("./config/db");

//Load env vars
dotenv.config({
  path: "./config/config.env",
});

//connect to database
connectDB();

//initialize app with express
const app = express();

//Route files
const category = require("./routes/category");
const products = require("./routes/products");
const user = require("./routes/users");
const auth = require("./routes/auth");

//bodyparser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// File uploading
app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

//Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routers
app.use("/api/category", category);
app.use("/api/products", products);
app.use("/api/users", user);
app.use("/api/auth", auth);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

//handle unhandled promise rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error :${err.message}`);
  //close server and exit process
  server.close(() => process.exit(1));
});