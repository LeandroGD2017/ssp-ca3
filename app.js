const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();

//home page
router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

//get all jobs
//gets all jobs that are in the json file and sends back
//to the client
router.get("/getjobs", function (req, res) {
  const fs = require("fs");
  let rawdata = fs.readFileSync("jobs.json");
  let jobs = JSON.parse(rawdata);
  //sends joblist in json as a response
  res.json(jobs);
});

//add job
//receives title, salary, company, description
//tries to add the job details to the existing json file
//shows success message if works, otherwise shows error message
router.get(
  "/title/:title/salary/:salary/company/:company/description/:description",
  (req, res) => {
    console.log("ADDING");
    const fs = require("fs");

    //creates new object
    var newJob = {
      title: req.params.title,
      salary: req.params.salary,
      company: req.params.company,
      description: req.params.description,
    };

    //read json file and push the new object
    let rawdata = fs.readFileSync("jobs.json");
    let jobs = JSON.parse(rawdata);
    jobs.list.push(newJob);

    //writes back the new array into the json file
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

//delete job
//it takes a title and a company and tries to delete it if it exists
//in the json file
//if succeeds, shows a successful message, otherwise shows error
//function gets the json, converts it into an object, remove index from
//array and writes new array into the existing json file
router.get("/title/:title/company/:company", (req, res) => {
  console.log(req.params.title, req.params.company);

  //reads the json and converts to an object
  const fs = require("fs");
  let rawdata = fs.readFileSync("jobs.json");
  let jobs = JSON.parse(rawdata);

  //loops through array to find matching title and company
  for (i = 0; i < jobs.list.length; i++) {
    if (
      jobs.list[i].title == req.params.title &&
      jobs.list[i].company == req.params.company
    ) {
      //deletes it here
      jobs.list.splice(i, 1);
    }
  }

  //writes back into json the new array
  const jsonString = JSON.stringify(jobs, null, 2);
  fs.writeFile("./jobs.json", jsonString, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
});

//add the router
app.use("/", router);
app.listen(process.env.port || 3000);

console.log("Running at Port 3000");
