<script setup>
import SectionHeader from '../ui/SectionHeader.vue'
import { investors } from '../../content/site.js'
</script>

<template>
  <section class="section">
    <div class="container invest">
      <div class="invest-left">
        <SectionHeader v-reveal :tag="investors.tag" :title="investors.title" :lead="investors.body" />
      </div>
      <div class="invest-right" v-reveal>
        <RouterLink to="/contact" class="ghost">{{ investors.cta }} →</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.invest {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 48px;
  align-items: center;
}
.ghost {
  border: 1px solid var(--purple-light);
  color: var(--text-bright);
  font-family: var(--font-display);
  font-weight: 600;
  padding: 16px 32px;
  border-radius: 999px;
  white-space: nowrap;
  transition: background 0.2s ease, border-color 0.2s ease;
}
.ghost:hover {
  background: var(--purple);
  border-color: var(--purple);
}
@media (max-width: 720px) {
  .invest {
    grid-template-columns: 1fr;
  }
}
</style>
