<script setup>
import { computed, ref, watch, onMounted, onBeforeUnmount, defineAsyncComponent } from 'vue'
import BrandLogo from './components/ui/BrandLogo.vue'
import SelectMenu from './components/ui/SelectMenu.vue'
import { copy } from './content/onepage'

const ConceptViewer = defineAsyncComponent(() => import('./components/three/ConceptViewer.vue'))
const base = import.meta.env.BASE_URL
const sections = ['concept', 'development', 'about', 'contact']
function stored(key) { try { return localStorage.getItem(key) } catch { return null } }
const queryLang = new URLSearchParams(location.search).get('lang')
const lang = ref(['nl', 'en'].includes(queryLang) ? queryLang : stored('vertible-language') === 'en' ? 'en' : 'nl')
const theme = ref(['light', 'dark'].includes(stored('vertible-theme')) ? stored('vertible-theme') : 'system')
const media = window.matchMedia('(prefers-color-scheme: dark)')
const systemDark = ref(media.matches)
const dark = computed(() => theme.value === 'dark' || (theme.value === 'system' && systemDark.value))
const t = computed(() => copy[lang.value])
const menu = ref(false)
const menuButton = ref(null)
const prototypeStory = ref(null)
const progress = ref(0)
let scrollFrame = 0
function updateProgress() {
  if (scrollFrame) return
  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = 0
    const rect = prototypeStory.value?.getBoundingClientRect()
    if (!rect) return
    const stage = prototypeStory.value.querySelector('.prototype-stage')?.getBoundingClientRect()
    const mobile = window.matchMedia('(max-width: 720px)').matches
    const value = mobile && stage
      ? (innerHeight * .65 - stage.top) / Math.max(1, stage.height + innerHeight * .25)
      : (100 - rect.top) / Math.max(1, rect.height - innerHeight)
    progress.value = Math.max(0, Math.min(1, value))
  })
}
const interest = ref(0)
const active = ref('')
let observer
const mail = computed(() => `mailto:info@vertible.eu?subject=${encodeURIComponent(`Vertible — ${t.value.interests[interest.value]}`)}&body=${encodeURIComponent(`${t.value.emailGreeting}\n\n${t.value.emailPrompt} ${t.value.interests[interest.value].toLowerCase()}.\n\n`)}`)
function save(key, value) { try { localStorage.setItem(key, value) } catch { /* Preferences still work without storage. */ } }
watch([theme, dark], () => {
  document.documentElement.dataset.theme = dark.value ? 'dark' : 'light'
  document.documentElement.style.colorScheme = dark.value ? 'dark' : 'light'
  document.querySelector('meta[name="theme-color"]').content = dark.value ? '#21151f' : '#fffbff'
  save('vertible-theme', theme.value)
}, { immediate: true })
watch(lang, () => {
  document.documentElement.lang = lang.value
  document.title = t.value.title
  document.querySelector('meta[name="description"]').content = t.value.description
  document.querySelector('meta[property="og:title"]').content = t.value.title
  document.querySelector('meta[property="og:description"]').content = t.value.description
  save('vertible-language', lang.value)
  const url = new URL(location.href); url.searchParams.set('lang', lang.value)
  history.replaceState(null, '', url)
}, { immediate: true })
function closeMenu() { menu.value = false; menuButton.value?.focus() }
function navigate(event, id) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  event.preventDefault()
  menu.value = false
  history.pushState(null, '', `#${id}`)
  scrollToSection(id)
}
function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.focus({ preventScroll: true })
  el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
}
function followHash() {
  const old = { '/': 'top', '/about': 'about', '/mission': 'concept', '/contact': 'contact' }
  const hash = location.hash.slice(1)
  const id = old[hash] || hash
  if (old[hash]) history.replaceState(null, '', `#${id}`)
  if (id) document.getElementById(id)?.scrollIntoView()
}
function onSystem(e) { systemDark.value = e.matches }
onMounted(() => {
  media.addEventListener('change', onSystem)
  window.addEventListener('hashchange', followHash)
  window.addEventListener('scroll', updateProgress, { passive: true })
  window.addEventListener('resize', updateProgress)
  updateProgress()
  followHash()
  observer = new IntersectionObserver(entries => {
    for (const e of entries) if (e.isIntersecting) active.value = e.target.id
  }, { rootMargin: '-15% 0px -65% 0px' })
  document.querySelectorAll('main section[id]').forEach(el => observer.observe(el))
})
onBeforeUnmount(() => { media.removeEventListener('change', onSystem); window.removeEventListener('hashchange', followHash); window.removeEventListener('scroll', updateProgress); window.removeEventListener('resize', updateProgress); cancelAnimationFrame(scrollFrame); observer?.disconnect() })
</script>

