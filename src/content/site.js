// Shared page copy. Describe design intent separately from demonstrated capability.
// Source basis: project use cases, R02/R03 README/verification limits and the funding
// workspace's G5/G6 evidence/intended-use gates. Recreational and healthcare
// positioning are unresolved in those sources; do not claim regulatory exemption.
// Research counts, quotes, partner commitments and launch dates need primary
// evidence before publication. R03 images are design studies, not trial photos.

export const brand = {
  name: 'Vertible',
  product: 'VTB0',
  tagline: 'More of life. On your terms.',
  email: 'info@vertible.eu',
  linkedin: 'https://linkedin.com/company/vertible',
  discord: 'https://discord.gg/RHv3d93NN',
}

export const nav = [
  { label: 'The concept', to: '/' },
  { label: 'Mission', to: '/mission' },
  { label: 'About', to: '/about' },
]

export const hero = {
  tag: 'VERTIBLE — VTB0',
  headline: 'More of life. On your terms.',
  sub: 'An upright mobility concept in development for people with limited lower-body mobility.',
  hint: 'SCROLL TO EXPLORE',
}

export const chapters = [
  { tag: '01 · BALANCE', title: 'A two-wheel concept.', text: 'Active balance control is an engineering workstream to be tested.' },
  { tag: '02 · SUPPORT', title: 'An articulated frame.', text: 'Linkages, suspension and actuation form the mechanical concept.' },
  { tag: '03 · POSTURE', title: 'Exploring upright mobility.', text: 'Fit, comfort and posture need evaluation with potential users.' },
  { tag: '04 · CONTROL', title: 'Predictable movement.', text: 'Fault response and stability are priorities for future testing.' },
  { tag: '05 · ENTRY', title: 'Understanding transfers.', text: 'Entry and exit need to be evaluated for different users and situations.' },
  { tag: '06 · TERRAIN', title: 'Beyond flat ground.', text: 'Terrain capability remains a development objective.' },
]

export const why = {
  tag: '01 — WHY',
  title: 'More ways to take part.',
  lead: 'We’re exploring how an upright mobility concept could support daily life and time outdoors.',
  cards: [
    { title: 'Time outside', text: 'Investigating movement beyond smooth pavement.' },
    { title: 'More choice', text: 'Exploring a supported upright posture.' },
    { title: 'Personal needs', text: 'Understanding fit, comfort and control.' },
  ],
}

export const specs = {
  tag: '02 — SPECS',
  rows: [
    ['STAGE', 'Digital design and engineering'],
    ['LAYOUT', 'Two-wheel concept with articulated support'],
    ['POSTURE', 'Supported upright concept; fit to be evaluated'],
    ['PERFORMANCE', 'Not yet established through physical testing'],
  ],
  footnote: 'Design intent, not verified product specifications.',
}

export const positioning = {
  tag: '03 — POSITION',
  title: 'Another option for mobility.',
  lead: 'Vertible explores supported upright mobility alongside the equipment people already use.',
  left: 'Everyday mobility',
  right: 'Outdoor participation',
  mark: 'choice · support · participation',
}

export const proof = {
  tag: '04 — PARTICIPATION',
  title: 'Start with listening.',
  stats: [],
  quote: 'What would make a difference to your day?',
  honest: 'We welcome conversations with potential users to understand their needs and concerns.',
}

export const reserve = {
  tag: '05 — GET INVOLVED',
  title: 'Help shape the next step.',
  body: 'Share your perspective or discuss a development collaboration. We are not taking orders or payments.',
  cta: 'Start a conversation',
  subject: 'Vertible — getting involved',
}

export const investors = {
  tag: '06 — DEVELOPMENT PARTNERS',
  title: 'Help build the first test hardware.',
  body: 'We are seeking funding and development partners for prototype construction and documented testing.',
  cta: 'Discuss the development plan',
}

