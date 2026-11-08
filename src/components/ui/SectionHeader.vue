<script setup>
defineProps({
  tag: { type: String, default: '' },
  title: { type: String, required: true },
  lead: { type: String, default: '' },
  align: { type: String, default: 'left' },
  level: { type: String, default: 'h2' },
})
</script>

<template>
  <div class="section-header" :class="align">
    <span v-if="tag" class="mono tag">{{ tag }}</span>
    <component :is="level" class="title">{{ title }}</component>
    <p v-if="lead" class="lead">{{ lead }}</p>
  </div>
</template>

<style scoped>
.section-header {
  max-width: 780px;
}
.section-header.center {
  margin: 0 auto;
  text-align: center;
}
.tag {
  color: var(--purple-light);
}
.title {
  font-size: clamp(34px, 4vw, 56px);
  font-weight: 500;
  line-height: 1.14;
  margin-top: 16px;
  width: fit-content;
}
.lead {
  color: var(--text-muted);
  font-size: 20px;
  margin-top: 20px;
  width: fit-content;
  max-width: 100%;
}
.section-header.center .title,
.section-header.center .lead {
  margin-left: auto;
  margin-right: auto;
}
</style>
