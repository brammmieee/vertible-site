<script setup>
import SectionHeader from '../ui/SectionHeader.vue'
import { reserve } from '../../content/site.js'
</script>

<template>
  <section class="section reserve">
    <div class="container reserve-inner">
      <div class="reserve-card">
        <SectionHeader v-reveal :tag="reserve.tag" :title="reserve.title" :lead="reserve.body" />
        <a
          v-reveal
          class="cta"
          :href="`mailto:info@vertible.eu?subject=${encodeURIComponent(reserve.subject)}`"
        >
          {{ reserve.cta }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reserve-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: clamp(40px, 6vw, 80px);
}
.cta {
  display: inline-block;
  margin-top: 40px;
  background: var(--purple);
  color: var(--text-bright);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 20px;
  padding: 18px 40px;
  border-radius: 999px;
  transition: background 0.2s ease, transform 0.2s ease;
}
.cta:hover {
  background: var(--purple-light);
  color: var(--ink);
  transform: translateY(-2px);
}
</style>
