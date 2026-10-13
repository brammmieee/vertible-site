<script setup>
import SectionHeader from '../ui/SectionHeader.vue'
import { specs } from '../../content/site.js'
import { highlight } from '../../utils/highlight.js'
</script>

<template>
  <section class="section">
    <div class="container">
      <SectionHeader v-reveal :tag="specs.tag" title="Under the hood." />
      <div v-reveal class="sheet">
        <div v-for="row in specs.rows" :key="row[0]" class="row">
          <span class="key mono">{{ row[0] }}</span>
          <span class="val">
            <template v-for="(seg, i) in highlight(row[1])" :key="i">
              <span v-if="seg.hi" class="hi">{{ seg.text }}</span>
              <template v-else>{{ seg.text }}</template>
            </template>
          </span>
        </div>
      </div>
      <p v-reveal class="foot mono">{{ specs.footnote }}</p>
    </div>
  </section>
</template>

<style scoped>
.sheet {
  margin-top: 56px;
  border: 1px solid var(--line);
  border-radius: 12px;
  overflow: hidden;
  background: var(--surface);
}
.row {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 24px;
  padding: 20px 28px;
  border-bottom: 1px solid var(--line);
}
.row:last-child {
  border-bottom: none;
}
.key {
  color: var(--purple-light);
}
.val {
  color: var(--text-bright);
  font-family: var(--font-display);
}
.hi {
  color: var(--orange);
}
.foot {
  color: var(--text-muted);
  margin-top: 16px;
  font-size: 11px;
}
@media (max-width: 720px) {
  .row {
    grid-template-columns: 1fr;
    gap: 4px;
  }
}
</style>