<template>
  <a class="skip-link" href="#main" @click="navigate($event, 'main')">{{ t.skip }}</a>
  <header class="site-header" @keydown.esc="closeMenu">
    <div class="container header-inner">
      <a href="#top" aria-label="Vertible" @click="navigate($event, 'top')"><BrandLogo /></a>
      <nav class="desktop-nav" :aria-label="t.navigation"><a v-for="(id, i) in sections" :key="id" :href="`#${id}`" :aria-current="active === id ? 'location' : undefined" @click="navigate($event, id)">{{ t.nav[i] }}</a></nav>
      <div class="preferences">
        <div class="language-switch" role="group" :aria-label="t.language"><button v-for="code in ['nl', 'en']" :key="code" :aria-pressed="lang === code" :lang="code" :aria-label="code === 'nl' ? 'Nederlands' : 'English'" @click="lang = code">{{ code.toUpperCase() }}</button></div>
        <SelectMenu id="appearance" v-model="theme" :label="t.theme" :options="['system', 'light', 'dark'].map((value, i) => ({ value, label: t.themes[i] }))" compact>
          <template #icon><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><template v-if="theme === 'system'"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4"/></template><template v-else-if="theme === 'light'"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></template><path v-else d="M20 15.5A8.5 8.5 0 0 1 8.5 4a8.5 8.5 0 1 0 11.5 11.5Z"/></svg></template>
        </SelectMenu>
        <button ref="menuButton" class="menu-button" :aria-expanded="menu" aria-controls="mobile-nav" :aria-label="menu ? t.close : t.menu" @click="menu = !menu"><span aria-hidden="true">{{ menu ? '×' : '☰' }}</span></button>
      </div>
    </div>
    <nav v-if="menu" id="mobile-nav" class="mobile-nav container" :aria-label="t.navigation"><a v-for="(id, i) in sections" :key="id" :href="`#${id}`" @click="navigate($event, id)">{{ t.nav[i] }}</a></nav>
  </header>

  <main id="main" tabindex="-1">
    <div ref="prototypeStory" class="prototype-story">
    <div class="sky-clouds" aria-hidden="true" />
    <div class="prototype-layout container">
    <section id="top" class="hero" tabindex="-1" aria-labelledby="hero-heading">
      <div class="hero-copy"><div class="hero-heading"><p class="eyebrow"><span class="small-dot" />{{ t.eyebrow }}</p><h1 id="hero-heading">{{ t.headline[0] }}<br /><span>{{ t.headline[1] }}</span></h1></div><div class="hero-details"><p class="intro">{{ t.intro }}</p><p class="hero-ambition">{{ t.ambition }}</p><div class="hero-actions"><a class="button" href="#concept" @click="navigate($event, 'concept')">{{ t.explore }} <span aria-hidden="true">↓</span></a><a class="text-link" href="#contact" @click="navigate($event, 'contact')">{{ t.join }} <span aria-hidden="true">↗</span></a></div><p class="status"><span class="small-dot" />{{ t.status }}</p></div></div>
    </section>

    <div class="prototype-stage"><ConceptViewer :labels="t.viewer" :dark="dark" :progress="progress" :poster="`${base}images/concept-r03-front.webp`" :poster-alt="t.heroAlt" /><span class="prototype-caption">{{ t.render }} · {{ lang === 'nl' ? 'Scroll om rond te kijken' : 'Scroll to look around' }}</span></div>
    <section id="concept" class="section concept-section" tabindex="-1" aria-labelledby="concept-heading">
      <div class="concept-copy"><p class="eyebrow">01 / {{ t.conceptLabel }}</p><h2 id="concept-heading">{{ t.conceptTitle }}</h2><p>{{ t.conceptBody }}</p><dl class="feature-list"><div v-for="(feature, i) in t.features" :key="i"><dt><span aria-hidden="true">0{{ i + 1 }}</span>{{ feature[0] }}</dt><dd>{{ feature[1] }}</dd></div></dl><p class="concept-note">{{ t.conceptNote }}</p></div>
    </section>
    </div></div>

    <section id="development" class="section" tabindex="-1" aria-labelledby="development-heading"><div class="container"><div class="section-heading"><div><p class="eyebrow">02 / {{ t.developmentLabel }}</p><h2 id="development-heading">{{ t.developmentTitle }}</h2></div><p>{{ t.developmentBody }}</p></div><ol class="development-steps"><li v-for="(stage, i) in t.stages" :key="i"><div class="step-label"><span>0{{ i + 1 }}</span><span>{{ stage[0] }}</span></div><h3>{{ stage[1] }}</h3><p>{{ stage[2] }}</p></li></ol><p class="development-note">{{ t.developmentNote }}</p></div></section>

    <section id="about" class="section about-section" tabindex="-1" aria-labelledby="about-heading"><div class="container about-grid"><figure class="portrait"><img :src="`${base}profile-picture_full-body.png`" :alt="t.portrait" width="400" height="640" loading="lazy" /></figure><div><p class="eyebrow">03 / {{ t.aboutLabel }}</p><h2 id="about-heading">{{ t.aboutTitle }}</h2><p v-for="paragraph in t.story" :key="paragraph" class="story">{{ paragraph }}</p><div class="signature"><strong>{{ t.founder }}</strong><span>{{ t.role }}</span></div></div></div></section>

    <section id="contact" class="section contact-section" tabindex="-1" aria-labelledby="contact-heading">
      <div class="container">
        <div class="contact-intro"><p class="eyebrow">04 / {{ t.contactLabel }}</p><h2 id="contact-heading">{{ t.contactTitle }}</h2><p>{{ t.contactBody }}</p></div>
        <div class="contact-channels">
          <article class="contact-channel">
            <span class="channel-platform">E-mail</span>
            <h3>{{ lang === 'nl' ? 'Neem contact op.' : 'Get in touch.' }}</h3>
            <p><a href="mailto:info@vertible.eu">info@vertible.eu</a></p>
            <div class="channel-detail"><label for="interest">{{ t.interestLabel }}</label><SelectMenu id="interest" v-model="interest" :label="t.interestLabel" :options="t.interests.map((label, value) => ({ label, value }))" /></div>
            <a class="button" :href="mail">{{ t.emailCta }} <span aria-hidden="true">↗</span></a>
          </article>
          <article class="contact-channel">
            <span class="channel-platform">Discord</span>
            <h3>{{ lang === 'nl' ? 'Denk en praat mee.' : 'Join the conversation.' }}</h3>
            <p>{{ lang === 'nl' ? 'Deel je ideeën, stel vragen en denk mee over de ontwikkeling.' : 'Share ideas, ask questions and help shape the development.' }}</p>
            <a class="button" href="https://discord.gg/RHv3d93NN" target="_blank" rel="noopener">{{ lang === 'nl' ? 'Naar Discord' : 'Join Discord' }} <span aria-hidden="true">↗</span></a>
          </article>
          <article class="contact-channel">
            <span class="channel-platform">LinkedIn</span>
            <h3>{{ lang === 'nl' ? 'Volg de ontwikkeling.' : 'Follow our progress.' }}</h3>
            <p>{{ lang === 'nl' ? 'Blijf op de hoogte van Vertible en leg contact met ons.' : 'Keep up with Vertible and connect with us.' }}</p>
            <a class="button" href="https://linkedin.com/company/vertible" target="_blank" rel="noopener">{{ lang === 'nl' ? 'Volg Vertible' : 'Follow Vertible' }} <span aria-hidden="true">↗</span></a>
          </article>
        </div>
      </div>
    </section>
  </main>
  <footer class="site-footer container"><div><a href="#top" @click="navigate($event, 'top')"><BrandLogo /></a><p>© {{ new Date().getFullYear() }} Vertible · {{ t.location }}</p></div><div class="footer-links"><a href="https://linkedin.com/company/vertible" target="_blank" rel="noopener">LinkedIn ↗</a><a href="https://discord.gg/RHv3d93NN" target="_blank" rel="noopener">{{ t.community }} ↗</a><a href="#top" @click="navigate($event, 'top')">{{ t.back }} ↑</a><span>{{ t.footer }}</span></div></footer>
</template>
