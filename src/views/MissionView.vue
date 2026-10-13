<script setup>
import SectionHeader from '../components/ui/SectionHeader.vue'
import SpecTag from '../components/ui/SpecTag.vue'
import { mission } from '../content/site.js'
</script>

<template>
  <div class="page">
    <section class="page-head">
      <div class="container">
        <SectionHeader :tag="mission.tag" :title="mission.title" :lead="mission.lead" />
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="prose">
          <p v-for="p in mission.body" :key="p" v-reveal>{{ p }}</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="grid">
          <article v-for="(p, i) in mission.principles" :key="p.title" v-reveal="i * 80" class="principle">
            <SpecTag :text="`0${i + 1}`" />
            <h3 class="p-title">{{ p.title }}</h3>
            <p class="p-text">{{ p.text }}</p>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page-head {
  padding: 200px 0 80px;
}
.prose {
  max-width: 720px;
}
.prose p {
  font-size: 22px;
  line-height: 1.65;
  color: var(--text);
  margin-bottom: 28px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
.principle {
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 28px;
  background: var(--surface);
}
.p-title {
  font-size: 24px;
  margin: 18px 0 10px;
}
.p-text {
  color: var(--text-muted);
}
@media (max-width: 720px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
