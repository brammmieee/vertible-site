<script setup>
import { brand, footer } from '../../content/site.js'
</script>

<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="foot-line">{{ footer.line }}</div>
      <div class="footer-links"><a :href="`mailto:${brand.email}`">Email Bram</a><a :href="brand.linkedin" target="_blank" rel="noopener">LinkedIn ↗</a><a :href="brand.discord" target="_blank" rel="noopener">Community ↗</a></div>
      <p class="foot-note">{{ footer.note }}</p>
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
  font-size: 15px;
}
.footer-links { display: flex; flex-wrap: wrap; gap: 24px; font-size: 13px; color: var(--purple); }
.footer-links a { padding: 8px 0; }
.foot-discord {
  color: var(--purple-light);
  transition: color 0.2s ease;
}
.foot-discord:hover {
  color: var(--text-bright);
}
.foot-note {
  color: var(--text-muted);
  font-size: 12px;
}
</style>
