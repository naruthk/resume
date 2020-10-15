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
%     COLUMN ONE (ASIDE)
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
%     COLUMN TWO (MAIN)
%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\\begin{minipage}[t]{0.55\\textwidth} 
\\raggedright
  `;

  mainSection.map(item => {
    outputData += item;
  });

  outputData += `
\\end{minipage}%
`;

  return outputData;
}

function outputSectionTitle(title) {
  return `
  % ===== ${title.toUpperCase()} ====
  \\sectionheading{${title}}
  `;
}

function outputEducation({ sectionTitle, items }) {
  let outputData = outputSectionTitle(sectionTitle);

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
  let outputData = outputSectionTitle(sectionTitle);

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


function outputCertifications({ sectionTitle, items }) {
  let outputData = outputSectionTitle(sectionTitle);

  items.map(item => {
    const {
      name,
      date,
      issuer
    } = item;

    outputData += `
  \\begin{itemize}
    \\listitem{\\textbf{${name}} (${date}): ${issuer}}
  \\end{itemize}
    `; 
  });

  return outputData;
}

function outputExperience({ sectionTitle, items }) {
  let outputData = outputSectionTitle(sectionTitle);

  items.map(item => {
    const {
      name,
      location,
      dateOfEmployment,
      position,
      responsibilities
    } = item;

    outputData += `
    \\subheadinginfo
    {${name}}
    {${location}}
    {${position}}
    {${dateOfEmployment}}
    `;

    const renderResponsibilites = responsibilities &&
      responsibilities.map(responsibility => `\\listitem{${responsibility}}`).join("\n");

    outputData += `
    \\begin{itemize}
      ${renderResponsibilites}
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
    certifications,
    workExperience
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
      outputCertifications(certifications)
    ],
    mainSection: [
      outputExperience(workExperience)
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