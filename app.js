const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();

//home page
router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

//get all jobs
router.get("/getjobs", function (req, res) {});

//addjob
router.get(
  "/title/:title/salary/:salary/company/:company/description/:description",
  (req, res) => {}
);

//add the router
app.use("/", router);
app.listen(process.env.port || 8000);

console.log("Running at Port 8000");
