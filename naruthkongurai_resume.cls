\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{naruthkongurai_resume}[2020/10/15 My customized resume style]

\LoadClass[10pt,a4paper]{article}
\RequirePackage[utf8]{inputenc}
\RequirePackage{color}
\RequirePackage{titlesec}
\RequirePackage{framed}
\RequirePackage{geometry}
\RequirePackage{minipage-marginpar}
\RequirePackage[hidelinks]{hyperref}
\RequirePackage{fancyhdr}

% \usepackage{showframe} % used for debugging. comment out before publishing

% ====== STYLING ======
\geometry{top=2.5cm, bottom=-.6cm, left=2cm, right=1.5cm} 	
\definecolor{bordercolor}{RGB}{186, 186, 186}
\setlength{\textwidth}{6.7in}
\setlength{\parindent}{0pt} % Hack to match biography width

% ====== STYLING (HEADER) ======
\pagestyle{fancy}
\renewcommand{\headrulewidth}{0pt}
\fancyhead[LE,RO]{Last updated: {\today}}

% ====== COMMANDS ======

% Renders point of contact information
\newcommand{\bio}[8]{
  \noindent
  \begin{minipage}[t]{.5\textwidth}
    \textbf{\LARGE #1} \\
    \texttt{#3} \\
    \texttt{#5} \\
    \texttt{#7}
  \end{minipage}%
  \begin{minipage}[t]{.5\textwidth}
    \raggedleft
    \textbf{\large #2} \\
    \texttt{#4} \\
    \texttt{#6} \\
    \texttt{#8}
  \end{minipage}

  \vspace{6pt}
}  

% Renders the Heading for each section
\newcommand{\sectionheading}[1]{
  \vspace{14pt}
  \textbf{\Large #1}
  \vspace{6pt}
}

% Renders each individual subheading (employer name, date of employment)
\newcommand{\subheadinginfo}[4]{
  \vspace{6pt}
  \noindent
  \begin{minipage}[t]{.5\textwidth}
    \textbf{#1} \\
    #2
  \end{minipage}%
  \begin{minipage}[t]{.5\textwidth}
    \raggedleft
    \textit{#3} \\
    \textit{#4}
  \end{minipage}
  \vspace{-4pt}
}

% Renders each individual item in a list
\newcommand{\listitem}[1]{
  \item #1 \vspace{-5pt}
}