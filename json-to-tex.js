"use strict";

const fs = require("fs");

const {
  outputBiography,
  outputTwoColumns,
  outputEducation,
  outputProjects,
  outputCertifications,
  outputExperience,
  outputSkills
} = require("./helpers");

const OUTPUT_FILE_NAME = "NaruthKonguraiResume";
const DOCUMENT_STYLE_CLASS_NAME = "naruthkongurai_resume"; // .cls file name

fs.readFile("data.json", (err, data) => { 
  if (err) throw err; 

  const {
    biography,
    education,
    projects,
    certifications,
    workExperience,
    skills
  } = JSON.parse(data.toString());

  let outputTextData = `
\\documentclass{${DOCUMENT_STYLE_CLASS_NAME}}
\\begin{document}
  `;

  outputTextData += outputBiography(biography);
  outputTextData += outputTwoColumns({
    aside: [
      outputEducation(education),
      outputProjects(projects),
      outputCertifications(certifications)
    ],
    mainSection: [
      outputExperience(workExperience),
      outputSkills(skills)
    ]
  });

  outputTextData += `
\\end{document}
`;

  /**
   * Write to file based on the output data that is generated
   */
  fs.writeFile(`${OUTPUT_FILE_NAME}.tex`, outputTextData, (err) => { 
    if (err) throw err; 
  });

})