<script setup>
import { ref, defineAsyncComponent } from 'vue'
import HeroScroll from '../components/home/HeroScroll.vue'
import FaqList from '../components/home/FaqList.vue'
import { about, brand } from '../content/site.js'

const ConceptViewer = defineAsyncComponent(() => import('../components/three/ConceptViewer.vue'))
const interactive = ref(false)
const view = ref('front')
const base = import.meta.env.BASE_URL
const moments = [
  { n: '01', title: 'Time together', text: 'Joining friends outside, without the surface of a path deciding who can come along.', detail: 'Exploring access beyond smooth pavement' },
  { n: '02', title: 'A different perspective', text: 'Having the option to join a conversation at eye level, in a posture that works for you.', detail: 'Investigating supported upright mobility' },
  { n: '03', title: 'Your own choices', text: 'Choosing where to go and how to take part. That starts with equipment shaped around your needs.', detail: 'Understanding fit, comfort and control' },
]
const milestones = [
  { state: 'Current work', title: 'Develop the design', text: 'Mechanical concepts, digital models and simulation work help identify what needs to be tested in hardware.' },
  { state: 'Funding priority', title: 'Build and measure', text: 'Manufacture a test mechanism and integrate actuation and control. Measure loads, movement and balance under controlled conditions.' },
  { state: 'Planned next', title: 'Learn with people', text: 'Review fit, transfers and usability with potential users and specialists. Progress to supervised trials only when the engineering evidence supports it.' },
]
</script>

