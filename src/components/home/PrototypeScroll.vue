<script setup>
import { computed, reactive, ref, onMounted, onBeforeUnmount, defineAsyncComponent } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const ConceptViewer = defineAsyncComponent(() => import('../three/ConceptViewer.vue'))
const props = defineProps({ t: { type: Object, required: true }, lang: String, dark: Boolean })
const emit = defineEmits(['navigate'])
const root = ref(null)
const reduced = ref(false)
const current = ref(-1)
const shot = reactive({ angle: .65, zoom: 1, targetY: 1.35, elevation: .08, shift: 0 })
const chapters = computed(() => [
  { title: props.t.conceptTitle, text: props.t.conceptBody },
  ...props.t.features.map(([title, text]) => ({ title, text })),
])
let media, timeline
function scrollToConcept() {
  const trigger = timeline?.scrollTrigger
  if (trigger) window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * .2, behavior: 'smooth' })
  else root.value.querySelector('#concept')?.scrollIntoView({ behavior: 'instant' })
}
defineExpose({ scrollToConcept })
onMounted(() => {
  media = gsap.matchMedia()
  media.add({ reduce: '(prefers-reduced-motion: reduce)', short: '(max-height: 600px)', mobile: '(max-width: 720px)', desktop: '(min-width: 721px)' }, context => {
    reduced.value = context.conditions.reduce || context.conditions.short
    current.value = -1
    Object.assign(shot, { angle: .65, zoom: 1, targetY: 1.35, elevation: .08, shift: 0 })
    if (reduced.value) return
    const intro = root.value.querySelector('.scroll-intro')
    const captions = root.value.querySelectorAll('.scroll-caption')
    gsap.set(captions, { autoAlpha: 0, y: 24 })
    const mobile = context.conditions.mobile
    timeline = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: root.value,
        start: () => `top top+=${document.querySelector('.site-header').offsetHeight}`,
        end: () => `+=${window.innerHeight * 3.6}`,
        scrub: .8,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
      onUpdate: () => {
        const time = timeline.time()
        current.value = time < .55 ? -1 : time < 1.5 ? 0 : time < 2.55 ? 1 : time < 3.6 ? 2 : 3
      },
    })
    timeline.to(intro, { autoAlpha: 0, y: -28, duration: .55 }, 0)
    const starts = [.55, 1.5, 2.55, 3.6]
    captions.forEach((caption, i) => {
      timeline.to(caption, { autoAlpha: 1, y: 0, duration: .3 }, starts[i])
      if (i < captions.length - 1) timeline.to(caption, { autoAlpha: 0, y: -16, duration: .25 }, starts[i + 1] - .25)
    })
    timeline.to(shot, { angle: 1.35, shift: mobile ? 0 : 15, zoom: .95, duration: 1.2 }, 0)
    timeline.to(shot, { angle: 2.45, zoom: mobile ? .9 : .78, targetY: 1.2, duration: 1.2 }, 1.2)
    timeline.to(shot, { angle: 4.2, zoom: mobile ? .87 : .75, targetY: .8, duration: 1.2 }, 2.4)
    timeline.to(shot, { angle: 6.6, zoom: 1, targetY: 1.35, duration: 1.2 }, 3.6)
    return () => { timeline = null }
  }, root.value)
})
onBeforeUnmount(() => media?.revert())
</script>

<template>
  <section id="top" ref="root" class="scroll-prototype prototype-story" :class="{ 'motion-reduced': reduced, 'dark-scene': dark }" tabindex="-1" aria-labelledby="hero-heading">
    <div class="sky-clouds" aria-hidden="true" />
    <div class="scroll-model" :style="{ transform: `translateX(${shot.shift}%)` }">
      <ConceptViewer :labels="t.viewer" :dark="dark" :shot="shot" />
    </div>
    <div class="scroll-vignette" aria-hidden="true" />
    <div class="scroll-overlay container">
      <div class="scroll-intro" :aria-hidden="!reduced && current !== -1">
        <p class="eyebrow">{{ t.eyebrow }}</p>
        <h1 id="hero-heading">{{ t.headline[0] }}<br /><span>{{ t.headline[1] }}</span></h1>
        <p class="scroll-intro-text">{{ t.intro }}</p>
        <p class="scroll-ambition">{{ t.ambition }}</p>
        <div class="scroll-actions"><a class="button" href="#concept" @click.prevent="scrollToConcept">{{ t.explore }} <span aria-hidden="true">↓</span></a><a class="button button-collaborate" href="#contact" @click="emit('navigate', $event, 'contact')">{{ t.join }} <span aria-hidden="true">↗</span></a></div>
        <p class="scroll-status">{{ t.status }}</p>
      </div>
      <div id="concept" class="scroll-captions" tabindex="-1">
        <article v-for="(chapter, i) in chapters" :key="i" class="scroll-caption" :aria-hidden="!reduced && current !== i">
          <p class="eyebrow">0{{ i + 1 }} / {{ t.conceptLabel }}</p>
          <h2>{{ chapter.title }}</h2>
          <p>{{ chapter.text }}</p>
          <p v-if="i === chapters.length - 1" class="scroll-note">{{ t.conceptNote }}</p>
        </article>
      </div>
      <div class="scroll-rail" aria-hidden="true"><span v-for="(_, i) in chapters" :key="i" :class="{ active: current === i }" /></div>
    </div>
    <p class="scroll-hint">{{ t.render }} · {{ lang === 'nl' ? 'Scroll om te ontdekken' : 'Scroll to explore' }}</p>
  </section>
