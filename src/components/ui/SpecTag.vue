<script setup>
defineProps({ text: { type: String, required: true } })
</script>

<template>
  <span class="spec-tag">
    <span class="dot" />
    <span class="mono">{{ text }}</span>
  </span>
</template>

<style scoped>
.spec-tag {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: 1px solid var(--line);
  padding: 7px 14px;
  border-radius: 4px;
  color: var(--text-muted);
}
.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--orange);
}
</style>
