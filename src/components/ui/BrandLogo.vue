<template>
  <span class="brand-logo" role="img" aria-label="Vertible">
    <svg width="34" height="34" viewBox="0 0 60 60" fill="none" aria-hidden="true">
      <path d="M2 6H14L37 46M2 7L32 59L48 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="48" cy="12" r="11" fill="currentColor" />
    </svg>
    <span aria-hidden="true">ertible</span>
  </span>
</template>
<style scoped>
.brand-logo { display: inline-flex; align-items: center; gap: 0; color: var(--text-bright); font-weight: 500; font-size: 29px; letter-spacing: -.045em; line-height: 1; }
svg { color: var(--purple); flex-shrink: 0; }
@media (max-width: 430px) { .brand-logo { font-size: 26px; } svg { width: 30px; height: 31px; } }
</style>
