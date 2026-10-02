export const PHONE = "(424) 424-1838";
export const PHONE_HREF = "tel:+14244241838";
export const ADDRESS = "2370 S Robertson Blvd, Los Angeles, CA 90034";

const UP = "https://help.nuviewtreatment.com/wp-content/uploads";

export const IMG = {
  hero: `${UP}/2025/12/iop-php-herobanner.jpg`,
  php: `${UP}/2026/01/php-new-lp-1024x576.jpg`,
  iop: `${UP}/2025/12/outpatient-hero-bg-1024x576.jpg`,
  virtual: `${UP}/2025/12/form-bg-1024x576.jpg`,
  why: `${UP}/2025/11/how-telehealth-764x1024.webp`,
  formBg: `${UP}/2025/12/form-bg.jpg`,
};

export const GALLERY = [
  `${UP}/2025/09/gallery-1.jpg`,
  `${UP}/2025/09/gallery-2.jpg`,
  `${UP}/2025/09/gallery-3.jpg`,
  `${UP}/2025/09/gallery-4.jpg`,
  `${UP}/2025/09/gallery-5.jpg`,
  `${UP}/2025/09/gallery-6.jpg`,
  `${UP}/2025/09/gallery-7.jpg`,
  `${UP}/2025/09/gallery-8.jpg`,
];

export const INSURERS = [
  { name: "Cigna", logo: `${UP}/2025/09/cigna.webp` },
  { name: "Horizon", logo: `${UP}/2025/09/horizon.webp` },
  { name: "Aetna", logo: `${UP}/2025/09/aetna.webp` },
  { name: "Tufts", logo: `${UP}/2025/09/tufts.webp` },
  { name: "Blue Cross", logo: `${UP}/2025/09/blue-cross.webp` },
  { name: "Anthem", logo: `${UP}/2025/09/anthem.webp` },
  { name: "Beacon", logo: `${UP}/2025/09/beacon.webp` },
  { name: "AmeriHealth", logo: `${UP}/2025/09/amerihealth.webp` },
  { name: "TriCare", logo: `${UP}/2025/11/tricare-1024x514.png` },
  { name: "TriCare West", logo: `${UP}/2025/11/tricare-west.png` },
  { name: "MultiPlan", logo: `${UP}/2025/11/multiplan-1024x182.png` },
];

export const BENEFITS = [
  { icon: "briefcase", label: "Career Development & Life Skills Training" },
  { icon: "calendar", label: "Same-Day Admissions Available" },
  { icon: "clock", label: "Evening & Afternoon Programs" },
  { icon: "shield", label: "Most Insurance Accepted" },
  { icon: "sparkle", label: "Evidence-Based Therapy" },
  { icon: "laptop", label: "Virtual Options" },
];

export type Level = {
  id: string;
  short: string;
  title: string;
  tagline: string;
  body: string;
  image: string;
  icon: string;
  details: { label: string; value: string; icon: string }[];
  cta: string;
};

export const LEVELS: Level[] = [
  {
    id: "php",
    short: "PHP",
    title: "PHP (Partial Hospitalization Program)",
    tagline: "Our highest level of outpatient support",
    body: "Intensive structured dual-diagnosis therapy in an outpatient setting. Ideal for those who need comprehensive care.",
    image: IMG.php,
    icon: "users",
    details: [
      { label: "Setting", value: "In person, at our Los Angeles center", icon: "home" },
      { label: "Intensity", value: "Comprehensive, structured care", icon: "shield" },
      { label: "Focus", value: "Dual-diagnosis (mental health + substance use)", icon: "heart" },
      { label: "Best for", value: "People who need the most support without inpatient stay", icon: "user" },
    ],
    cta: "Talk to us about PHP",
  },
  {
    id: "iop",
    short: "IOP",
    title: "IOP (Intensive Outpatient Program)",
    tagline: "Structured support that fits your week",
    body: "Flexible sessions designed around your schedule. Ongoing support to help you maintain progress while staying connected to care and recovery communities.",
    image: IMG.iop,
    icon: "calendar",
    details: [
      { label: "Setting", value: "In person, afternoon & evening groups", icon: "home" },
      { label: "Intensity", value: "Part-time, built around your schedule", icon: "clock" },
      { label: "Focus", value: "Maintaining progress + recovery community", icon: "users" },
      { label: "Best for", value: "Working professionals, students and parents", icon: "briefcase" },
    ],
    cta: "Talk to us about IOP",
  },
  {
    id: "virtual",
    short: "Virtual",
    title: "Virtual Treatment",
    tagline: "The same care, from where you are",
    body: "Receive the same high-quality care from the comfort of your home. Ideal for those balancing work, school, or family commitments.",
    image: IMG.virtual,
    icon: "laptop",
    details: [
      { label: "Setting", value: "Secure video sessions, anywhere in California", icon: "wifi" },
      { label: "Intensity", value: "Same programming as in-person care", icon: "shield" },
      { label: "Focus", value: "Therapy that travels with your life", icon: "sparkle" },
      { label: "Best for", value: "Anyone balancing work, school or family", icon: "briefcase" },
    ],
    cta: "Ask about virtual care",
  },
];

