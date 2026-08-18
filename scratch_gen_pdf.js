const fs = require('fs');
const path = require('path');

const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kinds /Page /Count 1 /Kids [3 0 R] >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 630 >>
stream
BT
/F1 22 Tf
50 720 Td
(Tatapudi Anushka) Tj
/F1 11 Tf
0 -25 Td
(Computer Science Engineering Student & Aspiring AI/ML Engineer) Tj
0 -18 Td
(Email: anushkatatapudi@gmail.com | LinkedIn: linkedin.com/in/anushka-tatapudi1312) Tj
0 -15 Td
(GitHub: github.com/anushkatatapudi-T/Python-practice-questions) Tj
0 -35 Td
/F1 14 Tf
(EDUCATION) Tj
/F1 11 Tf
0 -20 Td
(St. Peter's Engineering College - B.Tech CSE (2025-2029)) Tj
0 -15 Td
(SR Junior College - Intermediate MPC (Grade: 98.8%)) Tj
0 -15 Td
(Bhairava Vidya Bhavan High School - SSC (9.2 CGPA)) Tj
0 -35 Td
/F1 14 Tf
(TECHNICAL SKILLS & TOOLS) Tj
/F1 11 Tf
0 -20 Td
(Languages: Python, SQL, HTML, CSS, JavaScript) Tj
0 -15 Td
(Frameworks & Tools: React, Next.js, Git & GitHub, Microsoft Excel) Tj
0 -35 Td
/F1 14 Tf
(PROJECTS & ACHIEVEMENTS) Tj
/F1 11 Tf
0 -20 Td
(AI Life Decision Simulator | SA // BASECAMP (SPECIANCIENS)) Tj
0 -15 Td
(3rd Prize - Quantix National Mathematics Day | IBM Generative AI Certified) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000125 00000 n 
0000000248 00000 n 
0000000930 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
1001
%%EOF`;

const targetPath = path.join(__dirname, 'public', 'uploads', 'resume-anushka-tatapudi.pdf');
fs.writeFileSync(targetPath, pdfContent);
console.log('Successfully updated resume-anushka-tatapudi.pdf at ' + targetPath);
