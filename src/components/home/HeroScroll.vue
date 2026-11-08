<script setup>
const image = `${import.meta.env.BASE_URL}images/concept-r03-front.webp`
function explore() { document.getElementById('concept')?.scrollIntoView() }
</script>

<template>
  <section class="hero container" aria-labelledby="hero-title">
    <div class="hero-copy">
      <p class="eyebrow"><span class="status-dot" /> Mobility, with more possibilities</p>
      <h1 id="hero-title">More of life.<br /><span>On your terms.</span></h1>
      <p class="intro">A walk with friends. A day outdoors. Being part of the conversation.</p>
      <p class="description">We’re developing an upright mobility concept for people with limited lower-body mobility, with the ambition to make more of these moments possible.</p>
      <div class="actions">
        <button class="button" @click="explore">Explore the concept <span aria-hidden="true">↓</span></button>
        <RouterLink class="text-link" to="/contact">Help us build it <span aria-hidden="true">↗</span></RouterLink>
      </div>
      <p class="stage"><span /> In development · Seeking prototype funding</p>
    </div>
    <figure class="hero-visual">
      <img :src="image" width="1050" height="1200" fetchpriority="high" alt="Digital concept of Vertible’s purple wheeled support frame with a human mannequin in a supported upright posture." />
      <figcaption><span>Meet the Vertible concept</span><span>Design study · R03</span></figcaption>
    </figure>
  </section>
  <div class="intro-strip"><div class="container"><p>More choice in how we move.</p><p>Developed in the Netherlands <span aria-hidden="true">↗</span></p></div></div>
</template>

<style scoped>
.hero { display: grid; grid-template-columns: 1.05fr 1fr; gap: 64px; align-items: center; padding-top: 130px; padding-bottom: 48px; }
.hero-copy { padding: 24px 0; }
.eyebrow { display: flex; align-items: center; gap: 10px; }
.status-dot { width: 7px; height: 7px; background: var(--orange); border-radius: 50%; flex-shrink: 0; }
h1 { font-size: clamp(44px, 4.5vw, 68px); line-height: 1.08; letter-spacing: -.055em; margin: 28px 0; font-weight: 500; }
h1 span { color: var(--purple); }
.intro { font-size: 22px; line-height: 1.5; max-width: 420px; margin-bottom: 18px; }
.description { font-size: 17px; color: var(--text-muted); max-width: 470px; }
.actions { display: flex; flex-wrap: wrap; align-items: center; gap: 24px; margin-top: 30px; }
.stage { display: flex; align-items: center; gap: 9px; color: var(--text-muted); font-size: 12px; margin-top: 30px; }
.stage span { width: 6px; height: 6px; border-radius: 50%; background: var(--purple); }
.hero-visual { border-radius: 140px 12px 12px 12px; overflow: hidden; background: #cdd3d3; position: relative; }
.hero-visual img { display: block; width: 100%; height: auto; }
figcaption { display: flex; justify-content: space-between; gap: 12px; padding: 16px 22px; background: #eeeaf1; color: var(--plum); font-size: 11px; }
figcaption span:first-child { font-weight: 500; }
.intro-strip { border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.intro-strip .container { display: flex; justify-content: space-between; padding-top: 22px; padding-bottom: 22px; font-size: 13px; color: var(--text-muted); }
.intro-strip span { margin-left: 15px; color: var(--orange); }
@media (max-width: 900px) { .hero { gap: 32px; } h1 { font-size: 48px; } .actions { gap: 12px; } }
@media (max-width: 720px) { .hero { grid-template-columns: 1fr; padding-top: 108px; gap: 16px; } h1 { font-size: clamp(42px, 9vw, 60px); } .hero-copy { padding: 12px 0; } .eyebrow { font-size: 10px; } .hero-visual { border-top-left-radius: 90px; } .intro-strip .container { gap: 16px; font-size: 11px; } }
</style>
