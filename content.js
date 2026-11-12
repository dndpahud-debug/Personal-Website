/* =====================================================================
   SITE CONTENT: this is the only file you need to edit.
   ---------------------------------------------------------------------
   - Change any text between the quotes and save. Refresh the page to see it.
   - To add an item to a list (experience, leadership, ventures, etc.),
     copy one whole { ... } block, paste it after a comma, and edit it.
   - To remove an item, delete its whole { ... } block (and the comma).
   - Keep quotes balanced. If a sentence needs an apostrophe, it's fine
     inside "double quotes", e.g. "I'm".
   - Dates are plain text, so write them however you like.
   ===================================================================== */

window.SITE = {
  name: "David Pahud",
  fullName: "David Nicolo Pahud",
  location: "Thousand Oaks, CA",
  email: "dndpahud@gmail.com",
  linkedin: "https://www.linkedin.com/in/david-pahud318",
  resume: "assets/David-Pahud-Resume.pdf",
  photo: "assets/headshot.jpg",

  /* ---------- Hero (top of the page) ---------- */
  hero: {
    eyebrow: "Hi, I'm",
    intro:
      "Business & Global Studies senior at Cal Lutheran. I turn market research and data into clear decisions.",
    badge: "Open to operations & business analyst roles in California, 2027",
    primaryButton: "View my work",
    secondaryButton: "Download resume",
  },

  /* ---------- Highlights (the dark band of big numbers) ---------- */
  highlights: [
    { value: "$1,000", label: "Best Team out of 60+ at CLU's New Venture Fair" },
    { value: "Grade A", label: "Full scholarship to the European Innovation Academy, London" },
    { value: "NCAA D1", label: "Soccer at Gardner-Webb, Big South champions 2024" },
    { value: "9 of 9", label: "Matches started for the Philippines U-16 national team" },
  ],

  /* ---------- About ---------- */
  about: {
    heading: "From Los Baños to Thousand Oaks",
    paragraphs: [
      "I grew up in Los Baños, Laguna, in the Philippines. Soccer opened up the world for me. I moved to Manila in 7th grade to play at a higher level, and in 8th grade I was selected for the Philippines U-16 national team, where I started all nine games across two campaigns.",
      "Scholarships then took me to boarding schools on two continents: Cruzeiro Football Academy and British International School Phuket in Thailand, then High Mowing School and Blackrock FC in New Hampshire. From there I committed to play NCAA Division I soccer at Gardner-Webb University in North Carolina, where we won the Big South in 2024.",
      "After a series of ankle injuries, I transferred to California Lutheran University as a junior and redirected my focus toward business, startups, AI, and Global Studies. Today I'm a senior pursuing a B.S. in Business Administration (Entrepreneurship) and a B.A. in Global Studies, and I still play for CLU Men's Soccer.",
    ],
    journey: [
      { place: "Los Baños", country: "Philippines", when: "Childhood", note: "Born and raised in Los Baños, Laguna." },
      { place: "Manila", country: "Philippines", when: "7th–8th grade", note: "Moved to play better soccer. Selected for the Philippines U-16 national team." },
      { place: "Phuket", country: "Thailand", when: "2019–2021", note: "Scholarship to Cruzeiro Football Academy and British International School Phuket." },
      { place: "New Hampshire", country: "USA", when: "2021–2023", note: "Scholarship to High Mowing School and Blackrock FC. Committed to D1 soccer." },
      { place: "North Carolina", country: "USA", when: "2023–2025", note: "D1 soccer and International Business at Gardner-Webb. Big South champions 2024." },
      { place: "Thousand Oaks", country: "California", when: "2025–2027", note: "Transferred to Cal Lutheran. Business Administration and Global Studies." },
    ],
    languages: ["English", "Tagalog"],
    interests: ["Soccer", "DJing", "Forex trading"],
  },

  /* ---------- Experience (expandable cards) ---------- */
  experience: [
    {
      role: "Market Entry & International Expansion Intern",
      org: "NoSongRequests.com",
      dates: "Jun – Aug 2026",
      summary: "Sized the Philippine DJ and live-events market and stress-tested the go-to-market plan.",
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
      summary: "Designing an international business pathway for Global Studies students.",
      tags: ["Research", "Program design", "Strategy"],
      bullets: [
        "Research program structure and course requirements to design an international business pathway for Global Studies students, reporting plan and strategy to the department chair.",
      ],
    },
    {
      role: "Data Analyst",
      org: "School of Management Brand Ambassadors, CLU",
      dates: "Spring 2026 – Present",
      summary: "Turning social media analytics into content decisions.",
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
      coursework: [],
    },
  ],

  /* ---------- Ventures & achievements ---------- */
  ventures: [
    {
      name: "REEF",
      what: "A concept I solo-founded and pitched that lets people fund coral reef restoration by reducing their screen time.",
      status: "Spring 2026 New Venture Fair",
      outcome: "Best Team · won $1,000 against 60+ teams",
    },
    {
      name: "ROLO",
      what: "Loyalty and data infrastructure built specifically for small and independent businesses.",
      status: "Built at the European Innovation Academy, London, summer 2026 · in progress",
      outcome: "About to start onboarding businesses",
    },
    {
      name: "Philippines market entry",
      what: "Market-entry research on the Philippine market for NoSongRequests.com.",
      status: "Summer 2026 internship · completed",
      outcome: "Research recommended holding off on expansion",
    },
  ],

  awards: [
    { name: "Best Team, New Venture Fair", issuer: "California Lutheran University", date: "Spring 2026" },
    { name: "European Innovation Academy (BM4000)", issuer: "Bayes Business School · Grade A, full scholarship", date: "Aug 2026" },
    { name: "Financial Markets", issuer: "Yale University via Coursera", date: "2025" },
    { name: "AI for Everyone", issuer: "Coursera", date: "2025" },
  ],

  skills: [
    { group: "Analysis", items: ["Excel", "Tableau", "Market sizing (TAM/SAM/SOM)", "Competitive & regulatory research", "Hootsuite analytics", "Data visualization"] },
    { group: "Tools", items: ["Notion databases", "Figma", "Canva"] },
    { group: "Languages", items: ["English", "Tagalog"] },
  ],

  /* ---------- Contact ---------- */
  contact: {
    heading: "Let's connect",
    text: "I'm looking for operations and business analyst roles in California starting in 2027. If you're hiring, or just want to talk business, startups, or soccer, I'd love to hear from you.",
  },
};
