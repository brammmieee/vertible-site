<script setup>
import SectionHeader from '../components/ui/SectionHeader.vue'
import { brand, contact } from '../content/site.js'
</script>

<template>
  <div class="page">
    <section class="page-head">
      <div class="container">
        <SectionHeader :tag="contact.tag" :title="contact.title" :lead="contact.body" />
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="channels">
          <a v-reveal class="channel" href="mailto:info@vertible.eu">
            <span class="label mono">EMAIL</span>
            <span class="value">{{ contact.email }}</span>
          </a>
          <a v-reveal class="channel" href="https://linkedin.com/company/vertible" target="_blank" rel="noopener">
            <span class="label mono">LINKEDIN</span>
            <span class="value">{{ contact.linkedin }}</span>
          </a>
          <a v-reveal class="channel" :href="brand.discord" target="_blank" rel="noopener">
            <span class="label mono">DISCORD</span>
            <span class="value">{{ contact.discord }}</span>
          </a>
          <div v-reveal class="channel">
            <span class="label mono">LOCATION</span>
            <span class="value">{{ contact.location }}</span>
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
.channels {
  display: flex;
  flex-direction: column;
}
.channel {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 36px 0;
  border-top: 1px solid var(--line);
  transition: padding-left 0.3s ease;
}
.channel:hover {
  padding-left: 16px;
}
.channel:last-child {
  border-bottom: 1px solid var(--line);
}
.label {
  color: var(--text-muted);
}
.value {
  font-family: var(--font-display);
  font-size: clamp(26px, 5vw, 44px);
  color: var(--text-bright);
  overflow-wrap: anywhere;
}
</style>
