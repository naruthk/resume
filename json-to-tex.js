"use strict";

const fs = require("fs");

const OUTPUT_FILE_NAME = "Test";

let outputTextData = "";

function outputBiography({
  firstName,
  lastName,
  position,
  emailAddress,
  mobileNumber,
  location,
  website,
  linkedin,
  github
}) {
  return `
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%
%     POINT OF CONTACT
%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\\bio
{${firstName} ${lastName}}
{${position}}
{\\href{mailto:${emailAddress}}{${emailAddress}}}
{${mobileNumber}}
{\\href{${linkedin}}{${linkedin}}}
{${location}}
{\\href{${github}}{${github}}}
{\\href{${website}}{${website}}}
  `;
}

function outputTwoColumns({ aside, mainSection }) {
  // Add command to initilize the first column
  let outputData = `
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%
%     COLUMN ONE
%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\\begin{minipage}[t]{.4\\textwidth}
\\raggedright
  `;

  aside.map(item => {
    outputData += item;
  });

  // Add command to end the first column and begin the next one
  outputData += `
\\end{minipage}
\\hfill
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%
%     COLUMN TWO
%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\\begin{minipage}[t]{0.55\\textwidth} 
\\raggedright
  `;

  mainSection.map(item => {
    outputData += item;
  });

  return outputData;
}

function outputEducation({ sectionTitle, items }) {
  let outputData = `
% ===== EDUCATION ====
\\sectionheading{${sectionTitle}}
  `;

  items.map(item => {
    const {
      name,
      location,
      dateOfCompletion,
      degreeType,
      major,
      minor,
      gpa,
      relevantCourses,
      extracurriculars
    } = item;

    outputData += `
    \\textbf{${name}} \\\\
    ${location} \\\\
    ${degreeType} \\\\
    \\textit{${dateOfCompletion}}
  
    \\begin{itemize}
      \\listitem{\\textbf{Major}: ${major} $\\cdot$ Minor: ${minor}}
      \\listitem{\\textbf{Cumulative GPA}: ${gpa}}
      \\listitem{Relevant Courses: ${relevantCourses.join(", ")}}
      \\listitem{Clubs and Positions: ${extracurriculars.join(", ")}}
    \\end{itemize}
    `; 
  });

  return outputData;
}

function outputProjects({ sectionTitle, items }) {
  let outputData = `
% ===== PROJECTS ====
\\sectionheading{${sectionTitle}}
  `;

  items.map(item => {
    const {
      name,
      date,
      description,
      urls
    } = item;

    const renderLinks = urls && Object.keys(urls).map(key => {
      if (!urls[key]) return "";

      return `$\\cdot$ \\href{${urls[key]}}{(${key[0].toUpperCase()}${key.substring(1)})}`;
    }).join(" ");

    outputData += `
  \\begin{itemize}
    \\listitem{\\textbf{${name}} ${renderLinks} (${date}): ${description}}
  \\end{itemize}
    `; 
  });

  return outputData;
}

fs.readFile("data.json", (err, data) => { 
  if (err) throw err; 

  const {
    biography,
    education,
    projects,
    certifications
  } = JSON.parse(data.toString());

  outputTextData += `
\\documentclass{naruthkongurai_resume}
\\begin{document}
  `;

  outputTextData += outputBiography(biography);
  outputTextData += outputTwoColumns({
    aside: [
      outputEducation(education),
      outputProjects(projects),
      // outputCertificatioons(certifications)
    ],
    mainSection: []
  });

  /**
   * Write to file based on the output data that is generated
   */
  fs.writeFile(`${OUTPUT_FILE_NAME}.tex`, outputTextData, (err) => { 
    if (err) throw err; 
  });

})