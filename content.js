/* =====================================================================
   SITE CONTENT: this is the only file you need to edit.
   ---------------------------------------------------------------------
   - Change any text between the quotes and save. Refresh the page to see it.
   - To add an item to a list (experience, leadership, ventures, etc.),
     copy one whole { ... } block, paste it after a comma, and edit it.
   - To remove an item, delete its whole { ... } block (and the comma).
   - Keep quotes balanced. Apostrophes are fine inside "double quotes".
   - Dates are plain text, so write them however you like.
   ===================================================================== */

window.SITE = {
  name: "David Pahud",
  fullName: "David Nicolo Pahud",
  tagline: "Business & Global Studies · Class of 2027",
  location: "Thousand Oaks, CA",
  email: "dndpahud@gmail.com",
  linkedin: "https://www.linkedin.com/in/david-pahud318",
  resume: "assets/David-Pahud-Resume.pdf",
  photo: "assets/headshot.jpg",

  /* ---------- Hero (top banner) ---------- */
  hero: {
    eyebrow: "Hi, I'm",
    intro:
      "Business & Global Studies senior at Cal Lutheran. I turn market research and data into clear decisions.",
    badge: "Open to operations & business analyst roles in California, 2027",
    primaryButton: "View my work",
    secondaryButton: "Download resume",
  },

  /* ---------- Highlights (right-hand sidebar list) ----------
     "link" is the section it jumps to: #about, #experience,
     #leadership, #education, or #ventures. */
  highlights: [
    { value: "$1,000", label: "Best Team out of 60+ at CLU's New Venture Fair", link: "#ventures" },
    { value: "Grade A", label: "Full scholarship to the European Innovation Academy, London", link: "#education" },
    { value: "NCAA D1", label: "Soccer at Gardner-Webb, Big South champions 2024", link: "#about" },
    { value: "9 of 9", label: "Matches started for the Philippines U-16 national team", link: "#about" },
  ],

  /* ---------- Skills (chips in the sidebar) ---------- */
  skills: [
    "Excel", "Tableau", "Market sizing (TAM/SAM/SOM)", "Competitive research",
    "Regulatory research", "Hootsuite analytics", "Data visualization",
    "Notion databases", "Figma", "Canva",
  ],

  /* ---------- About ---------- */
  about: {
    title: "From Los Baños to Thousand Oaks",
    subtitle: "Soccer opened my eyes to the world and gave me a path to explore it.",
    summary:
      "I grew up in Los Baños, Laguna, in the Philippines. Soccer took me to Manila, then on scholarships to boarding schools in Phuket and New Hampshire, and on to NCAA Division I soccer at Gardner-Webb University. After a series of ankle injuries, I transferred to California Lutheran University and redirected my focus to business, startups, AI, and Global Studies.",
    journey: [
      { place: "Los Baños, Philippines", when: "Childhood", note: "Born and raised in Los Baños, Laguna." },
      { place: "Manila, Philippines", when: "7th–8th grade", note: "Moved to Manila to play better soccer. Selected for the Philippines U-16 national team: two campaigns, started all nine games, 90 minutes in each." },
      { place: "Phuket, Thailand", when: "2019–2021", note: "Scholarship to play for Cruzeiro Football Academy and study at British International School Phuket, a program that recruited athletes in Asia." },
      { place: "New Hampshire, USA", when: "2021–2023", note: "Scholarship to High Mowing School, partnered with Blackrock FC. Graduated and committed to Division I soccer." },
      { place: "North Carolina, USA", when: "2023–2025", note: "NCAA D1 soccer and International Business at Gardner-Webb University. Big South champions in 2024." },
      { place: "Thousand Oaks, California", when: "2025–2027", note: "Transferred to Cal Lutheran as a junior. Business Administration (Entrepreneurship) and Global Studies. Still playing for CLU Men's Soccer." },
    ],
    languages: ["English", "Tagalog"],
    interests: ["Soccer", "DJing", "Forex trading"],
  },

  /* ---------- Experience ("Read more" shows the bullets) ---------- */
  experience: [
    {
      role: "Market Entry & International Expansion Intern",
      org: "NoSongRequests.com",
      dates: "Jun – Aug 2026",
      summary: "Sized the Philippine DJ and live-events market and stress-tested the go-to-market plan before any engineering time was committed.",
      tags: ["Market sizing", "Competitive research", "Go-to-market"],
      bullets: [
        "Built a bottom-up TAM/SAM/SOM model for the Philippine DJ and live-events market from venue and active-DJ counts.",
        "Ran competitive and regulatory research and flagged GCash/Maya payment collection as a blocking risk in the go-to-market plan; the founder adopted my recommendation to reverse it.",
        "Designed a 4-week validation framework with explicit kill criteria to test demand before committing engineering time.",
        "Identified karaoke venues as the lead use case and Facebook Groups and DJ referrals as the lowest-cost acquisition channels.",
      ],
    },
    {
      role: "Global Studies Research Intern",
      org: "California Lutheran University",
      dates: "Sep 2026 – Present",
      summary: "Designing an international business pathway for Global Studies students, reporting to the department chair.",
      tags: ["Research", "Program design", "Strategy"],
      bullets: [
        "Research program structure and course requirements to design an international business pathway for Global Studies students, reporting plan and strategy to the department chair.",
      ],
    },
    {
      role: "Data Analyst",
      org: "School of Management Brand Ambassadors, CLU",
      dates: "Spring 2026 – Present",
      summary: "Turning YouTube, Instagram, and TikTok analytics into reports and content decisions.",
      tags: ["Hootsuite", "Reporting", "Social analytics"],
      bullets: [
        "Build monthly, annual, and event performance reports on YouTube, Instagram, and TikTok using Hootsuite analytics.",
        "Translate engagement data into content recommendations, shifting the posting mix toward top-performing formats.",
      ],
    },
  ],

  /* ---------- Leadership & campus involvement ---------- */
  leadership: [
    {
      role: "President",
      org: "United Students of the World, CLU",
      dates: "2026 – Present",
      text: "Lead the executive board of a cultural club connecting international and domestic students, running event planning, logistics, and promotion, including the November 2026 World Fair.",
    },
    {
      role: "VP of Events",
      org: "American Marketing Association, CLU",
      dates: "Spring 2026 – Present",
      text: "Run professional-development events end to end, from speaker outreach and scheduling to logistics and promotion.",
    },
    {
      role: "Brand Ambassador",
      org: "CLU School of Management",
      dates: "2025 – Present",
      text: "Create content promoting Thousand Oaks small businesses through the SOMthing Local program.",
    },
    {
      role: "Student-athlete",
      org: "CLU Men's Soccer",
      dates: "Current",
      text: "Current member of the men's soccer team, after two years of NCAA Division I soccer at Gardner-Webb.",
    },
  ],

  education: [
    {
      school: "California Lutheran University",
      detail: "B.S. Business Administration (Entrepreneurship) and B.A. Global Studies",
      meta: "Class of 2027 · GPA 3.4",
      coursework: ["Corporate Finance", "Database Design", "Business Process Analysis", "Data Visualization", "Supply Chain Management"],
    },
    {
      school: "Bayes Business School, University of London",
      detail: "European Innovation Academy (BM4000). Grade A, full scholarship",
      meta: "London · Aug 2026",
      text: "Built and validated a startup with an international team in a 3-week, 188-hour intensive, ending in a live pitch to Silicon Valley investors.",
      coursework: [],
    },
  ],

  /* ---------- Ventures & achievements ---------- */
  ventures: [
    {
      name: "REEF",
      status: "Spring 2026 New Venture Fair",
      what: "A concept I solo-founded and pitched that lets people fund coral reef restoration by reducing their screen time.",
      outcome: "Best Team · won $1,000 against 60+ teams",
    },
    {
      name: "ROLO",
      status: "Built at the European Innovation Academy, London · in progress",
      what: "Loyalty and data infrastructure built specifically for small and independent businesses.",
      outcome: "About to start onboarding businesses",
    },
    {
      name: "Philippines market entry",
      status: "Summer 2026 internship · completed",
      what: "Market-entry research on the Philippine market for NoSongRequests.com.",
      outcome: "Research recommended holding off on expansion",
    },
  ],

  awards: [
    { name: "Best Team, New Venture Fair", issuer: "California Lutheran University", date: "Spring 2026" },
    { name: "European Innovation Academy (BM4000)", issuer: "Bayes Business School · Grade A, full scholarship", date: "Aug 2026" },
    { name: "Financial Markets", issuer: "Yale University via Coursera", date: "2025" },
    { name: "AI for Everyone", issuer: "Coursera", date: "2025" },
  ],

  /* ---------- Contact (footer) ---------- */
  contact: {
    heading: "Let's connect",
    text: "I'm looking for operations and business analyst roles in California starting in 2027. If you're hiring, or just want to talk business, startups, or soccer, I'd love to hear from you.",
  },
};