<template>
  <div>
    <HeroScroll />
    <section class="section purpose" aria-labelledby="purpose-title">
      <div class="container">
        <div class="section-intro">
          <div><p class="eyebrow">The reason we’re building</p><h2 id="purpose-title">The everyday things<br />are the important things.</h2></div>
          <p>Mobility is personal. We want to give people with limited lower-body mobility more ways to take part in daily life and the outdoors. These are the experiences we’re designing towards.</p>
        </div>
        <div class="moments">
          <article v-for="moment in moments" :key="moment.n">
            <span class="moment-number">{{ moment.n }}</span><h3>{{ moment.title }}</h3><p>{{ moment.text }}</p><span class="moment-detail">{{ moment.detail }}</span>
          </article>
        </div>
        <RouterLink to="/mission" class="text-link">Read our mission <span aria-hidden="true">↗</span></RouterLink>
      </div>
    </section>

    <section id="concept" class="section concept" aria-labelledby="concept-title">
      <div class="container concept-grid">
        <div class="concept-gallery">
          <div class="gallery-stage">
            <ConceptViewer v-if="interactive" />
            <img v-else :src="`${base}images/concept-r03-${view}.webp`" width="1050" height="1200" loading="lazy" :alt="`${view} view of the R03 digital mobility concept, showing the support frame, wheels and body supports.`" />
          </div>
          <div class="view-controls" aria-label="Concept views">
            <button v-for="angle in ['front', 'side', 'rear']" :key="angle" :aria-pressed="!interactive && view === angle" @click="interactive = false; view = angle">{{ angle }}</button>
            <button :aria-pressed="interactive" @click="interactive = !interactive">{{ interactive ? 'Close 3D' : 'Explore 3D' }}</button>
          </div>
          <p class="image-note">Digital design study, not a photograph of a working prototype.</p>
        </div>
        <div class="concept-copy">
          <p class="eyebrow">The Vertible concept</p><h2 id="concept-title">An upright approach<br />to mobility.</h2>
          <p>The concept combines a wheeled base with an articulated frame that supports the body. We’re exploring how balance control, adjustable support and suspension could work together.</p>
          <dl>
            <div><dt>Support that follows the person</dt><dd>Body supports and an articulated frame, with fit and comfort to be evaluated with users.</dd></div>
            <div><dt>Movement beyond flat ground</dt><dd>A two-wheel layout and suspension concept, with terrain capability still to be tested.</dd></div>
            <div><dt>A practical path to a prototype</dt><dd>Folded-metal parts, accessible assemblies and space for power and control systems.</dd></div>
          </dl>
          <p class="concept-note">We’re at the design and engineering stage. Performance, independent use and suitability for individual users have not yet been established.</p>
        </div>
      </div>
    </section>

    <section id="development" class="section development" aria-labelledby="development-title">
      <div class="container">
        <div class="section-intro"><div><p class="eyebrow">From concept to evidence</p><h2 id="development-title">The next step is<br />something we can test.</h2></div><p>We’re seeking funding and development partners to turn the digital design into physical test hardware. The aim is to answer specific engineering questions before moving towards user trials.</p></div>
        <ol class="milestones"><li v-for="(step, i) in milestones" :key="step.title"><div class="step-top"><span class="step-number">0{{ i + 1 }}</span><span class="step-state">{{ step.state }}</span></div><h3>{{ step.title }}</h3><p>{{ step.text }}</p></li></ol>
        <div class="funding-note"><p><strong>What support would make possible</strong><br />Prototype parts, assembly, instrumentation and documented testing to guide the next design decisions.</p><a class="button" :href="`mailto:${brand.email}?subject=Vertible%20%E2%80%94%20prototype%20funding%20and%20development`">Discuss the development plan <span aria-hidden="true">↗</span></a></div>
      </div>
    </section>

    <section class="section people" aria-labelledby="people-title">
      <div class="container people-grid">
        <div class="founder-portrait"><img :src="`${base}profile-picture_full-body.png`" :alt="about.founder.name + ', founder of Vertible'" loading="lazy" width="400" height="640" /><span>Bram Odrosslij · Founder & engineer</span></div>
        <div><p class="eyebrow">A person behind the project</p><h2 id="people-title">Engineering starts<br />with listening.</h2><p>Vertible is led by Bram Odrosslij, a robotics and AI engineer in the Netherlands. The technical challenge matters. So does understanding whether the result will be useful in someone’s life.</p><p>We’d like to hear from people with lived experience of limited mobility, as well as researchers, therapists and development partners. What would make a difference to your day? What would you need to feel comfortable using something like this?</p><RouterLink class="text-link" to="/about">Meet the founder <span aria-hidden="true">↗</span></RouterLink></div>
      </div>
    </section>

    <FaqList />
    <section class="invitation" aria-labelledby="invitation-title"><div class="container invitation-inner"><div><p class="eyebrow">Let’s take the next step</p><h2 id="invitation-title">Help shape what<br />comes next.</h2><p>Share your perspective, explore a collaboration, or help fund the first test hardware.</p></div><div class="invitation-actions"><RouterLink class="button" to="/contact">Start a conversation <span aria-hidden="true">↗</span></RouterLink><a :href="`mailto:${brand.email}`">{{ brand.email }}</a><span>No reservations or payments. Just a conversation.</span></div></div></section>
  </div>
</template>

