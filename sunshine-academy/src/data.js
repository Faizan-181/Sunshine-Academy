import {
  Star, MapPin, Phone, Shield, GraduationCap, Building2, Users, Award,
  BookOpen, Pencil, Calculator, Languages, Lightbulb,
} from 'lucide-react';

// ── Programs ──────────────────────────────────────────────────────────────────
export const PROGRAMS = [
  { Ic: BookOpen,      bg: '#FFF3D4', ic: '#D4891A', title: 'Academic Tuition & Support',  desc: 'Personalized subject-wise coaching to strengthen understanding and improve grades across all levels.',         tag: 'All Grades'   },
  { Ic: Pencil,        bg: '#CCFBF1', ic: '#0891B2', title: 'Exam Preparation',            desc: 'Focused revision programs for school exams, board tests, and competitive assessments — built for results.',    tag: 'Board & School'},
  { Ic: Calculator,    bg: '#EDE9FE', ic: '#7C3AED', title: 'Mathematics & Science',       desc: 'In-depth coaching in Maths, Physics, Chemistry and Biology with proven problem-solving techniques.',           tag: 'Matric & FSc'  },
  { Ic: Languages,     bg: '#FEF9C3', ic: '#CA8A04', title: 'Language & English Skills',   desc: 'Building strong reading, writing and communication skills in English and Urdu for academic success.',           tag: 'All Levels'    },
  { Ic: GraduationCap, bg: '#DCFCE7', ic: '#16A34A', title: 'Student Mentoring',           desc: 'One-on-one mentorship focused on study habits, confidence building, and long-term academic goals.',             tag: 'Personal'      },
  { Ic: Lightbulb,     bg: '#FFE4E6', ic: '#BE123C', title: 'Skill-Building Programs',     desc: 'Beyond textbooks — developing critical thinking, problem-solving and practical skills for real life.',          tag: 'All Ages'      },
];

