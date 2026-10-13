// Single source of copy — mirrors content.md.

export const brand = {
  name: 'Vertible',
  product: 'VTB0',
  tagline: 'Your freedom, upright.',
  email: 'info@vertible.eu',
  linkedin: 'https://linkedin.com/company/vertible',
  discord: 'https://discord.gg/RHv3d93NN',
}

export const nav = [
  { label: 'VTB0', to: '/' },
  { label: 'Mission', to: '/mission' },
  { label: 'About', to: '/about' },
]

export const hero = {
  tag: 'VERTIBLE — VTB0',
  headline: 'Stand up. Ride out.',
  sub: 'VTB0 is a self-balancing vertibike that holds you upright. Step in from the front, rise to eye level, and head off the path.',
  hint: 'SCROLL TO EXPLORE',
}

export const chapters = [
  { tag: '01 · BALANCE', title: 'Two wheels, actively balanced.', text: 'Small enough for a forest trail or a crowded festival field.' },
  { tag: '02 · 4-BAR LEG', title: 'One linkage, one shock, one actuator.', text: 'Each leg uses a 4-bar linkage, an air shock and a linear actuator. Fewer parts, fewer things to break.' },
  { tag: '03 · RISE', title: 'Each leg moves on its own.', text: 'Drop low to reach the ground, or rise to eye level — and stay level on a slope.' },
  { tag: '04 · PAWS', title: 'Support when you want it.', text: 'Retractable paws support you at rest and let you crouch through tight spaces.' },
  { tag: '05 · MOUNT', title: 'Step in from the front.', text: 'You kneel into a supported posture. No lifting, no transfer gymnastics.' },
  { tag: '06 · TERRAIN', title: 'Off the path, at speed.', text: 'Gravel, grass, sand and dirt hills. Up to ~50 km/h where it\'s allowed.' },
]

export const why = {
  tag: '01 — WHY',
  title: 'Paths end. You don\'t have to.',
  lead: 'Most mobility gear is built for pavement. The places worth going — the beach, the woods, the far side of a field — are where it gives up.',
  cards: [
    { title: 'Go further', text: 'Off-road suspension on every leg, not just under the seat.' },
    { title: 'Stand tall', text: 'Ride at eye level, upright, in the middle of things.' },
    { title: 'Go alone', text: 'Get in, ride out and come back without needing help.' },
  ],
}

export const specs = {
  tag: '02 — SPECS',
  rows: [
    ['MODEL', 'VTB0 (prototype)'],
    ['LAYOUT', '2-wheel self-balancing'],
    ['LEGS', '4-bar · air shock · linear actuator (×2)'],
    ['POSTURE', 'front-mount, kneeling support'],
    ['SPEED', 'up to ~50 km/h (target, off-road)'],
    ['BATTERY', '11S4P Li-ion, 44 cells (prototype)'],
    ['SAFETY', 'redundant control & sensing · deployable paws'],
  ],
  footnote: 'Prototype specs. Final values may change.',
}

export const positioning = {
  tag: '03 — POSITION',
  title: 'Seated or slow? We picked neither.',
  lead: 'Tracked chairs are slow. Seated balancing chairs stay on pavement. VTB0 is neither — it\'s upright and fast.',
  left: 'Heavy off-road tracked chairs',
  right: 'Seated balancing chairs',
  mark: 'light · upright · fast',
}

export const proof = {
  tag: '04 — PROOF',
  title: 'Shaped by riders.',
  stats: [
    { value: '40+', label: 'wheelchair users surveyed' },
    { value: '100', label: 'question survey' },
    { value: '5+', label: 'in-depth interviews' },
  ],
  quote: '“Life-changing.”',
  honest: 'Some said “scary” too. That\'s why VTB0 has paws, redundancy and a low-down mode.',
}

export const reserve = {
  tag: '05 — RESERVE',
  title: '€18,500. First batch.',
  body: 'We\'re building the first small batch by hand. Register your interest for a test ride and a spot in line — no payment, no commitment.',
  cta: 'Register interest',
  subject: 'VTB0 — first batch',
}

export const investors = {
  tag: '06 — INVESTORS',
  title: 'A lean path to the trail.',
  body: 'VTB0 sells directly to riders, so it needs no insurance approval and no multi-year certification wait. Ask us for the pitch deck.',
  cta: 'Request the pitch deck',
}

export const faq = {
  tag: '07 — FAQ',
  title: 'Straight answers.',
  items: [
    { q: 'Is VTB0 a medical device?', a: 'No. VTB0 is a recreational mobility vehicle and doesn\'t replace your everyday wheelchair.' },
    { q: 'Can I ride it on the road?', a: 'Not yet. Road approval depends on the country, and we start with off-road and private-land use.' },
    { q: 'Who can ride it?', a: 'Riders with enough upper-body control to kneel supported and steer. Every test ride starts with a fitting.' },
    { q: 'Is it safe?', a: 'VTB0 has redundant control and sensing, deployable paws and a low-down mode. It\'s still a prototype, and every ride is supervised.' },
  ],
}

export const mission = {
  tag: '01 — MISSION',
  title: 'Freedom, without asking.',
  lead: 'Independence shouldn\'t depend on someone being there to help.',
  body: [
    'Wheelchairs move you from A to B on flat ground. The rest of the world — grass, sand, hills, crowds — often means asking for help or staying home.',
    'Vertible builds machines that change that. They hold you upright, take you off the path and let you go on your own terms.',
  ],
  principles: [
    { title: 'Freedom first', text: 'Design for where people want to go.' },
    { title: 'Simple beats clever', text: 'Fewer parts, honest costs, easy repairs.' },
    { title: 'Safe by redundancy', text: 'Never rely on one point of failure.' },
    { title: 'Built with riders', text: 'Riders shape the design from the first sketch.' },
  ],
}

export const about = {
  tag: '02 — ABOUT',
  title: 'A small team building a big step.',
  story: [
    'Vertible is a Dutch hardware startup. VTB0 started with one question: why does mobility still mean sitting down and staying on the pavement?',
    'We work like a product studio. We simulate in MuJoCo, check the structure with FEM, design the drive and battery in-house, and test with real riders.',
  ],
  founder: {
    name: 'Bram Odrosslij',
    role: 'Founder & Engineer',
    image: '/profile-picture_full-body.png',
    bio: [
      'Part-time robotics & AI engineer, part-time Vertible founder and engineer, full-time tech enthusiast with the desire to change the world for the better.',
    ],
  },
  roadmap: [
    { state: 'DONE', label: 'Concept and research with 40+ wheelchair users' },
    { state: 'NOW', label: 'VTB0 prototype: balance control, 4-bar legs, electrical system' },
    { state: 'NEXT', label: 'Film VTB0 on real terrain and take first-batch reservations' },
    { state: 'LATER', label: 'First customer deliveries' },
  ],
}

export const contact = {
  tag: '03 — CONTACT',
  title: 'Let\'s ride.',
  body: 'Future riders and investors are all welcome. Want a test ride, a spot in the first batch or the deck? Send us an email.',
  email: 'info@vertible.eu',
  linkedin: 'linkedin.com/company/vertible',
  discord: 'discord.gg/RHv3d93NN',
  location: 'The Netherlands',
}

export const footer = {
  line: 'VERTIBLE © 2026 — Stand up. Ride out.',
  note: 'VTB0 IS A PROTOTYPE RECREATIONAL VEHICLE, NOT A MEDICAL DEVICE.',
}
