# Resume

My resume in LaTeX and PDF format.

**Download:** The latest version is available for [download](https://github.com/naruthk/resume/raw/main/NaruthKonguraiResume.pdf).

## Background

I felt like formatting and updating style for my resume on Google Docs or even Microsoft Word was too tedius and so proned to mistake.

Switching over to LaTex was tough at first, but it has since become much tidier in terms of enforcing styles and allowing for maintainability.

## Development

I've written a script using JavaScript that parses what's inside `data.json` into a LaTeX document that can then later be compiled into PDF.

In order to make any changes, the following library are required:

- Node.js
- LaTeX package such as `MacTex` for Mac OS

Assuming you already have them installed, you can simply do the following:

1. Update the content of `data.json`
2. Run the following command to run the script file. Note that the more data you have, the longer it might take to compile (although this could be improved if I switched to writing Python or bash script, I think).
```bash
node jsonToLaTex.js
```
3. Once a `*.tex` file has been generated, we can use any LaTex-supported package to convert the LaTex document into a PDF file. For instance, I am using `pdflatex`.
```bash
pdflatex NAME_OF_TEX_FILE.txt
```

The output is a generated PDF document.

## Disclaimer

The script for JSON-to-LaTeX conversion that I have implemented is designed to be flexible enough to support my use case.

However, if you feel the need to add further customization, then by all means feel free to fork and tweak the source code.