// ── Gallery ───────────────────────────────────────────────────────────────────
export const GALLERY = [
  { url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=700&q=80', label: 'Guided Learning'    },
  { url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=700&q=80', label: 'Reading & Focus'    },
  { url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=700&q=80', label: 'Students Together'  },
  { url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&q=80', label: 'Group Collaboration'},
  { url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=700&q=80', label: 'Focused Practice'   },
  { url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=700&q=80', label: 'Classroom Session'  },
];

// ── Teachers ──────────────────────────────────────────────────────────────────
export const TEACHERS = [
  { name: 'Mr. Imran Hussain',  role: 'Senior Mathematics Teacher',      qual: 'M.Sc. Mathematics, University of Agriculture Faisalabad', exp: '12+ Years', expertise: ['Algebra & Calculus','Matric & FSc Maths','Problem-Solving'],       av: 'I', bg: 'linear-gradient(135deg,#7C3AED,#4F46E5)' },
  { name: 'Ms. Amna Tariq',     role: 'English Language Specialist',     qual: 'M.A. English Literature, GC University Faisalabad',       exp: '8+ Years',  expertise: ['Grammar & Writing','Communication Skills','English Literature'],   av: 'A', bg: 'linear-gradient(135deg,#EC4899,#BE185D)' },
  { name: 'Mr. Bilal Ahmed',    role: 'Science & Physics Teacher',       qual: 'B.Sc. Physics (Hons), University of Punjab',              exp: '10+ Years', expertise: ['Physics & Chemistry','Conceptual Teaching','Board Exam Prep'],     av: 'B', bg: 'linear-gradient(135deg,#0891B2,#0E7490)' },
  { name: 'Ms. Sadia Rehman',   role: 'Primary & Middle School Teacher', qual: 'B.Ed (Hons), AIOU Islamabad',                             exp: '7+ Years',  expertise: ['Primary All Subjects','Child Development','Creative Learning'],    av: 'S', bg: 'linear-gradient(135deg,#16A34A,#15803D)' },
];

// ── Testimonials ──────────────────────────────────────────────────────────────
export const TESTIMONIALS = [
  { name: 'Hafiz Muhammad Asif', role: 'Parent of Matric Student · Shadab Colony', text: 'Sunshine Academy ne mere bete ki zindagi badal di. Teachers itne mehnat se parhatay hain ke bachay khud interest lene lagtay hain. Maths mein fail hone wala beta ab A grade la raha hai.',   rating: 5, av: 'H', bg: 'linear-gradient(135deg,#F5A623,#E8920A)' },
  { name: 'Mrs. Nasreen Akhtar', role: 'Parent · Jhang Road, Faisalabad',          text: 'My daughter was very weak in English. After just 3 months at Sunshine Academy, she can now write essays and speak with confidence. The teachers are truly dedicated professionals.',           rating: 5, av: 'N', bg: 'linear-gradient(135deg,#2DD4BF,#0891B2)' },
  { name: 'Muhammad Tariq',      role: 'Parent of FSc Student · Faisalabad',       text: 'Best academy in Shadab Colony, no doubt. The principal personally monitors each student\'s progress. My son cleared his FSc exams with distinction thanks to this incredible team.',             rating: 5, av: 'M', bg: 'linear-gradient(135deg,#10B981,#059669)' },
  { name: 'Mrs. Rukhsana Bibi',  role: 'Parent · Near Lal Kothi',                  text: 'Bahut achi academy hai. Principal sahab aur teachers dono hi bachon ki poori parwah kartay hain. Ek dam family jaisi feeling hai. Hamara poora khandan yahan hi parha hai.',                 rating: 5, av: 'R', bg: 'linear-gradient(135deg,#8B5CF6,#6D28D9)' },
  { name: 'Mr. Khalid Mahmood',  role: 'Parent of 3 Children · Shadab Colony',     text: 'All three of my children study at Sunshine Academy. The personalized teaching approach is outstanding. We are grateful for the amazing academic foundation they have built.',                 rating: 5, av: 'K', bg: 'linear-gradient(135deg,#F59E0B,#D97706)' },
  { name: 'Mrs. Zainab Fatima',  role: 'Parent · Faisalabad City',                 text: 'Sunshine Academy mein parh ke meri beti ne scholarship hasil ki. Principal Madam ka shukriya ke unhon ne har qadam par guide kiya. Excellent institution with excellent results.',            rating: 5, av: 'Z', bg: 'linear-gradient(135deg,#EF4444,#DC2626)' },
];

// ── FAQs ──────────────────────────────────────────────────────────────────────
export const FAQS = [
  { q: 'What programs does Sunshine Academy offer?', a: 'We offer academic support & tuition, exam preparation, Mathematics & Science coaching, English language skills, student mentoring, and skill-building programs. Call 0300 9827982 for details.' },
  { q: 'How can I contact Sunshine Academy?',        a: 'Call us at 0300 9827982, fill the inquiry form on this page, or visit us at Lal Kothi, Jhang Road, Shadab Colony, Faisalabad.' },
  { q: 'Where exactly is Sunshine Academy?',         a: 'We are at Chowk, Lal Kothi (The Red Bungalow), Jhang Rd, Main Bazaar Shadab Colony, Faisalabad — 38000.' },
  { q: 'Can I visit before enrolling?',              a: 'Absolutely! We welcome parents and students to visit before making any decision. Please call 0300 9827982 to arrange a convenient time.' },
  { q: 'How do I ask about admissions or fees?',     a: 'Simply call 0300 9827982 or send an inquiry through the form above. We respond promptly with all details.' },
  { q: 'What are the opening hours?',                a: 'Please call us at 0300 9827982 for current timings as they may vary by program and season.' },
];

// ── Ticker ────────────────────────────────────────────────────────────────────
export const TICKER = [
  { Ic: Star,         t: '4.9 Google Rating'          },
  { Ic: MapPin,       t: 'Shadab Colony, Faisalabad'  },
  { Ic: Phone,        t: '0300 9827982'               },
  { Ic: Shield,       t: 'Trusted Education Center'   },
  { Ic: GraduationCap,t: 'Academic Support & Tuition' },
  { Ic: Building2,    t: 'Near Lal Kothi, Jhang Road' },
  { Ic: Users,        t: '500+ Students Guided'       },
  { Ic: Award,        t: '10+ Years of Excellence'    },
];

// ── Particles ─────────────────────────────────────────────────────────────────
export const PTCLS = Array.from({ length: 18 }, (_, i) => ({
  id:    i,
  size:  Math.random() * 4 + 2,
  left:  Math.random() * 100,
  color: ['rgba(245,166,35,.55)', 'rgba(255,255,255,.18)', 'rgba(45,212,191,.35)'][i % 3],
  dur:   `${Math.random() * 12 + 8}s`,
  delay: `${Math.random() * 10}s`,
}));
