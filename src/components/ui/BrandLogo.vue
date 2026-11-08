<template>
  <span class="brand-logo" role="img" aria-label="Vertible">
    <svg width="34" height="34" viewBox="240 250 780 720" fill="none" aria-hidden="true">
      <path d="M258 354H454L690 811L852 412L881 425L663 945H566Z" fill="#c39af0" />
      <path d="M302 381H438L676 843L645 918H582Z" fill="#5d407c" />
      <circle cx="866" cy="412" r="135" fill="#c39af0" />
    </svg>
    <span aria-hidden="true">ertible</span>
  </span>
</template>
<style scoped>
.brand-logo { display: inline-flex; align-items: center; gap: 0; color: var(--text-bright); font-weight: 500; font-size: 29px; letter-spacing: -.045em; line-height: 1; }
svg { color: var(--purple); flex-shrink: 0; }
@media (max-width: 430px) { .brand-logo { font-size: 26px; } svg { width: 30px; height: 31px; } }
</style>
