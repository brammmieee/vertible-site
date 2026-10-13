<script setup>
import SectionHeader from '../ui/SectionHeader.vue'
import { why } from '../../content/site.js'
</script>

<template>
  <section class="section">
    <div class="container">
      <SectionHeader v-reveal :tag="why.tag" :title="why.title" :lead="why.lead" />
      <div class="cards">
        <article v-for="(c, i) in why.cards" :key="c.title" v-reveal="i * 90" class="card">
          <span class="num mono">0{{ i + 1 }}</span>
          <h3 class="card-title">{{ c.title }}</h3>
          <p class="card-text">{{ c.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 56px;
}
.card {
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 28px;
  background: var(--surface);
  transition: border-color 0.3s ease, transform 0.3s ease;
}
.card:hover {
  border-color: var(--purple);
  transform: translateY(-4px);
}
.num {
  color: var(--orange);
}
.card-title {
  font-size: 24px;
  margin: 18px 0 10px;
}
.card-text {
  color: var(--text-muted);
}
@media (max-width: 720px) {
  .cards {
    grid-template-columns: 1fr;
  }
}
</style>
