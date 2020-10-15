"use strict";

const fs = require("fs");

const OUTPUT_FILE_NAME = "NaruthKonguraiResume";

let outputTextData = "";

fs.readFile("data.json", (err, data) => { 
  if (err) throw err; 

  const {
    biography,
    education,
    projects,
    certifications
  } = JSON.parse(data.toString());

})
fs.writeFile(`${OUTPUT_FILE_NAME}.txt`, outputTextData, (err) => { 
  if (err) throw err; 
});