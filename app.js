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
  (req, res) => {
    console.log("ADDING");
    const fs = require("fs");

    var newJob = {
      title: req.params.title,
      salary: req.params.salary,
      company: req.params.company,
      description: req.params.description,
    };

    let rawdata = fs.readFileSync("jobs.json");
    let jobs = JSON.parse(rawdata);
    jobs.list.push(newJob);

    const jsonString = JSON.stringify(jobs, null, 2);
    fs.writeFile("./jobs.json", jsonString, (err) => {
      if (err) {
        console.log("Error writing file", err);
      } else {
        console.log("Successfully wrote file");
      }
    });
  }
);

//add the router
app.use("/", router);
app.listen(process.env.port || 8000);

console.log("Running at Port 8000");
