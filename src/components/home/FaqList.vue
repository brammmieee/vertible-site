<script setup>
import { ref } from 'vue'
import SectionHeader from '../ui/SectionHeader.vue'
import { faq } from '../../content/site.js'

const open = ref(0)
</script>

<template>
  <section class="section">
    <div class="container">
      <SectionHeader v-reveal :tag="faq.tag" :title="faq.title" />
      <div class="faq">
        <div v-for="(item, i) in faq.items" :key="item.q" v-reveal="i * 70" class="item">
          <button class="q" :class="{ open: open === i }" @click="open = open === i ? -1 : i">
            <span>{{ item.q }}</span>
            <span class="plus mono">{{ open === i ? '−' : '+' }}</span>
          </button>
          <div class="a" :class="{ open: open === i }">
            <p>{{ item.a }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq {
  margin-top: 56px;
  border-top: 1px solid var(--line);
}
.item {
  border-bottom: 1px solid var(--line);
}
.q {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  background: none;
  border: none;
  color: var(--text-bright);
  font-family: var(--font-display);
  font-size: clamp(20px, 3vw, 28px);
  font-weight: 600;
  text-align: left;
  padding: 28px 0;
  cursor: pointer;
}
.plus {
  color: var(--orange);
  font-size: 22px;
}
.a {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.35s ease;
}
.a.open {
  grid-template-rows: 1fr;
}
.a p {
  overflow: hidden;
  color: var(--text-muted);
  max-width: 720px;
  padding-bottom: 24px;
}
</style>
