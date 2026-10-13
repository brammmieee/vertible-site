<script setup>
import SectionHeader from '../ui/SectionHeader.vue'
import { positioning } from '../../content/site.js'
</script>

<template>
  <section class="section">
    <div class="container">
      <SectionHeader v-reveal :tag="positioning.tag" :title="positioning.title" :lead="positioning.lead" align="center" />
      <div v-reveal class="strip">
        <div class="end mono">{{ positioning.left }}</div>
        <div class="mid">
          <div class="mid-mark">VTB0</div>
          <div class="mid-sub mono">{{ positioning.mark }}</div>
          <div class="mid-line" />
        </div>
        <div class="end mono right">{{ positioning.right }}</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.strip {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 32px;
  margin-top: 56px;
}
.end {
  color: var(--text-muted);
  font-size: 13px;
  line-height: 1.5;
}
.end.right {
  text-align: right;
}
.mid {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}
.mid-mark {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 22px;
  color: var(--text-bright);
  background: var(--purple);
  padding: 12px 22px;
  border-radius: 999px;
}
.mid-sub {
  color: var(--text-muted);
  font-size: 11px;
}
.mid-line {
  width: 2px;
  height: 64px;
  background: linear-gradient(var(--line), var(--purple), var(--line));
}
@media (max-width: 720px) {
  .strip {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .end.right {
    text-align: left;
  }
}
</style>
