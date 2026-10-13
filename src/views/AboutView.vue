<script setup>
import SectionHeader from '../components/ui/SectionHeader.vue'
import { about } from '../content/site.js'
</script>

<template>
  <div class="page">
    <section class="page-head">
      <div class="container">
        <SectionHeader :tag="about.tag" :title="about.title" />
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="prose">
          <p v-for="p in about.story" :key="p" v-reveal>{{ p }}</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div v-reveal class="founder">
          <img class="founder-img" :src="about.founder.image" :alt="about.founder.name" />
          <div class="founder-info">
            <div class="f-name">{{ about.founder.name }}</div>
            <div class="f-role mono">{{ about.founder.role }}</div>
            <p v-for="p in about.founder.bio" :key="p" class="f-bio">{{ p }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2 class="road-title">Where we are</h2>
        <div class="roadmap">
          <div v-for="(r, i) in about.roadmap" :key="r.label" v-reveal="i * 80" class="step">
            <span class="state mono" :class="r.state.toLowerCase()">{{ r.state }}</span>
            <p class="step-label">{{ r.label }}</p>
          </div>
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
  margin-bottom: 28px;
}
.founder {
  display: flex;
  align-items: flex-end;
  gap: 48px;
}
.founder-img {
  width: 400px;
  height: 640px;
  object-fit: contain;
  object-position: bottom;
  flex-shrink: 0;
}
.founder-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 540px;
  padding-bottom: 48px;
}
.f-name {
  font-family: var(--font-display);
  font-size: 28px;
  color: var(--text-bright);
}
.f-role {
  color: var(--text-muted);
  margin-top: 4px;
}
.f-bio {
  color: var(--text);
  font-size: 20px;
  line-height: 1.6;
  margin-top: 16px;
}
.road-title {
  font-size: 32px;
  margin-bottom: 40px;
}
.roadmap {
  display: flex;
  flex-direction: column;
}
.step {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 24px;
  align-items: start;
  padding: 24px 0;
  border-top: 1px solid var(--line);
}
.state {
  border: 1px solid var(--line);
  border-radius: 999px;
  text-align: center;
  padding: 6px 0;
  color: var(--text-muted);
}
.state.done {
  color: var(--text-bright);
  border-color: var(--purple-light);
}
.state.now {
  color: var(--ink);
  background: var(--orange);
  border-color: var(--orange);
  font-weight: 600;
}
.step-label {
  color: var(--text);
  font-size: 20px;
}
@media (max-width: 720px) {
  .founder {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }
  .founder-img {
    width: 280px;
    height: 450px;
  }
  .founder-info {
    padding-bottom: 0;
  }
  .step {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}
</style>
