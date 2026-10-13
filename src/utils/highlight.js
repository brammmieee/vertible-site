const TERMS = [
  'linear actuator',
  'air shock',
  'wheel hubs',
  'actuator',
  'shock',
  'wheels',
  'wheel',
]

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const re = new RegExp(`(${TERMS.map(escapeRe).join('|')})`, 'gi')

export function highlight(text) {
  if (!text) return []
  return text
    .split(re)
    .filter((part) => part !== '')
    .map((part) => ({
      text: part,
      hi: TERMS.some((t) => t.toLowerCase() === part.toLowerCase()),
    }))
}