export const faq = {
  tag: 'Your questions',
  title: 'A clear picture of where we are.',
  items: [
    { q: 'Can I try or buy a Vertible yet?', a: 'Not yet. We are developing the design and seeking funding for physical test hardware. There is no confirmed trial or delivery date, and we are not taking reservations or payments. You are welcome to contact us about future participation.' },
    { q: 'Who is the concept for?', a: 'We are exploring mobility for people with limited lower-body mobility who are interested in supported upright movement and outdoor activities. Suitability will depend on individual needs, posture, fit and control. These need to be evaluated; the concept is not suitable for everyone by default.' },
    { q: 'What has been demonstrated so far?', a: 'The project has digital design models and engineering work, including static geometry checks on the R03 concept. These do not establish strength, dynamic stability, terrain performance or safety for occupied use. Physical testing is the next development priority.' },
    { q: 'Will it replace a wheelchair?', a: 'That is not our starting point. We are exploring an additional mobility option. The intended use and applicable regulatory route still need to be defined and assessed before a product can be offered. The concept is not a certified medical device or approved road vehicle.' },
    { q: 'How can I contribute?', a: 'We welcome lived experience, research and engineering expertise, and conversations about prototype funding. Email info@vertible.eu to tell us how you would like to be involved. An introduction does not commit you to a trial or purchase.' },
  ],
}

export const mission = {
  tag: 'Our mission',
  title: 'More choice in how we take part.',
  lead: 'Mobility is about the life you want to lead, the people you spend time with and the places you want to go.',
  body: [
    'For people with limited lower-body mobility, an uneven path or an inaccessible setting can shape a whole day. Existing mobility aids are essential. We are exploring an additional option: a wheeled frame that supports an upright posture and could open up more ways to move.',
    'Our ambition is to make participation easier, on each person’s own terms. Upright mobility is a choice to investigate, not a measure of anyone’s independence or worth. Useful design starts with listening to the people who may use it.',
    'We are still developing the concept. The next step is to build test hardware, understand its limitations and learn with potential users. Evidence from that work should decide what we build next.',
  ],
  principles: [
    { title: 'Choice and dignity', text: 'Respect different bodies, preferences and ways of living. Let people define what useful mobility means to them.' },
    { title: 'Participation', text: 'Keep everyday situations at the centre: time with friends, outdoor activities and moving through shared spaces.' },
    { title: 'Evidence before promises', text: 'Test mechanical behaviour, control and usability. Be clear about what is known and what still needs work.' },
    { title: 'Listening throughout', text: 'Invite people with lived experience to question assumptions and help set priorities for development.' },
  ],
}

export const about = {
  tag: 'About Vertible',
  title: 'A mobility idea, taking shape.',
  story: [
    'Vertible is a mobility development project in the Netherlands, led by Bram Odrosslij. It explores how a wheeled, articulated support frame could give people with limited lower-body mobility another way to move and take part.',
    'Current work spans mechanical design, simulation, actuation, suspension and control. The R03 model brings these ideas into a detailed digital concept. It is a design study, not a demonstration of a finished or validated product.',
    'We are seeking support to build physical test hardware and measure how it behaves. That work, together with input from potential users and specialists, will guide the next design decisions.',
  ],
  founder: {
    name: 'Bram Odrosslij',
    role: 'Founder & Engineer',
    image: `${import.meta.env.BASE_URL}profile-picture_full-body.png`,
    bio: [
      'Bram combines work in robotics and AI with developing Vertible. His focus is on turning the mobility concept into hardware that can be built, measured and improved.',
      'He welcomes conversations with people who understand the daily realities of limited mobility, and with partners who can help take the project into physical testing.',
    ],
  },
  roadmap: [
    { state: 'NOW', label: 'Digital design and engineering development; seeking prototype funding.' },
    { state: 'NEXT', label: 'Build and instrument a test mechanism; evaluate movement, loads and balance control.' },
    { state: 'PLANNED', label: 'Evaluate fit, transfers and usability with potential users and specialists.' },
    { state: 'LATER', label: 'Consider supervised trials once engineering evidence supports them; timing is not yet established.' },
  ],
}

export const contact = {
  tag: 'Get in touch',
  title: 'Let’s start with a conversation.',
  body: 'Have lived experience to share? Interested in research, engineering or prototype funding? Tell Bram what brings you to Vertible and how you would like to be involved.',
  email: 'info@vertible.eu',
  linkedin: 'linkedin.com/company/vertible',
  discord: 'discord.gg/RHv3d93NN',
  location: 'The Netherlands',
}

export const footer = {
  line: 'Vertible © 2026 · More of life. On your terms.',
  note: 'Concept in development. Images show digital design studies. Performance and suitability remain to be evaluated.',
}
