<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import VtbScene from '../three/VtbScene.vue'
import SpecTag from '../ui/SpecTag.vue'
import { hero, chapters } from '../../content/site.js'
import { highlight } from '../../utils/highlight.js'

gsap.registerPlugin(ScrollTrigger)

const heroEl = ref(null)
const active = ref(0)
const started = ref(false)

const state = reactive({
  rotY: -0.7,
  tilt: 0,
  lift: 0,
  crouch: 0,
  wheelSpin: 0,
  highlight: 0,
  camDist: 7,
  camTheta: 0.45,
  camHeight: 1.7,
  camTargetY: 1.7,
  intro: 1,
})

let st = null

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) {
    Object.assign(state, { rotY: 0.3, camDist: 6.4, camHeight: 1.7, intro: 0 })
    started.value = true
    return
  }

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: heroEl.value,
      start: 'top top',
      end: '+=500%',
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        started.value = self.progress > 0.02
        active.value = Math.min(chapters.length - 1, Math.floor(self.progress * chapters.length))
      },
    },
  })

  tl.to(state, { intro: 0, rotY: 0.3, camDist: 6.2, camHeight: 1.7, duration: 1 }, 0)
  tl.to(state, { camTheta: 1.55, camDist: 3.1, camHeight: 1.0, camTargetY: 0.55, highlight: 1, duration: 1 }, 1)
  tl.to(state, { lift: 0.55, camHeight: 1.5, camTargetY: 0.95, highlight: 0, duration: 1 }, 2)
  tl.to(state, { crouch: 1, lift: 0, camDist: 4.2, camHeight: 1.0, camTargetY: 0.45, duration: 1 }, 3)
  tl.to(state, { camTheta: 0.0, crouch: 0, camDist: 5.4, camHeight: 1.5, camTargetY: 0.7, duration: 1 }, 4)
  tl.to(state, { wheelSpin: 1, tilt: 0.07, rotY: 0.3, camTheta: 0.45, camDist: 6.6, camHeight: 1.7, duration: 1 }, 5)

  st = tl.scrollTrigger
})

onBeforeUnmount(() => {
  if (st) st.kill()
})
</script>

<template>
  <section ref="heroEl" class="hero dotgrid">
    <VtbScene :state="state" />

    <div class="overlay container">
      <div class="hero-copy" :style="{ opacity: state.intro, transform: `translateY(calc(-50% + ${(1 - state.intro) * -24}px))` }">
        <SpecTag :text="hero.tag" />
        <h1 class="headline">{{ hero.headline }}</h1>
        <p class="sub">{{ hero.sub }}</p>
        <div class="hint mono">↓ {{ hero.hint }}</div>
      </div>

      <div class="captions">
        <div
          v-for="(c, i) in chapters"
          :key="c.tag"
          class="caption"
          :class="{ on: active === i && started }"
        >
          <SpecTag :text="c.tag" />
          <h2 class="cap-title">
            <template v-for="(seg, i) in highlight(c.title)" :key="i">
              <span v-if="seg.hi" class="hi">{{ seg.text }}</span>
              <template v-else>{{ seg.text }}</template>
            </template>
          </h2>
          <p class="cap-text">
            <template v-for="(seg, i) in highlight(c.text)" :key="i">
              <span v-if="seg.hi" class="hi">{{ seg.text }}</span>
              <template v-else>{{ seg.text }}</template>
            </template>
          </p>
        </div>
      </div>

      <div class="rail">
        <span
          v-for="(c, i) in chapters"
          :key="i"
          class="rail-dot"
          :class="{ on: active === i }"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
.overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.hero-copy {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  will-change: opacity, transform;
}
.headline {
  font-size: clamp(52px, 10vw, 120px);
  letter-spacing: -0.03em;
}
.headline,
.sub {
  text-shadow: 0 2px 28px rgba(18, 10, 26, 0.85);
}
.sub {
  max-width: 560px;
  color: var(--text-muted);
  font-size: 20px;
}
.hint {
  color: var(--text-muted);
  animation: bob 2.2s ease-in-out infinite;
}
@keyframes bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(6px); }
}

.captions {
  position: absolute;
  left: var(--gutter);
  bottom: 120px;
  width: min(480px, calc(100% - 2 * var(--gutter)));
}
.caption {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease, transform 0.5s ease;
  pointer-events: none;
}
.caption.on {
  opacity: 1;
  transform: translateY(0);
}
.cap-title {
  font-size: clamp(24px, 4vw, 40px);
}
.cap-text {
  color: var(--text-muted);
  font-size: 18px;
}
.hi {
  color: var(--orange);
}

.rail {
  position: absolute;
  right: var(--gutter);
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.rail-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--line);
  transition: background 0.3s ease, transform 0.3s ease;
}
.rail-dot.on {
  background: var(--orange);
  transform: scale(1.35);
}

@media (max-width: 720px) {
  .captions {
    width: 100%;
    bottom: 96px;
  }
  .rail {
    display: none;
  }
}
</style>