</template>

<style scoped>
.scroll-prototype { height: calc(100svh - 88px); min-height: 640px; overflow: hidden; }
.scroll-prototype .sky-clouds { position: absolute; inset: 0; height: 100%; margin: 0; }
.scroll-model { position: absolute; inset: 0; }
.scroll-model :deep(.viewer-status) { width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
.scroll-model :deep(.rotate-controls) { display: none; }
.scroll-model :deep(.canvas-mount) { inset: 0; }
.scroll-vignette { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(ellipse at 50% 48%, #e9effa6b, transparent 70%), linear-gradient(0deg, #e5d9f4d9, transparent 55%); }
.dark-scene .scroll-vignette { background: radial-gradient(ellipse at 50% 48%, #18243e99, transparent 80%), linear-gradient(0deg, #17243bf2, transparent 80%); }
.scroll-overlay { position: absolute; inset: 0; pointer-events: none; }
.scroll-intro { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px var(--gutter); text-shadow: 0 2px 18px #f6ebff99; }
.dark-scene .scroll-intro, .dark-scene .scroll-caption { text-shadow: 0 2px 12px #15213bf2; }
.scroll-intro h1 { font-size: clamp(42px, 6vw, 88px); margin: 24px 0; color: var(--text-bright); line-height: 1.05; }
.scroll-intro h1 span { color: var(--purple); }
.scroll-intro-text { font-size: clamp(17px, 1.6vw, 22px); max-width: 740px; line-height: 1.5; }
.scroll-ambition { max-width: 640px; margin-top: 16px; font-size: 14px; }
.scroll-actions { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 24px; margin-top: 24px; pointer-events: auto; text-shadow: none; }
.scroll-status { margin-top: 20px; font-size: 11px; }
.scroll-actions .button-collaborate { background: #fff6fa; color: #431f27; border-color: #431f27; }
.scroll-captions { position: absolute; left: var(--gutter); bottom: 12%; width: min(510px, calc(100% - 2 * var(--gutter))); }
.scroll-caption { position: absolute; bottom: 0; left: 0; width: 100%; text-shadow: 0 2px 18px #f6ebff99; }
.scroll-caption h2 { font-size: clamp(28px, 3.1vw, 44px); margin: 20px 0; }
.scroll-caption > p:not(.eyebrow) { font-size: 17px; line-height: 1.65; }
.scroll-caption > p.scroll-note { font-size: 11px; margin-top: 18px; }
.scroll-rail { position: absolute; right: var(--gutter); top: 50%; display: flex; flex-direction: column; gap: 14px; }
.scroll-rail span { width: 6px; height: 6px; border-radius: 50%; background: var(--line); }
.scroll-rail span.active { background: var(--purple); transform: scale(1.4); }
.scroll-hint { position: absolute; bottom: 20px; width: 100%; text-align: center; font-size: 10px; pointer-events: none; }
@media (max-width: 720px) {
  .scroll-prototype { height: calc(100svh - 76px); min-height: 600px; }
  .scroll-model { left: -45%; right: -45%; }
  .scroll-intro { padding: 24px var(--gutter) 50px; }
  .scroll-intro h1 { font-size: clamp(29px, 8.5vw, 48px); margin: 20px 0; }
  .scroll-intro-text { font-size: 16px; }
  .scroll-ambition { font-size: 13px; }
  .scroll-status { font-size: 10px; }
  .scroll-captions { bottom: 9%; }
  .scroll-caption h2 { font-size: 28px; margin: 14px 0; }
  .scroll-caption > p:not(.eyebrow) { font-size: 15px; }
  .scroll-caption > p.scroll-note { font-size: 10px; }
  .scroll-rail { display: none; }
}
.motion-reduced { height: auto; min-height: 0; }
.motion-reduced .scroll-model { position: relative; inset: auto; height: 440px; }
.motion-reduced .scroll-model :deep(.rotate-controls) { display: flex; }
.motion-reduced .scroll-model :deep(.canvas-mount) { bottom: 65px; }
.motion-reduced .scroll-overlay, .motion-reduced .scroll-intro, .motion-reduced .scroll-captions, .motion-reduced .scroll-caption { position: relative; inset: auto; width: auto; }
.motion-reduced .scroll-intro { padding: 32px 0; }
.motion-reduced .scroll-caption { padding: 24px 0; }
.motion-reduced .scroll-rail, .motion-reduced .scroll-hint { display: none; }
</style>
