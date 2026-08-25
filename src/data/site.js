export const ENQUIRY_URL = "https://delhiworldpublicschool.edchemy.com/enquiry.html";
export const PHONES = ["9611360631", "9611457761"];

export const SOCIAL = [
  { name: "Facebook", url: "https://www.facebook.com/delhiworldpublicschool" },
  { name: "YouTube", url: "https://www.youtube.com/@delhiworldpublicschooltumk2029" },
  { name: "Instagram", url: "https://www.instagram.com/delhi_worldpublicschool/" },
];

// Primary navigation with mega-menu columns. `to` values are real routes.
// Structure follows the reference site: About / Campus / Mandatory Disclosure / Discover Us / Careers / Contact.
export const NAV = [
  { label: "About", to: "/about-us", menu: [
    { items: [
      ["About Us", "/about-us"],
      ["Management", "/about-us/management"],
      ["Academics", "/about-us/academics"],
      ["Life Trustee", "/about-us/life-trustee"],
      ["Advisory Council", "/about-us/advisory-council"],
    ]},
  ]},
  { label: "Campus", to: "/campus" },
  { label: "Mandatory Disclosure", to: "/mandatory-disclosure" },
  { label: "Discover Us", to: "/admissions", menu: [
    { h: "Explore", items: [
      ["Admissions", "/admissions"],
      ["Student Life", "/student-life"],
      ["Co-Curricular Activities", "/co-curricular"],
      ["Kindergarten", "/kindergarten"],
      ["Achievements", "/achievements"],
      ["Events & News", "/events-news"],
    ]},
  ]},
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact-us" },
];

export const FOOTER_COLS = [
  { h: "About School", items: [
    ["Our Story", "/about-us/our-story"], ["Vision & Mission", "/about-us/vision-mission"],
    ["Management", "/about-us/management"], ["Life Trustee", "/about-us/life-trustee"],
  ]},
  { h: "Quick Links", items: [
    ["Home", "/"], ["About Us", "/about-us"], ["Campus", "/campus"],
    ["Student Life", "/student-life"], ["Gallery", "/gallery"], ["Events & News", "/events-news"],
  ]},
  { h: "Academics", items: [
    ["Curriculum", "/about-us/academics"], ["Kindergarten", "/kindergarten"],
    ["Co-Curricular", "/co-curricular"], ["Achievements", "/achievements"],
  ]},
  { h: "Admissions", items: [
    ["Admission Process", "/admissions/process"], ["Eligibility", "/admissions/eligibility"],
    ["Fee Structure", "/admissions/fee-structure"], ["FAQs", "/admissions/faqs"],
    ["Careers", "/careers"],
  ]},
];
