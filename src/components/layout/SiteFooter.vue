<script setup>
import { brand, footer } from '../../content/site.js'
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="foot-line mono">{{ footer.line }}</div>
      <a class="foot-discord mono" :href="brand.discord" target="_blank" rel="noopener">Join the Discord</a>
      <div class="foot-note mono">{{ footer.note }}</div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--line);
  padding: 48px 0 72px;
}
.footer-inner {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.foot-line {
  color: var(--text-bright);
}
.foot-discord {
  color: var(--purple-light);
  transition: color 0.2s ease;
}
.foot-discord:hover {
  color: var(--text-bright);
}
.foot-note {
  color: var(--text-muted);
  font-size: 10px;
}
</style>
