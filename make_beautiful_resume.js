const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function generateResume() {
  const doc = new PDFDocument({
    size: 'A4',
    margin: 26
  });

  const targetPath = path.join(__dirname, 'public', 'uploads', 'resume-anushka-tatapudi.pdf');
  const writeStream = fs.createWriteStream(targetPath);
  doc.pipe(writeStream);

  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;
  const margin = 26;
  const contentWidth = pageWidth - margin * 2;

  // Background Fill (#0B0C10 Midnight Black)
  doc.rect(0, 0, pageWidth, pageHeight).fill('#0B0C10');

  let y = 26;

  // 1. CENTERED TOP HEADER
  doc.fillColor('#FFFFFF')
     .font('Helvetica-Bold')
     .fontSize(20)
     .text('TATAPUDI ANUSHKA', margin, y, { align: 'center', width: contentWidth });
  
  y += 24;

  // Contact info line - Single clean line with exact spacing (#C5C6C7 text, #66FCF1 links)
  const contactText = 'Email: anushka.tatapudi@gmail.com  |  Phone: +919703048264  |  LinkedIn: anushka-tatapudi1312  |  Github: anushkatatapudi-T';
  doc.fontSize(8)
     .font('Helvetica')
     .fillColor('#C5C6C7')
     .text(contactText, margin, y, { align: 'center', width: contentWidth });

  y += 18;

  // Helper Section Header Function (#45A29E Teal Divider)
  function addSection(title) {
    doc.fillColor('#66FCF1')
       .font('Helvetica-Bold')
       .fontSize(10)
       .text(title.toUpperCase(), margin, y);
    
    y += 12;
    doc.moveTo(margin, y)
       .lineTo(pageWidth - margin, y)
       .strokeColor('#45A29E')
       .lineWidth(1)
       .stroke();
    
    y += 6;
  }

  // 2. CAREER OBJECTIVE
  addSection('CAREER OBJECTIVE');
  doc.fillColor('#C5C6C7')
     .font('Helvetica')
     .fontSize(8)
     .text(
       'Motivated and detail-oriented Computer Science undergraduate with a strong foundation in programming and web development. Eager to apply skills in Python, JavaScript, and modern front-end frameworks to real-world projects, while continuing to grow through hands-on experience and collaborative teamwork.',
       margin, y, { width: contentWidth, align: 'left', lineGap: 1.5 }
     );
  y = doc.y + 7;

  // 3. EDUCATION
  addSection('EDUCATION');
  
  const eduItems = [
    {
      inst: "St. Peter's Engineering College — B.Tech, Computer Science Engineering",
      years: "2025 – 2029",
      sub: "Currently Pursuing"
    },
    {
      inst: "SR Junior College, Kukatpally — Intermediate (MPC)",
      years: "2023 – 2025",
      sub: "Percentage: 98.8%"
    },
    {
      inst: "Bhairava Vidya Bhavan High School, Goutham Nagar, Balanagar — SSC (10th Grade)",
      years: "",
      sub: "CGPA: 9.2"
    }
  ];

  eduItems.forEach(item => {
    doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(8).text(item.inst, margin, y);
    if (item.years) {
      doc.fillColor('#45A29E').font('Helvetica-Oblique').fontSize(8).text(item.years, margin, y, { align: 'right', width: contentWidth });
    }
    y += 10;
    doc.fillColor('#C5C6C7').font('Helvetica-Oblique').fontSize(7.5).text(item.sub, margin, y);
    y += 10;
  });
  y += 1;

  // 4. TECHNICAL SKILLS
  addSection('TECHNICAL SKILLS');
  
  const skills = [
    { label: 'Programming Language', val: 'Python, SQL' },
    { label: 'Web Technologies', val: 'HTML, CSS, JavaScript' },
    { label: 'Frameworks/Libraries', val: 'React, Next.js' },
    { label: 'Tools', val: 'Microsoft Excel, Git & Github' }
  ];

  skills.forEach(s => {
    doc.fillColor('#C5C6C7').font('Helvetica').fontSize(8).text('•   ', margin + 8, y, { continued: true });
    doc.font('Helvetica-Bold').text(s.label + ': ', { continued: true });
    doc.font('Helvetica').text(s.val);
    y += 10;
  });
  y += 1;

  // 5. PROJECTS
  addSection('PROJECTS');
  
  // Project 1
  doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(8).text('AI Life Decision Simulator', margin, y);
  y += 9;
  doc.fillColor('#C5C6C7').font('Helvetica-Oblique').fontSize(7.5).text('Web App — ', margin, y, { continued: true });
  doc.fillColor('#66FCF1').text('student-career-app.netlify.app');
  y += 9;

  const proj1Bullets = [
    'Built an interactive web application that simulates the outcomes of different life and career decisions using AI-driven logic.',
    'Applied front-end development skills (HTML, CSS, JavaScript) to design an engaging, user-friendly interface.'
  ];

  proj1Bullets.forEach(b => {
    doc.fillColor('#C5C6C7').font('Helvetica').fontSize(8).text('•   ' + b, margin + 8, y, { width: contentWidth - 8, lineGap: 1 });
    y = doc.y + 2;
  });
  y += 3;

  // Project 2: SA // BASECAMP
  doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(8).text('SA // BASECAMP', margin, y);
  y += 9;
  doc.fillColor('#C5C6C7').font('Helvetica-Oblique').fontSize(7.5).text('Web Platform — ', margin, y, { continued: true });
  doc.fillColor('#66FCF1').text('cgp.specanciens.com');
  y += 9;

  const proj2Bullets = [
    'A web platform developed for SPECIANCIENS to support alumni-student engagement, mentorship, and career networking.',
    'Contributed to front-end development, platform feature integration, and student-alumni engagement workflows.'
  ];

  proj2Bullets.forEach(b => {
    doc.fillColor('#C5C6C7').font('Helvetica').fontSize(8).text('•   ' + b, margin + 8, y, { width: contentWidth - 8, lineGap: 1 });
    y = doc.y + 2;
  });
  y += 1;

  // 6. CERTIFICATIONS
  addSection('CERTIFICATIONS');

  const certs = [
    'Digital Application Fundamentals (STEM) — FutureSkills Prime, NASSCOM IT-ITeS SSC (March 2026)',
    'Introduction to Generative AI — IBM SkillsBuild (February 2026)',
    'Certificate of Achievement — Best Performing member, Industry Awareness Program, SPECIANCIENS (Alumni Association of St. Peter\'s Engineering College)'
  ];

  certs.forEach(c => {
    doc.fillColor('#C5C6C7').font('Helvetica').fontSize(8).text('•   ' + c, margin + 8, y, { width: contentWidth - 8, lineGap: 1 });
    y = doc.y + 2;
  });
  y += 1;

  // 7. ACHIEVEMENTS & PARTICIPATION
  addSection('ACHIEVEMENTS & PARTICIPATION');

  const achievements = [
    '3rd Prize, Quantix — St. Peter\'s Engineering College; problem statement "Mathematics in Smart Games using AI"',
    'Participated in MEGA GEN-AI HACK-A-THON 2026',
    'Participated in GENOS\'26 — National Level Technical Symposium, Dept. of Chemical Engineering, JNTUH UCEST (Trivia Quiz)'
  ];

  achievements.forEach(a => {
    doc.fillColor('#C5C6C7').font('Helvetica').fontSize(8).text('•   ' + a, margin + 8, y, { width: contentWidth - 8, lineGap: 1 });
    y = doc.y + 2;
  });
  y += 1;

  // 8. EXTRA-CURRICULAR & ORGANIZATIONAL EXPERIENCE
  addSection('EXTRA-CURRICULAR & ORGANIZATIONAL EXPERIENCE');

  doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(8).text('Junior Associate — Projects Team', margin, y);
  y += 9;
  doc.fillColor('#C5C6C7').font('Helvetica-Oblique').fontSize(7.5).text('SPECIANCIENS — The Alumni Association of St. Peter\'s Engineering College (Member) | ', margin, y, { continued: true });
  doc.fillColor('#66FCF1').text('specanciens.com');
  y += 9;

  const expBullets = [
    'Member of SPECIANCIENS, the official registered Alumni Association of St. Peter\'s Engineering College, connecting alumni, students, and industry through mentorship and events.',
    'Served on the Projects Team, contributing to association initiatives and on-ground support for events.',
    'Collaborated with fellow team members to ensure smooth execution of alumni-student networking events and programs.'
  ];

  expBullets.forEach(eb => {
    doc.fillColor('#C5C6C7').font('Helvetica').fontSize(8).text('•   ' + eb, margin + 8, y, { width: contentWidth - 8, lineGap: 1 });
    y = doc.y + 2;
  });

  doc.end();

  writeStream.on('finish', () => {
    console.log('Successfully generated palette matching resume PDF at: ' + targetPath);
  });
}

generateResume();