<style scoped>
h2 { font-size: clamp(32px, 3.3vw, 48px); line-height: 1.14; letter-spacing: -.04em; font-weight: 500; margin: 18px 0 24px; }
h3 { font-size: 23px; line-height: 1.3; font-weight: 500; letter-spacing: -.025em; }
.section-intro { display: grid; grid-template-columns: 1.2fr 1fr; gap: 80px; align-items: end; margin-bottom: 48px; }
.section-intro h2 { margin-bottom: 0; }
.section-intro > p, .concept-copy > p:not(.eyebrow), .people-grid p:not(.eyebrow) { color: var(--text-muted); font-size: 17px; }
.moments { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; margin-bottom: 22px; }
.moments article { border-top: 1px solid var(--line); padding: 26px 0 16px; }
.moment-number { display: inline-grid; place-items: center; width: 36px; height: 36px; background: var(--surface); color: var(--purple); border-radius: 50%; font-size: 12px; margin-bottom: 24px; }
.moments h3 { margin-bottom: 16px; }.moments p { font-size: 16px; color: var(--text-muted); }
.moment-detail { display: block; margin-top: 24px; font-size: 12px; color: var(--purple); }
.concept { background: var(--surface); }.concept-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
.gallery-stage { aspect-ratio: 1050 / 1200; border-radius: 8px; overflow: hidden; background: #cdd3d3; position: relative; }
.gallery-stage > img { width: 100%; height: 100%; object-fit: cover; display: block; }
.view-controls { display: flex; justify-content: center; flex-wrap: wrap; gap: 6px; margin: 18px 0 10px; }
.view-controls button { border: 1px solid var(--line); background: transparent; border-radius: 5px; padding: 10px 16px; min-height: 44px; color: var(--text); font-size: 13px; cursor: pointer; text-transform: capitalize; }
.view-controls button[aria-pressed='true'] { background: var(--purple); color: #fff; border-color: var(--purple); }
.image-note { font-size: 11px; text-align: center; color: var(--text-muted); }
dl { margin: 28px 0; } dl > div { padding: 18px 0; border-top: 1px solid #d5ccdd; } dt { font-size: 16px; font-weight: 500; color: var(--plum); margin-bottom: 6px; } dd { font-size: 14px; color: var(--text-muted); }
.concept-copy > p.concept-note { font-size: 12px; border-left: 2px solid var(--orange); padding-left: 16px; }
.milestones { list-style: none; display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
.milestones li { padding: 26px; border: 1px solid var(--line); border-radius: 6px; }.milestones li:nth-child(2) { background: #f3edf8; border-color: #9b86ae; }
.step-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 38px; gap: 12px; }.step-number { color: var(--purple); font-size: 15px; }.step-state { font-size: 11px; color: var(--purple); }
.milestones p { font-size: 15px; color: var(--text-muted); margin-top: 16px; }
.funding-note { display: flex; align-items: center; justify-content: space-between; gap: 32px; margin-top: 32px; padding-top: 32px; border-top: 1px solid var(--line); }.funding-note p { font-size: 14px; max-width: 570px; color: var(--text-muted); }.funding-note strong { color: var(--plum); font-weight: 500; }.funding-note .button { flex-shrink: 0; }
.people { background: var(--sage); }.people-grid { display: grid; grid-template-columns: .8fr 1fr; gap: 100px; align-items: center; }.people-grid p { margin-bottom: 20px; }
.founder-portrait { position: relative; max-width: 390px; background: #d7dfd2; border-radius: 160px 160px 8px 8px; overflow: hidden; text-align: center; }.founder-portrait img { display: block; width: 100%; height: 420px; object-fit: contain; object-position: bottom; padding-top: 28px; }.founder-portrait span { display: block; font-size: 12px; padding: 15px; background: #d0d9ca; color: #34432f; }
.invitation { background: var(--plum); padding: 80px 0; }.invitation-inner { display: flex; align-items: center; justify-content: space-between; gap: 64px; }.invitation h2 { color: #faf8f4; font-size: clamp(38px, 4vw, 56px); }.invitation .eyebrow { color: #f6aa72; }.invitation p:not(.eyebrow) { color: #d8cedf; max-width: 480px; font-size: 16px; }.invitation-actions { display: flex; flex-direction: column; align-items: flex-start; gap: 18px; }.invitation .button { background: var(--apricot); color: var(--plum); border-color: var(--apricot); }.invitation .button:hover { background: #ffc391; }.invitation-actions > a:not(.button) { color: #fff; font-size: 17px; }.invitation-actions span { font-size: 11px; color: #d8cedf; }.invitation .button span { color: inherit; }
@media (max-width: 1000px) { .concept-grid, .people-grid, .section-intro { gap: 36px; }.milestones { gap: 14px; }.milestones li { padding: 20px; }.funding-note { align-items: flex-start; flex-direction: column; } }
@media (max-width: 720px) { .section-intro, .concept-grid, .people-grid { grid-template-columns: 1fr; gap: 28px; }.moments, .milestones { grid-template-columns: 1fr; gap: 14px; }.moments article { padding-top: 20px; }.moment-number { margin-bottom: 16px; }.moment-detail { margin-top: 16px; }.concept-copy { grid-row: 1; }.step-top { margin-bottom: 24px; }.founder-portrait { max-width: 100%; }.people-grid > div:last-child { grid-row: 1; }.invitation-inner { flex-direction: column; align-items: flex-start; gap: 30px; }.invitation { padding: 64px 0; } }
</style>
