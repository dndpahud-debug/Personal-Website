/* =====================================================================
   SITE CONTENT: this is the only file you need to edit.
   ---------------------------------------------------------------------
   - Change any text between the quotes and save. Refresh the page to see it.
   - To add an item to a list (experience, leadership, ventures, etc.),
     copy one whole { ... } block, paste it after a comma, and edit it.
   - To remove an item, delete its whole { ... } block (and the comma).
   - Keep quotes balanced. Apostrophes are fine inside "double quotes".
   - Write dates and details as short, plain sentences.
   ===================================================================== */

window.SITE = {
  name: "David Pahud",
  fullName: "David Nicolo Pahud",
  tagline: "Business and Global Studies at Cal Lutheran, class of 2027.",
  location: "Thousand Oaks, CA",
  timeZone: "America/Los_Angeles", // used for the live local time in the top bar
  email: "dndpahud@gmail.com",
  linkedin: "https://www.linkedin.com/in/david-pahud318",
  resume: "assets/David-Pahud-Resume.pdf",
  photo: "assets/headshot.jpg",

  /* ---------- Hero (giant name + bento tiles) ---------- */
  hero: {
    intro:
      "Business & Global Studies senior at Cal Lutheran. I turn market research and data into clear decisions.",
    primaryButton: "View my work",
    secondaryButton: "Download resume",

    /* Shortcut tiles under the name. Each one jumps to a section.
       "accent: true" makes that tile solid peach (use it on one tile). */
    shortcuts: [
      { title: "Experience", link: "#experience", accent: true,
        teaser: "Market entry research for NoSongRequests.com, plus research and data roles at CLU." },
      { title: "About", link: "#about",
        teaser: "Raised in Laguna, Philippines. D1 soccer at Gardner-Webb, now at Cal Lutheran." },
      { title: "Leadership", link: "#leadership",
        teaser: "President of United Students of the World and VP of Events for the American Marketing Association." },
      { title: "Ventures", link: "#ventures",
        teaser: "REEF won Best Team and $1,000 at CLU's New Venture Fair." },
      { title: "Contact", link: "#contact",
        teaser: "Looking for analyst and operations roles in California for 2027." },
    ],
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

  /* ---------- Experience ("Read more" shows the bullets) ----------
     "meta" is the line under the job title, written as a plain sentence. */
  experience: [
    {
      role: "Market Entry & International Expansion Intern",
      meta: "NoSongRequests.com, summer 2026.",
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
      meta: "California Lutheran University, since September 2026.",
      summary: "Designing an international business pathway for Global Studies students, reporting to the department chair.",
      tags: ["Research", "Program design", "Strategy"],
      bullets: [
        "Research program structure and course requirements to design an international business pathway for Global Studies students, reporting plan and strategy to the department chair.",
      ],
    },
    {
      role: "Data Analyst",
      meta: "CLU School of Management Brand Ambassadors, since spring 2026.",
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
      meta: "United Students of the World at CLU, since 2026.",
      text: "Lead the executive board of a cultural club connecting international and domestic students, running event planning, logistics, and promotion, including the November 2026 World Fair.",
    },
    {
      role: "VP of Events",
      meta: "American Marketing Association at CLU, since spring 2026.",
      text: "Run professional-development events end to end, from speaker outreach and scheduling to logistics and promotion.",
    },
    {
      role: "Brand Ambassador",
      meta: "CLU School of Management, since 2025.",
      text: "Create content promoting Thousand Oaks small businesses through the SOMthing Local program.",
    },
    {
      role: "Student-athlete",
      meta: "CLU Men's Soccer.",
      text: "Current member of the men's soccer team, after two years of NCAA Division I soccer at Gardner-Webb.",
    },
  ],

  education: [
    {
      school: "California Lutheran University",
      detail: "B.S. Business Administration (Entrepreneurship) and B.A. Global Studies",
      meta: "Graduating in 2027 with a 3.4 GPA.",
      coursework: ["Corporate Finance", "Database Design", "Business Process Analysis", "Data Visualization", "Supply Chain Management"],
    },
    {
      school: "Bayes Business School, University of London",
      detail: "European Innovation Academy (BM4000). Grade A, full scholarship",
      meta: "London, August 2026.",
      text: "Built and validated a startup with an international team in a 3-week, 188-hour intensive, ending in a live pitch to Silicon Valley investors.",
      coursework: [],
    },
  ],

  /* ---------- Ventures & achievements ---------- */
  ventures: [
    {
      name: "REEF",
      status: "Pitched at the spring 2026 New Venture Fair.",
      what: "A concept I solo-founded and pitched that lets people fund coral reef restoration by reducing their screen time.",
      outcome: "Won Best Team and $1,000 against 60+ teams",
    },
    {
      name: "ROLO",
      status: "Started at the European Innovation Academy in London, summer 2026. Still in progress.",
      what: "Loyalty and data infrastructure built specifically for small and independent businesses.",
      outcome: "About to start onboarding businesses",
    },
    {
      name: "Philippines market entry",
      status: "Completed during my summer 2026 internship.",
      what: "Market-entry research on the Philippine market for NoSongRequests.com.",
      outcome: "Research recommended holding off on expansion",
    },
  ],

  awards: [
    { name: "Best Team, New Venture Fair", detail: "California Lutheran University, spring 2026." },
    { name: "European Innovation Academy (BM4000)", detail: "Bayes Business School, August 2026. Grade A with a full scholarship." },
    { name: "Financial Markets", detail: "Yale University through Coursera, 2025." },
    { name: "AI for Everyone", detail: "Coursera, 2025." },
  ],

  /* ---------- Contact (footer) ---------- */
  contact: {
    heading: "Let's connect",
    text: "I'm looking for operations and business analyst roles in California starting in 2027. If you're hiring, or just want to talk business, startups, or soccer, I'd love to hear from you.",
  },
};
