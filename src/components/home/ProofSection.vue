<script setup>
import SectionHeader from '../ui/SectionHeader.vue'
import { proof } from '../../content/site.js'
</script>

<template>
  <section class="section">
    <div class="container">
      <SectionHeader v-reveal :tag="proof.tag" :title="proof.title" />
      <div class="stats">
        <div v-for="(s, i) in proof.stats" :key="s.label" v-reveal="i * 90" class="stat">
          <div class="value">{{ s.value }}</div>
          <div class="label mono">{{ s.label }}</div>
        </div>
      </div>
      <blockquote v-reveal class="quote">{{ proof.quote }}</blockquote>
      <p v-reveal class="honest">{{ proof.honest }}</p>
    </div>
  </section>
</template>

<style scoped>
.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 56px;
}
.stat {
  border-top: 1px solid var(--purple);
  padding-top: 20px;
}
.value {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(44px, 7vw, 72px);
  color: var(--text-bright);
}
.label {
  color: var(--text-muted);
  margin-top: 6px;
}
.quote {
  font-family: var(--font-display);
  font-size: clamp(28px, 5vw, 48px);
  color: var(--purple-light);
  margin-top: 64px;
}
.honest {
  color: var(--text-muted);
  margin-top: 18px;
  max-width: 640px;
}
@media (max-width: 720px) {
  .stats {
    grid-template-columns: 1fr;
  }
}
</style>