export const FEATURES = [
  {
    icon: "clipboard",
    title: "Free Confidential Assessment & Immediate Placement",
    body: "Get evaluated at no cost and start treatment right away. No waiting lists.",
  },
  {
    icon: "clock",
    title: "True Flexibility: Virtual, Afternoon & Night Options",
    body: "Evening and afternoon programs designed to work around your job, school, or family commitments. Treatment fits your life, not the other way around.",
  },
  {
    icon: "briefcase",
    title: "Beyond Recovery: Career & Life Skills Development",
    body: "Job readiness, financial planning, resume building, and real-world skills for lasting success.",
  },
  {
    icon: "heart",
    title: "Integrated Dual-Diagnosis Care",
    body: "Integrated care for mental health and substance use. We address root causes, not just symptoms.",
  },
  {
    icon: "sparkle",
    title: "Personalized, Evidence-Based Care",
    body: "Treatment plans built specifically for you using proven methods like EMDR, CBT, and DBT.",
  },
];

export const REVIEWS = [
  {
    name: "Mike Rossi",
    date: "May 6, 2025",
    quote:
      "I have been a part of this program for a few months and it has guided me to living a healthy and sober lifestyle. The counsellors are tops and the therapy has changed my life for the better. Take it from someone who never thought this was possible. Thank you NuView.",
  },
  {
    name: "Hunter Johnston",
    date: "May 16, 2025",
    quote:
      "Would definitely recommend Nuview for anybody looking for help. From the excellent staff, support groups, and fun social activities. Any mental health and substance abuse you can think of this place has done wonders. Thank you!!!!!",
  },
  {
    name: "Amber Spears",
    date: "May 21, 2025",
    quote:
      "Nuview is a phenomenal resource with an incredibly caring, patient and understanding group of staff. Their alumni out reach is phenomenal as well. Shout out to Danny, Carolina and Dakota especially!!!! Y'all were all amazing!",
  },
  {
    name: "Daniel Cho",
    date: "June 3, 2025",
    quote:
      "I was able to keep my job and still get the help I needed. The evening IOP fit around my schedule and the therapists actually listened. I finally feel like I have tools I can use outside of the room.",
  },
  {
    name: "Priya Nair",
    date: "June 18, 2025",
    quote:
      "Starting virtually made it less intimidating. Same quality of care, same people, just from home. When I was ready I came in person. NuView never made me feel rushed or judged.",
  },
  {
    name: "Chris Alvarez",
    date: "July 9, 2025",
    quote:
      "The dual-diagnosis approach was the difference for me. They treated the anxiety and the substance use together instead of pretending they were separate. Grateful I called when I did.",
  },
];

export const FAQS = [
  {
    q: "Will I have to put my job or life on hold?",
    a: "No. You don't need to pause your career to get treatment. Our PHP and IOP programs offer afternoon, evening and virtual options designed for working professionals, so you can keep working and keep up with your responsibilities while you get comprehensive support.",
  },
  {
    q: "What's the difference between PHP and IOP?",
    a: "PHP (Partial Hospitalization) is our most intensive outpatient level — structured, comprehensive dual-diagnosis therapy for people who need a high level of support. IOP (Intensive Outpatient) uses flexible part-time sessions so you can maintain progress while staying connected to work, school, family and recovery communities. Not sure? Take the helper above or call and we'll walk you through it.",
  },
  {
    q: "Is virtual treatment really the same quality of care?",
    a: "Yes. Virtual treatment delivers the same evidence-based programming and the same clinical team from the comfort of your home, over secure video. It's ideal if you're balancing work, school or family commitments.",
  },
  {
    q: "How quickly can I start treatment?",
    a: "Same-day admissions are available. Your assessment is free and confidential, and there are no waiting lists — once we've verified your benefits, you can begin right away.",
  },
  {
    q: "Do you accept my insurance?",
    a: "We work with most major insurance providers, including Cigna, Aetna, Anthem, Blue Cross, Horizon, Tufts, Beacon, AmeriHealth, TriCare and MultiPlan — and many plans not listed here, including employer-sponsored plans. Insurance may cover 100% of the costs associated with treatment. Please note: we do not accept Medicaid, Medicare or Kaiser.",
  },
  {
    q: "How long does insurance verification take?",
    a: "Complete the verification form and our team will verify your benefits and contact you within 30 minutes during business hours. Prefer to talk now? Call us and we'll check while you're on the line.",
  },
];
